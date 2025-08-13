document.addEventListener("DOMContentLoaded", function () {
    const Q = Array.from({ length: 101 }, (_, i) => i); // 0 to 100

    function demandSegment1(Q) { return 120 - Q; }
    function demandSegment2(Q) { return 80 - 0.5 * Q; }

    function plotSegmentation(MC_value) {
        let MC = MC_value;

        let traces = [
            {
                x: Q, y: Q.map(demandSegment1),
                name: "Segment 1 Demand", mode: "lines",
                line: { color: "blue" }
            },
            {
                x: Q, y: Q.map(demandSegment2),
                name: "Segment 2 Demand", mode: "lines",
                line: { color: "orange" }
            },
            {
                x: Q, y: Array(Q.length).fill(MC),
                name: `MC = ${MC}`, mode: "lines",
                line: { color: "red", dash: "dash" }
            }
        ];

        Plotly.newPlot("chart3", traces, {
            title: "Market Segmentation Impact",
            xaxis: { title: "Quantity (Q)" },
            yaxis: { title: "Price (P)" }
        });
    }

    const MC_slider3 = document.getElementById("MC_slider3");
    const MC_value_label3 = document.getElementById("MC_value3");

    MC_slider3.addEventListener("input", function () {
        MC_value_label3.textContent = this.value;
        plotSegmentation(Number(this.value));
    });

    plotSegmentation(Number(MC_slider3.value));
});
