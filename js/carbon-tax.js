document.addEventListener('DOMContentLoaded', () => {
  // === PARAMETERS ===
  const income = 3000;
  const alpha = 0.3;
  const px_initial = 1.80;
  const py = 1.00;
  const px_new = px_initial * 0.8;

  // === Original Bundle ===
  const x0 = (income / px_initial) * alpha;
  const y0 = (income / py) * (1 - alpha);
  const U = Math.pow(x0, alpha) * Math.pow(y0, 1 - alpha);

  // === Substitution Bundle ===
  const x_sub = Math.pow((alpha / (1 - alpha)) * py / px_new, 1 - alpha) * (income / px_initial) * alpha;
  const y_sub = y0;

  // === New Bundle ===
  const x1 = (income / px_new) * alpha;
  const y1 = (income / py) * (1 - alpha);
  const U_new = Math.pow(x1, alpha) * Math.pow(y1, 1 - alpha);

  // === X values for plotting ===
  const x_vals = Array.from({ length: 500 }, (_, i) => 0.1 + (2000 - 0.1) * i / 499);

  // === Budget lines ===
  const y_budget_initial = x_vals.map(x => (income - px_initial * x) / py);
  const y_budget_new = x_vals.map(x => (income - px_new * x) / py);
  const income_compensated = px_new * x_sub + py * y_sub;
  const y_budget_comp = x_vals.map(x => (income_compensated - px_new * x) / py);

  // === Indifference Curves ===
  function indiff(U_level) {
    return x_vals.map(x => Math.pow(U_level, 1 / (1 - alpha)) * Math.pow(x, -alpha / (1 - alpha)));
  }

  const y_indiff_orig = indiff(U);
  const y_indiff_new = indiff(U_new);

  // === Traces ===
  const traces = [
    {
      x: x_vals,
      y: y_budget_initial,
      mode: 'lines',
      name: 'Original Budget',
      line: { color: 'gray', dash: 'dash' }
    },
    {
      x: x_vals,
      y: y_budget_new,
      mode: 'lines',
      name: 'New Budget (After Tax Cut)',
      line: { color: 'black' }
    },
    {
      x: x_vals,
      y: y_budget_comp,
      mode: 'lines',
      name: 'Compensated Budget',
      line: { color: 'purple', dash: 'dot' }
    },
    {
      x: x_vals,
      y: y_indiff_orig,
      mode: 'lines',
      name: 'Original Indifference Curve',
      line: { color: 'blue', dash: 'dash' }
    },
    {
      x: x_vals,
      y: y_indiff_new,
      mode: 'lines',
      name: 'New Indifference Curve',
      line: { color: 'green', dash: 'dash' }
    },
    {
      x: [x0], y: [y0],
      mode: 'markers',
      name: 'Original Bundle',
      marker: { color: 'red', size: 10 }
    },
    {
      x: [x_sub], y: [y0],
      mode: 'markers',
      name: 'Substitution Bundle',
      marker: { color: 'magenta', size: 10 }
    },
    {
      x: [x1], y: [y0],
      mode: 'markers',
      name: 'New Bundle',
      marker: { color: 'green', size: 10 }
    },
    {
      x: [x0, x_sub],
      y: [y0, y0],
      mode: 'lines+text',
      line: { color: 'purple', width: 2, dash: 'solid' },
      name: 'Substitution Effect',
      text: ['','Substitution Effect'],
      textposition: 'top center',
      showlegend: false
    },
    {
      x: [x_sub, x1],
      y: [y0, y0],
      mode: 'lines+text',
      line: { color: 'orange', width: 2, dash: 'solid' },
      name: 'Income Effect',
      text: ['','Income Effect'],
      textposition: 'top center',
      showlegend: false
    }
  ];

  const layout = {
    title: 'Impact of a 20% Carbon Tax Cut on Household Consumption',
    xaxis: { title: 'Gasoline (litres)', range: [0, 2000] },
    yaxis: { title: 'Groceries (units)', range: [0, 3500] },
    legend: { orientation: 'h', y: -0.2 },
    margin: { t: 60, b: 70 }
  };

  Plotly.newPlot('taxEffectPlot', traces, layout, { responsive: true });

  // === Output numerical results ===
  const output = document.getElementById('taxOutput');
  output.textContent =
    `=== Numerical Results ===
Original gasoline price: $${px_initial.toFixed(2)} → New price: $${px_new.toFixed(2)}
Original bundle: Gasoline = ${x0.toFixed(1)} L, Groceries = ${y0.toFixed(1)} units
Substitution effect bundle: Gasoline = ${x_sub.toFixed(1)} L, Groceries = ${y0.toFixed(1)} units
New bundle: Gasoline = ${x1.toFixed(1)} L, Groceries = ${y1.toFixed(1)} units
Total gasoline change: ${(x1 - x0).toFixed(1)} L = Substitution (${(x_sub - x0).toFixed(1)}) + Income (${(x1 - x_sub).toFixed(1)})`;
});
