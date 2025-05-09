let flightData = [];
let selectedPickupCities = [];
let selectedDropoffCities = [];

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

  // Pickup and Dropoff logic
  const pickupEnabled = document.getElementById("pickupEnabled").checked;
  const dropoffEnabled = document.getElementById("dropoffEnabled").checked;

  const pickupLocation = document.getElementById("pickup").value.trim().toLowerCase();
  const dropoffLocation = document.getElementById("dropoff").value.trim().toLowerCase();

  const pickupMessage = document.getElementById("pickupMessage");
  const dropoffMessage = document.getElementById("dropoffMessage");

  pickupMessage.textContent = '';
  dropoffMessage.textContent = '';

  let extraCost = 0;

  // Pickup validation
  if (pickupEnabled) {
    const isValidPickup = selectedPickupCities.includes(pickupLocation);
    if (!isValidPickup) {
      pickupMessage.textContent = `Invalid pickup location. Must be one of: ${selectedPickupCities.join(', ')}`;
      return;
    }
    extraCost += 30;
  }

  // Dropoff validation
  if (dropoffEnabled) {
    const isValidDropoff = selectedDropoffCities.includes(dropoffLocation);
    if (!isValidDropoff) {
      dropoffMessage.textContent = `Invalid dropoff location. Must be one of: ${selectedDropoffCities.join(', ')}`;
      return;
    }
    extraCost += 30;
  }

  // Collect Personal Information
  const fullName = document.getElementById("fullName").value.trim();
  const dob = document.getElementById("dob").value;
  const passportNumber = document.getElementById("passportNumber").value.trim();
  const nationality = document.getElementById("nationality").value.trim();

  // Travel Document Information
  const passportIssueDate = document.getElementById("passportIssueDate").value;
  const passportExpiryDate = document.getElementById("passportExpiryDate").value;
  const visaNumber = document.getElementById("visaNumber").value.trim();
  const visaExpiryDate = document.getElementById("visaExpiryDate").value;

  // Collect Additional Items (e.g., Extra Meals)
  let selectedExtras = [];
  const extraItems = document.querySelectorAll('.extraItem:checked');
  extraItems.forEach(item => {
    const itemName = item.value;
    const itemPrice = parseFloat(item.dataset.price);
    extraCost += itemPrice;
    selectedExtras.push({ name: itemName, price: itemPrice });
  });

  // Prepare booking data
  const bookingData = {
    personalDetails: {
      fullName,
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
    pickupLocation: pickupEnabled ? pickupLocation : null,
    dropoffLocation: dropoffEnabled ? dropoffLocation : null,
    pickupDropoffCost: extraCost,
    selectedExtras,
    totalExtraCost: extraCost, // if needed separately
  };

  console.log("Final Booking Data:", bookingData);

  // Send data to backend
  // await fetch(...);
}


// 

let extraCost = 0;

const pickupEnabled = document.getElementById("pickupEnabled").checked;
const dropoffEnabled = document.getElementById("dropoffEnabled").checked;

// ✅ FIX: define them before using
const pickupLocation = document.getElementById("pickup").value.trim().toLowerCase();
const dropoffLocation = document.getElementById("dropoff").value.trim().toLowerCase();

// Get selected additional items
const extraItems = document.querySelectorAll('.extraItem:checked');
const selectedExtras = [];

extraItems.forEach(item => {
  const itemName = item.value;
  const itemPrice = parseFloat(item.dataset.price);
  extraCost += itemPrice;
  selectedExtras.push({ name: itemName, price: itemPrice });
});

// Add pickup/dropoff charges
if (pickupEnabled) extraCost += 30;
if (dropoffEnabled) extraCost += 30;

// Add to your bookingData
const bookingData = {
  mealPreference: document.getElementById("mealPreference").value,
  additionalItems: selectedExtras,
  pickupLocation: pickupEnabled ? pickupLocation : null,
  dropoffLocation: dropoffEnabled ? dropoffLocation : null,
  pickupDropoffCost: extraCost,
  totalExtraCost: extraCost,
};

console.log("Final Booking Data:", bookingData);

document.getElementById("toggleExtras").addEventListener("click", function () {
  const extrasSection = document.getElementById("extrasSection");
  extrasSection.style.display = extrasSection.style.display === "none" ? "block" : "none";
});
