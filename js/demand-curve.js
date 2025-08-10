document.addEventListener('DOMContentLoaded', () => {
  // Basic demand curve function: Q = a - bP
  function basicDemandCurve(p, a = 100, b = 10) {
    return a - b * p;
  }

  // Generate a range of prices
  const prices = Array.from({ length: 100 }, (_, i) => i * (15 / 99));

  // Calculate quantities
  const quantities = prices.map(p => basicDemandCurve(p));

  // Create Plotly trace
  const traceDemand = {
    x: quantities,
    y: prices,
    mode: 'lines',
    name: 'Demand Curve',
    line: { color: 'blue' }
  };

  const layout = {
    title: 'Basic Demand Curve',
    xaxis: { title: 'Quantity', range: [0, 150] },
    yaxis: { title: 'Price', range: [0, 15] },
    grid: true
  };

  Plotly.newPlot('demandcurvePlot', [traceDemand], layout, { responsive: true });
});
