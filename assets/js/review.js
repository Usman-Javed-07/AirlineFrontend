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
        const response = await fetch('http://localhost:5000/api/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
          alert('Review submitted successfully!');
          document.getElementById('reviewForm').reset();
        } else {
          alert('Error: ' + result.error);
        }
      } catch (err) {
        console.error('Submit Review Error:', err);
        alert('Failed to submit review.');
      }
    });