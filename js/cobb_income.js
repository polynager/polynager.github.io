document.addEventListener('DOMContentLoaded', () => {
  const alphaSlider = document.getElementById('alphaSlider');
  const pxSlider = document.getElementById('pxSlider');
  const pySlider = document.getElementById('pySlider');
  const incomeSlider = document.getElementById('incomeSlider');

  const alphaVal = document.getElementById('alphaVal');
  const pxVal = document.getElementById('pxVal');
  const pyVal = document.getElementById('pyVal');
  const incomeVal = document.getElementById('incomeVal');

  const explanation = document.getElementById('explanation');
  const plotDiv = document.getElementById('incomeplot');

  const incomeInitial = 10;
  const pxInitial = 1;
  const pyInitial = 1;

  function updatePlot() {
    const alpha = parseFloat(alphaSlider.value);
    const px = parseFloat(pxSlider.value);
    const py = parseFloat(pySlider.value);
    const income = parseFloat(incomeSlider.value);

    alphaVal.textContent = alpha.toFixed(2);
    pxVal.textContent = px.toFixed(2);
    pyVal.textContent = py.toFixed(2);
    incomeVal.textContent = income.toFixed(2);

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

    // Fix: Only include valid coordinates in the fill area
    const xFill = [];
    const yFill = [];
    for (let i = 0; i < xVals.length; i++) {
      if (yBudget1[i] !== null) {
        xFill.push(xVals[i]);
        yFill.push(yBudget1[i]);
      }
    }
    xFill.push(xFill[xFill.length - 1], xFill[0]);
    yFill.push(0, 0);

    const traceFill = {
      x: xFill,
      y: yFill,
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

    Plotly.newPlot(plotDiv, [
      traceFill,
      traceNewBudget,
      traceOriginalBudget,
      traceOriginalBundle,
      traceNewBundle
    ], layout, { responsive: true });

    explanation.innerHTML = '';
    if (income !== incomeInitial) {
      explanation.innerHTML += `<p>Income has ${income > incomeInitial ? 'increased' : 'decreased'} from ${incomeInitial} to ${income}, which ${income > incomeInitial ? 'expands' : 'shrinks'} the feasible set.</p>`;
    }
    if (px !== pxInitial) {
      explanation.innerHTML += `<p>The price of Good X has ${px > pxInitial ? 'increased' : 'decreased'} from ${pxInitial} to ${px}, affecting the consumption of Good X.</p>`;
    }
    if (py !== pyInitial) {
      explanation.innerHTML += `<p>The price of Good Y has ${py > pyInitial ? 'increased' : 'decreased'} from ${pyInitial} to ${py}, affecting the consumption of Good Y.</p>`;
    }
  }

  [alphaSlider, pxSlider, pySlider, incomeSlider].forEach(slider =>
    slider.addEventListener('input', updatePlot)
  );

  updatePlot();
});
