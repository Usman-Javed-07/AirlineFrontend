let flightData = [];
let selectedPickupCities = [];
let selectedDropoffCities = [];
let basePrice = 0;
let extraCost = 0;


document.addEventListener("DOMContentLoaded", async () => {
  const routeSelect = document.getElementById("flightRoute");
  const classSelect = document.getElementById("flightClass");

  const flightDateInput = document.getElementById("flightDate");
  const departureInput = document.getElementById("departureTime");
  const arrivalInput = document.getElementById("arrivalTime");
  const vesselInput = document.getElementById("vessel");

  const flightDetailsDiv = document.querySelector(".flight-details");
  flightDetailsDiv.style.display = "none";

  try {
    const res = await fetch("http://localhost:5000/api/flights");
    flightData = await res.json();

    flightData.forEach((flight, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = flight.route;
      routeSelect.appendChild(option);
    });

    routeSelect.addEventListener("change", () => {
      
classSelect.addEventListener("change", () => {
  const selectedIndex = routeSelect.value;
  const flight = flightData[selectedIndex];
  const classValue = classSelect.value;

  if (classValue === "economy") basePrice = flight.economy_price;
  else if (classValue === "business") basePrice = flight.business_price;
  else if (classValue === "first") basePrice = flight.first_price;
  else basePrice = 0;

  updateTotalAmount();
});


      const selectedIndex = routeSelect.value;
      const flight = flightData[selectedIndex];

      if (flight) {
        // Populate flight class
        classSelect.innerHTML = `
          <option value="" disabled selected>Select class</option>
          <option value="economy">Economy (£${flight.economy_price})</option>
          <option value="business">Business (£${flight.business_price})</option>
          <option value="first">First (£${flight.first_price})</option>
        `;
        classSelect.disabled = false;

        // Show flight details
        flightDetailsDiv.style.display = "block";
        flightDateInput.value = flight.date;
        departureInput.value = flight.departure_time;
        arrivalInput.value = flight.arrival_time;
        vesselInput.value = flight.vessel;

        // ✅ Use the corrected logic with parsing
        selectedPickupCities = parseCityField(flight.pickup_cities);
        selectedDropoffCities = parseCityField(flight.dropoff_cities);

        // ✅ Console logs for debug
        console.log("Parsed pickup cities:", selectedPickupCities);
        console.log("Parsed dropoff cities:", selectedDropoffCities);

      } else {
        classSelect.disabled = true;
        classSelect.innerHTML = `<option value="">No class available</option>`;
        flightDetailsDiv.style.display = "none";

        flightDateInput.value = '';
        departureInput.value = '';
        arrivalInput.value = '';
        vesselInput.value = '';
        selectedPickupCities = [];
        selectedDropoffCities = [];
      }
    });

  } catch (err) {
    console.error("Failed to load flights:", err);
  }
});

function parseCityField(field) {
  try {
    if (typeof field === 'string' && field.startsWith('[')) {
      return JSON.parse(field).map(city => city.trim().toLowerCase());
    }
    if (typeof field === 'string') {
      return field.split(',').map(city => city.trim().toLowerCase());
    }
    if (Array.isArray(field)) {
      return field.map(city => city.trim().toLowerCase());
    }
  } catch (err) {
    console.error("Failed to parse city field:", field, err);
  }
  return [];
}

document.getElementById('pickupEnabled').addEventListener('change', function () {
  document.getElementById('pickupContainer').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('dropoffEnabled').addEventListener('change', function () {
  document.getElementById('dropoffContainer').style.display = this.checked ? 'block' : 'none';
});

async function handleBookingFormSubmit(event) {
  event.preventDefault();

  const bookingId = document.getElementById("bookingId").value;

  const formData = {
    flightRoute: document.getElementById("flightRoute").value,
    flightClass: document.getElementById("flightClass").value,
    flightDate: document.getElementById("flightDate").value,
    departureTime: document.getElementById("departureTime").value,
    arrivalTime: document.getElementById("arrivalTime").value,
    vessel: document.getElementById("vessel").value,
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    dob: document.getElementById("dob").value,
    passportNumber: document.getElementById("passportNumber").value,
    nationality: document.getElementById("nationality").value,
    passportIssueDate: document.getElementById("passportIssueDate").value,
    passportExpiryDate: document.getElementById("passportExpiryDate").value,
    visaNumber: document.getElementById("visaNumber").value,
    visaExpiryDate: document.getElementById("visaExpiryDate").value,
    mealPreference: document.getElementById("mealPreference").value,
    cardName: document.getElementById("cardName").value,
    cardNumber: document.getElementById("cardNumber").value,
    expiryDate: document.getElementById("expiryDate").value,
    cvv: document.getElementById("cvv").value,
    pickupEnabled: document.getElementById("pickupEnabled").checked,
    pickup: document.getElementById("pickup").value,
    dropoffEnabled: document.getElementById("dropoffEnabled").checked,
    dropoff: document.getElementById("dropoff").value,
    // Include extras and total amount if applicable
  };

  const method = bookingId ? "PUT" : "POST";
  const url = bookingId
    ? `/api/bookings/${bookingId}`
    : "/api/bookings";

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();
    alert(bookingId ? "Booking updated!" : "Booking created!");
    window.location.href = "/booking-summary.html"; // redirect or refresh
  } catch (err) {
    console.error(err);
    alert("Failed to submit booking.");
  }
}

