document.addEventListener("DOMContentLoaded", function () {
    const pXSlider = document.getElementById("pXLinearSlider");
    const pYSlider = document.getElementById("pYLinearSlider");
    const aSlider = document.getElementById("aLinearSlider");
    const bSlider = document.getElementById("bLinearSlider");

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
        title: 'Linear Utility with Budget Constraint'
    };

    function plot(pX, pY, a, b) {
        const x = numeric.linspace(0.1, 20, 100);
        const y = numeric.linspace(0.1, 20, 100);
        const budgetMask = [];

        const I = 10;

        // Compute budget mask (shading only under the budget line)
        for (let i = 0; i < y.length; i++) {
            const row = [];
            for (let j = 0; j < x.length; j++) {
                const isInBudget = pX * x[j] + pY * y[i] <= I;
                row.push(isInBudget ? 1 : 0);
            }
            budgetMask.push(row);
        }

        // Optimal bundle: always corner solution
        let xOpt = 0, yOpt = 0;
        if (a / pX > b / pY) {
            xOpt = I / pX;
        } else {
            yOpt = I / pY;
        }

        // Budget line
        const budgetY = x.map(xi => {
            const val = (I - pX * xi) / pY;
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

    [pXSlider, pYSlider, aSlider, bSlider].forEach(slider => {
        slider.addEventListener("input", update);
    });

    update();
});
