import { useState, useEffect } from "react"
import supabase from "../supabase"
import Members from "./Members"

function Dashboard({
  gymData,
  handleLogout
}) {

  const today =
    new Date().toISOString().split("T")[0]

  const [selectedDate, setSelectedDate] =
    useState(today)

  const [membersData, setMembersData] =
    useState([])

  const [filteredMembers, setFilteredMembers] =
    useState([])

  const [currentFilter, setCurrentFilter] =
    useState("")

  const [showMembers, setShowMembers] =
    useState(false)

  const [openViewMembers, setOpenViewMembers] =
    useState(false)

  const [totalMembers, setTotalMembers] =
    useState(0)

  const [dueCount, setDueCount] =
    useState(0)

  const [expiredCount, setExpiredCount] =
    useState(0)

  const [expiringSoonCount, setExpiringSoonCount] =
    useState(0)

  const fetchMembers = async () => {

    const { data, error } =
      await supabase
        .from("members")
        .select("*")

    if (error) {

      console.log(error)
      return
    }

    setMembersData(data)

    setTotalMembers(data.length)

    const dueMembers =
      data.filter(
        (member) =>
          member.end_date === selectedDate
      )

    setDueCount(
      dueMembers.length
    )

    const expiredMembers =
      data.filter(
        (member) =>
          member.end_date < selectedDate
      )

    setExpiredCount(
      expiredMembers.length
    )

    const targetDate =
      new Date(selectedDate)

    targetDate.setDate(
      targetDate.getDate() + 2
    )

    const targetFormatted =
      targetDate
        .toISOString()
        .split("T")[0]

    const expiringSoon =
      data.filter(
        (member) =>
          member.end_date ===
          targetFormatted
      )

    setExpiringSoonCount(
      expiringSoon.length
    )
  }

  useEffect(() => {

    const loadData = async () => {

      await fetchMembers()
    }

    loadData()

  }, [])

  useEffect(() => {

    let filtered = []

    if (
      currentFilter === "due"
    ) {

      filtered =
        membersData.filter(
          (member) =>
            member.end_date ===
            selectedDate
        )
    }

    else if (
      currentFilter === "expired"
    ) {

      filtered =
        membersData.filter(
          (member) =>
            member.end_date <
            selectedDate
        )
    }

    else if (
      currentFilter === "expiring"
    ) {

      const targetDate =
        new Date(selectedDate)

      targetDate.setDate(
        targetDate.getDate() + 2
      )

      const targetFormatted =
        targetDate
          .toISOString()
          .split("T")[0]

      filtered =
        membersData.filter(
          (member) =>
            member.end_date ===
            targetFormatted
        )
    }

    else if (
      currentFilter === "all"
    ) {

      filtered = membersData
    }

    setFilteredMembers(filtered)

  }, [
    selectedDate,
    membersData,
    currentFilter
  ])

  const sendReminder = (
    member
  ) => {

    const message =
`B Fitness House 💪

Hi ${member.member_name},

Your gym membership expires on ${member.end_date}.

Pending Fees: ₹${member.amount}

Please renew your plan soon.
Thank you.`

    const whatsappURL =
`https://wa.me/91${member.phone}?text=${encodeURIComponent(message)}`

    window.open(
      whatsappURL,
      "_blank"
    )
  }

  if (
    showMembers ||
    openViewMembers
  ) {

    return (
      <Members
        setShowMembers={setShowMembers}
        openViewMembers={openViewMembers}
        setOpenViewMembers={setOpenViewMembers}
      />
    )
  }

  return (
    <div
      style={pageStyle}
    >

      <div
        style={headerStyle}
      >

        <div>

          <h1
            style={headingStyle}
          >
            Welcome Back 👋
          </h1>

          <p
            style={gymNameStyle}
          >
            {gymData.gym_name}
          </p>

        </div>

        <button
          onClick={handleLogout}
          style={logoutButton}
        >
          Logout
        </button>

      </div>

      <div
        style={dateContainer}
      >

        <label
          style={dateLabel}
        >
          Select Date
        </label>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(
              e.target.value
            )
          }
          style={dateInput}
        />

      </div>

      <div
        style={gridStyle}
      >

        <div
          style={cardStyle}
          onClick={() =>
            setCurrentFilter("all")
          }
        >
          <p style={cardTitle}>
            Total Members
          </p>

          <h1 style={cardNumber}>
            {totalMembers}
          </h1>
        </div>

        <div
          style={cardStyle}
          onClick={() =>
            setCurrentFilter("due")
          }
        >
          <p style={cardTitle}>
            Due Payments
          </p>

          <h1 style={cardNumber}>
            {dueCount}
          </h1>
        </div>

        <div
          style={cardStyle}
          onClick={() =>
            setCurrentFilter("expired")
          }
        >
          <p style={cardTitle}>
            Expired Plans
          </p>

          <h1 style={cardNumber}>
            {expiredCount}
          </h1>
        </div>

        <div
          style={cardStyle}
          onClick={() =>
            setCurrentFilter("expiring")
          }
        >
          <p style={cardTitle}>
            2 Days Left
          </p>

          <h1 style={cardNumber}>
            {expiringSoonCount}
          </h1>
        </div>

      </div>

      {
        currentFilter !== "" && (

          <div
            style={membersSection}
          >

            <h2
              style={{
                marginBottom: "20px"
              }}
            >
              Members
            </h2>

            {
              filteredMembers.length === 0 && (

                <p
                  style={{
                    color: "#888"
                  }}
                >
                  No members found
                </p>

              )
            }

            {
              filteredMembers.map(
                (member) => (

                  <div
                    key={member.id}
                    style={memberCard}
                  >

                    <div>

                      <h3>
                        {member.member_name}
                      </h3>

                      <p>
                        📞 {member.phone}
                      </p>

                      <p>
                        📦 {member.plan}
                      </p>

                      <p>
                        💰 ₹{member.amount}
                      </p>

                      <p>
                        ⏳ {member.end_date}
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        sendReminder(member)
                      }
                      style={reminderButton}
                    >
                      Send Reminder
                    </button>

                  </div>

                )
              )
            }

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
        style={secondaryButton}
      >
        View Members
      </button>

    </div>
  )
}

const pageStyle = {
  minHeight: "100vh",
  background:
    "linear-gradient(to bottom, #050505, #111)",
  color: "white",
  padding: "25px",
  fontFamily: "Arial"
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
  flexWrap: "wrap",
  gap: "20px"
}

const headingStyle = {
  fontSize: "42px",
  marginBottom: "8px"
}

const gymNameStyle = {
  color: "#aaa",
  fontSize: "18px"
}

const logoutButton = {
  background:
    "linear-gradient(to right, #ff3b3b, #ff0000)",
  border: "none",
  color: "white",
  padding: "14px 22px",
  borderRadius: "14px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px"
}

const dateContainer = {
  marginBottom: "30px"
}

const dateLabel = {
  display: "block",
  marginBottom: "10px",
  color: "#bbb"
}

const dateInput = {
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid #333",
  backgroundColor: "#1b1b1b",
  color: "white",
  fontSize: "16px"
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "35px"
}

const cardStyle = {
  background:
    "linear-gradient(to bottom right, #1b1b1b, #121212)",
  padding: "28px",
  borderRadius: "22px",
  cursor: "pointer",
  border: "1px solid #242424",
  boxShadow:
    "0 0 20px rgba(0,0,0,0.4)"
}

const cardTitle = {
  color: "#aaa",
  marginBottom: "12px",
  fontSize: "16px"
}

const cardNumber = {
  fontSize: "42px"
}

const membersSection = {
  backgroundColor: "#151515",
  padding: "25px",
  borderRadius: "24px",
  marginBottom: "30px"
}

const memberCard = {
  backgroundColor: "#202020",
  padding: "22px",
  borderRadius: "18px",
  marginBottom: "18px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap"
}

const reminderButton = {
  padding: "14px 20px",
  border: "none",
  borderRadius: "14px",
  background:
    "linear-gradient(to right, #22c55e, #16a34a)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "15px"
}

const mainButton = {
  width: "100%",
  padding: "18px",
  border: "none",
  borderRadius: "18px",
  background:
    "linear-gradient(to right, #ffffff, #dcdcdc)",
  color: "black",
  fontWeight: "bold",
  fontSize: "17px",
  cursor: "pointer",
  marginBottom: "18px"
}

const secondaryButton = {
  width: "100%",
  padding: "18px",
  borderRadius: "18px",
  backgroundColor: "transparent",
  border: "1px solid #333",
  color: "white",
  fontWeight: "bold",
  fontSize: "17px",
  cursor: "pointer"
}

export default Dashboard