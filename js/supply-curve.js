document.addEventListener('DOMContentLoaded', () => {
  // Supply curve: Q = c * P - d
  function basicSupplyCurve(p, c = 10, d = 0) {
    return c * p - d;
  }

  // Generate price range from 0 to 15
  const prices = Array.from({ length: 100 }, (_, i) => i * (15 / 99));
  const quantitiesSupplied = prices.map(p => basicSupplyCurve(p));

  // Filter positive quantities only
  const positiveData = prices.reduce((acc, price, i) => {
    if (quantitiesSupplied[i] >= 0) {
      acc.q.push(quantitiesSupplied[i]);
      acc.p.push(price);
    }
    return acc;
  }, { q: [], p: [] });

  // Plot trace
  const traceSupply = {
    x: positiveData.q,
    y: positiveData.p,
    mode: 'lines',
    name: 'Supply Curve',
    line: { color: 'green' }
  };

  const layout = {
    title: 'Basic Supply Curve',
    xaxis: { title: 'Quantity', range: [0, 150] },
    yaxis: { title: 'Price', range: [0, 15] }
  };

  Plotly.newPlot('supplyCurvePlot', [traceSupply], layout, { responsive: true });
});
