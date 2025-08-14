(function() {
    if (!document.getElementById("market-firm-plot")) return; // Prevent crash if div not present

    const demandIntercept = 8;
    const demandSlope = -0.008;
    const supplySlope = 0.008;

    const marketQuantities = Array.from({length: 100}, (_, i) => i * 1000 / 99);
    const marketDemandPrice = marketQuantities.map(q => demandIntercept + demandSlope * q);
    const marketSupplyPrice = marketQuantities.map(q => supplySlope * q);

    const firmQuantities = Array.from({length: 100}, (_, i) => i * 200 / 99);
    const firmDemandPrice = firmQuantities.map(_ => 4);

    const layout = {
        grid: {rows: 1, columns: 2, pattern: 'independent'},
        title: "Market and Firm Demand Curves at Equilibrium Price $4",
        showlegend: true,
        xaxis: {title: "Quantity"},
        yaxis: {title: "Price"},
        xaxis2: {title: "Quantity"},
        yaxis2: {title: "Price"}
    };

    Plotly.newPlot('market-firm-plot', [
        {x: marketQuantities, y: marketDemandPrice, name: "Market Demand", line: {color: "orange", dash: "dash"}, type: "scatter", xaxis: 'x', yaxis: 'y'},
        {x: marketQuantities, y: marketSupplyPrice, name: "Market Supply", line: {color: "green", dash: "dash"}, type: "scatter", xaxis: 'x', yaxis: 'y'},
        {x: [500], y: [4], mode: "markers", marker: {color: "black", size: 8}, name: "Equilibrium", xaxis: 'x', yaxis: 'y'},
        {x: firmQuantities, y: firmDemandPrice, name: "Firm Demand", line: {color: "blue"}, type: "scatter", xaxis: 'x2', yaxis: 'y2'}
    ], layout);
})();
