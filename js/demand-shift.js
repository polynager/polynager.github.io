document.addEventListener('DOMContentLoaded', () => {
  const prefCheckbox = document.getElementById('prefCheckbox');
  const subCheckbox = document.getElementById('subCheckbox');
  const plotDiv = document.getElementById('demandShiftPlot');
  const explanationDiv = document.getElementById('demandShiftExplanation');

  function basicDemandCurve(p, a = 100, b = 10) {
    return a - b * p;
  }

  function plotDemandShift() {
    const prices = Array.from({ length: 100 }, (_, i) => i * (15 / 99));

    let shift = 0;
    let explanation = "No change in demand.";

    if (prefCheckbox.checked) {
      shift += 30;
      explanation = "Consumer preference for the good has increased. Consumers are willing to pay higher prices at every quantity, shifting the demand curve to the right.";
    }

    if (subCheckbox.checked) {
      shift -= 20;
      explanation = "The price of a substitute has decreased, so demand for the original good falls. This shifts the demand curve to the left.";
    }

    const originalQuantities = prices.map(p => basicDemandCurve(p));
    const shiftedQuantities = prices.map(p => basicDemandCurve(p, 100 + shift));

    const traceOriginal = {
      x: originalQuantities,
      y: prices,
      mode: 'lines',
      name: 'Original Demand',
      line: { color: 'blue' }
    };

    const traceShifted = {
      x: shiftedQuantities,
      y: prices,
      mode: 'lines',
      name: 'Shifted Demand',
      line: { color: 'red', dash: 'dash' }
    };

    const layout = {
      title: 'Impact of Demand Shifts',
      xaxis: { title: 'Quantity', range: [0, 150] },
      yaxis: { title: 'Price', range: [0, 15] }
    };

    Plotly.newPlot(plotDiv, [traceOriginal, traceShifted], layout, { responsive: true });

    explanationDiv.innerHTML = `<p>${explanation}</p>`;
  }

  prefCheckbox.addEventListener('change', plotDemandShift);
  subCheckbox.addEventListener('change', plotDemandShift);

  plotDemandShift(); // initial plot
});
