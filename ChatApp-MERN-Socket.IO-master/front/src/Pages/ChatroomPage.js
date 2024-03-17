import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";

const ChatroomPage = ({ match, socket, history }) => {
  const chatroomId = match.params.id;
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, messagesRes] = await Promise.all([
          axios.get("http://localhost:8000/user/users"),
          axios.get(`http://localhost:8000/message/${chatroomId}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("CC_Token"),
            },
          }),
        ]);
        setUsers(usersRes.data);
        setMessages(messagesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [chatroomId]);

  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", { chatroomId });

      socket.on("newMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on("hateSpeechDetected", ({ message }) => {
        alert("Hate speech detected in your message");
        Swal.fire({
          icon: "warning",
          title: "Hate Speech Detected",
          text: message,
          confirmButtonText: "OK",
        });
      });

      socket.on("blocked", ({ message }) => {
        alert("You have been blocked by the user.");
        Swal.fire({
          icon: "error",
          title: "Blocked",
          text: message,
          confirmButtonText: "OK",
        });
      });

      return () => {
        socket.emit("leaveRoom", { chatroomId });
        socket.off("newMessage");
        socket.off("hateSpeechDetected");
        socket.off("blocked");
      };
    }
  }, [socket, chatroomId]);

  const sendMessage = () => {
    if (socket && messageRef.current.value.trim() !== "") {
      socket.emit("chatroomMessage", {
        chatroomId,
        message: messageRef.current.value,
      });
      messageRef.current.value = "";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          flex: "1",
          borderRight: "1px solid #ccc",
          padding: "10px",
          overflowY: "auto",
        }}
      >
        <h2
          style={{
            color: "#075e54",
            margin: "0 0 10px 0",
            fontWeight: "bold",
          }}
        >
          Users
        </h2>
        {users.map((user) => (
          <p
            key={user._id}
            style={{
              margin: "0",
              padding: "5px 0",
              borderBottom: "1px solid #e0e0e0",
              cursor: "pointer",
            }}
          >
            {user.name}
          </p>
        ))}
      </div>
      <div
        style={{
          flex: "3",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            backgroundColor: "#075e54",
            color: "#fff",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: "0" }}>Chatroom Name</h2>
          <button
            onClick={() => history.push("/login")}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Go to Login
          </button>
        </div>
        <div
          style={{
            flex: "1",
            overflowY: "auto",
            padding: "10px",
          }}
        >
          {messages.map((message) => (
            <div
              key={message._id}
              style={{
                marginBottom: "10px",
                maxWidth: "70%",
                alignSelf:
                  userId === message.user ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor:
                    userId === message.user ? "#dcf8c6" : "#fff",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                <p
                  style={{
                    margin: "0",
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  {message.name}
                </p>
                <p style={{ margin: "0", fontSize: "16px" }}>
                  {message.message}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
          <input
            type="text"
            name="message"
            placeholder="Type a message"
            ref={messageRef}
            style={{
              flex: "1",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #e0e0e0",
              marginRight: "10px",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: "10px 20px",
              backgroundColor: "#075e54",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ChatroomPage);
