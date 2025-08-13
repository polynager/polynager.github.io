document.addEventListener("DOMContentLoaded", function () {
    const Q = Array.from({ length: 101 }, (_, i) => i); // 0 to 100

    function demandLocal(Q) { return 200 - 2 * Q; }
    function demandTravel(Q) { return 140 - Q; }

    function plotTravelLocal(MC_value) {
        let MC = MC_value;

        let traces = [
            {
                x: Q, y: Q.map(demandLocal),
                name: "Local Demand", mode: "lines",
                line: { color: "blue" }
            },
            {
                x: Q, y: Q.map(demandTravel),
                name: "Travel Demand", mode: "lines",
                line: { color: "green" }
            },
            {
                x: Q, y: Array(Q.length).fill(MC),
                name: `MC = ${MC}`, mode: "lines",
                line: { color: "red", dash: "dash" }
            }
        ];

        Plotly.newPlot("chart2", traces, {
            title: "Traveling vs Local Market",
            xaxis: { title: "Quantity (Q)" },
            yaxis: { title: "Price (P)" }
        });
    }

    const MC_slider = document.getElementById("MC_slider");
    const MC_value_label = document.getElementById("MC_value");

    MC_slider.addEventListener("input", function () {
        MC_value_label.textContent = this.value;
        plotTravelLocal(Number(this.value));
    });

    plotTravelLocal(Number(MC_slider.value));
});
