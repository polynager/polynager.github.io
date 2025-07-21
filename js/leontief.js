window.addEventListener("load", function () {
    const aSlider = document.getElementById("aSlider");
    const bSlider = document.getElementById("bSlider");

    function plotLeontief(a, b) {
        const x = numeric.linspace(0.1, 10, 100);
        const y = numeric.linspace(0.1, 10, 100);
        const z = y.map(yVal => x.map(xVal => Math.min(xVal / a, yVal / b)));

        const data = [{
            z: z,
            x: x,
            y: y,
            type: 'contour',
            colorscale: 'Jet',
            contours: {
                coloring: 'lines',
                showlabels: true
            },
            line: { width: 2 },
            colorbar: { show: false }
        }];

        const layout = {
            title: `Leontief Utility (a = ${a.toFixed(1)}, b = ${b.toFixed(1)})`,
            xaxis: {
                title: 'Good X',
                gridcolor: 'black',
                linecolor: 'black',
                zeroline: false
            },
            yaxis: {
                title: 'Good Y',
                gridcolor: 'black',
                linecolor: 'black',
                zeroline: false
            },
            plot_bgcolor: 'white',
            paper_bgcolor: 'white'
        };

        Plotly.newPlot('leontiefPlot', data, layout);
    }

    const plot = () => plotLeontief(parseFloat(aSlider.value), parseFloat(bSlider.value));
    plot();
    aSlider.addEventListener("input", plot);
    bSlider.addEventListener("input", plot);
});
