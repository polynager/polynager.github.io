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

    return { consumerSurplus, producerSurplus };
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

    // Default intercepts
    let demandIntercept = initialDemandIntercept;
    let supplyIntercept = initialSupplyIntercept;
    let shifted = false;

    // Apply shifts
    if (shiftType === "Supply Shift Left") { supplyIntercept += 5; shifted = true; }
    else if (shiftType === "Supply Shift Right") { supplyIntercept -= 5; shifted = true; }
    else if (shiftType === "Demand Shift Left") { demandIntercept -= 5; shifted = true; }
    else if (shiftType === "Demand Shift Right") { demandIntercept += 5; shifted = true; }

    // Calculate shifted curves and equilibrium
    const pricesDemandShifted = quantities.map(q => demandCurve(q, demandIntercept));
    const pricesSupplyShifted = quantities.map(q => supplyCurve(q, supplyIntercept));
    const eqQuantityShifted = (demandIntercept - supplyIntercept) / (1 - (-2));
    const eqPriceShifted = demandCurve(eqQuantityShifted, demandIntercept);

    // Original equilibrium
    const eqQuantityOriginal = (initialDemandIntercept - initialSupplyIntercept) / (1 - (-2));
    const eqPriceOriginal = demandCurve(eqQuantityOriginal, initialDemandIntercept);

    const oldSurpluses = calculateSurplus(eqQuantityOriginal, eqPriceOriginal, initialDemandIntercept, initialSupplyIntercept);
    const newSurpluses = shifted ? calculateSurplus(eqQuantityShifted, eqPriceShifted, demandIntercept, supplyIntercept) : { consumerSurplus: null, producerSurplus: null };

    // Plot traces
    const traces = [];
 
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
      traces.push({
        x: [eqQuantityOriginal],
        y: [eqPriceOriginal],
        mode: 'markers+text',
        name: 'Original Eq',
        text: [`Q=${eqQuantityOriginal.toFixed(2)}, P=${eqPriceOriginal.toFixed(2)}`],
        textposition: 'top right',
        marker: { color: 'black', size: 8 }
      });
  

    if (shifted) {
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
      traces.push({
        x: [eqQuantityShifted],
        y: [eqPriceShifted],
        mode: 'markers+text',
        name: 'Shifted Eq',
        text: [`Q=${eqQuantityShifted.toFixed(2)}, P=${eqPriceShifted.toFixed(2)}`],
        textposition: 'top right',
        marker: { color: 'red', size: 8 }
      });
    }

    Plotly.newPlot('Surplus-chapter3', traces, {
      title: `Supply and Demand Shift: ${shiftType}`,
      xaxis: { title: 'Quantity' },
      yaxis: { title: 'Price' },
      margin: { t: 50 }
    });

    // Display explanation
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

  // Initial plot
  updatePlot();
})();
