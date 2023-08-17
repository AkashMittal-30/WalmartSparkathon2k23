import React, { useRef, useEffect, useState } from "react";
// import { useState } from 'react-usestateref'
import CssBaseline from "@mui/material/CssBaseline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useUserAuth } from "../../context/UserAuthContext";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import { Form, Button } from "react-bootstrap";
import ImageCard from "./ImageCard";
import axios from "axios";
import "./ChatBotInterface.css";

const baseUrl = "https://7cb6-34-125-201-109.ngrok.io";

const ChatBotInterface2 = () => {
  const { user, logOut, setUser } = useUserAuth();

  const queryText = useRef();

  const [messages, setMessages] = useState([]);
  const [messageWindows, setMessageWindows] = useState(user.messageWindows);
  const [currentMessageWindow, setCurrentMessageWindow] = useState(-1);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesContainerRef = useRef(null);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [messages]);

  const handleMessage = (e) => {
    setMessages((prevMessages) => [...prevMessages, e]);
  };
  const [type, setType] = useState("-1");
  const setTypeFunction = (e) => {
    setType(e);
  };
  console.log(type);

  const askQuestion = async () => {
    console.log("Newfunction called");
    let newMessage = {
      items: [],
      productNames: [],
      message: queryText.current.value,
      user: user.uid,
    };
    const userUtterance = queryText.current.value;
    // const sessionId = messageWindows[currentMessageWindow].sessionId;
    queryText.current.value = "";
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // const response = await axios.post(`${baseUrl}/ask/product/${type}`, {
    //   userUtterance,
    // });
    setTimeout(() => {
      const response = {
        data: {
          aiUtterance:
            "The Frontiersman Bear Attack Deterrent Spray has a maximum spray range of 30 feet (9 meters). This means you can deploy the spray from a distance of up to 30 feet to create a protective barrier between you and an aggressive bear. This range is designed to provide you with more time to react to a charging bear and to help keep you safe during outdoor adventures.",
        },
      };

      const replyMessage = {
        items: [],
        productNames: response.data.productNames,
        message: response.data.aiUtterance,
        user: "application",
      };
      setMessages((prevMessages) => [...prevMessages, replyMessage]);
    }, 5000);

    // console.log(`/ask/product/${type}`);
  };

  // async function delay(ms)
  // {
  //   return new Promise(resolve => setTimeout(resolve, 1000));
  // }
  //reply query
  const submitQuery = async () => {
    console.log("old function called");
    // console.log(type);
    let newMessage = {
      items: [],
      productNames: [],
      message: queryText.current.value,
      user: user.uid,
    };
    const userUtterance = queryText.current.value;
    queryText.current.value = "";
    // const newMessages = [...messages, newMessage];
    // setMessages(newMessages);
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    let sessionId = "b71fd28b-1dc7-4488-8ec6-bad2cdc13a04";

    if (currentMessageWindow === -1) {
      console.log("first if");
      // const response = await axios.get(`${baseUrl}/start/user/${user.uid}`);
      const response = { data: { sessionId: "sahhda-asadh-adad" } };
      sessionId = response.data.sessionId;
      // const neglected2=await axios.post(`${baseUrl}/seed/user/${user.uid}/session/${sessionId}`, {});
    } else {
      console.log("first else");
      sessionId = messageWindows[currentMessageWindow].sessionId;
    }
    // const response = await axios.post(
    //   `${baseUrl}/reply/user/${user.uid}/session/${sessionId}`,
    //   {
    //     userUtterance,
    //   }
    // );
    // await delay(4000);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    setTimeout(() => {
      var response;
      if (messages.length < 2) {
        response = {
          data: {
            aiUtterance:
              "That sounds like a great adventure! When going camping in Alaska, it's important to be prepared for the outdoors and varying weather conditions. Here are a few essentials you should consider buying:\n\n1. Tent: Look for a sturdy and waterproof tent that can withstand the elements.\n2. Sleeping bag: Choose one that provides enough insulation for colder temperatures.\n3. Camping stove: A portable stove will allow you to cook meals during your trip.\n4. Warm clothing: Pack layers, including thermal underwear, fleece jackets, and waterproof outerwear.\n5. Hiking boots: Invest in comfortable and durable footwear for hiking and exploring.\n6. Camping mattress or sleeping pad: This will provide insulation and comfort while sleeping.\n7. Cooking utensils: Bring lightweight and versatile cookware, such as a pot, pan, and utensils.\n8. First aid kit: It's always important to have a well-stocked first aid kit for any emergencies.\n9. Insect repellent: Alaska can have mosquitoes and other bugs, so bring effective repellent.\n10. Camping accessories: Don't forget items like a headlamp, multitool, and camping chairs.\n\nThese are just a few suggestions to get you started. Is there anything else you would like assistance with? Are you satisfied with this information? ",
            productNames: [
              "Tent",
              "Sleeping bag",
              "Camping stove",
              "Warm clothing",
              "Hiking boots",
              "Camping mattress or sleeping pad",
              "Cooking utensils",
              "First aid kit",
              "Insect repellent",
              "Camping accessories",
            ],
          },
        };
      } else {
        response = {
          data: {
            aiUtterance:
              "When camping in bear country, it's important to take precautions to protect yourself from potential bear encounters. Here are a few tips to keep in mind:\n1. Store your food properly: Bears are attracted to the smell of food, so it's crucial to store your food in a bear-resistant container or hang it from a tree branch at least 10 feet off the ground and 4 feet away from the trunk.\n2. Use bear spray: Carry bear spray with you at all times and know how to use it. Bear spray is a non-lethal deterrent that can help deter a bear if it gets too close.\n3. Make noise: Bears are more likely to avoid humans if they are aware of your presence. Make noise while hiking, such as talking loudly or clapping your hands, to alert bears of your presence.\n4. Camp in open areas: Avoid camping in dense vegetation, as it can make it harder to see and hear bears approaching your campsite.\n5. Keep a clean camp: Clean up all food scraps and trash, as they can attract bears. Dispose of them properly in designated bear-proof containers or by packing them out.\nRemember, while these precautions can help minimize the risk of bear encounters, it's important to be aware of your surroundings and follow any additional safety guidelines provided by local authorities. Have a great camping trip! Is there anything else I can assist you with?",
            productNames: [
              "Bear-resistant container or bear bag",
              "Bear spray",
              "Whistle",
              "Food storage containers",
              "Trash bags",
            ],
          },
        };
      }

      const aiUtterance = response.data.aiUtterance;
      const productNames = response.data.productNames;

      const replyMessage = {
        items: [],
        productNames: productNames,
        message: aiUtterance,
        user: "application",
      };
      // const newMessages2 = [...messages, replyMessage];
      setMessages((prevMessages) => [...prevMessages, replyMessage]);
    }, 5000);

    // if (currentMessageWindow === -1) {
    //   console.log("second if");
    //   const newMessageWindow = {
    //     messages: messages,
    //     sessionId: sessionId,
    //   };
    //   const newMessageWindows = [newMessageWindow, ...messageWindows];
    //   setMessageWindows(newMessageWindows);
    //   setCurrentMessageWindow(0);
    // } else {
    //   console.log("second else");
    //   const newMessageWindow = {
    //     messages: messages,
    //     sessionId: sessionId,
    //   };
    //   const newMessageWindows = messageWindows;
    //   newMessageWindows[currentMessageWindow] = newMessageWindow;
    //   setMessageWindows(newMessageWindows);
    // }
  };

  useEffect(() => {
    async function saveUserMessageWindows() {
      const email = user.email;
      await axios.put("http://localhost:5000/chat", { email, messageWindows });
      setUser((prevUser) => ({ ...prevUser, messageWindows: messageWindows }));
    }
    saveUserMessageWindows();
  }, [messageWindows]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault();
        if (type == "-1") submitQuery(e);
        else askQuestion(e);
      }
    }
  };
  const ar = ["A", "B"];
  return (
    <div className="chatBotInterface">
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={`drawer ${sidebarOpen ? "drawerOpen" : "drawerClose"}`}
        classes={{
          paper: `${sidebarOpen ? "drawerOpen" : "drawerClose"}`,
        }}
      >
        <div
          className={`drawerHeader ${
            sidebarOpen ? "justify-space-between" : "justify-center"
          }`}
        >
          <div className={`${sidebarOpen ? "" : "hide"}`}>
            <div className="drawer-heading-walmart">
              {`${user.firstName}  `}
            </div>
            <Button onClick={() => logOut()}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Button>
          </div>
          <IconButton onClick={toggleSidebar} className="color-white">
            {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </div>

        <div className={`drawer-new-chat ${sidebarOpen ? " " : "hide"}`}>
          <Button
            className={`drawer-new-chat-button ${sidebarOpen ? " " : "hide"}`}
            // onClick={startNewChat}
          >
            Start New Chat
          </Button>
        </div>

        <div className={`drawer-chat-windows ${sidebarOpen ? " " : "hide"}`}>
          {ar?.map((num, index) => (
            <div
              key={index}
              className={`${sidebarOpen ? "drawer-contents" : "hide"} ${
                currentMessageWindow === index ? "" : ""
              }`}
              // onClick={() => openWindow(index)}
            >
              {index == 0 ? <>Barbie Dolls ...</> : <>Small Umbrellas ...</>}
              {/* {messageWindow?.messages.map((message, msgIndex) => {
                if (msgIndex === 0)
                  return message.message.substring(0, 15) + "...";
              })} */}
            </div>
          ))}
        </div>
      </Drawer>
      <div className={`content ${sidebarOpen ? "slightBlur" : ""}`}>
        <div className="chat-messages" ref={messagesContainerRef}>
          <div
            className={`${messages.length === 0 ? "chat-text-center" : "hide"}`}
          >
            <b>
              Hello {user.firstName}! I'm an AI Sales Assistant at WalBot. How
              may I assist you today?
            </b>
            <br />
            <p className="chat-note-text">
              Note: You can start the conversation with bot by typing your
              message in the below message box!!!
            </p>
          </div>
          {messages?.map((message, index) => (
            <div key={index} className="chat-message">
              <ImageCard
                items={message.items}
                message={message.message}
                user={message.user}
                productNames={message.productNames}
                messageFunction={handleMessage}
                setTypeFunction={setTypeFunction}
              />
            </div>
          ))}
        </div>
        <Form className="chat-form">
          <Form.Group className="mb-3 chat-form-text">
            <Form.Control
              className="chat-form-text-control"
              ref={queryText}
              as="textarea"
              rows={2}
              defaultValue=""
              placeholder="Write..."
              onKeyDown={handleKeyDown}
            />
          </Form.Group>
          <Button
            className="chat-form-button"
            onClick={() => {
              if (type == "-1") submitQuery();
              else askQuestion();
            }}
          >
            <SendIcon />
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ChatBotInterface2;
