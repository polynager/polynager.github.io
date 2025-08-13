(() => {
  const taxRate = 1;

  // ====== ELEMENTS ======
  const slider = document.getElementById('bSlider');
  const bValueEl = document.getElementById('bValue');
  const explanationEl = document.getElementById('explanation');
  const plotDiv = document.getElementById('Elasticity-chapter3');
  const tableDiv = document.getElementById('table');

  if (!slider || !bValueEl || !plotDiv || !tableDiv || !explanationEl) {
    console.warn("Elasticity module: Required elements not found. Skipping.");
    return;
  }

  // ====== FUNCTIONS ======
  function supplyCurve(q) {
    return 2 + q;
  }

  function demandPerfectlyElastic(q) {
    return Array(q.length).fill(5);
  }

  function demandVariableElasticity(q, b) {
    return q.map(x => 5 - b * x);
  }

  function calculateTaxIncidence(elasticity, b = 0.5) {
    let quantities = Array.from({ length: 500 }, (_, i) => i * 10 / 499);
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
    let producerTaxIncidence = 100 - consumerTaxIncidence;

    return {
      eqPriceOriginal, eqQuantityOriginal,
      eqQuantityTax, eqPriceConsumer, eqPriceProducer,
      consumerTaxIncidence, producerTaxIncidence
    };
  }

  function explainTaxIncidence(elasticity, t) {
    if (elasticity === 'Perfectly Elastic') {
      return "With perfectly elastic demand, producers bear the entire tax burden (100%).";
    } else if (elasticity === 'Perfectly Inelastic') {
      return "With perfectly inelastic demand, consumers bear the entire tax burden (100%).";
    } else {
      return `With variable elasticity, consumers bear ${t.consumerTaxIncidence.toFixed(2)}% and producers bear ${t.producerTaxIncidence.toFixed(2)}% of the tax.`;
    }
  }

  function plot(elasticity, b) {
    let q = Array.from({ length: 500 }, (_, i) => i * 10 / 499);
    let t = calculateTaxIncidence(elasticity, b);

    let traces = [];
    if (elasticity === 'Perfectly Elastic') {
      traces.push({ x: q, y: demandPerfectlyElastic(q), type: 'scatter', mode: 'lines', name: 'Demand', line: { color: 'blue' } });
    } else if (elasticity === 'Perfectly Inelastic') {
      traces.push({ x: [t.eqQuantityOriginal, t.eqQuantityOriginal], y: [0, 10], type: 'scatter', mode: 'lines', name: 'Demand (Perfectly Inelastic)', line: { color: 'blue' } });
    } else {
      traces.push({ x: q, y: demandVariableElasticity(q, b), type: 'scatter', mode: 'lines', name: 'Demand', line: { color: 'blue' } });
    }

    traces.push({ x: q, y: supplyCurve(q), type: 'scatter', mode: 'lines', name: 'Supply (No Tax)', line: { color: 'green' } });
    traces.push({ x: q, y: q.map(s => s + taxRate + 2), type: 'scatter', mode: 'lines', name: `Supply + Tax (${taxRate})`, line: { color: 'red' } });

    traces.push({
      x: [t.eqQuantityOriginal], y: [t.eqPriceOriginal],
      type: 'scatter', mode: 'markers+text', name: 'Original Eq',
      text: [`Q=${t.eqQuantityOriginal.toFixed(2)}, P=${t.eqPriceOriginal.toFixed(2)}`],
      textposition: 'top right', marker: { color: 'red', size: 10 }
    });

    traces.push({
      x: [t.eqQuantityTax], y: [t.eqPriceConsumer],
      type: 'scatter', mode: 'markers+text', name: 'New Eq (with tax)',
      text: [`Q=${t.eqQuantityTax.toFixed(2)}, P₍c₎=${t.eqPriceConsumer.toFixed(2)}, P₍p₎=${t.eqPriceProducer.toFixed(2)}`],
      textposition: 'top right', marker: { color: 'orange', size: 10 }
    });

    Plotly.newPlot(plotDiv, traces, {
      xaxis: { title: 'Quantity', range: [0, 6] },
      yaxis: { title: 'Price', range: [0, 10] },
      title: `Tax Incidence (${elasticity})`,
      showlegend: true
    });

    tableDiv.innerHTML =
      `<table border="1" cellpadding="5">
        <tr><th>Elasticity</th><th>Consumer Tax Incidence (%)</th><th>Producer Tax Incidence (%)</th></tr>
        <tr><td>${elasticity}</td><td>${t.consumerTaxIncidence.toFixed(2)}</td><td>${t.producerTaxIncidence.toFixed(2)}</td></tr>
      </table>`;

    explanationEl.textContent = explainTaxIncidence(elasticity, t);
  }

  // ====== EVENT LISTENERS ======
  document.querySelectorAll('input[name="elasticity"]').forEach(r => {
    r.addEventListener('change', () => {
      plot(document.querySelector('input[name="elasticity"]:checked').value, parseFloat(slider.value));
    });
  });

  slider.addEventListener('input', e => {
    bValueEl.textContent = e.target.value;
    plot(document.querySelector('input[name="elasticity"]:checked').value, parseFloat(e.target.value));
  });

  // ====== INITIAL PLOT ======
  plot('Variable Elasticity', parseFloat(slider.value));
})();
