(() => {
  const demandCurve = (q, intercept = 20, slope = -2) => intercept + slope * q;
  const supplyCurve = (q, intercept = 2, slope = 1) => intercept + slope * q;
  const supplyCurveWithTax = (q, intercept = 2, slope = 1, tax = 0) =>
    intercept + slope * q + tax;

  const initialDemandIntercept = 20;
  const initialSupplyIntercept = 2;
  const quantities = Array.from({ length: 101 }, (_, i) => i / 10); // 0–10

  function updateChart(tax) {
    // Equilibrium without tax
    const eqQOriginal = (initialDemandIntercept - initialSupplyIntercept) / (1 - (-2));
    const eqPOriginal = demandCurve(eqQOriginal, initialDemandIntercept);

    // Equilibrium with tax
    const eqQTax = (initialDemandIntercept - (initialSupplyIntercept + tax)) / (1 - (-2));
    const eqPConsumer = demandCurve(eqQTax, initialDemandIntercept);
    const eqPProducer = supplyCurve(eqQTax, initialSupplyIntercept);

    // Surpluses & DWL
    const maxPrice = demandCurve(0, initialDemandIntercept);
    const consumerSurplus = 0.5 * eqQTax * (maxPrice - eqPConsumer);
    const producerSurplus = 0.5 * eqQTax * (eqPProducer - initialSupplyIntercept);
    const taxRevenue = eqQTax * tax;
    const dwl = 0.5 * (eqQOriginal - eqQTax) * tax;

    const demandTrace = {
      x: quantities,
      y: quantities.map(q => demandCurve(q)),
      mode: 'lines',
      name: 'Demand Curve',
      line: { color: 'blue' }
    };

    const supplyTrace = {
      x: quantities,
      y: quantities.map(q => supplyCurve(q)),
      mode: 'lines',
      name: 'Supply Curve (No Tax)',
      line: { color: 'green' }
    };

    const taxTrace = {
      x: quantities,
      y: quantities.map(q => supplyCurveWithTax(q, initialSupplyIntercept, 1, tax)),
      mode: 'lines',
      name: `Supply Curve with Tax (${tax})`,
      line: { color: 'red' }
    };

    const eqPoints = {
      x: [eqQOriginal, eqQTax],
      y: [eqPOriginal, eqPConsumer],
      mode: 'markers',
      name: 'Equilibria',
      marker: { color: 'black', size: 8 }
    };

    Plotly.newPlot('taxPlot', [demandTrace, supplyTrace, taxTrace, eqPoints], {
      title: 'Impact of Tax on Supply & Demand',
      xaxis: { title: 'Quantity' },
      yaxis: { title: 'Price' },
      margin: { t: 40 }
    });

    document.getElementById('results').innerHTML = `
      <p><strong>Tax Rate:</strong> ${tax.toFixed(2)}</p>
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
    document.getElementById('taxValue').textContent = tax.toFixed(1);
    updateChart(tax);
  });

  // Initial render
  updateChart(0);
})();
