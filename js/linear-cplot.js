document.addEventListener("DOMContentLoaded", function () {
    const pXSlider = document.getElementById("pXLinearSlider");
    const pYSlider = document.getElementById("pYLinearSlider");
    const aSlider = document.getElementById("aLinearSlider");
    const bSlider = document.getElementById("bLinearSlider");

    function plot(pX, pY, a, b) {
        const x = numeric.linspace(0.01, 10, 100);
        const y = numeric.linspace(0.01, 10, 100);

        let X = [], Y = [];
        for (let i = 0; i < y.length; i++) {
            for (let j = 0; j < x.length; j++) {
                X.push(x[j]);
                Y.push(y[i]);
            }
        }

        // Compute utility on grid U = a * x + b * y
        // Reshape for Plotly contour, but here we use 2D arrays:
        let U = [];
        let budgetMask = [];
        for (let i = 0; i < y.length; i++) {
            let rowU = [];
            let rowMask = [];
            for (let j = 0; j < x.length; j++) {
                const valU = a * x[j] + b * y[i];
                rowU.push(valU);
                // We'll determine budget set below
                rowMask.push(0);
            }
            U.push(rowU);
            budgetMask.push(rowMask);
        }

        // Utility level chosen arbitrarily similar to your Python code
        const U_min = 10;
        const levels = [U_min - 5, U_min, U_min + 5];

        // Utility per dollar
        const ratioX = a / pX;
        const ratioY = b / pY;

        let xOptimal, yOptimal;

        // Decision logic for optimal bundles:
        if (Math.abs(ratioX - ratioY) < 1e-6) {
            // Infinite optimal bundles along budget line satisfying U = U_min
            // x_opt and y_opt parametrize the line: a*x + b*y = U_min
            // We'll sample 100 points where x from 0 to U_min / a and y = (U_min - a*x) / b
            xOptimal = numeric.linspace(0, U_min / a, 100);
            yOptimal = xOptimal.map(xv => (U_min - a * xv) / b);
        } else if (ratioX > ratioY) {
            // Corner solution: all income on X
            xOptimal = U_min / a;
            yOptimal = 0;
        } else {
            // Corner solution: all income on Y
            xOptimal = 0;
            yOptimal = U_min / b;
        }

        // Required income based on optimal bundle(s)
        let reqIncome;
        if (Array.isArray(xOptimal)) {
            reqIncome = pX * xOptimal[0] + pY * yOptimal[0];
        } else {
            reqIncome = pX * xOptimal + pY * yOptimal;
        }

        // Create budget mask for shading (1 inside budget, 0 outside)
        for (let i = 0; i < y.length; i++) {
            for (let j = 0; j < x.length; j++) {
                budgetMask[i][j] = pX * x[j] + pY * y[i] <= reqIncome ? 1 : 0;
            }
        }

        // Budget line: y = (reqIncome - pX * x) / pY
        const budgetY = x.map(xv => {
            const yv = (reqIncome - pX * xv) / pY;
            return yv >= 0 ? yv : null;
        });

        // Build data for Plotly
        const data = [
            {
                z: budgetMask,
                x: x,
                y: y,
                type: 'contour',
                showscale: false,
                contours: { coloring: 'heatmap', start: 0.5, end: 1.5, size: 1 },
                colorscale: [[0, 'rgba(0, 150, 136, 0)'], [1, 'rgba(0, 150, 136, 0.15)']],
                hoverinfo: 'skip',
                name: 'Budget Set'
            },
            {
                z: U,
                x: x,
                y: y,
                type: 'contour',
                contours: {
                    coloring: 'lines',
                    showlabels: true,
                    labelfont: { size: 12, color: 'black' },
                    start: levels[0],
                    end: levels[2],
                    size: 5
                },
                line: { width: 1.5, color: '#666666', dash: 'dash' },
                name: 'Utility Contours'
            },
            {
                x: x,
                y: budgetY,
                mode: 'lines',
                type: 'scatter',
                line: { color: 'black', width: 2 },
                name: 'Budget Line'
            }
        ];

        // Add optimal bundle(s)
        if (Array.isArray(xOptimal)) {
            data.push({
                x: xOptimal,
                y: yOptimal,
                mode: 'markers',
                type: 'scatter',
                marker: { color: 'red', size: 6 },
                name: 'Optimal Bundles'
            });
        } else {
            data.push({
                x: [xOptimal],
                y: [yOptimal],
                mode: 'markers',
                type: 'scatter',
                marker: { color: 'red', size: 8 },
                name: 'Optimal Bundle'
            });
        }

        const layout = {
            title: `Linear Utility with Budget Constraint: a=${a.toFixed(2)}, b=${b.toFixed(2)}, pX=${pX.toFixed(2)}, pY=${pY.toFixed(2)}`,
            xaxis: { title: 'Good X', range: [0, 10], gridcolor: 'black' },
            yaxis: { title: 'Good Y', range: [0, 10], gridcolor: 'black' },
            paper_bgcolor: 'white',
            plot_bgcolor: 'white',
            font: { color: 'black' }
        };

        Plotly.newPlot('linearBundlePlot', data, layout, { responsive: true });
    }

    function update() {
        plot(
            parseFloat(pXSlider.value),
            parseFloat(pYSlider.value),
            parseFloat(aSlider.value),
            parseFloat(bSlider.value)
        );
    }

    pXSlider.addEventListener('input', update);
    pYSlider.addEventListener('input', update);
    aSlider.addEventListener('input', update);
    bSlider.addEventListener('input', update);

    update();
});
