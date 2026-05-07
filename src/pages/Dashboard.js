import { useState, useEffect } from "react"
import supabase from "../supabase"
import Members from "./Members"

function Dashboard({
  gymData,
  handleLogout
}) {

  const today =
    new Date().toISOString().split("T")[0]

  const [showMembers, setShowMembers] =
    useState(false)

  const [openViewMembers, setOpenViewMembers] =
    useState(false)

  const [members, setMembers] =
    useState([])

  const [selectedDate, setSelectedDate] =
    useState(today)

  const [dueMembers, setDueMembers] =
    useState([])

  const [expiredMembers, setExpiredMembers] =
    useState([])

  const [twoDaysLeftMembers, setTwoDaysLeftMembers] =
    useState([])

  const [openCard, setOpenCard] =
    useState("")

  useEffect(() => {

    const fetchMembers = async () => {

      const { data, error } =
        await supabase
          .from("members")
          .select("*")
          .eq("gym_id", gymData.id)

      if (!error) {

        setMembers(data || [])
      }
    }

    fetchMembers()

  }, [gymData.id])

  useEffect(() => {

    const due = []
    const expired = []
    const twoDays = []

    const selected =
      new Date(selectedDate)

    const nextTwo =
      new Date(selectedDate)

    nextTwo.setDate(
      nextTwo.getDate() + 2
    )

    const selectedFormatted =
      selected.toISOString().split("T")[0]

    const nextTwoFormatted =
      nextTwo.toISOString().split("T")[0]

    members.forEach((member) => {

      const expiry =
        new Date(member.end_date)

      const expiryDate =
        expiry.toISOString().split("T")[0]

      if (
        expiryDate === selectedFormatted
      ) {
        due.push(member)
      }

      if (
        expiryDate < selectedFormatted
      ) {
        expired.push(member)
      }

      if (
        expiryDate === nextTwoFormatted
      ) {
        twoDays.push(member)
      }

    })

    setDueMembers(due)
    setExpiredMembers(expired)
    setTwoDaysLeftMembers(twoDays)

  }, [members, selectedDate])

  const sendReminder = (member) => {

    const message =
`${gymData.gym_name} 💪

Hi ${member.member_name},

Your gym membership expires on ${member.end_date}.

Pending Fees: ₹${member.amount}

Please renew your plan soon.
Thank you.`

    window.open(
      `https://wa.me/91${member.phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    )
  }

  if (showMembers || openViewMembers) {

    return (
      <Members
        setShowMembers={setShowMembers}
        openViewMembers={openViewMembers}
        setOpenViewMembers={setOpenViewMembers}
      />
    )
  }

  const renderMembers = (list) => {

    if (list.length === 0) {

      return (
        <p
          style={{
            color: "#888",
            marginTop: "15px"
          }}
        >
          No members found
        </p>
      )
    }

    return list.map((member) => (

      <div
        key={member.id}
        style={memberCard}
      >

        <div>

          <h3
            style={{
              marginBottom: "8px",
              fontSize: "18px"
            }}
          >
            {member.member_name}
          </h3>

          <p style={smallText}>
            📞 {member.phone}
          </p>

          <p style={smallText}>
            📅 {member.end_date}
          </p>

          <p style={smallText}>
            ₹{member.amount}
          </p>

        </div>

        <button
          onClick={() =>
            sendReminder(member)
          }
          style={reminderButton}
        >
          Reminder
        </button>

      </div>

    ))
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b0b0b",
        color: "white",
        padding: "18px",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
          gap: "10px"
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "28px",
              marginBottom: "6px"
            }}
          >
            {gymData.gym_name}
          </h1>

          <p
            style={{
              color: "#888",
              fontSize: "14px"
            }}
          >
            Gym Dashboard
          </p>

        </div>

        <button
          onClick={handleLogout}
          style={logoutButton}
        >
          Logout
        </button>

      </div>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) =>
          setSelectedDate(e.target.value)
        }
        style={dateInput}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "14px",
          marginTop: "25px",
          marginBottom: "25px"
        }}
      >

        <div
          style={cardStyle}
          onClick={() => {
            setOpenCard("total")
            setOpenViewMembers(true)
          }}
        >
          <p style={cardTitle}>
            Total Members
          </p>

          <h2 style={cardNumber}>
            {members.length}
          </h2>
        </div>

        <div
          style={cardStyle}
          onClick={() =>
            setOpenCard("due")
          }
        >
          <p style={cardTitle}>
            Due Payments
          </p>

          <h2 style={cardNumber}>
            {dueMembers.length}
          </h2>
        </div>

        <div
          style={cardStyle}
          onClick={() =>
            setOpenCard("expired")
          }
        >
          <p style={cardTitle}>
            Expired
          </p>

          <h2 style={cardNumber}>
            {expiredMembers.length}
          </h2>
        </div>

        <div
          style={cardStyle}
          onClick={() =>
            setOpenCard("twodays")
          }
        >
          <p style={cardTitle}>
            2 Days Left
          </p>

          <h2 style={cardNumber}>
            {twoDaysLeftMembers.length}
          </h2>
        </div>

      </div>

      {
        openCard === "due" && (

          <div style={sectionStyle}>

            <h2 style={sectionTitle}>
              Due Payments
            </h2>

            {renderMembers(dueMembers)}

          </div>

        )
      }

      {
        openCard === "expired" && (

          <div style={sectionStyle}>

            <h2 style={sectionTitle}>
              Expired Members
            </h2>

            {renderMembers(expiredMembers)}

          </div>

        )
      }

      {
        openCard === "twodays" && (

          <div style={sectionStyle}>

            <h2 style={sectionTitle}>
              Expiring In 2 Days
            </h2>

            {renderMembers(twoDaysLeftMembers)}

          </div>

        )
      }

      <button
        onClick={() =>
          setShowMembers(true)
        }
        style={mainButton}
      >
        Add Member
      </button>

      <button
        onClick={() =>
          setOpenViewMembers(true)
        }
        style={mainButton}
      >
        View Members
      </button>

    </div>
  )
}

const dateInput = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid #222",
  backgroundColor: "#161616",
  color: "white",
  fontSize: "15px",
  boxSizing: "border-box"
}

const logoutButton = {
  padding: "12px 18px",
  border: "none",
  borderRadius: "12px",
  backgroundColor: "#ff2d55",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px"
}

const cardStyle = {
  backgroundColor: "#151515",
  padding: "18px",
  borderRadius: "18px",
  border: "1px solid #222",
  cursor: "pointer"
}

const cardTitle = {
  color: "#888",
  fontSize: "14px"
}

const cardNumber = {
  fontSize: "32px",
  marginTop: "10px"
}

const sectionStyle = {
  backgroundColor: "#151515",
  padding: "18px",
  borderRadius: "18px",
  marginBottom: "20px"
}

const sectionTitle = {
  marginBottom: "18px",
  fontSize: "20px"
}

const memberCard = {
  backgroundColor: "#202020",
  padding: "16px",
  borderRadius: "16px",
  marginBottom: "14px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px"
}

const smallText = {
  color: "#bbb",
  fontSize: "14px",
  marginBottom: "5px"
}

const reminderButton = {
  padding: "12px 14px",
  border: "none",
  borderRadius: "12px",
  backgroundColor: "#25D366",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "13px"
}

const mainButton = {
  width: "100%",
  padding: "16px",
  border: "none",
  borderRadius: "16px",
  backgroundColor: "white",
  color: "black",
  fontWeight: "bold",
  fontSize: "15px",
  marginBottom: "14px",
  cursor: "pointer"
}

export default Dashboard