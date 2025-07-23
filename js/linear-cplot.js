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

        // Budget line for plotting and filling
        const budgetLineX_plot = numeric.linspace(0, 10, 200); // More points for smoother line and fill
        const budgetLineY_plot = budgetLineX_plot.map(xi => {
            const yi = (req_I - pX * xi) / pY;
            return yi >= 0 ? yi : null; // Keep null for values below x-axis
        });

        // Filter out nulls for the budget line trace, but keep for fill if needed
        const budgetLineX_filtered = [];
        const budgetLineY_filtered = [];
        for (let i = 0; i < budgetLineX_plot.length; i++) {
            if (budgetLineY_plot[i] !== null) {
                budgetLineX_filtered.push(budgetLineX_plot[i]);
                budgetLineY_filtered.push(budgetLineY_plot[i]);
            }
        }
        
        // Prepare points for the shaded budget region (polygon)
        const fillX = [0, ...budgetLineX_filtered, budgetLineX_filtered[budgetLineX_filtered.length - 1], 0];
        const fillY = [0, ...budgetLineY_filtered, 0, 0];
        // Ensure the polygon is correctly formed: (0,0) -> (x-intercept,0) -> (along budget line) -> (0,y-intercept) -> (0,0)

        // Adjusting fill points for potential x/y intercepts
        let budgetAreaX = [0];
        let budgetAreaY = [0];

        // Add points along the budget line from X-intercept to Y-intercept
        for (let i = 0; i < budgetLineX_plot.length; i++) {
            if (budgetLineY_plot[i] !== null) {
                budgetAreaX.push(budgetLineX_plot[i]);
                budgetAreaY.push(budgetLineY_plot[i]);
            }
        }

        // Add the y-intercept
        budgetAreaX.push(0);
        budgetAreaY.push(req_I / pY);

        // Add the x-intercept if it's not the first point and close the polygon
        if (req_I / pX > 0 && (budgetAreaX[1] !== req_I / pX || budgetAreaY[1] !== 0)) {
             // This condition prevents adding 0,0 again if it's already the start,
             // and ensures x-intercept is added if budget line doesn't start from there
             // Also add the point on the x-axis to close the shape
             budgetAreaX.push(req_I / pX);
             budgetAreaY.push(0);
        }

        // Close the polygon by adding the first point again
        budgetAreaX.push(budgetAreaX[0]);
        budgetAreaY.push(budgetAreaY[0]);
        
        // Remove duplicates if any (e.g., origin added multiple times)
        const uniqueBudgetAreaPoints = {};
        const finalBudgetAreaX = [];
        const finalBudgetAreaY = [];
        for (let i = 0; i < budgetAreaX.length; i++) {
            const key = `${budgetAreaX[i]},${budgetAreaY[i]}`;
            if (!uniqueBudgetAreaPoints[key]) {
                uniqueBudgetAreaPoints[key] = true;
                finalBudgetAreaX.push(budgetAreaX[i]);
                finalBudgetAreaY.push(budgetAreaY[i]);
            }
        }


        const data = [
            // Budget shading using a scatter trace with fill
            {
                x: finalBudgetAreaX,
                y: finalBudgetAreaY,
                mode: 'lines', // We just need to define the boundary for filling
                fill: 'toself', // Fill the area defined by the points
                fillcolor: 'rgba(178, 34, 34, 0.5)', // Red color with transparency
                line: { width: 0 }, // No line for the fill itself, as budget line is separate
                showlegend: false, // Don't show this in the legend
                name: 'Budget Set (Shaded)'
            },
            // Budget line (your existing budget line trace)
            {
                x: budgetLineX_plot, // Use the full range of x for the line plot
                y: budgetLineY_plot,
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

    [pXSlider, pYSlider, aSlider, bSlider].forEach(slider => slider.addEventListener("input", update));

    update();
});
