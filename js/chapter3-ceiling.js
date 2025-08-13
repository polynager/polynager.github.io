(() => {
  const initialDemandIntercept = 20;
  const initialSupplyIntercept = 2;

  const slider = document.getElementById('priceCeiling');
  const ceilingValue = document.getElementById('ceilingValue');
  const explanationEl = document.getElementById('explanation');
  const plotDiv = document.getElementById('Ceiling-chapter3');

  if (!slider || !ceilingValue || !plotDiv) {
    console.warn("Ceiling module: Required elements not found. Skipping.");
    return;
  }

  // ====== FUNCTIONS ======
  const demandCurve = (q, intercept = initialDemandIntercept, slope = -2) =>
    intercept + slope * q;

  const supplyCurve = (q, intercept = initialSupplyIntercept, slope = 1) =>
    intercept + slope * q;

  function calculateSurplusesAndDWL(priceCeiling) {
    const eqQuantityOriginal =
      (initialDemandIntercept - initialSupplyIntercept) / (1 - (-2));
    const eqPriceOriginal = demandCurve(eqQuantityOriginal);

    if (priceCeiling < eqPriceOriginal) {
      // Quantity supplied at ceiling price
      const qSupplyCeiling = priceCeiling - initialSupplyIntercept;

      // Surpluses
      const consumerSurplus =
        0.5 * qSupplyCeiling * (initialDemandIntercept - priceCeiling);
      const producerSurplus =
        0.5 * qSupplyCeiling * (priceCeiling - initialSupplyIntercept);
      const dwl =
        0.5 *
        (eqQuantityOriginal - qSupplyCeiling) *
        (demandCurve(qSupplyCeiling) - supplyCurve(qSupplyCeiling));

      return {
        eqPriceOriginal,
        eqQuantityOriginal,
        qSupplyCeiling,
        consumerSurplus,
        producerSurplus,
        dwl
      };
    } else {
      return {
        eqPriceOriginal,
        eqQuantityOriginal,
        consumerSurplus: null,
        producerSurplus: null,
        dwl: null
      };
    }
  }

  function explainPriceCeiling(priceCeiling, s) {
    if (priceCeiling < s.eqPriceOriginal) {
      return `The price ceiling of ${priceCeiling.toFixed(
        2
      )} is below the equilibrium price of ${s.eqPriceOriginal.toFixed(2)}.
Quantity supplied falls to ${s.qSupplyCeiling.toFixed(
        2
      )}, causing a shortage.
Consumer surplus and producer surplus both fall, and deadweight loss is ${s.dwl.toFixed(
        2
      )}.`;
    } else {
      return `The price ceiling of ${priceCeiling.toFixed(
        2
      )} is at or above the equilibrium price of ${s.eqPriceOriginal.toFixed(
        2
      )}.
No effect on the market.`;
    }
  }

function plotPriceCeiling(priceCeiling) {
  const quantities = Array.from({ length: 101 }, (_, i) => i * 0.1);
  const demandPrices = quantities.map(q => demandCurve(q));
  const supplyPrices = quantities.map(q => supplyCurve(q));

  const s = calculateSurplusesAndDWL(priceCeiling);

  // Original equilibrium
  const eqQuantityOriginal = s.eqQuantityOriginal;
  const eqPriceOriginal = s.eqPriceOriginal;

  const traces = [
    {
      x: quantities,
      y: demandPrices,
      mode: 'lines',
      name: 'Demand Curve',
      line: { color: 'blue' }
    },
    {
      x: quantities,
      y: supplyPrices,
      mode: 'lines',
      name: 'Supply Curve',
      line: { color: 'green' }
    },
    // Red dot for original equilibrium
    {
      x: [eqQuantityOriginal],
      y: [eqPriceOriginal],
      mode: 'markers+text',
      name: 'Equilibrium',
      text: [`Q=${eqQuantityOriginal.toFixed(2)}, P=${eqPriceOriginal.toFixed(2)}`],
      textposition: 'top right',
      marker: { color: 'red', size: 8 }
    }
  ];

  if (s.consumerSurplus !== null) {
    traces.push({
      x: [0, s.qSupplyCeiling],
      y: [priceCeiling, priceCeiling],
      mode: 'lines',
      name: 'Price Ceiling',
      line: { dash: 'dash', color: 'orange' }
    });
  }

  Plotly.newPlot(plotDiv, traces, {
    title: 'Price Ceiling Effect',
    xaxis: { title: 'Quantity' },
    yaxis: { title: 'Price', range: [0, 22] }
  });

  if (explanationEl) {
    explanationEl.textContent = explainPriceCeiling(priceCeiling, s);
  }
}


  // ====== INIT ======
  const eqPrice = demandCurve(
    (initialDemandIntercept - initialSupplyIntercept) / (1 - (-2))
  );
  slider.value = eqPrice.toFixed(1);
  ceilingValue.textContent = slider.value;
  plotPriceCeiling(parseFloat(slider.value));

  slider.addEventListener('input', () => {
    ceilingValue.textContent = slider.value;
    plotPriceCeiling(parseFloat(slider.value));
  });
})();
