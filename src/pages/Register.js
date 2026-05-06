import { useState } from "react"
import supabase from "../supabase"

function Register() {

  const [gymName, setGymName] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {

    if (!gymName || !ownerName || !phone || !email || !password) {
      alert("Please fill all fields")
      return
    }

    if (phone.length !== 10 || isNaN(phone)) {
      alert("Phone number must be 10 digits")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      alert("Enter valid email")
      return
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d).{6,}$/

    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain 1 uppercase letter, 1 number and minimum 6 characters"
      )
      return
    }

    const { data, error } = await supabase
      .from("gyms")
      .insert([
        {
          gym_name: gymName,
          owner_name: ownerName,
          phone: phone,
          email: email,
          password: password
        }
      ])

    if (error) {

      console.log(error)

      if (
        error.message.includes("phone")
      ) {
        alert("Mobile number already exists")
      }

      else if (
        error.message.includes("email")
      ) {
        alert("Email already exists")
      }

      else {
        alert("Error creating account")
      }

    }

    else {

      console.log(data)

      alert("Account Created Successfully")

      setGymName("")
      setOwnerName("")
      setPhone("")
      setEmail("")
      setPassword("")
    }
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
          Register Gym
        </h1>

        <input
          type="text"
          placeholder="Gym Name"
          value={gymName}
          onChange={(e) => setGymName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Owner Name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />

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
          onClick={handleRegister}
          style={buttonStyle}
        >
          Create Account
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

export default Register