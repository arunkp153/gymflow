function Dashboard({ gymData }) {

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
          fontSize: "32px",
          marginBottom: "5px"
        }}
      >
        Welcome Back 👋
      </h1>

      <h2
        style={{
          color: "#999",
          marginBottom: "30px"
        }}
      >
        {gymData.gym_name}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "15px",
          marginBottom: "30px"
        }}
      >

        <div style={cardStyle}>
          <h3>Total Members</h3>
          <p style={numberStyle}>0</p>
        </div>

        <div style={cardStyle}>
          <h3>Due Today</h3>
          <p style={numberStyle}>0</p>
        </div>

        <div style={cardStyle}>
          <h3>Expired</h3>
          <p style={numberStyle}>0</p>
        </div>

      </div>

      <button style={buttonStyle}>
        Add Member
      </button>

      <button style={buttonStyle}>
        View Members
      </button>

      <button style={buttonStyle}>
        Send Reminders
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
  fontSize: "28px",
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