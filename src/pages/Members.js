import { useState } from "react"

function Members() {

  const today =
    new Date().toISOString().split("T")[0]

  const [memberName, setMemberName] =
    useState("")

  const [phone, setPhone] =
    useState("")

  const [plan, setPlan] =
    useState("1 Month")

  const [amount, setAmount] =
    useState("")

  const [startDate, setStartDate] =
    useState(today)

  const [endDate, setEndDate] =
    useState("")

  const handleAddMember = () => {

    if (
      !memberName ||
      !phone ||
      !amount ||
      !endDate
    ) {
      alert("Please fill all fields")
      return
    }

    alert("Member Added Successfully")

    setMemberName("")
    setPhone("")
    setPlan("1 Month")
    setAmount("")
    setStartDate(today)
    setEndDate("")
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f0f0f",
        color: "white",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >

      <h1
        style={{
          marginBottom: "25px"
        }}
      >
        Add Member
      </h1>

      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "25px",
          borderRadius: "18px"
        }}
      >

        <input
          type="text"
          placeholder="Member Name"
          value={memberName}
          onChange={(e) =>
            setMemberName(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          style={inputStyle}
        />

        <select
          value={plan}
          onChange={(e) =>
            setPlan(e.target.value)
          }
          style={inputStyle}
        >
          <option>
            1 Month
          </option>

          <option>
            3 Months
          </option>

          <option>
            6 Months
          </option>

          <option>
            1 Year
          </option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          style={inputStyle}
        />

        <label
          style={labelStyle}
        >
          Start Date
        </label>

        <input
          type="date"
          value={startDate}
          onChange={(e) =>
            setStartDate(e.target.value)
          }
          style={inputStyle}
        />

        <label
          style={labelStyle}
        >
          End Date
        </label>

        <input
          type="date"
          value={endDate}
          onChange={(e) =>
            setEndDate(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={handleAddMember}
          style={buttonStyle}
        >
          Save Member
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

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#aaa"
}

const buttonStyle = {
  width: "100%",
  padding: "16px",
  border: "none",
  borderRadius: "12px",
  backgroundColor: "white",
  color: "black",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "10px"
}

export default Members