const initialDemandIntercept = 20;
const initialSupplyIntercept = 2;

// Demand and supply functions
function demandCurve(q, intercept = 20, slope = -2) {
  return intercept + slope * q;
}

function supplyCurve(q, intercept = 2, slope = 1) {
  return intercept + slope * q;
}

// Calculate surpluses and DWL
function calculateSurplusesAndDWL(priceCeiling) {
  const eqQuantityOriginal = (initialDemandIntercept - initialSupplyIntercept) / (1 - (-2));
  const eqPriceOriginal = demandCurve(eqQuantityOriginal, initialDemandIntercept);

  if (priceCeiling < eqPriceOriginal) {
    const qSupplyCeiling = priceCeiling - 2;
    const consumerSurplus = 0.5 * qSupplyCeiling * (initialDemandIntercept - priceCeiling);
    const producerSurplus = 0.5 * qSupplyCeiling * (priceCeiling - initialSupplyIntercept);
    const dwl = 0.5 * (eqQuantityOriginal - qSupplyCeiling) * (demandCurve(qSupplyCeiling) - supplyCurve(qSupplyCeiling));

    return {
      eqPriceOriginal, eqQuantityOriginal, qSupplyCeiling,
      consumerSurplus, producerSurplus, dwl
    };
  } else {
    return { eqPriceOriginal, eqQuantityOriginal, consumerSurplus: null, producerSurplus: null, dwl: null };
  }
}

// Explain effect
function explainPriceCeiling(priceCeiling, s) {
  if (priceCeiling < s.eqPriceOriginal) {
    return `The price ceiling of ${priceCeiling.toFixed(2)} is below the equilibrium price of ${s.eqPriceOriginal.toFixed(2)}.
Quantity supplied falls to ${s.qSupplyCeiling.toFixed(2)}, causing a shortage.
Consumer surplus and producer surplus both fall, and deadweight loss is ${s.dwl.toFixed(2)}.`;
  } else {
    return `The price ceiling of ${priceCeiling.toFixed(2)} is at or above the equilibrium price of ${s.eqPriceOriginal.toFixed(2)}.
No effect on the market.`;
  }
}

// Plot function
function plotPriceCeiling(priceCeiling) {
  const quantities = Array.from({ length: 100 }, (_, i) => i * 0.1);
  const demandPrices = quantities.map(q => demandCurve(q));
  const supplyPrices = quantities.map(q => supplyCurve(q));

  const s = calculateSurplusesAndDWL(priceCeiling);

  const traces = [
    { x: quantities, y: demandPrices, mode: 'lines', name: 'Demand Curve', line: { color: 'blue' } },
    { x: quantities, y: supplyPrices, mode: 'lines', name: 'Supply Curve', line: { color: 'green' } }
  ];

  // Add price ceiling line if applicable
  if (s.consumerSurplus !== null) {
    traces.push({
      x: [0, s.qSupplyCeiling],
      y: [priceCeiling, priceCeiling],
      mode: 'lines',
      name: 'Price Ceiling',
      line: { dash: 'dash', color: 'orange' }
    });
  }

  Plotly.newPlot('Ceiling-chapter3', traces, {
    title: 'Price Ceiling Effect',
    xaxis: { title: 'Quantity' },
    yaxis: { title: 'Price', range: [0, 22] }
  });

  document.getElementById('explanation').textContent = explainPriceCeiling(priceCeiling, s);
}

// Slider control
const slider = document.getElementById('priceCeiling');
const ceilingValue = document.getElementById('ceilingValue');

slider.value = demandCurve((initialDemandIntercept - initialSupplyIntercept) / (1 - (-2)), initialDemandIntercept).toFixed(1);
ceilingValue.textContent = slider.value;
plotPriceCeiling(parseFloat(slider.value));

slider.addEventListener('input', () => {
  ceilingValue.textContent = slider.value;
  plotPriceCeiling(parseFloat(slider.value));
});
