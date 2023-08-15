import React, { useState, useRef, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
// import Container from '@mui/material/Container';
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
  const messagesContainerRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isOldChatWindow, setIsOldChatWindow] = useState(-1);
  const queryText = useRef();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const { user, logOut, setUser } = useUserAuth();
  // let imageLinks = [
  //   "https://picsum.photos/100",
  //   "https://picsum.photos/200",
  //   "https://picsum.photos/300",
  //   "https://picsum.photos/400",
  //   "https://picsum.photos/500",
  //   "https://picsum.photos/600",
  //   "https://picsum.photos/700",
  //   "https://picsum.photos/800",
  // ];
  // {
  //   imageLinks: [],
  //   message:
  //     "Kya Raja betichod hai? Bata na bhai bata de yaar please aisa mat kar ki nhi bata raha",
  //   user: "Raja",
  // },
  // {
  //   imageLinks: imageLinks,
  //   message: "Haa Raja betichod hai",
  //   user: "application",
  // },
  // {
  //   imageLinks: [],
  //   message: "Kya Raja bsdwala hai?",
  //   user: "Raja",
  // },
  // {
  //   imageLinks: imageLinks,
  //   message: "Haa Raja bsdwala hai",
  //   user: "application",
  // },
  const [messages, setMessages] = useState([]);
  const [messageWindows, setMessageWindows] = useState(user.messageWindows);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (queryText.current.value !== "") {
      const newMessage = {
        imageLinks: [],
        message: queryText.current.value,
        user: user.email,
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
        setIsOldChatWindow(0);
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
      } else {
        const newMessageWindow = {
          messages: messages,
        };
        const newMessageWindows = [newMessageWindow, ...messageWindows];
        setMessageWindows(newMessageWindows);
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
      const newMessages = messageWindows[ind].messages;
      setMessages(newMessages);
    }
    setIsOldChatWindow(ind);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    }
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
          {messages?.map((message, index) => (
            <div key={index} className="chat-message">
              <ImageCard
                imageLinks={message.imageLinks}
                message={message.message}
                user={message.user}
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
          <Button className="chat-form-button" onClick={handleSubmit}>
            <SendIcon />
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ChatBotInterface;
