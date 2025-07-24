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
        font: { color: 'black' },
        title: 'Leontief Utility & Budget Constraint'
    };

    function plot(pX, pY, a, b) {
        const x = numeric.linspace(0.1, 20, 100);
        const y = numeric.linspace(0.1, 20, 100);
        const budgetMask = [];

        const minU = 10;
        const levels = [minU - 5, minU, minU + 5];

        // Optimal bundle
        const xOpt = minU / a;
        const yOpt = minU / b;
        const reqI = pX * xOpt + pY * yOpt;

        // Fill budget mask
        for (let i = 0; i < y.length; i++) {
            const rowMask = [];
            for (let j = 0; j < x.length; j++) {
                rowMask.push(pX * x[j] + pY * y[i] <= reqI ? 1 : 0);
            }
            budgetMask.push(rowMask);
        }

        // Budget line
        const budgetY = x.map(xi => {
            const yi = (reqI - pX * xi) / pY;
            return yi >= 0 ? yi : null;
        });

        // Leontief indifference curves (L shapes)
        const curveColors = ['#999999', '#0066cc', '#999999'];
        const curves = levels.flatMap((U, i) => {
            const x_c = U / a;
            const y_c = U / b;
            return [
                {
                    x: [x_c, x_c],
                    y: [y_c, 20],
                    mode: 'lines',
                    line: { color: curveColors[i], dash: 'dot' },
                    name: `U = ${U}`
                },
                {
                    x: [x_c, 20],
                    y: [y_c, y_c],
                    mode: 'lines',
                    line: { color: curveColors[i], dash: 'dot' },
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
                colorscale: [[0, 'rgba(0,0,255,0.15)'], [1, 'rgba(0,0,255,0.15)']],
                hoverinfo: 'skip',
                name: 'Budget Set'
            },
            // Budget line
            {
                x: x,
                y: budgetY,
                mode: 'lines',
                type: 'scatter',
                line: { color: 'black', width: 2 },
                name: 'Budget Line'
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
            // Indifference curves (L-shapes)
            ...curves
        ];

        Plotly.newPlot('leontiefPlot', data, layout, { responsive: true });
    }

    function update() {
        plot(
            parseFloat(pXSlider.value),
            parseFloat(pYSlider.value),
            parseFloat(aSlider.value),
            parseFloat(bSlider.value)
        );
    }

    [pXSlider, pYSlider, aSlider, bSlider].forEach(slider => {
        slider.addEventListener("input", update);
    });

    update();
});
