document.addEventListener('DOMContentLoaded', () => {
  function basicSupplyCurve(p, c = 10, d = 0) {
    return c * p - d;
  }

  function plotSupplyShift() {
    const changeInTech = document.getElementById('techChange').checked;
    const lowerCosts = document.getElementById('lowCosts').checked;

    let shift = 0;
    let explanation = "No change in supply.";

    if (changeInTech) {
      shift -= 30;
      explanation = "Supply increased due to better technology. Firms can produce more efficiently, lowering costs and increasing supply.";
    }

    if (lowerCosts) {
      shift -= 20;
      explanation = "Supply increased due to lower production costs. Firms can offer more goods at every price level.";
    }

    // Generate prices
    const prices = Array.from({ length: 100 }, (_, i) => i * (15 / 99));

    // Original supply
    const originalSupply = prices.map(p => basicSupplyCurve(p));
    const positiveOriginal = prices.reduce((acc, price, i) => {
      if (originalSupply[i] >= 0) {
        acc.q.push(originalSupply[i]);
        acc.p.push(price);
      }
      return acc;
    }, { q: [], p: [] });

    // Shifted supply
    const shiftedSupply = prices.map(p => basicSupplyCurve(p, 10, shift));
    const positiveShifted = prices.reduce((acc, price, i) => {
      if (shiftedSupply[i] >= 0) {
        acc.q.push(shiftedSupply[i]);
        acc.p.push(price);
      }
      return acc;
    }, { q: [], p: [] });

    // Plot traces
    const traceOriginal = {
      x: positiveOriginal.q,
      y: positiveOriginal.p,
      mode: 'lines',
      name: 'Original Supply',
      line: { color: 'green' }
    };

    const traceShifted = {
      x: positiveShifted.q,
      y: positiveShifted.p,
      mode: 'lines',
      name: 'Shifted Supply',
      line: { dash: 'dash', color: 'darkgreen' }
    };

    const layout = {
      title: 'Impact of Supply Shifts',
      xaxis: { title: 'Quantity', range: [0, 150] },
      yaxis: { title: 'Price', range: [0, 15] }
    };

    Plotly.newPlot('supplyShiftPlot', [traceOriginal, traceShifted], layout, { responsive: true });
    document.getElementById('supplyExplanation').innerText = explanation;
  }

  // Initial plot
  plotSupplyShift();

  // Event listeners for checkboxes
  document.getElementById('techChange').addEventListener('change', plotSupplyShift);
  document.getElementById('lowCosts').addEventListener('change', plotSupplyShift);
});
