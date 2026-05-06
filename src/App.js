import { useState } from "react"
import Register from "./pages/Register"
import Login from "./pages/Login"

function App() {

  const [currentPage, setCurrentPage] =
    useState("home")

  if (currentPage === "register") {
    return (
      <Register
        setCurrentPage={setCurrentPage}
      />
    )
  }

  if (currentPage === "login") {
    return (
      <Login />
    )
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f0f0f",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "500px",
          width: "100%"
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            marginBottom: "10px",
            fontWeight: "bold"
          }}
        >
          GymFlow
        </h1>

        <p
          style={{
            color: "#999",
            fontSize: "18px",
            lineHeight: "30px"
          }}
        >
          Manage your gym members, fees and reminders effortlessly.
        </p>

        <button
          onClick={() =>
            setCurrentPage("register")
          }
          style={{
            marginTop: "30px",
            padding: "14px 30px",
            border: "none",
            borderRadius: "12px",
            backgroundColor: "white",
            color: "black",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
            width: "100%"
          }}
        >
          Get Started
        </button>

        <button
          onClick={() =>
            setCurrentPage("login")
          }
          style={{
            marginTop: "15px",
            padding: "14px 30px",
            border: "1px solid #333",
            borderRadius: "12px",
            backgroundColor: "transparent",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
            width: "100%"
          }}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default App