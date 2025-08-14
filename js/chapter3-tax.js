(() => {
  const interceptDemand = 5;
  const interceptSupply = 2;
  const slopeSupply = 1;

  const supplyCurve = q => interceptSupply + slopeSupply * q;
  const supplyCurveWithTax = (q, tax) => interceptSupply + slopeSupply * q + tax;

  const demandCurvePerfectlyElastic = q => Array(q.length).fill(interceptDemand);
  const demandCurveVariable = (q, b) => interceptDemand - b * q;

  const quantities = Array.from({ length: 101 }, (_, i) => i / 10);

  function calculateTaxIncidence(elasticity, tax, b) {
    let eqQOriginal, eqPOriginal, eqQTax, eqPConsumer, eqPProducer;

    if (elasticity === "Perfectly Elastic") {
      eqQOriginal = interceptDemand - interceptSupply;
      eqPOriginal = interceptDemand;
      eqQTax = interceptDemand - (interceptSupply + tax);
      eqPConsumer = interceptDemand;
      eqPProducer = interceptDemand - tax;
    } 
    else if (elasticity === "Perfectly Inelastic") {
      eqQOriginal = 4;
      eqPOriginal = supplyCurve(eqQOriginal);
      eqQTax = eqQOriginal;
      eqPConsumer = eqPOriginal + tax;
      eqPProducer = eqPOriginal;
    } 
    else { // Variable Elasticity
      eqQOriginal = (interceptDemand - interceptSupply) / (slopeSupply + b);
      eqPOriginal = interceptDemand - b * eqQOriginal;
      eqQTax = (interceptDemand - (interceptSupply + tax)) / (slopeSupply + b);
      eqPConsumer = interceptDemand - b * eqQTax;
      eqPProducer = eqPConsumer - tax;
    }

    const consumerTaxIncidence = ((eqPConsumer - eqPOriginal) / tax) * 100 || 0;
    const producerTaxIncidence = ((tax - (eqPConsumer - eqPOriginal)) / tax) * 100 || 0;

    return { eqQOriginal, eqPOriginal, eqQTax, eqPConsumer, eqPProducer, consumerTaxIncidence, producerTaxIncidence };
  }

  function updateChart() {
    const elasticity = document.getElementById("elasticitySelect").value;
    const b = parseFloat(document.getElementById("bSlider").value);
    const tax = parseFloat(document.getElementById("taxSlider").value);

    document.getElementById("bLabel").style.display = elasticity === "Variable Elasticity" ? "inline" : "none";
    document.getElementById("taxValue").textContent = tax.toFixed(1);
    document.getElementById("bValue").textContent = b.toFixed(1);

    const results = calculateTaxIncidence(elasticity, tax, b);

    // Build curves
    let demandY;
    if (elasticity === "Perfectly Elastic") {
      demandY = demandCurvePerfectlyElastic(quantities);
    } else if (elasticity === "Perfectly Inelastic") {
      demandY = null; // vertical line
    } else {
      demandY = demandCurveVariable(quantities, b);
    }

    const demandTrace = elasticity === "Perfectly Inelastic" 
      ? { x: Array(quantities.length).fill(results.eqQOriginal), y: Array.from({length: quantities.length}, (_,i)=>i/10*10), mode: 'lines', name: 'Demand', line: {color: 'blue'} }
      : { x: quantities, y: demandY, mode: 'lines', name: 'Demand', line: {color: 'blue'} };

    const supplyTrace = { x: quantities, y: quantities.map(supplyCurve), mode: 'lines', name: 'Supply', line: {color: 'green'} };
    const supplyTaxTrace = { x: quantities, y: quantities.map(q => supplyCurveWithTax(q, tax)), mode: 'lines', name: `Supply + Tax (${tax})`, line: {color: 'red'} };

    // Shading only if not perfectly inelastic
    let csShade = null, psShade = null, taxShade = null, dwlShade = null;
    if (elasticity !== "Perfectly Inelastic") {
      const maxPrice = elasticity === "Perfectly Elastic" ? interceptDemand : Math.max(...demandY);
      const minPrice = supplyCurve(0);
      csShade = {
        x: [0, results.eqQTax, 0],
        y: [maxPrice, results.eqPConsumer, results.eqPConsumer],
        fill: 'toself', fillcolor: 'rgba(0,0,255,0.2)', line: {width:0}, name: 'Consumer Surplus'
      };
      psShade = {
        x: [0, results.eqQTax, 0],
        y: [results.eqPProducer, results.eqPProducer, minPrice],
        fill: 'toself', fillcolor: 'rgba(0,128,0,0.2)', line: {width:0}, name: 'Producer Surplus'
      };
      taxShade = {
        x: [0, results.eqQTax, results.eqQTax, 0],
        y: [results.eqPProducer, results.eqPProducer, results.eqPConsumer, results.eqPConsumer],
        fill: 'toself', fillcolor: 'rgba(255,0,0,0.2)', line: {width:0}, name: 'Tax Revenue'
      };
      dwlShade = {
        x: [results.eqQTax, results.eqQOriginal, results.eqQTax],
        y: [results.eqPProducer, results.eqPProducer + tax, results.eqPConsumer],
        fill: 'toself', fillcolor: 'rgba(255,165,0,0.3)', line: {width:0}, name: 'Deadweight Loss'
      };
    }

    const eqPoints = {
      x: [results.eqQOriginal, results.eqQTax],
      y: [results.eqPOriginal, results.eqPConsumer],
      mode: 'markers',
      name: 'Equilibria',
      marker: { color: 'black', size: 8 }
    };

    const traces = [demandTrace, supplyTrace, supplyTaxTrace];
    if (csShade) traces.push(csShade, psShade, taxShade, dwlShade);
    traces.push(eqPoints);

    Plotly.newPlot("taxPlot", traces, {
      title: 'Tax Incidence with Elasticity',
      xaxis: { title: 'Quantity' },
      yaxis: { title: 'Price' },
      margin: { t: 40 }
    });

    document.getElementById('results').innerHTML = `
      <p><strong>Elasticity:</strong> ${elasticity}</p>
      <p><strong>Tax:</strong> ${tax.toFixed(2)}</p>
      <p>Original EQ: Q = ${results.eqQOriginal.toFixed(2)}, P = ${results.eqPOriginal.toFixed(2)}</p>
      <p>With Tax: Q = ${results.eqQTax.toFixed(2)}, P<sub>c</sub> = ${results.eqPConsumer.toFixed(2)}, P<sub>p</sub> = ${results.eqPProducer.toFixed(2)}</p>
      <p>Consumer Tax Incidence: ${results.consumerTaxIncidence.toFixed(2)}%</p>
      <p>Producer Tax Incidence: ${results.producerTaxIncidence.toFixed(2)}%</p>
    `;
  }

  document.getElementById("elasticitySelect").addEventListener("change", updateChart);
  document.getElementById("bSlider").addEventListener("input", updateChart);
  document.getElementById("taxSlider").addEventListener("input", updateChart);

  updateChart();
})();
