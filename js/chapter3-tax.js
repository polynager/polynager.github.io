(() => {
  const demandCurve = (q, intercept = 20, slope = -2) => intercept + slope * q;
  const supplyCurve = (q, intercept = 2, slope = 1) => intercept + slope * q;
  const supplyCurveWithTax = (q, intercept = 2, slope = 1, tax = 0) => intercept + slope * q + tax;

  const initialDemandIntercept = 20;
  const initialSupplyIntercept = 2;
  const quantities = Array.from({ length: 101 }, (_, i) => i / 10);

  const ctx = document.getElementById('taxChart').getContext('2d');
  const taxChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: quantities,
      datasets: [
        { label: 'Demand Curve', data: [], borderColor: 'blue', fill: false },
        { label: 'Supply Curve (No Tax)', data: [], borderColor: 'green', fill: false },
        { label: 'Supply Curve with Tax', data: [], borderColor: 'red', fill: false },
        { label: 'Consumer Surplus', data: [], backgroundColor: 'rgba(0,0,255,0.3)', fill: true, borderWidth: 0 },
        { label: 'Producer Surplus', data: [], backgroundColor: 'rgba(0,128,0,0.3)', fill: true, borderWidth: 0 },
        { label: 'Tax Revenue', data: [], backgroundColor: 'rgba(255,255,0,0.5)', fill: true, borderWidth: 0 },
        { label: 'Deadweight Loss', data: [], backgroundColor: 'rgba(128,128,128,0.5)', fill: true, borderWidth: 0 }
      ]
    },
    options: {
      responsive: false,
      scales: {
        x: { title: { display: true, text: 'Quantity' } },
        y: { title: { display: true, text: 'Price' } }
      },
      plugins: { legend: { position: 'top' } }
    }
  });

  function updateChart(tax) {
    const eqQOriginal = (initialDemandIntercept - initialSupplyIntercept) / 3;
    const eqPOriginal = demandCurve(eqQOriginal, initialDemandIntercept);
    const eqQTax = (initialDemandIntercept - (initialSupplyIntercept + tax)) / 3;
    const eqPConsumer = demandCurve(eqQTax, initialDemandIntercept);
    const eqPProducer = supplyCurve(eqQTax, initialSupplyIntercept);
    const maxPrice = demandCurve(0, initialDemandIntercept);

    const consumerSurplusData = quantities.map(q => q <= eqQTax ? demandCurve(q) - eqPConsumer : null);
    const producerSurplusData = quantities.map(q => q <= eqQTax ? eqPProducer - supplyCurve(q) : null);
    const taxRevenueData = quantities.map(q => q <= eqQTax ? eqPConsumer - eqPProducer : null);
    const dwlData = quantities.map(q => (q > eqQTax && q <= eqQOriginal) ? demandCurve(q) - supplyCurve(q) : null);

    taxChart.data.datasets[0].data = quantities.map(q => demandCurve(q));
    taxChart.data.datasets[1].data = quantities.map(q => supplyCurve(q));
    taxChart.data.datasets[2].data = quantities.map(q => supplyCurveWithTax(q, initialSupplyIntercept, 1, tax));
    taxChart.data.datasets[3].data = consumerSurplusData;
    taxChart.data.datasets[4].data = producerSurplusData;
    taxChart.data.datasets[5].data = taxRevenueData;
    taxChart.data.datasets[6].data = dwlData;

    taxChart.update();

    const consumerSurplus = 0.5 * eqQTax * (maxPrice - eqPConsumer);
    const producerSurplus = 0.5 * eqQTax * (eqPProducer - initialSupplyIntercept);
    const taxRevenue = eqQTax * tax;
    const dwl = 0.5 * (eqQOriginal - eqQTax) * tax;

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

  updateChart(0);
})();
