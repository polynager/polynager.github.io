document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("alphaSliderLeontief");
    const alphaVal = document.getElementById("alphaValLeontief");

    const layout = {
        title: 'Leontief Utility',
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

    function plotLeontief(alpha) {
        alphaVal.textContent = alpha.toFixed(2);
        const x = numeric.linspace(0.1, 10, 100);
        const y = numeric.linspace(0.1, 10, 100);

        const z = y.map(yVal =>
            x.map(xVal => Math.min(xVal / alpha, yVal / (1 - alpha)))
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

        Plotly.newPlot('leontiefPlot', data, layout, { responsive: true });
    }

    plotLeontief(parseFloat(slider.value));
    slider.addEventListener("input", () => plotLeontief(parseFloat(slider.value)));
});
