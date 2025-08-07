document.addEventListener('DOMContentLoaded', () => {
  // === DOM Elements ===
  const sliders = {
  alpha: document.getElementById('alphaSlider'),
  px: document.getElementById('pxSliderIncome'), 
  py: document.getElementById('pySlider'),
  income: document.getElementById('incomeSlider'),
};

const labels = {
  alpha: document.getElementById('alphaVal'),
  px: document.getElementById('pxValIncome'),     
  py: document.getElementById('pyVal'),
  income: document.getElementById('incomeVal'),
};

  const explanation = document.getElementById('explanation');
  const plotDiv = document.getElementById('cobb-income');

  // === Constants for Original Settings ===
  const incomeInitial = 10;
  const pxInitial = 1;
  const pyInitial = 1;

  // === Main Update Function ===
  function updatePlot() {
    const alpha = parseFloat(sliders.alpha.value);
    const px = parseFloat(sliders.px.value);
    const py = parseFloat(sliders.py.value);
    const income = parseFloat(sliders.income.value);

    // Update displayed slider values
    labels.alpha.textContent = alpha.toFixed(2);
    labels.px.textContent = px.toFixed(2);
    labels.py.textContent = py.toFixed(2);
    labels.income.textContent = income.toFixed(2);

    // === Calculate Points ===
    const xVals = Array.from({ length: 200 }, (_, i) => i * 0.1);

    const x0 = (incomeInitial / pxInitial) * alpha;
    const y0 = (incomeInitial / pyInitial) * (1 - alpha);

    const yBudget0 = xVals.map(x => {
      const y = (incomeInitial - pxInitial * x) / pyInitial;
      return y >= 0 ? y : null;
    });

    const x1 = (income / px) * alpha;
    const y1 = (income / py) * (1 - alpha);

    const yBudget1 = xVals.map(x => {
      const y = (income - px * x) / py;
      return y >= 0 ? y : null;
    });

    // === Fill area under new budget constraint ===
    const xFill = [], yFill = [];
    xVals.forEach((x, i) => {
      if (yBudget1[i] !== null) {
        xFill.push(x);
        yFill.push(yBudget1[i]);
      }
    });
    xFill.push(xFill[xFill.length - 1], xFill[0]);
    yFill.push(0, 0);

    // === Traces ===
    const traces = [
      {
        x: xFill, y: yFill,
        fill: 'toself',
        fillcolor: 'rgba(0, 200, 255, 0.2)',
        line: { color: 'transparent' },
        type: 'scatter',
        mode: 'none',
        name: 'New Feasible Set',
        showlegend: true
      },
      {
        x: xVals, y: yBudget0,
        mode: 'lines',
        name: 'Original Budget Line',
        line: { dash: 'dot', color: 'gray' }
      },
      {
        x: xVals, y: yBudget1,
        mode: 'lines',
        name: 'New Budget Line',
        line: { color: 'black' }
      },
      {
        x: [x0], y: [y0],
        mode: 'markers',
        name: 'Original Bundle',
        marker: { color: 'red', size: 10 }
      },
      {
        x: [x1], y: [y1],
        mode: 'markers',
        name: 'New Bundle',
        marker: { color: 'green', size: 10 }
      }
    ];

    const layout = {
      title: `Income Effect — α = ${alpha.toFixed(2)}, pₓ = ${px.toFixed(2)}, pᵧ = ${py.toFixed(2)}, I = ${income.toFixed(2)}`,
      xaxis: { title: 'Good X', range: [0, 20] },
      yaxis: { title: 'Good Y', range: [0, 20] },
      legend: { orientation: 'h', y: -0.2 },
      margin: { t: 50, b: 70 }
    };

    Plotly.newPlot(plotDiv, traces, layout, { responsive: true });

    // === Explanation Output ===
    explanation.innerHTML = '';

    if (income !== incomeInitial) {
      explanation.innerHTML += `<p>Income has <strong>${income > incomeInitial ? 'increased' : 'decreased'}</strong> from ${incomeInitial} to ${income}, which <strong>${income > incomeInitial ? 'expands' : 'shrinks'}</strong> the feasible set.</p>`;
    }
    if (px !== pxInitial) {
      explanation.innerHTML += `<p>The price of Good X has <strong>${px > pxInitial ? 'increased' : 'decreased'}</strong> from ${pxInitial} to ${px}, affecting the consumption of Good X.</p>`;
    }
    if (py !== pyInitial) {
      explanation.innerHTML += `<p>The price of Good Y has <strong>${py > pyInitial ? 'increased' : 'decreased'}</strong> from ${pyInitial} to ${py}, affecting the consumption of Good Y.</p>`;
    }
  }

  // === Initialize Listeners ===
  Object.values(sliders).forEach(slider =>
    slider.addEventListener('input', updatePlot)
  );

  // === Initial Draw ===
  updatePlot();
});
