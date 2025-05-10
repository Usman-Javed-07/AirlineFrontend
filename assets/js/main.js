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

  const pickupEnabled = document.getElementById("pickupEnabled").checked;
  const dropoffEnabled = document.getElementById("dropoffEnabled").checked;

  const pickupLocation = document.getElementById("pickup").value.trim().toLowerCase();
  const dropoffLocation = document.getElementById("dropoff").value.trim().toLowerCase();

  const pickupMessage = document.getElementById("pickupMessage");
  const dropoffMessage = document.getElementById("dropoffMessage");

  pickupMessage.textContent = '';
  dropoffMessage.textContent = '';

  let extraCost = 0;

  if (pickupEnabled) {
    const isValidPickup = selectedPickupCities.includes(pickupLocation);
    if (!isValidPickup) {
      pickupMessage.textContent = `Invalid pickup location. Must be one of: ${selectedPickupCities.join(', ')}`;
      return;
    }
    extraCost += 20;
  }

  if (dropoffEnabled) {
    const isValidDropoff = selectedDropoffCities.includes(dropoffLocation);
    if (!isValidDropoff) {
      dropoffMessage.textContent = `Invalid dropoff location. Must be one of: ${selectedDropoffCities.join(', ')}`;
      return;
    }
    extraCost += 20;
  }

  // Collect user inputs
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const dob = document.getElementById("dob").value;
  const passportNumber = document.getElementById("passportNumber").value.trim();
  const nationality = document.getElementById("nationality").value.trim();

  const passportIssueDate = document.getElementById("passportIssueDate").value;
  const passportExpiryDate = document.getElementById("passportExpiryDate").value;
  const visaNumber = document.getElementById("visaNumber").value.trim();
  const visaExpiryDate = document.getElementById("visaExpiryDate").value;

  const selectedExtras = [];
  document.querySelectorAll('.extraItem:checked').forEach(item => {
    const price = parseFloat(item.dataset.price);
    selectedExtras.push({ name: item.value, price });
    extraCost += price;
  });

  const mealPreference = document.getElementById("mealPreference").value;

  const selectedIndex = document.getElementById("flightRoute").value;
  const selectedFlight = flightData[selectedIndex];
  const selectedClass = document.getElementById("flightClass").value;

  let classPrice = 0;
  if (selectedClass === "economy") classPrice = selectedFlight.economy_price;
  else if (selectedClass === "business") classPrice = selectedFlight.business_price;
  else if (selectedClass === "first") classPrice = selectedFlight.first_price;

  const cardDetails = {
    name: document.getElementById("cardName").value.trim(),
    number: document.getElementById("cardNumber").value.trim(),
    expiry: document.getElementById("expiryDate").value.trim(),
    cvv: document.getElementById("cvv").value.trim(),
  };

  const bookingId = "BKG" + Math.floor(100000 + Math.random() * 900000);
  const totalAmount = classPrice + extraCost;

  const bookingData = {
    bookingId,
    personalDetails: {
      fullName,
      email,
      dob,
      passportNumber,
      nationality,
    },
    travelDocuments: {
      passportIssueDate,
      passportExpiryDate,
      visaNumber,
      visaExpiryDate,
    },
    flightDetails: {
      route: selectedFlight.route,
      date: selectedFlight.date,
      departureTime: selectedFlight.departure_time,
      arrivalTime: selectedFlight.arrival_time,
      vessel: selectedFlight.vessel,
      flightClass: selectedClass,
      basePrice: classPrice,
    },
    mealPreference,
    pickupLocation: pickupEnabled ? pickupLocation : null,
    dropoffLocation: dropoffEnabled ? dropoffLocation : null,
    selectedExtras,
    totalAmount,
    payment: {
      method: "card",
      cardDetails,
    }
  };

  try {
    const response = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    });

    if (response.ok) {
      alert(`Booking confirmed! Booking ID: ${bookingId}\nA confirmation email was sent to ${email}`);
    } else {
      alert("Something went wrong with your booking. Please try again.");
    }
  } catch (error) {
    console.error("Booking failed:", error);
    alert("Network error. Try again later.");
  }

  console.log("Final Booking Data:", bookingData);
}


function updateTotalAmount() {
  let total = basePrice;
  let extras = 0;

  document.querySelectorAll('.extraItem:checked').forEach(item => {
    extras += parseFloat(item.dataset.price);
  });

  const pickupEnabled = document.getElementById("pickupEnabled").checked;
  const dropoffEnabled = document.getElementById("dropoffEnabled").checked;

  if (pickupEnabled) extras += 20;
  if (dropoffEnabled) extras += 20;

  total += extras;

  document.getElementById("totalAmount").textContent = `Total Amount: £${total.toFixed(2)}`;
}

document.querySelectorAll('.extraItem').forEach(item => {
  item.addEventListener('change', updateTotalAmount);
});

document.getElementById("pickupEnabled").addEventListener("change", updateTotalAmount);
document.getElementById("dropoffEnabled").addEventListener("change", updateTotalAmount);



