document.addEventListener("DOMContentLoaded", async () => {
  const routeSelect = document.getElementById("flightRoute");
  const classSelect = document.getElementById("flightClass");

  const flightDateInput = document.getElementById("flightDate");
  const departureInput = document.getElementById("departureTime");
  const arrivalInput = document.getElementById("arrivalTime");
  const vesselInput = document.getElementById("vessel");

  const flightDetailsDiv = document.querySelector(".flight-details");
  flightDetailsDiv.style.display = "none"; // Hide inputs initially

  let flightData = [];

  try {
    const res = await fetch("http://localhost:5000/api/flights");
    flightData = await res.json();

    // Populate route dropdown
    flightData.forEach((flight, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = flight.route;
      routeSelect.appendChild(option);
    });

    routeSelect.addEventListener("change", () => {
      const selectedIndex = routeSelect.value;
      const flight = flightData[selectedIndex];

      if (flight) {
        classSelect.innerHTML = `
          <option value="" disabled selected>Select class</option>
          <option value="economy">Economy (£${flight.economy_price})</option>
          <option value="business">Business (£${flight.business_price})</option>
          <option value="first">First (£${flight.first_price})</option>
        `;
        classSelect.disabled = false;

        // Show flight detail inputs
        flightDetailsDiv.style.display = "block";

        // Fill input fields with flight data
        flightDateInput.value = flight.date;
        departureInput.value = flight.departure_time;
        arrivalInput.value = flight.arrival_time;
        vesselInput.value = flight.vessel;
      } else {
        classSelect.disabled = true;
        classSelect.innerHTML = `<option value="">No class available</option>`;

        flightDetailsDiv.style.display = "none";
        flightDateInput.value = '';
        departureInput.value = '';
        arrivalInput.value = '';
        vesselInput.value = '';
      }
    });

  } catch (err) {
    console.error("Failed to load flights:", err);
  }
});
