const marketPrice = 5;
const quantities = Array.from({length: 100}, (_, i) => 0.1 + i * (5 - 0.1) / 99);

// Cost functions
function baseTotalCost(Q) {
    return Q**3 - 2*Q**2 + 1.1*Q + 12;
}
function marginalCost(Q, shift) {
    return 3*Q**2 - 4*Q + 1.1 + shift;
}
function averageTotalCost(Q, shift) {
    return (baseTotalCost(Q) + shift * Q) / Q;
}

// Solve MC = Price (Newton's method)
function solveOptimalQuantity(shift, guess = 2) {
    let Q = guess;
    for (let i = 0; i < 50; i++) {
        const f = marginalCost(Q, shift) - marketPrice;
        const fprime = (marginalCost(Q + 1e-6, shift) - marginalCost(Q - 1e-6, shift)) / (2e-6);
        Q = Q - f / fprime;
    }
    return Q;
}

// Area under curve (trapezoidal)
function trapz(y, x) {
    let sum = 0;
    for (let i = 0; i < y.length - 1; i++) {
        sum += 0.5 * (y[i] + y[i+1]) * (x[i+1] - x[i]);
    }
    return sum;
}

function updatePlot(shift) {
    const mcValues = quantities.map(Q => marginalCost(Q, shift));
    const atcValues = quantities.map(Q => averageTotalCost(Q, shift));
    const marketPriceLine = quantities.map(_ => marketPrice);

    const optimalQuantity = solveOptimalQuantity(shift);
    const Qsubset = quantities.filter(Q => Q <= optimalQuantity);
    const MCsubset = mcValues.slice(0, Qsubset.length);

    const producerSurplusArea = trapz(
        Qsubset.map((Q, i) => marketPrice - MCsubset[i]),
        Qsubset
    );

    const surplusY = Qsubset.map(() => marketPrice);
    const surplusFill = {
        x: [...Qsubset, ...Qsubset.slice().reverse()],
        y: [...surplusY, ...MCsubset.slice().reverse()],
        fill: 'toself',
        fillcolor: 'rgba(255,165,0,0.3)',
        line: {width: 0},
        type: 'scatter',
        mode: 'lines',
        name: `Producer Surplus ≈ ${producerSurplusArea.toFixed(2)}`
    };

    const traceMC = {x: quantities, y: mcValues, mode: 'lines', name: 'Marginal Cost (MC)', line: {color: 'red'}};
    const traceATC = {x: quantities, y: atcValues, mode: 'lines', name: 'Average Total Cost (ATC)', line: {color: 'purple'}};
    const tracePrice = {x: quantities, y: marketPriceLine, mode: 'lines', name: 'Market Price (P=5)', line: {color: 'blue', dash: 'dash'}};
    const traceOptLine = {x: [optimalQuantity, optimalQuantity], y: [0, marketPrice], mode: 'lines', name: 'Optimal Quantity', line: {color: 'black', dash: 'dash'}};
    const traceOptPoint = {x: [optimalQuantity], y: [marginalCost(optimalQuantity, shift)], mode: 'markers', name: 'MC=MR', marker: {color: 'black', size: 8}};

    Plotly.newPlot('plot', [traceMC, traceATC, tracePrice, traceOptLine, traceOptPoint, surplusFill], {
        title: 'Producer Surplus with Adjustable Total Cost',
        xaxis: {title: 'Quantity (Q)'},
        yaxis: {title: 'Price / Cost', range: [0, 20]},
        legend: {orientation: 'h', y: -0.2}
    });

    const output = document.getElementById('output');
    if (producerSurplusArea >= 0) {
        output.innerHTML = `
            <p><b>Producer Surplus is non-negative</b> at the profit-maximizing quantity.</p>
            <p>The firm will produce in the short run.</p>
            <p>Producer Surplus: ${producerSurplusArea.toFixed(2)}</p>
        `;
    } else {
        output.innerHTML = `
            <p><b>Producer Surplus is negative</b> at the profit-maximizing quantity.</p>
            <p>The firm will shut down in the short run.</p>
            <p>Producer Surplus: 0 (Firm shuts down)</p>
        `;
    }
}

// Initial plot
updatePlot(0);

// Slider event
document.getElementById('shift').addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    document.getElementById('shiftValue').textContent = val;
    updatePlot(val);
});
