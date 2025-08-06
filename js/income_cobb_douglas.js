function cobbDouglasIncomeEffect(px, py, income, alpha) {
  const incomeInitial = 10;
  const pxInitial = 1;
  const pyInitial = 1;

  const xVals = Array.from({ length: 200 }, (_, i) => i * 0.1);

  // === Original optimal bundle and budget line ===
  const x0 = (incomeInitial / pxInitial) * alpha;
  const y0 = (incomeInitial / pyInitial) * (1 - alpha);
  const yBudget0 = xVals.map(x => {
    const y = (incomeInitial - pxInitial * x) / pyInitial;
    return y >= 0 ? y : null;
  });

  // === New optimal bundle and budget line ===
  const x1 = (income / px) * alpha;
  const y1 = (income / py) * (1 - alpha);
  const yBudget1 = xVals.map(x => {
    const y = (income - px * x) / py;
    return y >= 0 ? y : null;
  });

  const traceNewBudget = {
    x: xVals,
    y: yBudget1,
    mode: 'lines',
    name: 'New Budget Line',
    line: { color: 'black' }
  };

  const traceOriginalBudget = {
    x: xVals,
    y: yBudget0,
    mode: 'lines',
    name: 'Original Budget Line',
    line: { dash: 'dot', color: 'gray' }
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

  const layout = {
    title: `Income Effect — α = ${alpha.toFixed(2)}, pₓ = ${px.toFixed(2)}, pᵧ = ${py.toFixed(2)}, I = ${income.toFixed(2)}`,
    xaxis: { title: 'Good X', range: [0, 20] },
    yaxis: { title: 'Good Y', range: [0, 20] },
    legend: { x: 0, y: -0.2, orientation: 'h' },
    margin: { t: 50, b: 70 }
  };

  Plotly.newPlot('incomePlot', [traceFill, traceNewBudget, traceOriginalBudget, traceOriginalBundle, traceNewBundle], layout);

  // === Output explanation ===
  const output = document.getElementById("incomeExplanation");
  output.innerHTML = "";

  if (income > incomeInitial) {
    output.innerHTML += `<p>Income increased from ${incomeInitial} to ${income}, so the consumer can afford more of both goods.</p>`;
  } else if (income < incomeInitial) {
    output.innerHTML += `<p>Income decreased from ${incomeInitial} to ${income}, reducing affordable consumption.</p>`;
  }

  if (px > pxInitial) {
    output.innerHTML += `<p>Price of Good X increased from ${pxInitial} to ${px}, reducing X consumption.</p>`;
  } else if (px < pxInitial) {
    output.innerHTML += `<p>Price of Good X decreased from ${pxInitial} to ${px}, increasing X consumption.</p>`;
  }

  if (py > pyInitial) {
    output.innerHTML += `<p>Price of Good Y increased from ${pyInitial} to ${py}, reducing Y consumption.</p>`;
  } else if (py < pyInitial) {
    output.innerHTML += `<p>Price of Good Y decreased from ${pyInitial} to ${py}, increasing Y consumption.</p>`;
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const incomeSlider = document.getElementById("income");
  const pxSlider = document.getElementById("px");
  const pySlider = document.getElementById("py");
  const alphaSlider = document.getElementById("alpha");

  function updatePlot() {
    const income = parseFloat(incomeSlider.value);
    const px = parseFloat(pxSlider.value);
    const py = parseFloat(pySlider.value);
    const alpha = parseFloat(alphaSlider.value);

    document.getElementById("incomeVal").textContent = income;
    document.getElementById("pxVal").textContent = px;
     document.getElementById("pyVal").textContent = py;
    document.getElementById("alphaVal").textContent = alpha;

    cobbDouglasIncomeEffect(px, py, income, alpha);
  }

  updatePlot();

  [incomeSlider, pxSlider, pySlider, alphaSlider].forEach(slider => {
    slider.addEventListener("input", updatePlot);
  });
});
