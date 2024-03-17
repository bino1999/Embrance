import React from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import makeToast from "../Toaster";
import { useUserProfile } from "./UserProfileContext";

const LoginPage = (props) => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const { setUserID } = useUserProfile();

  const loginUser = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("http://localhost:8000/user/login", {
        email,
        password,
      })
      .then((response) => {
        makeToast("success", response.data.message);
        setUserID(response.data.userId);
        localStorage.setItem("CC_Token", response.data.token);
        props.history.push("/home");
        props.setupSocket();
      })
      .catch((err) => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
          makeToast("error", err.response.data.message);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        width:"100%"
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          width:"100%"
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Login
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
          }}
        >
          <label htmlFor="email" style={{ marginBottom: "5px" }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abc@example.com"
            ref={emailRef}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
          }}
        >
          <label htmlFor="password" style={{ marginBottom: "5px" }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            ref={passwordRef}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
        </div>
        <button
          onClick={loginUser}
          style={{
            backgroundColor: "#128C7E",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <br />
        <Link to="/register">
          <button
            style={{
              backgroundColor: "#075E54",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "20px",
              border:'10px',
            }}
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(LoginPage);
