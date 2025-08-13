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

// Plot with Plotly
function plotQuota(quota) {
    const quantities = Array.from({ length: 500 }, (_, i) => i * 0.02);
    const surpluses = calculateSurplusesAndDWL(quota);

    const demand = quantities.map(q => demandCurve(q));
    const supply = quantities.map(q => supplyCurve(q));

    let traces = [
        { x: quantities, y: demand, mode: 'lines', name: 'Demand', line: { color: 'blue' } },
        { x: quantities, y: supply, mode: 'lines', name: 'Supply', line: { color: 'green' } },
        { x: [surpluses.eqQuantity], y: [surpluses.eqPrice], mode: 'markers+text', name: 'Equilibrium', 
          text: [`Eq (Q=${surpluses.eqQuantity.toFixed(2)}, P=${surpluses.eqPrice.toFixed(2)})`], textposition: 'top right',
          marker: { color: 'red', size: 8 } }
    ];

    if (surpluses.consumerSurplus !== null) {
        // Quota line
        traces.push({
            x: [quota, quota],
            y: [0, demandCurve(quota)],
            mode: 'lines',
            name: `Quota: ${quota}`,
            line: { color: 'orange', dash: 'dash' }
        });
    }

    Plotly.newPlot('Quota-chapter3', traces, {
        title: 'Quota Effect on Supply and Demand',
        xaxis: { title: 'Quantity' },
        yaxis: { title: 'Price' },
        showlegend: true
    });

    // Show explanation
    let explanation = '';
    if (surpluses.consumerSurplus !== null) {
        explanation = `Quota restricts quantity to ${quota}, raising price to ${surpluses.priceAtQuota.toFixed(2)}. 
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
