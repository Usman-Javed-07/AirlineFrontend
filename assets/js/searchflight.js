
    let flightData = [];

    document.addEventListener("DOMContentLoaded", async () => {
      const routeSelect = document.getElementById("flightRoute");

      try {
        const res = await fetch(`${BASE_URL}/flights`);
        flightData = await res.json();

        const routes = [...new Set(flightData.map(f => f.route))];
        routes.forEach(route => {
          const option = document.createElement("option");
          option.value = route;
          option.textContent = route;
          routeSelect.appendChild(option);
        });
      } catch (err) {
        console.error("Failed to fetch flights:", err);
      }
    });

    document.getElementById("flightSearchForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const route = document.getElementById("flightRoute").value;
      const date = document.getElementById("flightDate").value;
      const resultsContainer = document.getElementById("searchResults");
      resultsContainer.innerHTML = "";

      const matches = flightData.filter(flight =>
        flight.route === route && flight.date === date
      );

      if (matches.length > 0) {
        matches.forEach(flight => {
          const div = document.createElement("div");
          div.style.border = "1px solid #ccc";
          div.style.margin = "10px 0";
          div.style.padding = "10px";
          div.innerHTML = `
            <strong>Route:</strong> ${flight.route}<br>
            <strong>Date:</strong> ${flight.date}<br>
            <strong>Vessel:</strong> ${flight.vessel}<br>
            <strong>Departure:</strong> ${flight.departure_time}<br>
            <strong>Arrival:</strong> ${flight.arrival_time}<br>
            <strong>Prices:</strong><br>
            Economy: £${flight.economy_price} | Business: £${flight.business_price} | First: £${flight.first_price}
          `;
          resultsContainer.appendChild(div);
        });
      } else {
        resultsContainer.innerHTML = `<p>No flights available for the selected route and date.</p>`;
      }
    });