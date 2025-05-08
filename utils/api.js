// api.js

const BASE_URL = "https://your-backend-api.com";

// Function to fetch flights
async function fetchFlights(departure, destination, date) {
  const response = await fetch(`${BASE_URL}/flights?departure=${departure}&destination=${destination}&date=${date}`);
  const data = await response.json();
  return data;
}

// Function to book a flight
async function bookFlight(bookingDetails) {
  const response = await fetch(`${BASE_URL}/book`, {
    method: 'POST',
    body: JSON.stringify(bookingDetails),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  return data;
}

// Function to check-in
async function checkIn(bookingId) {
  const response = await fetch(`${BASE_URL}/check-in/${bookingId}`, { method: 'POST' });
  const data = await response.json();
  return data;
}

// Function to cancel or amend booking
async function cancelAmendBooking(bookingId, action) {
  const response = await fetch(`${BASE_URL}/booking/${bookingId}`, {
    method: 'PATCH',
    body: JSON.stringify({ action }),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  return data;
}
