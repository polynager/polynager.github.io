document.addEventListener("DOMContentLoaded", function () {
    const pXSlider = document.getElementById("pXLeontiefSlider");
    const pYSlider = document.getElementById("pYLeontiefSlider");
    const aSlider = document.getElementById("aLeontiefSlider");
    const bSlider = document.getElementById("bLeontiefSlider");

    const layout = {
        xaxis: {
            title: 'Good X',
            gridcolor: 'black',
            zeroline: false,
            linecolor: 'black'
        },
        yaxis: {
            title: 'Good Y',
            gridcolor: 'black',
            zeroline: false,
            linecolor: 'black'
        },
        paper_bgcolor: 'white',
        plot_bgcolor: 'white',
        font: { color: 'black' },
        showlegend: true,
        title: 'Leontief Utility with Budget Constraint'
    };

    function plot(pX, pY, a, b) {
        const x = numeric.linspace(0.1, 20, 100);
        const y = numeric.linspace(0.1, 20, 100);
        const Z = [];
        const budgetMask = [];
        const minU = 10;
        const levels = [minU - 5, minU, minU + 5];

        for (let i = 0; i < y.length; i++) {
            const rowU = [];
            const rowMask = [];
            for (let j = 0; j < x.length; j++) {
                const u = Math.min(a * x[j], b * y[i]);
                rowU.push(u);
                rowMask.push(0); // filled later
            }
            Z.push(rowU);
            budgetMask.push(rowMask);
        }

        // Optimal bundle
        const xOpt = minU / a;
        const yOpt = minU / b;
        const reqI = pX * xOpt + pY * yOpt;

        // Fill budget mask
        for (let i = 0; i < y.length; i++) {
            for (let j = 0; j < x.length; j++) {
                if (pX * x[j] + pY * y[i] <= reqI) {
                    budgetMask[i][j] = 1;
                }
            }
        }

        // Budget line
        const budgetLineY = x.map(xi => {
            const yi = (reqI - pX * xi) / pY;
            return yi >= 0 ? yi : null;
        });

        // Utility curves (L-shapes)
        const curves = levels.flatMap((U, i) => {
            const x_c = U / a;
            const y_c = U / b;
            return [
                {
                    x: [x_c, x_c],
                    y: [y_c, 20],
                    mode: 'lines',
                    line: { color: ['#999999', '#0066cc', '#999999'][i], dash: 'dot' },
                    name: `U = ${U}`
                },
                {
                    x: [x_c, 20],
                    y: [y_c, y_c],
                    mode: 'lines',
                    line: { color: ['#999999', '#0066cc', '#999999'][i], dash: 'dot' },
                    name: '',
                    showlegend: false
                }
            ];
        });

        const data = [
            // Budget region shading
            {
                z: budgetMask,
                x: x,
                y: y,
                type: 'contour',
                showscale: false,
                contours: {
                    coloring: 'heatmap',
                    start: 0.5,
                    end: 1.5,
                    size: 1
                },
                colorscale: [[0, 'rgba(0,255,255,0.2)'], [1, 'rgba(0,255,255,0.2)']],
                hoverinfo: 'skip'
            },
            // Budget line
            {
                x: x,
                y: budgetLineY,
                mode: 'lines',
                name: 'Budget Line',
                line: { color: 'black', width: 2 }
            },
            // Optimal bundle
            {
                x: [xOpt],
                y: [yOpt],
                mode: 'markers',
                type: 'scatter',
                marker: { color: 'red', size: 8 },
                name: 'Optimal Bundle'
            },
            // Utility curves
            ...curves
        ];

       Plotly.newPlot('leontiefBundlePlot', data, layout, { responsive: true });
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
