document.getElementById('reviewForm').addEventListener('submit', async function (e) {
      e.preventDefault();

      const data = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        vessel: document.getElementById('vessel').value,
        rating: document.getElementById('rating').value,
        comments: document.getElementById('comments').value
      };

      try {
        const response = await fetch(`${BASE_URL}/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
          Toastify({
  text: 'Review submitted successfully!',
  duration: 5000, // Adjust duration as needed
  gravity: 'top',
  position: 'right',
  backgroundColor: '#4CAF50', // Green for success
  close: true,
}).showToast();

          document.getElementById('reviewForm').reset();
        } else {
          Toastify({
  text: 'Error: ' + result.error,
  duration: 5000, // Adjust duration as needed
  gravity: 'top',
  position: 'right',
  backgroundColor: '#f44336', // Red for error
  close: true,
}).showToast();

        }
      } catch (err) {
        console.error('Submit Review Error:', err);
        Toastify({
  text: 'Failed to submit review.',
  duration: 5000, // Adjust duration as needed
  gravity: 'top',
  position: 'right',
  backgroundColor: '#f44336', // Red for error
  close: true,
}).showToast();

      }
    });