document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("alphaSliderLinear");
    const alphaVal = document.getElementById("alphaValLinear");

    const layout = {
        title: 'Linear Utility',
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

    function plotLinear(alpha) {
        alphaVal.textContent = alpha.toFixed(2);
        const x = numeric.linspace(0.1, 10, 100);
        const y = numeric.linspace(0.1, 10, 100);

        const z = y.map(yVal =>
            x.map(xVal => alpha * xVal + (1 - alpha) * yVal)
        );

        const data = [{
            z: z,
            x: x,
            y: y,
            type: 'contour',
            colorscale: 'Jet',
            contours: {
                coloring: 'lines',
                showlabels: true,
                labelfont: {
                    family: 'Arial',
                    size: 12,
                    color: 'black'
                }
            },
            line: { width: 2 },
            colorbar: { show: false }
        }];

        Plotly.newPlot('linearPlot', data, layout, { responsive: true });
    }

    plotLinear(parseFloat(slider.value));
    slider.addEventListener("input", () => plotLinear(parseFloat(slider.value)));
});
