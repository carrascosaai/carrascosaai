function renderChart() {
    if (!window.flights) return;
    const ctx = document.getElementById('priceChart').getContext('2d');
    const labels = flights.map(f => `${f.from}→${f.to}`);
    const data = flights.map(f => f.price);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Precio de vuelos (€)',
                data: data,
                backgroundColor: 'rgba(0, 123, 255, 0.6)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Precios de Vuelos' }
            },
            scales: { y: { beginAtZero: true } }
        }
    });
}

window.addEventListener('load', renderChart);
