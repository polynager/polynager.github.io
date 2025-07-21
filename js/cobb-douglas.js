document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("alphaSlider");
    const alphaVal = document.getElementById("alphaVal");

    const layout = (title, xTitle, yTitle) => ({
        title: title,
        xaxis: {
            title: xTitle,
            gridcolor: 'black',
            zeroline: false,
            linecolor: 'black',
            tickfont: { color: 'black' },
            titlefont: { color: 'black' }
        },
        yaxis: {
            title: yTitle,
            gridcolor: 'black',
            zeroline: false,
            linecolor: 'black',
            tickfont: { color: 'black' },
            titlefont: { color: 'black' }
        },
        paper_bgcolor: 'white',
        plot_bgcolor: 'white',
        font: { color: 'black' }
    });

    function plotCobbDouglas(alpha) {
        alphaVal.textContent = alpha.toFixed(2);
        const x = numeric.linspace(0.1, 10, 100);
        const y = numeric.linspace(0.1, 10, 100);
        const z = y.map(yVal =>
            x.map(xVal => Math.pow(xVal, alpha) * Math.pow(yVal, 1 - alpha))
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
            line: {
                width: 2
            },
            colorbar: {
                show: false
            }
        }];

        Plotly.newPlot(
            'cobbDouglasPlot',
            data,
            layout(`Cobb-Douglas Utility (α = ${alpha.toFixed(2)})`, 'Good X', 'Good Y'),
            { responsive: true }
        );
    }

    plotCobbDouglas(parseFloat(slider.value));
    slider.addEventListener("input", () => plotCobbDouglas(parseFloat(slider.value)));
});
