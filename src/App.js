import { useState } from "react"
import Register from "./pages/Register"

function App() {

  const [showRegister, setShowRegister] = useState(false)

  if (showRegister) {
    return <Register />
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
          maxWidth: "500px"
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
          onClick={() => setShowRegister(true)}
          style={{
            marginTop: "30px",
            padding: "14px 30px",
            border: "none",
            borderRadius: "12px",
            backgroundColor: "white",
            color: "black",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  )
}

export default App