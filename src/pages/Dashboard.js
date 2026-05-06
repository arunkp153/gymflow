function Dashboard({
  gymData,
  handleLogout
}) {

  const today =
    new Date().toISOString().split("T")[0]

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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "25px"
        }}
      >

        <div>
          <h1
            style={{
              fontSize: "32px",
              marginBottom: "5px"
            }}
          >
            Welcome Back 👋
          </h1>

          <h2
            style={{
              color: "#999",
              marginBottom: "10px"
            }}
          >
            {gymData.gym_name}
          </h2>

          <input
            type="date"
            defaultValue={today}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#1f1f1f",
              color: "white",
              fontSize: "15px"
            }}
          />
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "12px 18px",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "red",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>

      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "15px",
          marginBottom: "30px"
        }}
      >

        <div style={cardStyle}>
          <h3>Total Members</h3>

          <p style={numberStyle}>
            0
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Due Today</h3>

          <p style={numberStyle}>
            0
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Expired Plans</h3>

          <p style={numberStyle}>
            0
          </p>
        </div>

      </div>

      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "25px"
        }}
      >

        <h2
          style={{
            marginBottom: "10px"
          }}
        >
          Today's Due Members
        </h2>

        <p
          style={{
            color: "#888"
          }}
        >
          No due payments today
        </p>

      </div>

      <button style={buttonStyle}>
        Add Member
      </button>

      <button style={buttonStyle}>
        View Members
      </button>

      <button style={buttonStyle}>
        Send WhatsApp Reminders
      </button>

    </div>
  )
}

const cardStyle = {
  backgroundColor: "#1a1a1a",
  padding: "20px",
  borderRadius: "15px"
}

const numberStyle = {
  fontSize: "30px",
  fontWeight: "bold",
  marginTop: "10px"
}

const buttonStyle = {
  width: "100%",
  padding: "16px",
  marginBottom: "15px",
  borderRadius: "12px",
  border: "none",
  backgroundColor: "white",
  color: "black",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px"
}

export default Dashboard