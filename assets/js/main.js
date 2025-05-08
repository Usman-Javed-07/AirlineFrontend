// main.js

// Function for booking form submission
document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const bookingDetails = {
      flightRoute: document.getElementById("flightRoute").value,
      passengerName: document.getElementById("passengerName").value,
      mealPreference: document.getElementById("mealPreference").value,
      pickup: document.getElementById("pickup").value,
      dropoff: document.getElementById("dropoff").value,
    };
  
    console.log("Booking details:", bookingDetails);
    alert("Flight booked successfully!");
  });
  
  // Function for check-in form submission
  document.getElementById("checkInForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const bookingId = document.getElementById("bookingId").value;
    console.log("Checking in for booking ID:", bookingId);
    alert("Check-in successful!");
  });
  
  // Function for cancel/amend booking form submission
  document.getElementById("cancelAmendForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const bookingId = document.getElementById("bookingId").value;
    const action = document.getElementById("action").value;
    console.log(`Action: ${action} for booking ID: ${bookingId}`);
    alert(`${action} request submitted!`);
  });
  
  // Function for review form submission
  document.getElementById("reviewForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const flightId = document.getElementById("flightId").value;
    const rating = document.getElementById("rating").value;
    const comments = document.getElementById("comments").value;
  
    console.log("Review submitted for flight:", flightId, "Rating:", rating, "Comments:", comments);
    alert("Review submitted successfully!");
  });
  

  // main.js

// Handle the flight search form submission
document.getElementById('flightSearchForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission
    
    // Get the values from the input fields
    const departure = document.getElementById('departure').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    
    // For demonstration, redirect to booking.html with the form data as query parameters
    const bookingUrl = `booking.html?departure=${departure}&destination=${destination}&date=${date}`;
    
    // Redirect to the booking page with the flight details
    window.location.href = bookingUrl;
  });
  

  // main.js

// Handle the flight search form submission
document.getElementById('flightSearchForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission
    
    // Get the values from the input fields
    const departure = document.getElementById('departure').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    
    // For demonstration, redirect to booking.html with the form data as query parameters
    const bookingUrl = `booking.html?departure=${departure}&destination=${destination}&date=${date}`;
    
    // Redirect to the booking page with the flight details
    window.location.href = bookingUrl;
  });
  