import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import makeToast from "../Toaster";

const DashboardPage = (props) => {
  const [chatrooms, setChatrooms] = React.useState([]);
  const [chatroomName, setChatroomName] = React.useState("");

  const getChatrooms = () => {
    axios
      .get("http://localhost:8000/chatroom", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };

  const addNewChatroom = () => {
    axios
      .post(
        "http://localhost:8000/chatroom",
        { name: chatroomName },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("CC_Token"),
          },
        }
      )
      .then((res) => {
        setChatroomName("");
        getChatrooms();
      })
      .catch((err) => {
        makeToast("error", err.response);
      });
  };

  React.useEffect(() => {
    getChatrooms();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="dashboard" style={{ backgroundColor: "#f0f2f5", minHeight: "100vh", padding: "20px" }}>
      <div className="card" style={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <div className="cardHeader" style={{ backgroundColor: "#075e54", color: "#fff", padding: "10px 20px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", fontSize: "20px" }}>Chatrooms</div>
        
        <div className="cardBody" style={{ padding: "20px" }}>
          <div className="inputGroup" style={{ marginBottom: "20px" }}>
            <label htmlFor="chatroomName" style={{ display: "block", marginBottom: "5px", color: "#333", fontSize: "16px" }}>Chatroom Name</label>
            <input
              type="text"
              name="chatroomName"
              id="chatroomName"
              value={chatroomName}
              placeholder="create your chat room"
              onChange={(e) => setChatroomName(e.target.value)}
              style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc" }}
            />
          </div>
          <button onClick={addNewChatroom} style={{ backgroundColor: "#075e54", color: "#fff", padding: "10px 20px", borderRadius: "8px", border: "none", fontSize: "16px", cursor: "pointer" }}>Create Chatroom</button>
        </div>
        <div className="chatrooms" style={{ padding: "20px" }}>
          {chatrooms.map((chatroom) => (
            <div key={chatroom._id} className="chatroom" style={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
              <div style={{ color: "#333", fontSize: "16px" }}>{chatroom.name}</div>
              <Link to={"/chatroom/" + chatroom._id} style={{ textDecoration: "none", color: "#075e54", padding: "8px 16px", backgroundColor: "#dcf8c6", borderRadius: "8px", fontWeight: "bold" }}>Join</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
