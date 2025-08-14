// Demand and Supply equations
function demandCurve(q, intercept = 20, slope = -2) {
    return intercept + slope * q;
}

function supplyCurve(q, intercept = 2, slope = 1) {
    return intercept + slope * q;
}

// Calculate surpluses and DWL
function calculateSurplusesAndDWL(quota) {
    const initialDemandIntercept = 20;
    const initialSupplyIntercept = 2;
    const eqQuantity = (initialDemandIntercept - initialSupplyIntercept) / (1 - (-2));
    const eqPrice = demandCurve(eqQuantity, initialDemandIntercept);

    if (quota < eqQuantity) {
        const priceAtQuota = demandCurve(quota, initialDemandIntercept);
        const maxPrice = demandCurve(0, initialDemandIntercept);

        const consumerSurplus = 0.5 * quota * (maxPrice - priceAtQuota);
        const producerSurplus = 0.5 * quota * (priceAtQuota - initialSupplyIntercept);
        const dwl = 0.5 * (eqQuantity - quota) * (priceAtQuota - supplyCurve(quota, initialSupplyIntercept));

        return { eqPrice, eqQuantity, priceAtQuota, consumerSurplus, producerSurplus, dwl };
    }
    return { eqPrice, eqQuantity, consumerSurplus: null, producerSurplus: null, dwl: null };
}

function plotQuota(quota) {
    const quantities = Array.from({ length: 500 }, (_, i) => i * 0.02);

    // 1️⃣ Calculate the original equilibrium (no quota)
    const initialDemandIntercept = 20;
    const initialSupplyIntercept = 2;
    const eqQuantityOriginal = (initialDemandIntercept - initialSupplyIntercept) / (1 - (-2)); 
    const eqPriceOriginal = demandCurve(eqQuantityOriginal, initialDemandIntercept);

    const oldSurpluses = {
        maxPrice: demandCurve(0, initialDemandIntercept), // intercept on price axis
        minPrice: supplyCurve(0, initialSupplyIntercept)  // supply intercept on price axis
    };

    // 2️⃣ Calculate restricted/quota case
    const surpluses = calculateSurplusesAndDWL(quota);
    const priceAtQuota = surpluses.priceAtQuota || eqPriceOriginal;

    // "Shifted" means quota is binding
    const shifted = quota < eqQuantityOriginal;
    let eqQuantityShifted = null, eqPriceShifted = null, newSurpluses = null;

    if (shifted) {
        eqQuantityShifted = quota;
        eqPriceShifted = priceAtQuota;
        newSurpluses = {
            maxPrice: oldSurpluses.maxPrice,
            minPrice: supplyCurve(quota, initialSupplyIntercept)
        };
    }

    // Demand & supply curves
    const demand = quantities.map(q => demandCurve(q));
    const supply = quantities.map(q => supplyCurve(q));

    let traces = [
        { x: quantities, y: demand, mode: 'lines', name: 'Demand', line: { color: 'blue' } },
        { x: quantities, y: supply, mode: 'lines', name: 'Supply', line: { color: 'green' } },
        { x: [eqQuantityOriginal], y: [eqPriceOriginal], mode: 'markers+text', name: 'Equilibrium',
          text: [`Eq (Q=${eqQuantityOriginal.toFixed(2)}, P=${eqPriceOriginal.toFixed(2)})`], textposition: 'top right',
          marker: { color: 'red', size: 8 } }
    ];

    if (shifted) {
        traces.push({
            x: [quota, quota],
            y: [0, demandCurve(quota)],
            mode: 'lines',
            name: `Quota: ${quota}`,
            line: { color: 'orange', dash: 'dash' }
        });
    }

    // Shade original consumer surplus
    traces.push({
        x: [0, eqQuantityOriginal, 0],
        y: [oldSurpluses.maxPrice, eqPriceOriginal, eqPriceOriginal],
        fill: 'toself',
        fillcolor: 'rgba(0,0,255,0.15)',
        line: { width: 0 },
        name: 'Consumer Surplus (Original)',
        showlegend: true
    });

    // Shade original producer surplus
    traces.push({
        x: [0, eqQuantityOriginal, 0],
        y: [eqPriceOriginal, eqPriceOriginal, oldSurpluses.minPrice],
        fill: 'toself',
        fillcolor: 'rgba(0,128,0,0.15)',
        line: { width: 0 },
        name: 'Producer Surplus (Original)',
        showlegend: true
    });

    if (shifted) {
        // Shade shifted consumer surplus
        traces.push({
            x: [0, eqQuantityShifted, 0],
            y: [newSurpluses.maxPrice, eqPriceShifted, eqPriceShifted],
            fill: 'toself',
            fillcolor: 'rgba(0,0,255,0.4)',
            line: { width: 0 },
            name: 'Consumer Surplus (Shifted)',
            showlegend: true
        });

        // Shade shifted producer surplus
        traces.push({
            x: [0, eqQuantityShifted, 0],
            y: [eqPriceShifted, eqPriceShifted, newSurpluses.minPrice],
            fill: 'toself',
            fillcolor: 'rgba(0,128,0,0.4)',
            line: { width: 0 },
            name: 'Producer Surplus (Shifted)',
            showlegend: true
        });
    }

    Plotly.newPlot('Quota-chapter3', traces, {
        title: 'Quota Effect on Supply and Demand',
        xaxis: { title: 'Quantity' },
        yaxis: { title: 'Price' },
        showlegend: true
    });

    // Explanation
    let explanation = '';
    if (surpluses.consumerSurplus !== null) {
        explanation = `Quota restricts quantity to ${quota}, raising price to ${priceAtQuota.toFixed(2)}. 
        DWL = ${surpluses.dwl.toFixed(2)}.`;
    } else {
        explanation = `Quota of ${quota} does not impact the market.`;
    }
    document.getElementById('quotaExplanation').innerText = explanation;
}

// Slider listener
document.getElementById('quotaSlider').addEventListener('input', (e) => {
    const quota = parseFloat(e.target.value);
    document.getElementById('quotaValue').innerText = quota;
    plotQuota(quota);
});

// Initial plot
plotQuota(parseFloat(document.getElementById('quotaSlider').value));
