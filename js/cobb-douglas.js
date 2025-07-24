window.addEventListener("load", function () {
    const slider = document.getElementById("alphaSlider");
    const alphaVal = document.getElementById("alphaVal");

    function plotCobbDouglas(alpha) {
        alphaVal.textContent = alpha.toFixed(2);
        const x = numeric.linspace(0.1, 10, 100);
        const y = numeric.linspace(0.1, 10, 100);
        const z = y.map(yVal => x.map(xVal => Math.pow(xVal, alpha) * Math.pow(yVal, 1 - alpha)));

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
            title: `Cobb-Douglas Utility (α = ${alpha.toFixed(2)})`,
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

        Plotly.newPlot('cobbDouglasPlot', data, layout);
    }

    plotCobbDouglas(parseFloat(slider.value));
    slider.addEventListener("input", () => plotCobbDouglas(parseFloat(slider.value)));
});
