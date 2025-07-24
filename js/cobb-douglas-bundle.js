document.addEventListener("DOMContentLoaded", function () {
    const alphaSlider = document.getElementById("alphaBundleSlider");
    const pXSlider = document.getElementById("pXBundleSlider");
    const pYSlider = document.getElementById("pYBundleSlider");
    const income = 10; // Or add an income slider if you want dynamic income

    function plot(alpha, pX, pY) {
        const x = numeric.linspace(0.1, 20, 100);
        const y = numeric.linspace(0.1, 20, 100);

        let Z = [], budgetMask = [];

        for (let i = 0; i < y.length; i++) {
            let rowU = [], rowMask = [];
            for (let j = 0; j < x.length; j++) {
                rowU.push(Math.pow(x[j], alpha) * Math.pow(y[i], 1 - alpha));
                rowMask.push(pX * x[j] + pY * y[i] <= income ? 1 : 0);
            }
            Z.push(rowU);
            budgetMask.push(rowMask);
        }

        // Budget line y = (income - pX * x) / pY
        const budgetY = x.map(xVal => {
            const yVal = (income - pX * xVal) / pY;
            return yVal >= 0 ? yVal : null;
        });

        const xOpt = (alpha * income) / pX;
        const yOpt = ((1 - alpha) * income) / pY;

        const data = [
            {
                z: budgetMask,
                x: x,
                y: y,
                type: 'contour',
                showscale: false,
                contours: { coloring: 'heatmap', start: 0.5, end: 1.5, size: 1 },
                colorscale: [[0, 'rgba(0,0,255,0)'], [1, 'rgba(0,0,255,0.15)']],
                hoverinfo: 'skip',
                name: 'Budget Set'
            },
            {
                z: Z,
                x: x,
                y: y,
                type: 'contour',
                contours: { coloring: 'lines', showlabels: true, labelfont: { size: 12, color: 'black' }, start: 5, end: 15, size: 2 },
                line: { width: 1.5, color: 'black' },
                name: 'Utility Contours'
            },
            {
                x: x,
                y: budgetY,
                mode: 'lines',
                type: 'scatter',
                line: { color: 'black', width: 2 },
                name: 'Budget Line'
            },
            {
                x: [xOpt],
                y: [yOpt],
                mode: 'markers',
                type: 'scatter',
                marker: { color: 'red', size: 8 },
                name: 'Optimal Bundle'
            }
        ];

        const layout = {
            xaxis: { title: 'Good X', gridcolor: 'black' },
            yaxis: { title: 'Good Y', gridcolor: 'black' },
            paper_bgcolor: 'white',
            plot_bgcolor: 'white',
            font: { color: 'black' },
            title: 'Cobb-Douglas Utility with Budget Constraint'
        };

        Plotly.newPlot('cobbDouglasBundlePlot', data, layout, { responsive: true });
    }

    function update() {
        plot(parseFloat(alphaSlider.value), parseFloat(pXSlider.value), parseFloat(pYSlider.value));
        // Optionally update displayed slider values here
    }

    alphaSlider.addEventListener("input", update);
    pXSlider.addEventListener("input", update);
    pYSlider.addEventListener("input", update);

    update();
});
