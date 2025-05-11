document.addEventListener("DOMContentLoaded", async () => {
      const bookingForm = document.getElementById("bookingForm");

      const urlParams = new URLSearchParams(window.location.search);
      const bookingId = urlParams.get("bookingId");

      const response = await fetch(`${BASE_URL}/bookings/${bookingId}`);
      const data = await response.json();

      document.getElementById('bookingId').value = data.booking_id;
      document.getElementById('fullName').value = data.full_name;
      document.getElementById('email').value = data.email;
      document.getElementById('dob').value = data.dob;
      document.getElementById('passportNumber').value = data.passport_number;
      document.getElementById('nationality').value = data.nationality;
      document.getElementById('passportIssueDate').value = data.passport_issue_date;
      document.getElementById('passportExpiryDate').value = data.passport_expiry_date;
      document.getElementById('visaNumber').value = data.visa_number;
      document.getElementById('visaExpiryDate').value = data.visa_expiry_date;
      document.getElementById('mealPreference').value = data.meal_preference;
      document.getElementById('pickup').value = data.pickup_location;
      document.getElementById('dropoff').value = data.dropoff_location;
      document.getElementById('cardName').value = data.card_holder;
      document.getElementById('cardNumber').value = data.card_number;
      document.getElementById('expiryDate').value = data.card_expiry;

      const selectedExtras = JSON.parse(data.extras || "[]");
      document.querySelectorAll(".extraItem").forEach(cb => {
        cb.checked = selectedExtras.includes(cb.value);
      });
    });

    // Toggle extras section
    document.getElementById("toggleExtras").addEventListener("click", () => {
      const extrasSection = document.getElementById("extrasSection");
      extrasSection.style.display = extrasSection.style.display === "none" ? "block" : "none";
    });

    // Show pickup/dropoff fields
    document.getElementById("pickupEnabled").addEventListener("change", function () {
      document.getElementById("pickupContainer").style.display = this.checked ? "block" : "none";
    });

    document.getElementById("dropoffEnabled").addEventListener("change", function () {
      document.getElementById("dropoffContainer").style.display = this.checked ? "block" : "none";
    });

    // Submit form
    document.getElementById("bookingForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const selectedExtras = [];
      document.querySelectorAll(".extraItem:checked").forEach(cb => {
        selectedExtras.push(cb.value);
      });

      const updatedInfo = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        dob: document.getElementById('dob').value,
        passportNumber: document.getElementById('passportNumber').value,
        nationality: document.getElementById('nationality').value,
        passportIssueDate: document.getElementById('passportIssueDate').value,
        passportExpiryDate: document.getElementById('passportExpiryDate').value,
        visaNumber: document.getElementById('visaNumber').value,
        visaExpiryDate: document.getElementById('visaExpiryDate').value,
        mealPreference: document.getElementById('mealPreference').value,
        pickupLocation: document.getElementById('pickup').value,
        dropoffLocation: document.getElementById('dropoff').value,
        selectedExtras,
        cardName: document.getElementById('cardName').value,
        cardNumber: document.getElementById('cardNumber').value,
        cardExpiry: document.getElementById('expiryDate').value
      };

      const bookingId = document.getElementById('bookingId').value;

      const res = await fetch(`${BASE_URL}/update-details`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, updatedInfo })
      });

      const result = await res.json();
      alert(result.message || "Booking updated successfully!");
    });