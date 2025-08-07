document.addEventListener('DOMContentLoaded', () => {
  // Generate price range from 0 to 5 (100 points)
  const prices = Array.from({ length: 100 }, (_, i) => i * 5 / 99);

  // Demand functions
  function individualDemand1(p) {
    return Math.max(10 - 2 * p, 0);
  }

  function individualDemand2(p) {
    return Math.max(15 - 3 * p, 0);
  }

  function individualDemand3(p) {
    return Math.max(8 - 1.5 * p, 0);
  }

  function marketDemand(p) {
    return individualDemand1(p) + individualDemand2(p) + individualDemand3(p);
  }

  // Compute quantities
  const q1 = prices.map(individualDemand1);
  const q2 = prices.map(individualDemand2);
  const q3 = prices.map(individualDemand3);
  const qMarket = prices.map(marketDemand);

  // Define Plotly traces
  const traces = [
    {
      x: prices,
      y: q1,
      mode: 'lines',
      name: 'Individual 1',
      line: { color: 'blue', dash: 'dash' }
    },
    {
      x: prices,
      y: q2,
      mode: 'lines',
      name: 'Individual 2',
      line: { color: 'green', dash: 'dash' }
    },
    {
      x: prices,
      y: q3,
      mode: 'lines',
      name: 'Individual 3',
      line: { color: 'purple', dash: 'dash' }
    },
    {
      x: prices,
      y: qMarket,
      mode: 'lines',
      name: 'Market Demand',
      line: { color: 'red', width: 3 }
    }
  ];

  const layout = {
    title: 'Individual Demand Curves and Market Demand Curve',
    xaxis: { title: 'Price' },
    yaxis: { title: 'Quantity Demanded' },
    legend: { orientation: 'h', y: -0.2 },
    margin: { t: 50, b: 70 }
  };

  // Plot it
  Plotly.newPlot('demandPlot', traces, layout, { responsive: true });
});
