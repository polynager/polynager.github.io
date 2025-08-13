const demandCurve = (q, intercept = 20, slope = -2) => intercept + slope * q;
const supplyCurve = (q, intercept = 2, slope = 1) => intercept + slope * q;
const supplyCurveWithTax = (q, intercept = 2, slope = 1, tax = 0) => intercept + slope * q + tax;

const initialDemandIntercept = 20;
const initialSupplyIntercept = 2;

const quantities = Array.from({ length: 101 }, (_, i) => i / 10); // 0 to 10 in steps of 0.1

let ctx = document.getElementById('taxChart').getContext('2d');
let taxChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: quantities,
        datasets: [
            { label: 'Demand Curve', data: [], borderColor: 'blue', fill: false },
            { label: 'Supply Curve (No Tax)', data: [], borderColor: 'green', fill: false },
            { label: 'Supply Curve with Tax', data: [], borderColor: 'red', fill: false }
        ]
    },
    options: {
        responsive: false,
        scales: {
            x: { title: { display: true, text: 'Quantity' } },
            y: { title: { display: true, text: 'Price' } }
        }
    }
});

function updateChart(tax) {
    // Original equilibrium
    const eqQOriginal = (initialDemandIntercept - initialSupplyIntercept) / (1 - (-2));
    const eqPOriginal = demandCurve(eqQOriginal, initialDemandIntercept);

    // New equilibrium with tax
    const eqQTax = (initialDemandIntercept - (initialSupplyIntercept + tax)) / (1 - (-2));
    const eqPConsumer = demandCurve(eqQTax, initialDemandIntercept);
    const eqPProducer = supplyCurve(eqQTax, initialSupplyIntercept);

    // Surpluses and DWL
    const maxPrice = demandCurve(0, initialDemandIntercept);
    const consumerSurplus = 0.5 * eqQTax * (maxPrice - eqPConsumer);
    const producerSurplus = 0.5 * eqQTax * (eqPProducer - initialSupplyIntercept);
    const taxRevenue = eqQTax * tax;
    const dwl = 0.5 * (eqQOriginal - eqQTax) * tax;

    // Update datasets
    taxChart.data.datasets[0].data = quantities.map(q => demandCurve(q));
    taxChart.data.datasets[1].data = quantities.map(q => supplyCurve(q));
    taxChart.data.datasets[2].data = quantities.map(q => supplyCurveWithTax(q, initialSupplyIntercept, 1, tax));
    taxChart.update();

    // Display results
    document.getElementById('results').innerHTML = `
        <p><strong>Tax Rate:</strong> ${tax}</p>
        <p>Original Equilibrium: Q = ${eqQOriginal.toFixed(2)}, P = ${eqPOriginal.toFixed(2)}</p>
        <p>New Equilibrium: Q = ${eqQTax.toFixed(2)}, P<sub>c</sub> = ${eqPConsumer.toFixed(2)}, P<sub>p</sub> = ${eqPProducer.toFixed(2)}</p>
        <p>Consumer Surplus: ${consumerSurplus.toFixed(2)}</p>
        <p>Producer Surplus: ${producerSurplus.toFixed(2)}</p>
        <p>Tax Revenue: ${taxRevenue.toFixed(2)}</p>
        <p>Deadweight Loss: ${dwl.toFixed(2)}</p>
    `;
}

document.getElementById('taxSlider').addEventListener('input', (e) => {
    const tax = parseFloat(e.target.value);
    document.getElementById('taxValue').textContent = tax;
    updateChart(tax);
});

// Initial render
updateChart(0);
