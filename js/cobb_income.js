document.addEventListener('DOMContentLoaded', () => {
  const alphaSlider = document.getElementById('alphaIncomeSlider');
  const pXSlider = document.getElementById('pXIncomeSlider');
  const pYSlider = document.getElementById('pYIncomeSlider');
  const incomeSlider = document.getElementById('incomeSlider');
  const plotDiv = document.getElementById('incomePlot');
  const explanationDiv = document.getElementById('incomeExplanation');

  function plotIncomeEffect() {
    const alpha = parseFloat(alphaSlider.value);
    const px = parseFloat(pXSlider.value);
    const py = parseFloat(pYSlider.value);
    const income = parseFloat(incomeSlider.value);

    const incomeInitial = 10;
    const pxInitial = 1;
    const pyInitial = 1;

    const xVals = Array.from({ length: 200 }, (_, i) => i * 0.1);

    const x0 = (incomeInitial / pxInitial) * alpha;
    const y0 = (incomeInitial / pyInitial) * (1 - alpha);
    const yBudget0 = xVals.map(x => (incomeInitial - pxInitial * x) / pyInitial);

    const x1 = (income / px) * alpha;
    const y1 = (income / py) * (1 - alpha);
    const yBudget1 = xVals.map(x => (income - px * x) / py);

    const traceFill = {
      x: [...xVals, xVals[xVals.length - 1], xVals[0]],
      y: [...yBudget1, 0, 0],
      fill: 'toself',
      fillcolor: 'rgba(0, 200, 255, 0.2)',
      line: { color: 'transparent' },
      type: 'scatter',
      mode: 'none',
      name: 'New Feasible Set',
      showlegend: true
    };

    const traceOriginalBudget = {
      x: xVals,
      y: yBudget0,
      mode: 'lines',
      name: 'Original Budget Line',
      line: { dash: 'dot', color: 'gray' }
    };

    const traceNewBudget = {
      x: xVals,
      y: yBudget1,
      mode: 'lines',
      name: 'New Budget Line',
      line: { color: 'black' }
    };

    const traceOriginalBundle = {
      x: [x0],
      y: [y0],
      mode: 'markers',
      name: 'Original Bundle',
      marker: { color: 'red', size: 10 }
    };

    const traceNewBundle = {
      x: [x1],
      y: [y1],
      mode: 'markers',
      name: 'New Bundle',
      marker: { color: 'green', size: 10 }
    };

    const layout = {
      title: `Income Effect — α = ${alpha.toFixed(2)}, pₓ = ${px.toFixed(2)}, pᵧ = ${py.toFixed(2)}, I = ${income.toFixed(2)}`,
      xaxis: { title: 'Good X', range: [0, 20] },
      yaxis: { title: 'Good Y', range: [0, 20] },
      legend: { x: 0, y: -0.2, orientation: 'h' },
      margin: { t: 50, b: 70 }
    };

    const data = [
      traceFill,
      traceNewBudget,
      traceOriginalBudget,
      traceOriginalBundle,
      traceNewBundle
    ];

    Plotly.newPlot(plotDiv, data, layout, { responsive: true });

    // Explanation text
    explanationDiv.innerHTML = '';

    if (income !== incomeInitial) {
      explanationDiv.innerHTML += `<p>Income changed from ${incomeInitial} to ${income}. This shifts the budget line and feasible consumption.</p>`;
    }

    if (px !== pxInitial) {
      explanationDiv.innerHTML += `<p>Price of Good X changed from ${pxInitial} to ${px}. This affects the slope of the budget line.</p>`;
    }

    if (py !== pyInitial) {
      explanationDiv.innerHTML += `<p>Price of Good Y changed from ${pyInitial} to ${py}. This affects the slope of the budget line.</p>`;
    }
  }

  // Event listeners
  alphaSlider.addEventListener('input', plotIncomeEffect);
  pXSlider.addEventListener('input', plotIncomeEffect);
  pYSlider.addEventListener('input', plotIncomeEffect);
  incomeSlider.addEventListener('input', plotIncomeEffect);

  // Initial render
  plotIncomeEffect();
});
