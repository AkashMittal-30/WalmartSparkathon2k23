from typing import Union, Any, List, Dict
from pydantic import BaseModel, Field

from langchain.llms import BaseLLM
from langchain.agents import AgentExecutor
from langchain.chains.base import Chain

from .constants import AI_NAME, AI_ROLE, ORG_NAME, ORG_VALUES, ORG_BUSINESS,\
    CONVERSATION_PURPOSE, CONVERSATION_TYPE, CONVERSATION_STAGES
from .chains import StageAnalyzerChain, SalesConversationChain


class SalesGPT(Chain, BaseModel):
    """Controller model for the Sales AI Agent."""

    conversation_history: List[str] = []
    conversation_stage_id: str = "1"
    current_conversation_stage: str = CONVERSATION_STAGES.get("1")
    stage_analyzer_chain: StageAnalyzerChain = Field(...)
    sales_agent_executor: Union[AgentExecutor, None] = Field(...)
    # knowledge_base: Union[RetrievalQA, None] = Field(...)
    sales_conversation_utterance_chain: SalesConversationChain = Field(...)
    conversation_stage_dict: Dict = CONVERSATION_STAGES

    verbose: bool = True
    use_tools: bool = False
    salesperson_name: str = AI_NAME
    salesperson_role: str = AI_ROLE
    company_name: str = ORG_NAME
    company_business: str = ORG_BUSINESS
    company_values: str = ORG_VALUES
    conversation_purpose: str = CONVERSATION_PURPOSE
    conversation_type: str = CONVERSATION_TYPE

    def retrieve_conversation_stage(self, key):
        return self.conversation_stage_dict.get(key, "1")

    @property
    def input_keys(self) -> List[str]:
        return []

    @property
    def output_keys(self) -> List[str]:
        return []
    
    def seed_agent(self):
        # Step 1: seed the conversation
        self.current_conversation_stage = self.retrieve_conversation_stage("1")
        self.conversation_history = []

    def determine_conversation_stage(self):
        self.conversation_stage_id = self.stage_analyzer_chain.run(
            conversation_history="\n".join(self.conversation_history).rstrip("\n"),
            conversation_stage_id=self.conversation_stage_id,
            conversation_stages="\n".join([
                str(key) + ": " + str(value)
                for key, value in CONVERSATION_STAGES.items()
            ]),
        )
        self.current_conversation_stage = self.retrieve_conversation_stage(
            self.conversation_stage_id
        )
        if self.verbose:
            print(f"Conversation Stage ID: {self.conversation_stage_id}")
            print(f"Conversation Stage: {self.current_conversation_stage}")

    def human_step(self, human_input):
        # process human input
        human_input = "User: " + human_input + " <END_OF_TURN>"
        self.conversation_history.append(human_input)

    def step(self):
        self._call(inputs={})


    def _call(self, inputs: Dict[str, Any]) -> None:
        """Run one step of the sales agent."""

        # Generate agent's utterance
        # if use tools
        if self.use_tools:
            ai_message = self.sales_agent_executor.run(
                input="",
                conversation_stage=self.current_conversation_stage,
                conversation_history="\n".join(self.conversation_history),
                salesperson_name=self.salesperson_name,
                salesperson_role=self.salesperson_role,
                company_name=self.company_name,
                company_business=self.company_business,
                company_values=self.company_values,
                conversation_purpose=self.conversation_purpose,
                conversation_type=self.conversation_type,
            )

        else:
            # else
            ai_message = self.sales_conversation_utterance_chain.run(
                conversation_stage=self.current_conversation_stage,
                conversation_history="\n".join(self.conversation_history),
                salesperson_name=self.salesperson_name,
                salesperson_role=self.salesperson_role,
                company_name=self.company_name,
                company_business=self.company_business,
                company_values=self.company_values,
                conversation_purpose=self.conversation_purpose,
                conversation_type=self.conversation_type,
            )

        # Add agent's response to conversation history
        agent_name = self.salesperson_name
        ai_message = agent_name + ": " + ai_message
        if '<END_OF_TURN>' not in ai_message:
            ai_message += ' <END_OF_TURN>'
        self.conversation_history.append(ai_message)
        print(ai_message.replace("<END_OF_TURN>", ""))
        return {}

    @classmethod
    def from_llm(cls, llm: BaseLLM, verbose: bool = False, **kwargs) -> "SalesGPT":
        """Initialize the SalesGPT Controller."""
        stage_analyzer_chain = StageAnalyzerChain.from_llm(llm, verbose=verbose)
        
        sales_conversation_utterance_chain = SalesConversationChain.from_llm(
            llm, verbose=verbose
        )

        if "use_tools" in kwargs.keys() and kwargs["use_tools"] is True:
            # set up agent with tools
            product_catalog = kwargs["product_catalog"]
            knowledge_base = setup_knowledge_base(product_catalog)
            tools = get_tools(knowledge_base)

            prompt = CustomPromptTemplateForTools(
                template=SALES_AGENT_TOOLS_PROMPT,
                tools_getter=lambda x: tools,
                # This omits the `agent_scratchpad`, `tools`, and `tool_names` variables because those are generated dynamically
                # This includes the `intermediate_steps` variable because that is needed
                input_variables=[
                    "input",
                    "intermediate_steps",
                    "salesperson_name",
                    "salesperson_role",
                    "company_name",
                    "company_business",
                    "company_values",
                    "conversation_purpose",
                    "conversation_type",
                    "conversation_history",
                ],
            )
            llm_chain = LLMChain(llm=llm, prompt=prompt, verbose=verbose)

            tool_names = [tool.name for tool in tools]

            # WARNING: this output parser is NOT reliable yet
            ## It makes assumptions about output from LLM which can break and throw an error
            output_parser = SalesConvoOutputParser(ai_prefix=kwargs["salesperson_name"])

            sales_agent_with_tools = LLMSingleActionAgent(
                llm_chain=llm_chain,
                output_parser=output_parser,
                stop=["\nObservation:"],
                allowed_tools=tool_names,
            )

            sales_agent_executor = AgentExecutor.from_agent_and_tools(
                agent=sales_agent_with_tools, tools=tools, verbose=verbose
            )
        else:
            sales_agent_executor = None
            knowledge_base = None

        return cls(
            stage_analyzer_chain=stage_analyzer_chain,
            sales_conversation_utterance_chain=sales_conversation_utterance_chain,
            sales_agent_executor=sales_agent_executor,
            knowledge_base=knowledge_base,
            verbose=verbose,
            **kwargs,
        )