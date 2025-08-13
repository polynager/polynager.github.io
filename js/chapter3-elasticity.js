const taxRate = 1;

// Supply curve
function supplyCurve(q) {
  return 2 + q;
}

// Demand curves
function demandPerfectlyElastic(q) {
  return Array(q.length).fill(5);
}
function demandPerfectlyInelastic(q) {
  return null; // handled separately
}
function demandVariableElasticity(q, b) {
  return q.map(x => 5 - b * x);
}

// Calculation function
function calculateTaxIncidence(elasticity, b=0.5) {
  let quantities = Array.from({length: 500}, (_, i) => i * 10 / 499);
  let eqQuantityOriginal, eqPriceOriginal, eqQuantityTax, eqPriceConsumer, eqPriceProducer;
  
  if (elasticity === 'Perfectly Elastic') {
    eqQuantityOriginal = 5 - 2;
    eqPriceOriginal = 5;
    eqQuantityTax = 5 - (2 + taxRate);
    eqPriceConsumer = 5;
    eqPriceProducer = 5 - taxRate;
  } else if (elasticity === 'Perfectly Inelastic') {
    eqQuantityOriginal = 4;
    eqPriceOriginal = 2 + eqQuantityOriginal;
    eqQuantityTax = eqQuantityOriginal;
    eqPriceConsumer = eqPriceOriginal + taxRate;
    eqPriceProducer = eqPriceOriginal;
  } else {
    eqQuantityOriginal = (5 - 2) / (1 + b);
    eqPriceOriginal = 5 - b * eqQuantityOriginal;
    eqQuantityTax = (5 - (2 + taxRate)) / (1 + b);
    eqPriceConsumer = 5 - b * eqQuantityTax;
    eqPriceProducer = supplyCurve(eqQuantityTax);
  }
  
  let consumerTaxIncidence = ((eqPriceConsumer - eqPriceOriginal) / taxRate) * 100;
  let producerTaxIncidence = ((taxRate - (eqPriceConsumer - eqPriceOriginal)) / taxRate) * 100;

  return {
    eqPriceOriginal, eqQuantityOriginal,
    eqQuantityTax, eqPriceConsumer, eqPriceProducer,
    consumerTaxIncidence, producerTaxIncidence
  };
}

// Explanation function
function explainTaxIncidence(elasticity, t) {
  if (elasticity === 'Perfectly Elastic') {
    return "With perfectly elastic demand, producers bear the entire tax burden (100%).";
  } else if (elasticity === 'Perfectly Inelastic') {
    return "With perfectly inelastic demand, consumers bear the entire tax burden (100%).";
  } else {
    return `With variable elasticity, consumers bear ${t.consumerTaxIncidence.toFixed(2)}% and producers bear ${t.producerTaxIncidence.toFixed(2)}% of the tax.`;
  }
}

// Plot function
function plot(elasticity, b) {
  let q = Array.from({length: 500}, (_, i) => i * 10 / 499);
  let t = calculateTaxIncidence(elasticity, b);

  let supply = supplyCurve(q);
  let supplyTax = supply.map(y => y + taxRate);
  let demand;
  let traces = [];

  if (elasticity === 'Perfectly Elastic') {
    demand = demandPerfectlyElastic(q);
    traces.push({x: q, y: demand, type: 'scatter', mode: 'lines', name: 'Demand', line: {color: 'blue'}});
  } else if (elasticity === 'Perfectly Inelastic') {
    traces.push({x: [t.eqQuantityOriginal, t.eqQuantityOriginal], y: [0, 10], type: 'scatter', mode: 'lines', name: 'Demand (Perfectly Inelastic)', line: {color: 'blue'}});
  } else {
    demand = demandVariableElasticity(q, b);
    traces.push({x: q, y: demand, type: 'scatter', mode: 'lines', name: 'Demand', line: {color: 'blue'}});
  }

  // Supply curves
  traces.push({x: q, y: supply, type: 'scatter', mode: 'lines', name: 'Supply (No Tax)', line: {color: 'green'}});
  traces.push({x: q, y: supplyTax, type: 'scatter', mode: 'lines', name: `Supply + Tax (${taxRate})`, line: {color: 'red'}});

  // Equilibria points
  traces.push({
    x: [t.eqQuantityOriginal], y: [t.eqPriceOriginal],
    type: 'scatter', mode: 'markers+text', name: 'Original Eq',
    text: [`Q=${t.eqQuantityOriginal.toFixed(2)}, P=${t.eqPriceOriginal.toFixed(2)}`],
    textposition: 'top right', marker: {color: 'red', size: 10}
  });
  traces.push({
    x: [t.eqQuantityTax], y: [t.eqPriceConsumer],
    type: 'scatter', mode: 'markers+text', name: 'New Eq (with tax)',
    text: [`Q=${t.eqQuantityTax.toFixed(2)}, P₍c₎=${t.eqPriceConsumer.toFixed(2)}, P₍p₎=${t.eqPriceProducer.toFixed(2)}`],
    textposition: 'top right', marker: {color: 'orange', size: 10}
  });

  let layout = {
    xaxis: {title: 'Quantity', range: [0, 6]},
    yaxis: {title: 'Price', range: [0, 10]},
    title: `Tax Incidence (${elasticity})`,
    showlegend: true
  };

  Plotly.newPlot('plot', traces, layout);

  // Table
  document.getElementById('table').innerHTML =
    `<table border="1" cellpadding="5">
      <tr><th>Elasticity</th><th>Consumer Tax Incidence (%)</th><th>Producer Tax Incidence (%)</th></tr>
      <tr><td>${elasticity}</td><td>${t.consumerTaxIncidence.toFixed(2)}</td><td>${t.producerTaxIncidence.toFixed(2)}</td></tr>
    </table>`;

  // Explanation
  document.getElementById('explanation').textContent = explainTaxIncidence(elasticity, t);
}

// Event listeners
document.querySelectorAll('input[name="elasticity"]').forEach(r => {
  r.addEventListener('change', () => {
    plot(document.querySelector('input[name="elasticity"]:checked').value, parseFloat(document.getElementById('bSlider').value));
  });
});
document.getElementById('bSlider').addEventListener('input', e => {
  document.getElementById('bValue').textContent = e.target.value;
  plot(document.querySelector('input[name="elasticity"]:checked').value, parseFloat(e.target.value));
});

// Initial plot
plot('Variable Elasticity', 0.5);
