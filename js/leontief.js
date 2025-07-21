document.addEventListener("DOMContentLoaded", function () {
    const aSlider = document.getElementById("aSlider");
    const bSlider = document.getElementById("bSlider");

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

    function plotLeontief(a, b) {
        const x = numeric.linspace(0.1, 10, 100);
        const y = numeric.linspace(0.1, 10, 100);

        const z = y.map(yVal =>
            x.map(xVal => Math.min(xVal / a, yVal / b))
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

    plotLeontief(parseFloat(aSlider.value), parseFloat(bSlider.value));
    aSlider.addEventListener("input", () => plotLeontief(parseFloat(aSlider.value), parseFloat(bSlider.value)));
    bSlider.addEventListener("input", () => plotLeontief(parseFloat(aSlider.value), parseFloat(bSlider.value)));
});
