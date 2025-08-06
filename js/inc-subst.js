const α = 0.6;
const income = 50;
const pxInitial = 5;
const py = 5;

const slider = document.getElementById("pxSlider");
const pxVal = document.getElementById("pxVal");
const plotDiv = document.getElementById("plot");
const output = document.getElementById("output");

slider.addEventListener("input", () => {
  const pxNew = parseFloat(slider.value);
  pxVal.textContent = pxNew.toFixed(1);
  drawGraph(pxNew);
});

function drawGraph(pxNew) {
  const x0 = (income / pxInitial) * α;
  const y0 = (income / py) * (1 - α);
  const U = Math.pow(x0, α) * Math.pow(y0, 1 - α);

  const compensatedY = (x) => Math.pow(U, 1 / (1 - α)) * Math.pow(x, -α / (1 - α));

  const xSub = Math.pow((α / (1 - α)) * py / pxNew, 1 - α) * (income / pxInitial) * α;
  const ySub = compensatedY(xSub);

  const x1 = (income / pxNew) * α;
  const y1 = (income / py) * (1 - α);

  const xVals = Array.from({ length: 400 }, (_, i) => 0.1 + i * ((20 - 0.1) / 400));
  const yBudgetOrig = xVals.map(x => (income - pxInitial * x) / py);
  const yBudgetNew = xVals.map(x => (income - pxNew * x) / py);
  const incomeCompensated = pxNew * xSub + py * ySub;
  const yBudgetComp = xVals.map(x => (incomeCompensated - pxNew * x) / py);
  const yIndiffOrig = xVals.map(x => Math.pow(U, 1 / (1 - α)) * Math.pow(x, -α / (1 - α)));
  const Unew = Math.pow(x1, α) * Math.pow(y1, 1 - α);
  const yIndiffNew = xVals.map(x => Math.pow(Unew, 1 / (1 - α)) * Math.pow(x, -α / (1 - α)));

  const traces = [
    {
      x: xVals, y: yBudgetOrig,
      mode: 'lines', name: 'Original Budget Line',
      line: { dash: 'dot', color: 'gray' }
    },
    {
      x: xVals, y: yBudgetNew,
      mode: 'lines', name: 'New Budget Line',
      line: { color: 'black' }
    },
    {
      x: xVals, y: yBudgetComp,
      mode: 'lines', name: 'Compensated Budget Line',
      line: { color: 'purple', dash: 'dot' }
    },
    {
      x: xVals, y: yIndiffOrig,
      mode: 'lines', name: 'Original Indifference Curve',
      line: { color: 'blue', dash: 'dot' }
    },
    {
      x: xVals, y: yIndiffNew,
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
      text: ['','Substitution Effect'], textposition: 'top center'
    },
    {
      x: [xSub, x1], y: [y0, y0],
      mode: 'lines+text', name: 'Income Effect',
      line: { color: 'orange', width: 2 },
      text: ['','Income Effect'], textposition: 'top center'
    }
  ];

  const layout = {
    title: `Substitution & Income Effects (pₓ: ${pxInitial} → ${pxNew})`,
    xaxis: { title: 'Good X', range: [0, 20] },
    yaxis: { title: 'Good Y', range: [0, 20] },
    legend: { orientation: 'h', y: -0.2 },
    margin: { t: 50, b: 70 }
  };

  Plotly.newPlot(plotDiv, traces, layout, { responsive: true });

  const substitutionEffect = xSub - x0;
  const incomeEffect = x1 - xSub;
  output.textContent =
    `Original price of Good X: ${pxInitial}
New price of Good X: ${pxNew}
Original optimal bundle: x = ${x0.toFixed(2)}, y = ${y0.toFixed(2)}
Substitution bundle: x = ${xSub.toFixed(2)}, y = ${y0.toFixed(2)}
New optimal bundle: x = ${x1.toFixed(2)}, y = ${y1.toFixed(2)}
Total change in X: ${(x1 - x0).toFixed(2)} = Substitution (${substitutionEffect.toFixed(2)}) + Income (${incomeEffect.toFixed(2)})`;
}

// Initial plot
drawGraph(parseFloat(slider.value));
