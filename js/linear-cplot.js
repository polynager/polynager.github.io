document.addEventListener("DOMContentLoaded", function () {
    const pXSlider = document.getElementById("pXLinearSlider");
    const pYSlider = document.getElementById("pYLinearSlider");
    const aSlider = document.getElementById("aLinearSlider");
    const bSlider = document.getElementById("bLinearSlider");

    const layout = {
        xaxis: { title: 'Good X', range: [0, 10], gridcolor: 'black' },
        yaxis: { title: 'Good Y', range: [0, 10], gridcolor: 'black' },
        paper_bgcolor: 'white',
        plot_bgcolor: 'white',
        font: { color: 'black' },
        showlegend: true,
        title: 'Linear Utility with Budget Constraint'
    };

    function plot(pX, pY, a, b) {
        const x = numeric.linspace(0.01, 10, 100);
        const y = numeric.linspace(0.01, 10, 100);
        const U_min = 10;
        const levels = [U_min - 5, U_min, U_min + 5];

        // Compute utility grid
        const Z = y.map(yi => x.map(xi => a * xi + b * yi));

        // Value per dollar
        const valX = a / pX;
        const valY = b / pY;

        let x_optimal, y_optimal, req_I;

        if (Math.abs(valX - valY) < 1e-4) {
            // Infinite bundles on budget line
            x_optimal = numeric.linspace(0, U_min / a, 50);
            y_optimal = x_optimal.map(xi => (U_min - a * xi) / b);
            req_I = pX * x_optimal[0] + pY * y_optimal[0];
        } else if (valX > valY) {
            x_optimal = U_min / a;
            y_optimal = 0;
            req_I = pX * x_optimal;
        } else {
            x_optimal = 0;
            y_optimal = U_min / b;
            req_I = pY * y_optimal;
        }

        // Budget region
        const budgetMask = y.map(yi => x.map(xi => (pX * xi + pY * yi <= req_I ? 1 : 0)));

        // Budget line
        const budgetLineY = x.map(xi => {
            const yi = (req_I - pX * xi) / pY;
            return yi >= 0 ? yi : null;
        });

        const data = [
            // Budget shading
            {
                z: budgetMask,
                x: x,
                y: y,
                type: 'contour',
                showscale: false,
                contours: { coloring: 'heatmap', start: 0.5, end: 1.5, size: 1 },
                colorscale: [[0, 'rgba(0,255,255,0.2)'], [1, 'rgba(0,255,255,0.2)']],
                hoverinfo: 'skip'
            },
            // Budget line
            {
                x: x,
                y: budgetLineY,
                mode: 'lines',
                line: { color: 'black', width: 2 },
                name: 'Budget Line'
            },
            // Utility contours
            ...levels.map((lvl, i) => ({
                z: Z,
                x: x,
                y: y,
                type: 'contour',
                contours: { start: lvl, end: lvl, size: 1 },
                line: {
                    color: ['#999999', '#0066cc', '#999999'][i],
                    dash: 'dot'
                },
                showscale: false,
                name: `U = ${lvl}`
            })),
            // Optimal bundle(s)
            typeof x_optimal === 'number'
                ? {
                      x: [x_optimal],
                      y: [y_optimal],
                      mode: 'markers',
                      marker: { color: 'red', size: 8 },
                      name: 'Optimal Bundle'
                  }
                : {
                      x: x_optimal,
                      y: y_optimal,
                      mode: 'markers',
                      marker: { color: 'red', size: 6 },
                      name: 'Optimal Bundles'
                  }
        ];

        Plotly.newPlot('linearPlot', data, layout, { responsive: true });
    }

    function update() {
        plot(
            parseFloat(pXSlider.value),
            parseFloat(pYSlider.value),
            parseFloat(aSlider.value),
            parseFloat(bSlider.value)
        );
    }

    [pXSlider, pYSlider, aSlider, bSlider].forEach(slider => slider.addEventListener("input", update));

    update();
});
