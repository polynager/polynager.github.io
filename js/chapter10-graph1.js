document.addEventListener("DOMContentLoaded", function () {
    const Q = Array.from({ length: 500 }, (_, i) => i * 0.012); // 0 to 6

    function demand(Q) { return 10 - 2 * Q; }
    function supply(Q) { return 2; }
    function marginalRevenue(Q) { return 10 - 4 * Q; }

    function plotPricingStrategy(caseType) {
        let traces = [];
        let equilibrium_Q, equilibrium_P, monopoly_Q, monopoly_P;

        if (caseType === "Perfect Competition") {
            equilibrium_Q = (10 - 2) / 2;
            equilibrium_P = 2;

            traces.push({
                x: Q, y: Q.map(demand), name: "Demand (P = 10 - 2Q)",
                mode: "lines", line: { color: "black" }
            });
            traces.push({
                x: Q, y: Q.map(supply), name: "Supply (P = 2)",
                mode: "lines", line: { color: "orange" }
            });

            // Consumer Surplus
            traces.push({
                x: [...Q.filter(q => q <= equilibrium_Q), equilibrium_Q],
                y: [...Q.filter(q => q <= equilibrium_Q).map(demand), equilibrium_P],
                fill: "tonexty", mode: "none",
                fillcolor: "rgba(0,255,0,0.4)", name: "Consumer Surplus"
            });

        } else if (caseType === "Market Power") {
            monopoly_Q = (10 - 2) / 4;
            monopoly_P = demand(monopoly_Q);
            equilibrium_Q = (10 - 2) / 2;
            equilibrium_P = 2;

            traces.push({
                x: Q, y: Q.map(demand), name: "Demand (P = 10 - 2Q)",
                mode: "lines", line: { color: "black" }
            });
            traces.push({
                x: Q, y: Q.map(marginalRevenue), name: "MR (P = 10 - 4Q)",
                mode: "lines", line: { color: "purple", dash: "dash" }
            });
            traces.push({
                x: Q, y: Q.map(supply), name: "Supply (P = 2)",
                mode: "lines", line: { color: "orange" }
            });

            // Consumer Surplus
            traces.push({
                x: [...Q.filter(q => q <= monopoly_Q), monopoly_Q],
                y: [...Q.filter(q => q <= monopoly_Q).map(demand), monopoly_P],
                fill: "tonexty", mode: "none",
                fillcolor: "rgba(0,255,0,0.4)", name: "Consumer Surplus"
            });

            // Producer Surplus
            traces.push({
                x: [...Q.filter(q => q <= monopoly_Q), monopoly_Q],
                y: [...Array(Q.filter(q => q <= monopoly_Q).length).fill(2), 2],
                fill: "tonexty", mode: "none",
                fillcolor: "rgba(0,0,255,0.4)", name: "Producer Surplus"
            });

            // Deadweight Loss
            traces.push({
                x: [...Q.filter(q => q > monopoly_Q && q <= equilibrium_Q), equilibrium_Q],
                y: [...Q.filter(q => q > monopoly_Q && q <= equilibrium_Q).map(demand), equilibrium_P],
                fill: "tonexty", mode: "none",
                fillcolor: "rgba(255,0,0,0.4)", name: "Deadweight Loss"
            });

        } else if (caseType === "Perfect Price Discrimination") {
            traces.push({
                x: Q, y: Q.map(demand), name: "Demand (P = 10 - 2Q)",
                mode: "lines", line: { color: "black" }
            });
            traces.push({
                x: Q, y: Q.map(supply), name: "Supply (P = 2)",
                mode: "lines", line: { color: "orange" }
            });

            traces.push({
                x: [...Q.filter(q => q <= (10 - 2) / 2), (10 - 2) / 2],
                y: [...Q.filter(q => q <= (10 - 2) / 2).map(demand), 2],
                fill: "tonexty", mode: "none",
                fillcolor: "rgba(0,0,255,0.4)", name: "Producer Surplus"
            });
        }

        Plotly.newPlot("chart1", traces, {
            title: caseType,
            xaxis: { title: "Quantity (Q)", range: [0, 6] },
            yaxis: { title: "Price (P)", range: [0, 12] }
        });
    }

    document.getElementById("scenarioSelect").addEventListener("change", function () {
        plotPricingStrategy(this.value);
    });

    plotPricingStrategy("Perfect Competition");
});
