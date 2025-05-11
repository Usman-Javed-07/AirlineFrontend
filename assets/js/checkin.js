
document.getElementById("checkInForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const bookingId = document.getElementById("bookingId").value.trim();

  if (!bookingId) {
    Toastify({
  text: "Please enter a Booking ID.",
  duration: 3000,
  gravity: "top",
  position: "right",
  backgroundColor: "#f44336",
  close: true,
}).showToast();

    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/bookings/check-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ bookingId })
    });

    const result = await response.json();

    if (response.ok) {
      Toastify({
  text: result.message,
  duration: 3000,
  gravity: "top",
  position: "right",
  backgroundColor: "#4CAF50", 
  close: true,
}).showToast();

    } else {
      alert("Check-in failed: " + result.error);
    }
  } catch (error) {
    console.error("Error during check-in:", error);
    Toastify({
  text: "Something went wrong. Please try again later.",
  duration: 3000,
  gravity: "top",
  position: "right",
  backgroundColor: "#f44336", // red for error
  close: true,
}).showToast();

  }
});
