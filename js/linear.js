document.addEventListener("DOMContentLoaded", function () {
    const laSlider = document.getElementById("laSlider");
    const lbSlider = document.getElementById("lbSlider");

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

    function plotLinear(a, b) {
        const x = numeric.linspace(0.1, 10, 100);
        const y = numeric.linspace(0.1, 10, 100);
        const z = [];

        for (let i = 0; i < y.length; i++) {
            const row = [];
            for (let j = 0; j < x.length; j++) {
                row.push(a * x[j] + b * y[i]);
            }
            z.push(row);
        }

        const data = [{
            z: z,
            x: x,
            y: y,
            type: 'contour',
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
                width: 2,
                color: 'black'
            },
            colorscale: null,
            colorbar: { show: false }
        }];

        Plotly.newPlot(
            'linearPlot',
            data,
            layout(`Linear Utility (a = ${a.toFixed(2)}, b = ${b.toFixed(2)})`, 'Good X', 'Good Y'),
            { responsive: true }
        );
    }

    // Initial plot
    plotLinear(parseFloat(laSlider.value), parseFloat(lbSlider.value));

    // Update plot on slider input
    laSlider.addEventListener("input", () =>
        plotLinear(parseFloat(laSlider.value), parseFloat(lbSlider.value))
    );
    lbSlider.addEventListener("input", () =>
        plotLinear(parseFloat(laSlider.value), parseFloat(lbSlider.value))
    );
});
