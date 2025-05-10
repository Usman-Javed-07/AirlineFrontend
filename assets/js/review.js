
document.getElementById("reviewForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const vessel = document.getElementById("vessel").value.trim();
  const rating = parseInt(document.getElementById("rating").value);
  const comments = document.getElementById("comments").value.trim();

  try {
    const response = await fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vessel, rating, comments })
    });

    const result = await response.json();

    if (response.ok) {
      alert("Review submitted successfully!");
      document.getElementById("reviewForm").reset();
    } else {
      alert("Error: " + result.error);
    }
  } catch (err) {
    console.error("Submit Review Error:", err);
    alert("Something went wrong.");
  }
});
