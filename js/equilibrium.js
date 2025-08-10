document.addEventListener('DOMContentLoaded', () => {

  function demandCurve(p, slope_d = 10, shift_d = 0) {
    return 100 - slope_d * p + shift_d;
  }

  function supplyCurve(p, slope_s = 10, shift_s = 0) {
    return slope_s * p - 50 + shift_s;
  }

  function findEquilibrium(slope_d, slope_s, shift_d, shift_s) {
    // Solve: demandCurve(p) = supplyCurve(p)
    const eqPrice = (100 + shift_d + 50 - shift_s) / (slope_d + slope_s);
    const eqQuantity = demandCurve(eqPrice, slope_d, shift_d);
    return { price: eqPrice, quantity: eqQuantity };
  }

  function explanation(changePref, prefShift, changeCost, costShift) {
    let exp = "The equilibrium point has changed due to the following reasons:\n";
    if (changePref && prefShift !== 0) {
      exp += prefShift > 0
        ? `- Demand increased by ${prefShift}, shifting the demand curve upward.\n`
        : `- Demand decreased by ${Math.abs(prefShift)}, shifting the demand curve downward.\n`;
    }
    if (changeCost && costShift !== 0) {
      exp += costShift > 0
        ? `- Production costs decreased by ${costShift}, shifting supply rightward.\n`
        : `- Production costs increased, shifting supply leftward.\n`;
    }
    if (exp === "The equilibrium point has changed due to the following reasons:\n") {
      exp += "- No changes were made to demand or supply curves.";
    }
    return exp;
  }

  function plotEquilibrium() {
    const changePref = document.getElementById('changePref').checked;
    const prefShift = parseFloat(document.getElementById('prefShift').value);
    const changeCost = document.getElementById('changeCost').checked;
    const costShift = parseFloat(document.getElementById('costShift').value);
    const slope_d = parseFloat(document.getElementById('slopeD').value);
    const slope_s = parseFloat(document.getElementById('slopeS').value);

    document.getElementById('prefShiftVal').innerText = prefShift;
    document.getElementById('costShiftVal').innerText = costShift;
    document.getElementById('slopeDVal').innerText = slope_d;
    document.getElementById('slopeSVal').innerText = slope_s;

    const prices = Array.from({ length: 100 }, (_, i) => i * (15 / 99));

    const demandShiftValue = changePref ? prefShift : 0;
    const supplyShiftValue = changeCost ? -costShift : 0;

    const originalDemand = prices.map(p => demandCurve(p, slope_d, 0));
    const originalSupply = prices.map(p => supplyCurve(p, slope_s, 0));
    const shiftedDemand = prices.map(p => demandCurve(p, slope_d, demandShiftValue));
    const shiftedSupply = prices.map(p => supplyCurve(p, slope_s, supplyShiftValue));

    const eqOriginal = findEquilibrium(slope_d, slope_s, 0, 0);
    const eqShifted = findEquilibrium(slope_d, slope_s, demandShiftValue, supplyShiftValue);

    const traces = [
      { x: originalDemand, y: prices, mode: 'lines', name: 'Original Demand', line: { dash: 'dash', color: 'blue' } },
      { x: originalSupply, y: prices, mode: 'lines', name: 'Original Supply', line: { dash: 'dash', color: 'green' } },
      { x: shiftedDemand, y: prices, mode: 'lines', name: 'Shifted Demand', line: { color: 'blue' } },
      { x: shiftedSupply, y: prices, mode: 'lines', name: 'Shifted Supply', line: { color: 'green' } },
      { x: [eqOriginal.quantity], y: [eqOriginal.price], mode: 'markers+text', text: [`P=${eqOriginal.price.toFixed(2)}, Q=${eqOriginal.quantity.toFixed(2)}`], textposition: 'top center', name: 'Original Equilibrium', marker: { color: 'blue', size: 10 } },
      { x: [eqShifted.quantity], y: [eqShifted.price], mode: 'markers+text', text: [`P=${eqShifted.price.toFixed(2)}, Q=${eqShifted.quantity.toFixed(2)}`], textposition: 'top center', name: 'Shifted Equilibrium', marker: { color: 'red', size: 10 } }
    ];

    const layout = {
      title: 'Market Equilibrium: Original vs. Shifted',
      xaxis: { title: 'Quantity', range: [0, 150] },
      yaxis: { title: 'Price', range: [0, 15] },
      legend: { orientation: 'h' }
    };

    Plotly.newPlot('equilibriumPlot', traces, layout, { responsive: true });

    document.getElementById('equilibriumExplanation').innerText =
      explanation(changePref, prefShift, changeCost, costShift) +
      `\nOriginal Equilibrium: P=${eqOriginal.price.toFixed(2)}, Q=${eqOriginal.quantity.toFixed(2)}` +
      `\nShifted Equilibrium: P=${eqShifted.price.toFixed(2)}, Q=${eqShifted.quantity.toFixed(2)}`;
  }

  // Attach listeners
  ['changePref', 'prefShift', 'changeCost', 'costShift', 'slopeD', 'slopeS'].forEach(id => {
    document.getElementById(id).addEventListener('input', plotEquilibrium);
  });

  plotEquilibrium();
});
