import React, {  useRef, useEffect, useState } from "react";
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

const ChatBotInterface2 = () => {
  const { user, logOut, setUser } = useUserAuth();

  const queryText = useRef();

  const [messages, setMessages] = useState([{
      items: [],
      productNames: [],
      message:"Hi! how can I help you?",
      user: "application",
  }]);
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


  const submitQuery = async () => {
    
    let newMessage = {
      items: [],
      productNames: [],
      message: queryText.current.value,
      user: user.uid,
    };
    queryText.current.value="";
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    let sessionId;
    
    if (currentMessageWindow===-1) {
      console.log("first if");
      // const response = await axios.get(`/start/user/${user.uid}`);
      const response={data:{sessionId:"sahhda-asadh-adad"}};
      sessionId = response.data.sessionId;
      // await axios.post(`/seed/user/${user.uid}/session/${sessionId}`);
    } else {
      console.log("first else")
      sessionId = messageWindows[currentMessageWindow].sessionId;
    }
    const userUtterance = queryText.current.value;
    // const response = await axios.post(
    //   `/reply/user/${user.uid}/session/${sessionId}`,
    //   {
    //     userUtterance,
    //   }
    // );
    const response = {
      data:{
      aiUtterance:"Barbara dolls are here, check out : ",
      productNames:["Barbie Doll","Tatya Bichu","Anabelle","Raja bc"]
      }
    }
    const aiUtterance = response.data.aiUtterance;
    const productNames = response.data.productNames;

    const replyMessage = {
      items: [],
      productNames: productNames,
      message: aiUtterance,
      user: "application",
    };
    const newMessages2 = [...messages, replyMessage];
    setMessages(newMessages2);
    if (currentMessageWindow === -1) {
      console.log("second if");
      const newMessageWindow = {
        messages: messages,
        sessionId: sessionId,
      };
      const newMessageWindows = [newMessageWindow, ...messageWindows];
      setMessageWindows(newMessageWindows);
      setCurrentMessageWindow(0);
    } else {
      console.log("second else");
      const newMessageWindow = {
        messages: messages,
        sessionId: sessionId,
      };
      const newMessageWindows = messageWindows;
      newMessageWindows[currentMessageWindow] = newMessageWindow;
      setMessageWindows(newMessageWindows);
    }
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
        submitQuery(e);
      }
    }
  };

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
          <div className={`${sidebarOpen ? "drawer-heading-walmart" : "hide"}`}>
            {`${user.email} `}
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
          {messageWindows?.map((messageWindow, index) => (
            <div
              key={index}
              // className={`${sidebarOpen ? "drawer-contents" : "hide"} ${
              //   isOldChatWindow === index ? "highlight" : ""
              // }`}
              // onClick={() => openWindow(index)}
            >
              {messageWindow?.messages.map((message, msgIndex) => {
                if (msgIndex === 0)
                  return message.message.substring(0, 15) + "...";
              })}
            </div>
          ))}
        </div>
      </Drawer>
      <div className={`content ${sidebarOpen ? "slightBlur" : ""}`}>
        <div className="chat-messages" ref={messagesContainerRef}>
          {messages?.map((message, index) => (
            <div key={index} className="chat-message">
              <ImageCard
                items={message.items}
                message={message.message}
                user={message.user}
                productNames={message.productNames}
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
          <Button className="chat-form-button" onClick={submitQuery}>
            <SendIcon />
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ChatBotInterface2;
