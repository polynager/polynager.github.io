document.addEventListener("DOMContentLoaded", function () {
    const alphaSlider = document.getElementById("alphaBundleSlider");
    const pXSlider = document.getElementById("pXBundleSlider");
    const pYSlider = document.getElementById("pYBundleSlider");

    const layout = {
        xaxis: {
            title: 'Good X',
            gridcolor: 'black',
            zeroline: false,
            linecolor: 'black',
            tickfont: { color: 'black' },
            titlefont: { color: 'black' },
            scaleanchor: 'y'
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
        font: { color: 'black' },
        title: 'Cobb-Douglas Utility & Budget Constraint'
    };

    function plot(alpha, pX, pY) {
        const x = numeric.linspace(0.1, 20, 100);
        const y = numeric.linspace(0.1, 20, 100);
        const Z = [];
        const budgetMask = [];

        const minU = 10;

        // Compute utility and budget mask
        for (let i = 0; i < y.length; i++) {
            const rowU = [];
            const rowMask = [];
            for (let j = 0; j < x.length; j++) {
                const u = Math.pow(x[j], alpha) * Math.pow(y[i], 1 - alpha);
                rowU.push(u);
                rowMask.push(0); // temp, fill later
            }
            Z.push(rowU);
            budgetMask.push(rowMask);
        }

        // Optimal bundle
        const xOpt = minU / Math.pow((pX / pY) * ((1 - alpha) / alpha), 1 - alpha);
        const yOpt = (pX / pY) * ((1 - alpha) / alpha) * xOpt;
        const reqI = pX * xOpt + pY * yOpt;

        // Update budget mask
        for (let i = 0; i < y.length; i++) {
            for (let j = 0; j < x.length; j++) {
                const isInBudget = pX * x[j] + pY * y[i] <= reqI;
                budgetMask[i][j] = isInBudget ? 1 : 0;
            }
        }

        // Budget line
        const budgetY = x.map(xVal => {
            const val = (reqI - pX * xVal) / pY;
            return val >= 0 ? val : null;
        });

        const data = [
            // Budget Set Shading
            {
                z: budgetMask,
                x: x,
                y: y,
                type: 'contour',
                showscale: false,
                contours: { start: 0.5, end: 1.5, size: 1, coloring: 'heatmap' },
                colorscale: [[0, 'rgba(0,255,255,0.2)'], [1, 'rgba(0,255,255,0.2)']],
                hoverinfo: 'skip'
            },
            // Utility Contours
            {
                z: Z,
                x: x,
                y: y,
                type: 'contour',
                contours: {
                    coloring: 'lines',
                    showlabels: true,
                    labelfont: { size: 12, color: 'black' },
                    start: minU - 5,
                    end: minU + 5,
                    size: 5
                },
                line: { width: 1.5, color: 'black' },
                name: 'Utility Contours'
            },
            // Budget Line
            {
                x: x,
                y: budgetY,
                mode: 'lines',
                type: 'scatter',
                line: { color: 'black', width: 2 },
                name: 'Budget Line'
            },
            // Optimal Point
            {
                x: [xOpt],
                y: [yOpt],
                mode: 'markers',
                type: 'scatter',
                marker: { color: 'red', size: 8 },
                name: 'Optimal Bundle'
            }
        ];

        Plotly.newPlot('cobbDouglasBundlePlot', data, layout, { responsive: true });
    }

    function update() {
        plot(
            parseFloat(alphaSlider.value),
            parseFloat(pXSlider.value),
            parseFloat(pYSlider.value)
        );
    }

    alphaSlider.addEventListener("input", update);
    pXSlider.addEventListener("input", update);
    pYSlider.addEventListener("input", update);

    update();
});
