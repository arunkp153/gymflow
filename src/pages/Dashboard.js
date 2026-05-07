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

  useEffect(() => {

    const fetchMembers = async () => {

      const { data, error } =
        await supabase
          .from("members")
          .select("*")
          .eq("gym_id", gymData.id)

      if (error) {

        console.log(error)
      }

      else {

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

    const nextTwoDays =
      new Date(selectedDate)

    nextTwoDays.setDate(
      nextTwoDays.getDate() + 2
    )

    members.forEach((member) => {

      const expiry =
        new Date(member.end_date)

      const expiryDate =
        expiry.toISOString().split("T")[0]

      const selectedFormatted =
        selected.toISOString().split("T")[0]

      const nextTwoFormatted =
        nextTwoDays.toISOString().split("T")[0]

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

    const gymName =
      gymData?.gym_name || "Gym"

    const message =
`${gymName} 💪

Hi ${member.member_name},

Your gym membership expires on ${member.end_date}.

Pending Fees: ₹${member.amount}

Please renew your plan soon.
Thank you.`

    const phone =
      `91${member.phone}`

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
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

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, #0f0f0f, #000)",
        color: "white",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "30px"
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "42px",
              marginBottom: "8px"
            }}
          >
            Welcome Back 👋
          </h1>

          <h2
            style={{
              color: "#aaa",
              fontWeight: "normal",
              marginBottom: "15px"
            }}
          >
            {gymData.gym_name}
          </h2>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(
                e.target.value
              )
            }
            style={{
              padding: "14px",
              borderRadius: "14px",
              border: "1px solid #333",
              backgroundColor: "#181818",
              color: "white",
              fontSize: "15px",
              outline: "none"
            }}
          />

        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "14px 22px",
            border: "none",
            borderRadius: "14px",
            background:
              "linear-gradient(to right, #ff3b3b, #ff0000)",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px"
          }}
        >
          Logout
        </button>

      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "35px"
        }}
      >

        <div
          onClick={() =>
            setOpenViewMembers(true)
          }
          style={cardStyle}
        >
          <h3>Total Members</h3>

          <p style={numberStyle}>
            {members.length}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Due Payments</h3>

          <p style={numberStyle}>
            {dueMembers.length}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Expired Plans</h3>

          <p style={numberStyle}>
            {expiredMembers.length}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>2 Days Left</h3>

          <p style={numberStyle}>
            {twoDaysLeftMembers.length}
          </p>
        </div>

      </div>

      <div
        style={{
          backgroundColor: "#151515",
          padding: "25px",
          borderRadius: "24px",
          marginBottom: "30px",
          border: "1px solid #222"
        }}
      >

        <h2
          style={{
            marginBottom: "25px",
            fontSize: "30px"
          }}
        >
          Expiring In 2 Days
        </h2>

        {
          twoDaysLeftMembers.length === 0 && (

            <p
              style={{
                color: "#888"
              }}
            >
              No members expiring in 2 days
            </p>

          )
        }

        {
          twoDaysLeftMembers.map((member) => (

            <div
              key={member.id}
              style={{
                backgroundColor: "#202020",
                padding: "22px",
                borderRadius: "22px",
                marginBottom: "18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "20px"
              }}
            >

              <div>

                <h2
                  style={{
                    marginBottom: "12px"
                  }}
                >
                  {member.member_name}
                </h2>

                <p>📞 {member.phone}</p>

                <p>📦 {member.plan}</p>

                <p>💰 ₹{member.amount}</p>

                <p>⏳ {member.end_date}</p>

                <p
                  style={{
                    color:
                      member.payment_status === "Paid"
                        ? "#4dff91"
                        : "#ff7675",
                    fontWeight: "bold",
                    marginTop: "10px"
                  }}
                >
                  {member.payment_status}
                </p>

              </div>

              <button
                onClick={() =>
                  sendReminder(member)
                }
                style={{
                  padding: "16px 24px",
                  border: "none",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(to right, #22c55e, #16a34a)",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "15px"
                }}
              >
                Send Reminder
              </button>

            </div>

          ))
        }

      </div>

      <button
        onClick={() =>
          setShowMembers(true)
        }
        style={buttonStyle}
      >
        Add Member
      </button>

      <button
        onClick={() =>
          setOpenViewMembers(true)
        }
        style={buttonStyle}
      >
        View Members
      </button>

    </div>
  )
}

const cardStyle = {
  background:
    "linear-gradient(to bottom right, #161616, #101010)",
  padding: "25px",
  borderRadius: "24px",
  border: "1px solid #222",
  cursor: "pointer"
}

const numberStyle = {
  fontSize: "48px",
  fontWeight: "bold",
  marginTop: "20px"
}

const buttonStyle = {
  width: "100%",
  padding: "18px",
  marginBottom: "18px",
  borderRadius: "18px",
  border: "none",
  background:
    "linear-gradient(to right, white, #dcdcdc)",
  color: "black",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "17px"
}

export default Dashboard