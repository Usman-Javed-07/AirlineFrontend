
document.getElementById("checkInForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const bookingId = document.getElementById("bookingId").value.trim();

  if (!bookingId) {
    alert("Please enter a Booking ID.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/bookings/check-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ bookingId })
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
    } else {
      alert("Check-in failed: " + result.error);
    }
  } catch (error) {
    console.error("Error during check-in:", error);
    alert("Something went wrong. Please try again later.");
  }
});
