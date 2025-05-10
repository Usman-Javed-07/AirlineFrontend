// document.addEventListener("DOMContentLoaded", async () => {
//   const params = new URLSearchParams(window.location.search);
//   const bookingId = params.get("bookingId");

//   if (!bookingId) {
//     alert("No booking ID found.");
//     return;
//   }

//   document.getElementById("bookingId").value = bookingId;

//   // Fetch existing booking
//   try {
//     const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`);
//     const data = await response.json();

//     // Fill form with existing booking details
//     document.getElementById("flight_date").value = data.flight_date.split("T")[0];
//     document.getElementById("departure_time").value = data.departure_time;
//     document.getElementById("arrival_time").value = data.arrival_time;
//     document.getElementById("flight_route").value = data.flight_route;
//     document.getElementById("flight_class").value = data.flight_class;
//     document.getElementById("vessel").value = data.vessel;
//     document.getElementById("newTicketPrice").value = data.total_amount;
//   } catch (err) {
//     console.error("Error fetching booking:", err);
//     alert("Failed to load booking.");
//   }

//   // Submit updated details
//   document.getElementById("amendForm").addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const newFlightDetails = {
//       flight_date: document.getElementById("flight_date").value,
//       departure_time: document.getElementById("departure_time").value,
//       arrival_time: document.getElementById("arrival_time").value,
//       flight_route: document.getElementById("flight_route").value,
//       flight_class: document.getElementById("flight_class").value,
//       vessel: document.getElementById("vessel").value,
//     };

//     const bookingId = document.getElementById("bookingId").value;
//     const newTicketPrice = parseFloat(document.getElementById("newTicketPrice").value);

//     try {
//       const response = await fetch("http://localhost:5000/api/amend", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ bookingId, newFlightDetails, newTicketPrice }),
//       });

//       const result = await response.json();
//       alert(result.message || "Booking amended.");
//     } catch (err) {
//       console.error("Amendment failed:", err);
//       alert("Failed to amend booking.");
//     }
//   });
// });
