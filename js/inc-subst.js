document.addEventListener("DOMContentLoaded", () => {
  // === Parameters ===
  const alpha = 0.6;
  const income = 50;
  const pxInitial = 5;
  const py = 5;

  // === DOM Elements ===
  const slider = document.getElementById("pxSliderSubst");
  const pxValSpan = document.getElementById("pxValSubst");
  const plotContainer = document.getElementById("substitutionPlot");
  const outputBox = document.getElementById("output");

  slider.addEventListener("input", () => {
    const pxNew = parseFloat(slider.value);
    pxValSpan.textContent = pxNew.toFixed(1);
    drawSubstitutionGraph(pxNew);
  });

  function drawSubstitutionGraph(pxNew) {
    const x0 = (income / pxInitial) * alpha;
    const y0 = (income / py) * (1 - alpha);
    const U0 = Math.pow(x0, alpha) * Math.pow(y0, 1 - alpha);

    const compensatedY = x => Math.pow(U0, 1 / (1 - alpha)) * Math.pow(x, -alpha / (1 - alpha));
    const xSub = Math.pow((alpha / (1 - alpha)) * (py / pxNew), 1 - alpha) * (income / pxInitial) * alpha;
    const ySub = compensatedY(xSub);

    const x1 = (income / pxNew) * alpha;
    const y1 = (income / py) * (1 - alpha);
    const U1 = Math.pow(x1, alpha) * Math.pow(y1, 1 - alpha);

    const xValues = Array.from({ length: 400 }, (_, i) => 0.1 + i * ((20 - 0.1) / 400));
    const yBudgetOrig = xValues.map(x => (income - pxInitial * x) / py);
    const yBudgetNew = xValues.map(x => (income - pxNew * x) / py);
    const incomeComp = pxNew * xSub + py * ySub;
    const yBudgetComp = xValues.map(x => (incomeComp - pxNew * x) / py);
    const yIndiffOrig = xValues.map(x => Math.pow(U0, 1 / (1 - alpha)) * Math.pow(x, -alpha / (1 - alpha)));
    const yIndiffNew = xValues.map(x => Math.pow(U1, 1 / (1 - alpha)) * Math.pow(x, -alpha / (1 - alpha)));

    const traces = [
      {
        x: xValues, y: yBudgetOrig,
        mode: 'lines', name: 'Original Budget Line',
        line: { color: 'gray', dash: 'dot' }
      },
      {
        x: xValues, y: yBudgetNew,
        mode: 'lines', name: 'New Budget Line',
        line: { color: 'black' }
      },
      {
        x: xValues, y: yBudgetComp,
        mode: 'lines', name: 'Compensated Budget Line',
        line: { color: 'purple', dash: 'dot' }
      },
      {
        x: xValues, y: yIndiffOrig,
        mode: 'lines', name: 'Original Indifference Curve',
        line: { color: 'blue', dash: 'dot' }
      },
      {
        x: xValues, y: yIndiffNew,
        mode: 'lines', name: 'New Indifference Curve',
        line: { color: 'green', dash: 'dot' }
      },
      {
        x: [x0], y: [y0],
        mode: 'markers', name: 'Original Bundle',
        marker: { color: 'red', size: 10 }
      },
      {
        x: [xSub], y: [y0],
        mode: 'markers', name: 'Substitution Bundle',
        marker: { color: 'magenta', size: 10 }
      },
      {
        x: [x1], y: [y0],
        mode: 'markers', name: 'New Bundle',
        marker: { color: 'green', size: 10 }
      },
      {
        x: [x0, xSub], y: [y0, y0],
        mode: 'lines+text', name: 'Substitution Effect',
        line: { color: 'purple', width: 2 },
        text: ['', 'Substitution Effect'],
        textposition: 'top center'
      },
      {
        x: [xSub, x1], y: [y0, y0],
        mode: 'lines+text', name: 'Income Effect',
        line: { color: 'orange', width: 2 },
        text: ['', 'Income Effect'],
        textposition: 'top center'
      }
    ];

    const layout = {
      title: `Substitution & Income Effects (pₓ: ${pxInitial} → ${pxNew})`,
      xaxis: { title: 'Good X', range: [0, 20] },
      yaxis: { title: 'Good Y', range: [0, 20] },
      legend: { orientation: 'h', y: -0.2 },
      margin: { t: 50, b: 70 }
    };

    Plotly.newPlot(plotContainer, traces, layout, { responsive: true });

    const substitutionEffect = xSub - x0;
    const incomeEffect = x1 - xSub;
    outputBox.textContent = `
Original price of Good X: ${pxInitial}
New price of Good X: ${pxNew}

Original optimal bundle: x = ${x0.toFixed(2)}, y = ${y0.toFixed(2)}
Substitution bundle: x = ${xSub.toFixed(2)}, y = ${y0.toFixed(2)}
New optimal bundle: x = ${x1.toFixed(2)}, y = ${y1.toFixed(2)}

Total change in X: ${(x1 - x0).toFixed(2)} 
= Substitution (${substitutionEffect.toFixed(2)}) + Income (${incomeEffect.toFixed(2)})
    `.trim();
  }

  // Auto-draw once DOM is ready
  const pxInitialValue = parseFloat(slider.value);
  pxValSpan.textContent = pxInitialValue.toFixed(1);
  drawSubstitutionGraph(pxInitialValue);
});
