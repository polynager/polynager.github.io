const quantities = Array.from({length: 100}, (_, i) => 0.1 + i * (5 - 0.1)/99);

// Market price
const marketPrice = 5;

// Cost functions
function totalCost(Q) {
    return Q.map(q => q**3 - 2*q**2 + 1.1*q + 12);
}

function marginalCost(Q) {
    return Q.map(q => 3*q**2 - 4*q + 1.1);
}

function averageTotalCost(Q) {
    const TC = totalCost(Q);
    return TC.map((tc,q) => tc/q);
}

function adjustableAVC(Q, shift) {
    const TC = totalCost(Q);
    return TC.map((tc,q) => (tc - 12)/q + shift);
}

// Solve MC = P for optimal quantity (numerical approximation)
function findOptimalQuantity() {
    let minDiff = Infinity;
    let optimalQ = quantities[0];
    const mcVals = marginalCost(quantities);
    for(let i=0; i<quantities.length; i++){
        const diff = Math.abs(mcVals[i] - marketPrice);
        if(diff < minDiff) {
            minDiff = diff;
            optimalQ = quantities[i];
        }
    }
    return optimalQ;
}

let optimalQuantity = findOptimalQuantity();

// Plot function
function plotAVCShift(shift) {
    const mcValues = marginalCost(quantities);
    const atcValues = averageTotalCost(quantities);
    const avcValues = adjustableAVC(quantities, shift);
    const marketPriceLine = quantities.map(_ => marketPrice);

    const mcAtOptimal = 3*optimalQuantity**2 - 4*optimalQuantity + 1.1;
    const avcAtOptimal = (totalCost([optimalQuantity])[0] - 12)/optimalQuantity + shift;

    // Update text about production decision
    const decision = document.getElementById("decision");
    if(avcAtOptimal < marketPrice){
        console.log("AVC is below market price at optimal Q: produce.");
    } else {
        console.log("AVC is above market price at optimal Q: shut down.");
    }

    const data = [
        {x: quantities, y: mcValues, name: "MC", line: {color:"red"}, type:"scatter"},
        {x: quantities, y: atcValues, name: "ATC", line: {color:"purple"}, type:"scatter"},
        {x: quantities, y: avcValues, name: "AVC", line: {color:"green"}, type:"scatter"},
        {x: quantities, y: marketPriceLine, name: "Market Price", line: {color:"blue", dash:"dash"}, type:"scatter"},
        {x: [optimalQuantity], y: [mcAtOptimal], mode:"markers", marker:{color:"black", size:8}, name:"MC at Q*"},
        {x: [optimalQuantity], y: [avcAtOptimal], mode:"markers", marker:{color:"black", size:8}, name:"AVC at Q*"},
        {x: [optimalQuantity, optimalQuantity], y: [0, Math.max(mcAtOptimal, avcAtOptimal, marketPrice)], line: {color:"black", dash:"dash"}, type:"scatter", name:"Optimal Q"}
    ];

    const layout = {
        title: "Cost Curves with Adjustable AVC",
        xaxis: {title: "Quantity (Q)"},
        yaxis: {title: "Price / Cost", range:[0,20]},
        showlegend: true
    };

    Plotly.newPlot('Chapter8-plot2', data, layout);
}

// Initial plot
plotAVCShift(0);

// Slider interaction
const slider = document.getElementById("avcShift");
const display = document.getElementById("avcValue");

slider.addEventListener("input", () => {
    const value = parseFloat(slider.value);
    display.textContent = value.toFixed(1);
    plotAVCShift(value);
});
