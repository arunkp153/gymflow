import { useState, useEffect } from "react"
import supabase from "../supabase"

function Members({
  setShowMembers,
  openViewMembers,
  setOpenViewMembers
}) {

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

  const [members, setMembers] =
    useState([])

  const [selectedMember, setSelectedMember] =
    useState(null)

  useEffect(() => {

    if (!startDate) return

    const date = new Date(startDate)

    if (plan === "1 Month") {
      date.setMonth(date.getMonth() + 1)
    }

    else if (plan === "3 Months") {
      date.setMonth(date.getMonth() + 3)
    }

    else if (plan === "6 Months") {
      date.setMonth(date.getMonth() + 6)
    }

    else if (plan === "1 Year") {
      date.setFullYear(date.getFullYear() + 1)
    }

    setEndDate(
      date.toISOString().split("T")[0]
    )

  }, [plan, startDate])

  useEffect(() => {

    if (openViewMembers) {
      fetchMembers()
    }

  }, [openViewMembers])

  const fetchMembers = async () => {

    const gymId =
      JSON.parse(
        localStorage.getItem("gymData")
      ).id

    const { data, error } =
      await supabase
        .from("members")
        .select("*")
        .eq("gym_id", gymId)
        .order("id", {
          ascending: false
        })

    if (!error) {

      setMembers(data || [])
    }
  }

  const handleAddMember = async () => {

    if (
      !memberName ||
      !phone ||
      !amount
    ) {
      alert("Please fill all fields")
      return
    }

    if (
      phone.length !== 10 ||
      isNaN(phone)
    ) {
      alert(
        "Enter valid 10 digit mobile number"
      )
      return
    }

    const gymId =
      JSON.parse(
        localStorage.getItem("gymData")
      ).id

    const {
      data: existingMember
    } = await supabase
      .from("members")
      .select("*")
      .eq("phone", phone)
      .eq("gym_id", gymId)

    if (
      existingMember &&
      existingMember.length > 0
    ) {
      alert(
        "Member already exists with this phone number"
      )
      return
    }

    const { error } =
      await supabase
        .from("members")
        .insert([
          {
            gym_id: gymId,
            member_name: memberName,
            phone: phone,
            plan: plan,
            amount: amount,
            start_date: startDate,
            end_date: endDate,
            payment_status: "Due"
          }
        ])

    if (error) {

      console.log(error)

      alert("Error adding member")
    }

    else {

      alert(
        "Member Added Successfully"
      )

      setMemberName("")
      setPhone("")
      setPlan("1 Month")
      setAmount("")
      setStartDate(today)

      fetchMembers()
    }
  }

  const markAsPaid = async (id) => {

    const { error } =
      await supabase
        .from("members")
        .update({
          payment_status: "Paid"
        })
        .eq("id", id)

    if (!error) {

      fetchMembers()

      if (selectedMember) {

        setSelectedMember({
          ...selectedMember,
          payment_status: "Paid"
        })
      }
    }
  }

  const sendReminder = (member) => {

    const gymName =
      JSON.parse(
        localStorage.getItem("gymData")
      ).gym_name

    const message =
`${gymName} 💪

Hi ${member.member_name},

Your gym membership expires on ${member.end_date}.

Pending Fees: ₹${member.amount}

Please renew your plan soon.
Thank you.`

    const whatsappUrl =
`https://wa.me/91${member.phone}?text=${encodeURIComponent(message)}`

    window.open(
      whatsappUrl,
      "_blank"
    )
  }

  if (selectedMember) {

    return (
      <div style={pageStyle}>

        <div style={topBar}>

          <h1>
            Member History
          </h1>

          <button
            onClick={() =>
              setSelectedMember(null)
            }
            style={cancelButtonStyle}
          >
            Back
          </button>

        </div>

        <div style={historyCard}>

          <h2>
            {selectedMember.member_name}
          </h2>

          <p>
            📞 {selectedMember.phone}
          </p>

          <p>
            📦 {selectedMember.plan}
          </p>

          <p>
            💰 ₹{selectedMember.amount}
          </p>

          <p>
            📅 Start:
            {" "}
            {selectedMember.start_date}
          </p>

          <p>
            ⏳ Expiry:
            {" "}
            {selectedMember.end_date}
          </p>

          <p
            style={{
              color:
                selectedMember.payment_status === "Paid"
                  ? "lightgreen"
                  : "#ff7675",
              fontWeight: "bold",
              marginTop: "15px"
            }}
          >
            {selectedMember.payment_status}
          </p>

          {
            selectedMember.payment_status !== "Paid" && (

              <>
                <button
                  onClick={() =>
                    markAsPaid(selectedMember.id)
                  }
                  style={paidButton}
                >
                  Mark Paid
                </button>

                <button
                  onClick={() =>
                    sendReminder(selectedMember)
                  }
                  style={reminderButton}
                >
                  Send Reminder
                </button>
              </>

            )
          }

        </div>

      </div>
    )
  }

  if (openViewMembers) {

    return (
      <div style={pageStyle}>

        <div style={topBar}>

          <h1>
            Members List
          </h1>

          <button
            onClick={() =>
              setOpenViewMembers(false)
            }
            style={cancelButtonStyle}
          >
            Back
          </button>

        </div>

        {
          members.length === 0 ? (

            <p style={{ color: "#999" }}>
              No members added
            </p>

          ) : (

            members.map((member) => (

              <div
                key={member.id}
                style={memberCard}
                onClick={() =>
                  setSelectedMember(member)
                }
              >

                <div>

                  <h2>
                    {member.member_name}
                  </h2>

                  <p>
                    📞 {member.phone}
                  </p>

                  <p>
                    📦 {member.plan}
                  </p>

                  <p
                    style={{
                      color:
                        member.payment_status === "Paid"
                          ? "lightgreen"
                          : "#ff7675",
                      marginTop: "8px",
                      fontWeight: "bold"
                    }}
                  >
                    {member.payment_status}
                  </p>

                </div>

              </div>

            ))

          )
        }

      </div>
    )
  }

  return (
    <div style={pageStyle}>

      <div style={topBar}>

        <h1>
          Add Member
        </h1>

        <button
          onClick={() =>
            setShowMembers(false)
          }
          style={cancelButtonStyle}
        >
          Cancel
        </button>

      </div>

      <div style={formCard}>

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
          <option>1 Month</option>
          <option>3 Months</option>
          <option>6 Months</option>
          <option>1 Year</option>
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

        <label style={labelStyle}>
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

        <label style={labelStyle}>
          Expiry Date
        </label>

        <input
          type="date"
          value={endDate}
          readOnly
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

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#0f0f0f",
  color: "white",
  padding: "20px",
  fontFamily: "Arial"
}

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px"
}

const formCard = {
  backgroundColor: "#1a1a1a",
  padding: "25px",
  borderRadius: "18px"
}

const historyCard = {
  backgroundColor: "#1a1a1a",
  padding: "25px",
  borderRadius: "18px"
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

const cancelButtonStyle = {
  padding: "10px 16px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "red",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold"
}

const memberCard = {
  backgroundColor: "#1a1a1a",
  padding: "20px",
  borderRadius: "15px",
  marginBottom: "15px",
  cursor: "pointer"
}

const paidButton = {
  width: "100%",
  marginTop: "20px",
  padding: "14px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "white",
  color: "black",
  cursor: "pointer",
  fontWeight: "bold"
}

const reminderButton = {
  width: "100%",
  marginTop: "12px",
  padding: "14px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#25D366",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold"
}

export default Members