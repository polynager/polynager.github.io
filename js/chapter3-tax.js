(() => {
  const initialDemandIntercept = 20;
  const initialSupplyIntercept = 2;
  const slopeDemand = -2;
  const slopeSupply = 1;

  const demandCurve = (q) => initialDemandIntercept + slopeDemand * q;
  const supplyCurve = (q) => initialSupplyIntercept + slopeSupply * q;
  const supplyCurveWithTax = (q, tax) => initialSupplyIntercept + slopeSupply * q + tax;
  const quantities = Array.from({ length: 101 }, (_, i) => i / 10);

  function updateChart(tax) {
    // Original equilibrium
    const eqQOriginal = (initialDemandIntercept - initialSupplyIntercept) / (slopeSupply - slopeDemand);
    const eqPOriginal = demandCurve(eqQOriginal);

    // With tax
    const eqQTax = (initialDemandIntercept - (initialSupplyIntercept + tax)) / (slopeSupply - slopeDemand);
    const eqPConsumer = demandCurve(eqQTax);
    const eqPProducer = eqPConsumer - tax;

    // Surpluses & DWL
    const maxPrice = demandCurve(0);
    const minPrice = supplyCurve(0);
    const consumerSurplus = 0.5 * eqQTax * (maxPrice - eqPConsumer);
    const producerSurplus = 0.5 * eqQTax * (eqPProducer - minPrice);
    const taxRevenue = eqQTax * tax;
    const dwl = 0.5 * (eqQOriginal - eqQTax) * tax;

    // Curves
    const demandTrace = {
      x: quantities,
      y: quantities.map(demandCurve),
      mode: 'lines',
      name: 'Demand',
      line: { color: 'blue' }
      };
    const supplyTrace = {
      x: quantities,
      y: quantities.map(supplyCurve),
      mode: 'lines',
      name: 'Supply (No Tax)',
      line: { color: 'green' }
      };
    const taxTrace = {
      x: quantities,
      y: quantities.map(q => supplyCurveWithTax(q, tax)),
      mode: 'lines',
      name: `Supply + Tax (${tax})`,
      line: { color: 'red' }
      };


    // Equilibrium points
    const eqPoints = {
      x: [eqQOriginal, eqQTax],
      y: [eqPOriginal, eqPConsumer],
      mode: 'markers',
      name: 'Equilibrium',
      marker: { color: 'black', size: 8 }
    };

    // Shading areas
    const csShade = {
      x: [0, eqQTax, 0],
      y: [maxPrice, eqPConsumer, eqPConsumer],
      fill: 'toself',
      fillcolor: 'rgba(0,0,255,0.2)',
      line: { width: 0 },
      hoverinfo: 'skip',
      name: 'Consumer Surplus'
    };
    const psShade = {
      x: [0, eqQTax, 0],
      y: [eqPProducer, eqPProducer, minPrice],
      fill: 'toself',
      fillcolor: 'rgba(0,128,0,0.2)',
      line: { width: 0 },
      hoverinfo: 'skip',
      name: 'Producer Surplus'
    };
    const taxShade = {
      x: [0, eqQTax, eqQTax, 0],
      y: [eqPProducer, eqPProducer, eqPConsumer, eqPConsumer],
      fill: 'toself',
      fillcolor: 'rgba(255,0,0,0.2)',
      line: { width: 0 },
      hoverinfo: 'skip',
      name: 'Tax Revenue'
    };
    const dwlShade = {
      x: [eqQTax, eqQOriginal, eqQTax],
      y: [eqPProducer, eqPProducer + tax, eqPConsumer],
      fill: 'toself',
      fillcolor: 'rgba(255,165,0,0.3)',
      line: { width: 0 },
      hoverinfo: 'skip',
      name: 'Deadweight Loss'
    };

    Plotly.newPlot('taxPlot', 
      [demandTrace, supplyTrace, taxTrace, csShade, psShade, taxShade, dwlShade, eqPoints], 
      {
        title: 'Tax Impact with Surplus & DWL Shading',
      xaxis: { title: 'Quantity' },
      yaxis: { title: 'Price' },
      margin: { t: 40 }
      }
    );

    document.getElementById('results').innerHTML = `

      <p><strong>Tax:</strong> ${tax.toFixed(2)}</p>
      <p>Original EQ: Q = ${eqQOriginal.toFixed(2)}, P = ${eqPOriginal.toFixed(2)}</p>
      <p>With Tax: Q = ${eqQTax.toFixed(2)}, Pc = ${eqPConsumer.toFixed(2)}, Pp = ${eqPProducer.toFixed(2)}</p>
      <p>CS: ${consumerSurplus.toFixed(2)}, PS: ${producerSurplus.toFixed(2)}</p>
      <p>Tax Revenue: ${taxRevenue.toFixed(2)}, DWL: ${dwl.toFixed(2)}</p>
    `;
  }

  document.getElementById('taxSlider').addEventListener('input', (e) => {
    const tax = parseFloat(e.target.value);
    document.getElementById('taxValue').textContent = tax.toFixed(1);
    updateChart(tax);
  });

  updateChart(0);
})();
