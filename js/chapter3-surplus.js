const initialDemandIntercept = 20;
const initialSupplyIntercept = 2;

// Demand and Supply functions
function demandCurve(q, intercept = 20, slope = -2) {
  return intercept + slope * q;
}

function supplyCurve(q, intercept = 2, slope = 1) {
  return intercept + slope * q;
}

// Calculate surplus
function calculateSurplus(eqQuantity, eqPrice, demandIntercept, supplyIntercept) {
  const maxPrice = demandCurve(0, demandIntercept);
  const consumerSurplus = 0.5 * eqQuantity * (maxPrice - eqPrice);

  const minPrice = supplyCurve(0, supplyIntercept);
  const producerSurplus = 0.5 * eqQuantity * (eqPrice - minPrice);

  return [consumerSurplus, producerSurplus];
}

// Generate quantities array
function linspace(start, end, num) {
  const arr = [];
  const step = (end - start) / (num - 1);
  for (let i = 0; i < num; i++) {
    arr.push(start + step * i);
  }
  return arr;
}

// Explanation generator
function explainShift(shiftType, oldCS, oldPS, newCS, newPS) {
  if (shiftType === "Supply Shift Left") {
    return `Supply shifted left due to higher manufacturing costs. 
    Producer surplus decreased by ${(oldPS - newPS).toFixed(2)}, 
    consumer surplus decreased by ${(oldCS - newCS).toFixed(2)}.`;
  } else if (shiftType === "Supply Shift Right") {
    return `Supply shifted right due to lower manufacturing costs. 
    Producer surplus increased by ${(newPS - oldPS).toFixed(2)}, 
    consumer surplus increased by ${(newCS - oldCS).toFixed(2)}.`;
  } else if (shiftType === "Demand Shift Left") {
    return `Demand shifted left due to reduced consumer preference. 
    Consumer surplus decreased by ${(oldCS - newCS).toFixed(2)}, 
    producer surplus decreased by ${(oldPS - newPS).toFixed(2)}.`;
  } else if (shiftType === "Demand Shift Right") {
    return `Demand shifted right due to increased consumer preference. 
    Consumer surplus increased by ${(newCS - oldCS).toFixed(2)}, 
    producer surplus increased by ${(newPS - oldPS).toFixed(2)}.`;
  }
  return "";
}

function plotShift() {
  const shiftType = document.getElementById("shiftType").value;
  const showOldEq = document.getElementById("showOldEq").checked;

  // Base intercepts
  let demandIntercept = initialDemandIntercept;
  let supplyIntercept = initialSupplyIntercept;

  // Apply shifts
  if (shiftType === "Supply Shift Left") supplyIntercept += 7;
  if (shiftType === "Supply Shift Right") supplyIntercept -= 7;
  if (shiftType === "Demand Shift Left") demandIntercept -= 7;
  if (shiftType === "Demand Shift Right") demandIntercept += 7;

  // Original and shifted equilibria
  const eqQOriginal = (initialDemandIntercept - initialSupplyIntercept) / 3; // slope diff = 1 - (-2) = 3
  const eqPOriginal = demandCurve(eqQOriginal, initialDemandIntercept);
  const eqQShifted = (demandIntercept - supplyIntercept) / 3;
  const eqPShifted = demandCurve(eqQShifted, demandIntercept);

  // Determine quantity range for plotting
  const maxQ = Math.max(eqQOriginal, eqQShifted) * 1.2; // add 20% padding
  const quantities = linspace(0, maxQ, 200);

  // Surpluses
  const [oldCS, oldPS] = calculateSurplus(eqQOriginal, eqPOriginal, initialDemandIntercept, initialSupplyIntercept);
  const [newCS, newPS] = calculateSurplus(eqQShifted, eqPShifted, demandIntercept, supplyIntercept);

  const traces = [];

  // Original curves
  if (showOldEq) {
    traces.push({
      x: quantities,
      y: quantities.map(q => demandCurve(q, initialDemandIntercept)),
      mode: "lines",
      name: "Original Demand",
      line: { dash: "dash", color: "blue" }
    });
    traces.push({
      x: quantities,
      y: quantities.map(q => Math.max(0, supplyCurve(q, initialSupplyIntercept))),
      mode: "lines",
      name: "Original Supply",
      line: { dash: "dash", color: "green" }
    });
    traces.push({
      x: [eqQOriginal],
      y: [eqPOriginal],
      mode: "markers+text",
      text: [`Orig Eq (Q=${eqQOriginal.toFixed(2)}, P=${eqPOriginal.toFixed(2)})`],
      textposition: "top right",
      marker: { color: "black", size: 8 },
      name: "Original Eq"
    });
  }

  // Shifted curves
  traces.push({
    x: quantities,
    y: quantities.map(q => demandCurve(q, demandIntercept)),
    mode: "lines",
    name: "Shifted Demand",
    line: { color: "blue" }
  });
  traces.push({
    x: quantities,
    y: quantities.map(q => Math.max(0, supplyCurve(q, supplyIntercept))),
    mode: "lines",
    name: "Shifted Supply",
    line: { color: "green" }
  });
  traces.push({
    x: [eqQShifted],
    y: [eqPShifted],
    mode: "markers+text",
    text: [`Shifted Eq (Q=${eqQShifted.toFixed(2)}, P=${eqPShifted.toFixed(2)})`],
    textposition: "top right",
    marker: { color: "red", size: 8 },
    name: "Shifted Eq"
  });

  const layout = {
    title: `Supply and Demand Shift: ${shiftType}`,
    xaxis: { title: "Quantity" },
    yaxis: { title: "Price", range: [0, Math.max(eqPOriginal, eqPShifted) * 1.2] },
    legend: { x: 1, y: 1 }
  };

  Plotly.newPlot("Surplus-chapter3", traces, layout);

  // Surplus table
  let tableHTML = "<table border='1' cellpadding='5'><tr><th></th><th>Consumer Surplus</th><th>Producer Surplus</th></tr>";
  tableHTML += `<tr><td>Original</td><td>${oldCS.toFixed(2)}</td><td>${oldPS.toFixed(2)}</td></tr>`;
  tableHTML += `<tr><td>Shifted</td><td>${newCS.toFixed(2)}</td><td>${newPS.toFixed(2)}</td></tr>`;
  tableHTML += "</table>";
  document.getElementById("table").innerHTML = tableHTML;

  // Explanation
  if (shifted) {
    document.getElementById("explanation").textContent = explainShift(shiftType, oldCS, oldPS, newCS, newPS);
  } else {
    document.getElementById("explanation").textContent = "";
  }
}

// Event listeners
document.getElementById("shiftType").addEventListener("change", plotShift);
document.getElementById("showOldEq").addEventListener("change", plotShift);

// Initial plot
plotShift();
