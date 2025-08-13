(() => {
  // Initial parameters for the original curves
  const initialDemandIntercept = 20;
  const initialSupplyIntercept = 2;

  // Demand and supply functions
  function demandCurve(q, intercept = 20, slope = -2) {
    return intercept + slope * q;
  }

  function supplyCurve(q, intercept = 2, slope = 1) {
    return intercept + slope * q;
  }

  // Function to calculate surpluses
  function calculateSurplus(eqQuantity, eqPrice, demandIntercept, supplyIntercept) {
    const maxPrice = demandCurve(0, demandIntercept);
    const consumerSurplus = 0.5 * eqQuantity * (maxPrice - eqPrice);

    const minPrice = supplyCurve(0, supplyIntercept);
    const producerSurplus = 0.5 * eqQuantity * (eqPrice - minPrice);

    return { consumerSurplus, producerSurplus, maxPrice, minPrice };
  }

  // Function to explain shifts
  function explainShift(shiftType, oldSurpluses, newSurpluses) {
    const { consumerSurplus: oldCS, producerSurplus: oldPS } = oldSurpluses;
    const { consumerSurplus: newCS, producerSurplus: newPS } = newSurpluses;
    let explanation = "";

    if (shiftType === "Supply Shift Left") {
      explanation = `Supply shifted left due to higher costs. Consumer surplus decreased by ${(oldCS - newCS).toFixed(2)}, producer surplus decreased by ${(oldPS - newPS).toFixed(2)}.`;
    } else if (shiftType === "Supply Shift Right") {
      explanation = `Supply shifted right due to lower costs. Consumer surplus increased by ${(newCS - oldCS).toFixed(2)}, producer surplus increased by ${(newPS - oldPS).toFixed(2)}.`;
    } else if (shiftType === "Demand Shift Left") {
      explanation = `Demand shifted left due to lower preference. Consumer surplus decreased by ${(oldCS - newCS).toFixed(2)}, producer surplus decreased by ${(oldPS - newPS).toFixed(2)}.`;
    } else if (shiftType === "Demand Shift Right") {
      explanation = `Demand shifted right due to higher preference. Consumer surplus increased by ${(newCS - oldCS).toFixed(2)}, producer surplus increased by ${(newPS - oldPS).toFixed(2)}.`;
    }

    return explanation;
  }

  // Main plotting function
  function plotShift(shiftType, showOldEq) {
    const quantities = Array.from({ length: 500 }, (_, i) => i * 0.02); // 0 to 10

    let demandIntercept = initialDemandIntercept;
    let supplyIntercept = initialSupplyIntercept;
    let shifted = false;

    // Apply shifts
    if (shiftType === "Supply Shift Left") { supplyIntercept += 5; shifted = true; }
    else if (shiftType === "Supply Shift Right") { supplyIntercept -= 5; shifted = true; }
    else if (shiftType === "Demand Shift Left") { demandIntercept -= 5; shifted = true; }
    else if (shiftType === "Demand Shift Right") { demandIntercept += 5; shifted = true; }

    // Shifted curves and equilibrium
    const pricesDemandShifted = quantities.map(q => demandCurve(q, demandIntercept));
    const pricesSupplyShifted = quantities.map(q => supplyCurve(q, supplyIntercept));
    const eqQuantityShifted = (demandIntercept - supplyIntercept) / (1 - (-2));
    const eqPriceShifted = demandCurve(eqQuantityShifted, demandIntercept);

    // Original equilibrium
    const eqQuantityOriginal = (initialDemandIntercept - initialSupplyIntercept) / (1 - (-2));
    const eqPriceOriginal = demandCurve(eqQuantityOriginal, initialDemandIntercept);

    const oldSurpluses = calculateSurplus(eqQuantityOriginal, eqPriceOriginal, initialDemandIntercept, initialSupplyIntercept);
    const newSurpluses = shifted ? calculateSurplus(eqQuantityShifted, eqPriceShifted, demandIntercept, supplyIntercept) : { consumerSurplus: null, producerSurplus: null };

    const traces = [];

    // Original curves
    traces.push({
      x: quantities,
      y: quantities.map(q => demandCurve(q, initialDemandIntercept)),
      mode: 'lines',
      name: 'Original Demand Curve',
      line: { dash: 'dot', color: 'blue' }
    });
    traces.push({
      x: quantities,
      y: quantities.map(q => supplyCurve(q, initialSupplyIntercept)),
      mode: 'lines',
      name: 'Original Supply Curve',
      line: { dash: 'dot', color: 'green' }
    });

    // Shade original consumer surplus
    traces.push({
      x: [0, eqQuantityOriginal, 0],
      y: [oldSurpluses.maxPrice, eqPriceOriginal, eqPriceOriginal],
      fill: 'toself',
      fillcolor: 'rgba(0,0,255,0.2)',
      line: { width: 0 },
      name: 'Consumer Surplus (Original)',
      showlegend: shifted
    });

    // Shade original producer surplus
    traces.push({
      x: [0, eqQuantityOriginal, 0],
      y: [eqPriceOriginal, eqPriceOriginal, oldSurpluses.minPrice],
      fill: 'toself',
      fillcolor: 'rgba(0,128,0,0.2)',
      line: { width: 0 },
      name: 'Producer Surplus (Original)',
      showlegend: shifted
    });

    if (shifted) {
      // Shifted curves
      traces.push({
        x: quantities,
        y: pricesDemandShifted,
        mode: 'lines',
        name: 'Shifted Demand Curve',
        line: { color: 'blue' }
      });
      traces.push({
        x: quantities,
        y: pricesSupplyShifted,
        mode: 'lines',
        name: 'Shifted Supply Curve',
        line: { color: 'green' }
      });

      // Shade shifted consumer surplus
      traces.push({
        x: [0, eqQuantityShifted, 0],
        y: [newSurpluses.maxPrice, eqPriceShifted, eqPriceShifted],
        fill: 'toself',
        fillcolor: 'rgba(0,0,255,0.4)',
        line: { width: 0 },
        name: 'Consumer Surplus (Shifted)'
      });

      // Shade shifted producer surplus
      traces.push({
        x: [0, eqQuantityShifted, 0],
        y: [eqPriceShifted, eqPriceShifted, newSurpluses.minPrice],
        fill: 'toself',
        fillcolor: 'rgba(0,128,0,0.4)',
        line: { width: 0 },
        name: 'Producer Surplus (Shifted)'
      });
    }

    Plotly.newPlot('Surplus-chapter3', traces, {
      title: `Supply and Demand Shift: ${shiftType}`,
      xaxis: { title: 'Quantity' },
      yaxis: { title: 'Price' },
      margin: { t: 50 }
    });

    const explanationEl = document.getElementById('explanationSurplus');
    if (shifted && explanationEl) {
      explanationEl.textContent = explainShift(shiftType, oldSurpluses, newSurpluses);
    }
  }

  const shiftSelect = document.getElementById('shiftType');
  const showOldEqCheckbox = document.getElementById('showOldEq');

  function updatePlot() {
    plotShift(shiftSelect.value, showOldEqCheckbox.checked);
  }

  shiftSelect.addEventListener('change', updatePlot);
  showOldEqCheckbox.addEventListener('change', updatePlot);

  updatePlot();
})();
