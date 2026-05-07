import { useState, useEffect } from "react"
import supabase from "../supabase"
import Dashboard from "./Dashboard"

function Login() {

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loggedInGym, setLoggedInGym] =
    useState(null)

  useEffect(() => {

    const savedGym =
      localStorage.getItem("gymData")

    if (savedGym) {

      setLoggedInGym(
        JSON.parse(savedGym)
      )
    }

  }, [])

  const handleLogin = async () => {

    if (!email || !password) {

      alert("Please fill all fields")
      return
    }

    const { data, error } =
      await supabase
        .from("gyms")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single()

    if (error) {

      console.log(error)

      alert("Invalid email or password")
    }

    else {

      localStorage.setItem(
        "gymData",
        JSON.stringify(data)
      )

      setLoggedInGym(data)

      alert("Login Successful")
    }
  }

  const handleLogout = () => {

    localStorage.removeItem("gymData")

    setLoggedInGym(null)
  }

  if (loggedInGym) {

    return (
      <Dashboard
        gymData={loggedInGym}
        handleLogout={handleLogout}
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
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
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