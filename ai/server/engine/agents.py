import re
from typing import Any, List, Dict
from pydantic import BaseModel, Field

from langchain.llms import BaseLLM
from langchain.chains.base import Chain

from .constants import AGENT_ROLE, ORG_NAME, ORG_BUSINESS,\
    CONVERSATION_PURPOSE, CONVERSATION_TYPE, CONVERSATION_INTENTS, INTRO_MESSAGE
from .chains import IntentAnalyzerChain, AgentConversationChain, ProductIdentificationChain


class WalBotGPT(Chain, BaseModel):
    """Controller model for the Sales AI Agent."""

    conversation_history: List[str] = []
    conversation_intent_id: str = "1"
    current_conversation_intent: str = CONVERSATION_INTENTS.get("1")
    intent_analyzer_chain: IntentAnalyzerChain = Field(...)
    agent_conversation_chain: AgentConversationChain = Field(...)
    product_identification_chain: ProductIdentificationChain = Field(...)
    conversation_intent_dict: Dict = CONVERSATION_INTENTS

    verbose: bool = True
    use_tools: bool = False
    agent_role: str = AGENT_ROLE
    company_name: str = ORG_NAME
    company_business: str = ORG_BUSINESS
    conversation_purpose: str = CONVERSATION_PURPOSE
    conversation_type: str = CONVERSATION_TYPE

    def retrieve_conversation_intent(self, key):
        return self.conversation_intent_dict.get(key, "1")

    @property
    def input_keys(self) -> List[str]:
        return []

    @property
    def output_keys(self) -> List[str]:
        return []
    
    def seed_agent(self) -> str:
        # Step 1: seed the conversation
        self.current_conversation_intent = self.retrieve_conversation_intent("1")
        self.conversation_history = [f"AGENT: {INTRO_MESSAGE}<END_OF_TURN>"]
        return INTRO_MESSAGE

    def determine_conversation_stage(self):
        self.conversation_intent_id = self.intent_analyzer_chain.run(
            conversation_history="\n".join(self.conversation_history).rstrip("\n"),
            conversation_stages="\n".join([
                str(key) + ": " + str(value)
                for key, value in CONVERSATION_INTENTS.items()
            ]),
        )
        self.current_conversation_intent = self.retrieve_conversation_intent(
            self.conversation_intent_id
        )
        if self.verbose:
            print(f"Conversation Intent ID: {self.conversation_intent_id}")
            print(f"Conversation Intent: {self.current_conversation_intent}")

    def human_step(self, human_input: str):
        # process human input
        human_input = "USER: " + human_input + " <END_OF_TURN>"
        self.conversation_history.append(human_input)

    def step(self) -> tuple[str, list]:
        return self._call(inputs={})

    def extract_items(self, input_string: str) -> list:
        pattern = r'\d+\.\s+(.*)'
        matches = re.findall(pattern, input_string)
        return matches

    def _call(self, inputs: Dict[str, Any]) -> None:
        """Run one step of the sales agent."""

        # Generate agent's utterance
        agent_message: str = self.agent_conversation_chain.run(
            agent_role = self.agent_role,
            company_name=self.company_name,
            company_business=self.company_business,
            conversation_purpose=self.conversation_purpose,
            conversation_type=self.conversation_type,
            conversation_intent=self.current_conversation_intent,
            conversation_history="\n".join(self.conversation_history),
        )

        # Generate candidate product names
        prod_list = []
        if self.conversation_intent_id=="1":
            prod_str: str = self.product_identification_chain.run(
                utterance = agent_message
            )
            prod_list = self.extract_items(prod_str) 

        # Add agent's response to conversation history
        agent_name = "AGENT"
        agent_uttr = agent_name + ": " + agent_message
        if '<END_OF_TURN>' not in agent_message:
            agent_uttr += ' <END_OF_TURN>'
        self.conversation_history.append(agent_uttr)
        if self.verbose:
            print(agent_uttr.replace("<END_OF_TURN>", ""))
        return (agent_message, prod_list)

    @classmethod
    def from_llm(cls, llm: BaseLLM, verbose: bool = False, **kwargs) -> "WalBotGPT":
        """Initialize the WalBotGPT Controller."""
        intent_analyzer_chain = IntentAnalyzerChain.from_llm(llm, verbose=verbose)
        agent_conversation_chain = AgentConversationChain.from_llm(llm, verbose=verbose)
        product_identification_chain = ProductIdentificationChain.from_llm(llm, verbose=verbose)

        return cls(
            intent_analyzer_chain=intent_analyzer_chain,
            agent_conversation_chain=agent_conversation_chain,
            product_identification_chain=product_identification_chain,
            verbose=verbose,
            **kwargs,
        )