document.addEventListener("DOMContentLoaded", function () {
    const pXSlider = document.getElementById("pXSlider");
    const pYSlider = document.getElementById("pYSlider");
    const incomeSlider = document.getElementById("incomeSlider");

    const layout = {
        title: 'Budget Set',
        xaxis: {
            title: 'Good X',
            gridcolor: 'black',
            zeroline: false,
            linecolor: 'black',
            tickfont: { color: 'black' },
            titlefont: { color: 'black' }
        },
        yaxis: {
            title: 'Good Y',
            gridcolor: 'black',
            zeroline: false,
            linecolor: 'black',
            tickfont: { color: 'black' },
            titlefont: { color: 'black' }
        },
        paper_bgcolor: 'white',
        plot_bgcolor: 'white',
        font: { color: 'black' }
    };

    function plotBudgetSet(pX, pY, I) {
        // Reference budget line (pX = 1, pY = 1, I = 10)
        const refXMax = 10;
        const refYMax = 10;
        const refX = numeric.linspace(0, refXMax, 100);
        const refY = refX.map(x => (10 - 1 * x) / 1);

        // Current budget line
        const xMax = I / pX;
        const yMax = I / pY;
        const x = numeric.linspace(0, xMax, 100);
        const y = x.map(val => (I - pX * val) / pY);

        const data = [
            {
                x: [0, refXMax, 0],
                y: [0, 0, refYMax],
                fill: 'toself',
                fillcolor: 'rgba(0,0,255,0.15)',
                type: 'scatter',
                mode: 'none',
                name: 'Reference Budget Set'
            },
            {
                x: refX,
                y: refY,
                type: 'scatter',
                mode: 'lines',
                line: { dash: 'dash', width: 1.5, color: 'blue' },
                name: 'Reference Budget Line'
            },
            {
                x: [0, xMax, 0],
                y: [0, 0, yMax],
                fill: 'toself',
                fillcolor: 'rgba(255,0,0,0.3)',
                type: 'scatter',
                mode: 'none',
                name: 'Current Budget Set'
            },
            {
                x: x,
                y: y,
                type: 'scatter',
                mode: 'lines',
                line: { width: 2, color: 'red' },
                name: `Current Budget Line`
            }
        ];

        const updatedLayout = {
            ...layout,
            title: `Budget Set (I=${I.toFixed(1)}, pX=${pX.toFixed(1)}, pY=${pY.toFixed(1)})`,
            xaxis: { ...layout.xaxis, range: [0, Math.max(10, xMax, refXMax)] },
            yaxis: { ...layout.yaxis, range: [0, Math.max(10, yMax, refYMax)] }
        };

        Plotly.newPlot("budgetPlot", data, updatedLayout, { responsive: true });
    }

    function updatePlot() {
        plotBudgetSet(
            parseFloat(pXSlider.value),
            parseFloat(pYSlider.value),
            parseFloat(incomeSlider.value)
        );
    }

    pXSlider.addEventListener("input", updatePlot);
    pYSlider.addEventListener("input", updatePlot);
    incomeSlider.addEventListener("input", updatePlot);

    updatePlot(); // Initial render
});
