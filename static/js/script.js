document.getElementById("searchForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch("/search", { method: "POST", body: formData });
    const data = await response.json();

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<h3>Resultados de vuelos:</h3>";

    data.forEach(flight => {
        resultsDiv.innerHTML += `
            <div class="flight-card">
                <strong>${flight.airline}</strong> - ${flight.time} - <span style="color:green">${flight.price}</span><br>
            </div>
        `;
    });
});
