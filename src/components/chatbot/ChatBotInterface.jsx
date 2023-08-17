import React, { useState, useRef, useEffect } from "react";
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

const ChatBotInterface = () => {
  const { user, logOut, setUser } = useUserAuth(); // To Manage User Auths
  const messagesContainerRef = useRef(null); // To Scroll to bottom when new text entered
  const queryText = useRef(); // To store the user input
  const [sidebarOpen, setSidebarOpen] = useState(true); // To manage sidebar status
  const [isOldChatWindow, setIsOldChatWindow] = useState(-1);
  const [messages, setMessages] = useState([]);
  const [messageWindows, setMessageWindows] = useState(user.messageWindows);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const saveNewMessageWindow = () => {
    const newMessageWindow = {
      messages: messages,
    };
    const newMessageWindows = [newMessageWindow, ...messageWindows];
    setMessageWindows(newMessageWindows);
  };
  const saveOldMessageWindow = () => {
    const newMessageWindow = {
      messages: messages,
    };
    const newMessageWindows = messageWindows;
    newMessageWindows[isOldChatWindow] = newMessageWindow;
    setMessageWindows(newMessageWindows);
  };

  const submitQuery = (e) => {
    // To submit user
    e.preventDefault();
    if (queryText.current.value !== "") {
      const newMessage = {
        items: [
          {
            imageLink: "https://picsum.photos/200",
            redirectUrl: "https://picsum.photos/200",
            price: "1000",
            title: "raja bc",
          },
        ],
        message: queryText.current.value,
        user: user.email,
        productNames: ["Barbie", "Hannah"],
      };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      queryText.current.value = "";
      if (isOldChatWindow === -1) {
        const newMessageWindow = {
          messages: newMessages,
        };
        const newMessageWindows = [newMessageWindow, ...messageWindows];
        setMessageWindows(newMessageWindows);
        // saveNewMessageWindow();
        setIsOldChatWindow(0);
      }
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault();
        submitQuery(e);
      }
    }
  };

  const startNewChat = () => {
    if (messages.length !== 0) {
      if (isOldChatWindow > -1) {
        const newMessageWindow = {
          messages: messages,
        };
        const newMessageWindows = messageWindows;
        newMessageWindows[isOldChatWindow] = newMessageWindow;
        setMessageWindows(newMessageWindows);
        // saveOldMessageWindow();
      } else {
        const newMessageWindow = {
          messages: messages,
        };
        const newMessageWindows = [newMessageWindow, ...messageWindows];
        setMessageWindows(newMessageWindows);
        // saveNewMessageWindow();
      }
      setIsOldChatWindow(-1);
      const newMessages = [];
      setMessages(newMessages);
      queryText.current.value = "";
    }
  };
  const openWindow = (ind) => {
    if (isOldChatWindow === -1) {
      if (messages.length !== 0) {
        const newMessageWindow = {
          messages: messages,
        };
        const newMessageWindows = [newMessageWindow, ...messageWindows];
        setMessageWindows(newMessageWindows);
        // saveNewMessageWindow();
      }
      const newMessages = messageWindows[ind].messages;
      setMessages(newMessages);
    } else {
      const newMessageWindow = {
        messages: messages,
      };
      const newMessageWindows = messageWindows;
      newMessageWindows[isOldChatWindow] = newMessageWindow;
      setMessageWindows(newMessageWindows);
      // saveOldMessageWindow();
      const newMessages = messageWindows[ind].messages;
      setMessages(newMessages);
    }
    setIsOldChatWindow(ind);
  };

  useEffect(() => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [messages]);
  useEffect(() => {
    console.log("saving");
    async function saveUserMessageWindows() {
      const email = user.email;
      console.log("inside saving");
      console.log(messageWindows);
      await axios.put("http://localhost:5000/chat", { email, messageWindows });
      setUser((prevUser) => ({ ...prevUser, messageWindows: messageWindows }));
    }
    saveUserMessageWindows();
  }, [messageWindows, setUser]);
  console.log(messageWindows[0]);
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
            onClick={startNewChat}
          >
            Start New Chat
          </Button>
        </div>

        <div className={`drawer-chat-windows ${sidebarOpen ? " " : "hide"}`}>
          {messageWindows?.map((messageWindow, index) => (
            <div
              key={index}
              className={`${sidebarOpen ? "drawer-contents" : "hide"} ${
                isOldChatWindow === index ? "highlight" : ""
              }`}
              onClick={() => openWindow(index)}
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
          <div
            className={`${messages.length === 0 ? "chat-text-center" : "hide"}`}
          >
            <b>Hi! {user.firstName} How can I help you today?</b>
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

export default ChatBotInterface;
