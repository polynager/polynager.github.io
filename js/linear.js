window.addEventListener("load", function () {
    const laSlider = document.getElementById("laSlider");
    const lbSlider = document.getElementById("lbSlider");

    function plotLinear(a, b) {
        const x = numeric.linspace(0.1, 10, 100);
        const y = numeric.linspace(0.1, 10, 100);
        const z = y.map(yVal => x.map(xVal => a * xVal + b * yVal));

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
            title: `Linear Utility (a = ${a.toFixed(1)}, b = ${b.toFixed(1)})`,
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

        Plotly.newPlot('linearPlot', data, layout);
    }

    const plot = () => plotLinear(parseFloat(laSlider.value), parseFloat(lbSlider.value));
    plot();
    laSlider.addEventListener("input", plot);
    lbSlider.addEventListener("input", plot);
});
