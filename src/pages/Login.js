import { useState } from "react"
import supabase from "../supabase"
import Dashboard from "./Dashboard"

function Login() {

  const savedGym =
    JSON.parse(localStorage.getItem("gymData"))

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loggedInGym, setLoggedInGym] =
    useState(savedGym)

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please fill all fields")
      return
    }

    const { data, error } = await supabase
      .from("gyms")
      .select("*")
      .eq("email", email)
      .eq("password", password)

    if (error) {
      console.log(error)
      alert("Login failed")
    }

    else if (data.length === 0) {
      alert("Invalid email or password")
    }

    else {

      alert("Login Successful")

      localStorage.setItem(
        "gymData",
        JSON.stringify(data[0])
      )

      setLoggedInGym(data[0])
    }
  }

  if (loggedInGym) {
    return (
      <Dashboard
        gymData={loggedInGym}
        setLoggedInGym={setLoggedInGym}
      />
    )
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f0f0f",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        color: "white",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#1a1a1a",
          padding: "30px",
          borderRadius: "20px"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px"
          }}
        >
          Gym Owner Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={handleLogin}
          style={buttonStyle}
        >
          Login
        </button>
      </div>
    </div>
  )
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#2a2a2a",
  color: "white",
  fontSize: "15px",
  boxSizing: "border-box"
}

const buttonStyle = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "white",
  color: "black",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px"
}

export default Login