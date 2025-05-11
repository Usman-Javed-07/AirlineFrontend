document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cancelAmendForm");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const bookingId = document.getElementById("bookingId").value;
      const action = document.getElementById("action").value;

      if (!bookingId) {
        Toastify({
          text: "Please enter a Booking ID.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#f44336", // red for error
          close: true,
        }).showToast();

        return;
      }

      if (action === "Cancel Booking") {
        const response = await fetch(`${BASE_URL}/bookings/cancel`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId }),
        });

        const result = await response.json();
        Toastify({
          text: result.message || "Cancellation processed.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#4CAF50",
          close: true,
        }).showToast();
      } else if (action === "Amend Booking") {
        // Optional: navigate to amend form page or open amend modal
        window.location.href = `amendForm.html?bookingId=${bookingId}`;
      }
    });
  }
});
