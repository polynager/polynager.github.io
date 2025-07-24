document.addEventListener("DOMContentLoaded", function () {
    const aSlider = document.getElementById("aSlider");
    const bSlider = document.getElementById("bSlider");

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

    function plotLeontief(a, b) {
        const x = numeric.linspace(0.1, 10, 100);
        const y = numeric.linspace(0.1, 10, 100);
        const z = [];

        for (let i = 0; i < y.length; i++) {
            const row = [];
            for (let j = 0; j < x.length; j++) {
                row.push(Math.min(a * x[j], b * y[i]));
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
                },
                start: 2,
                end: 60,
                size: 2 // Shows utility levels 2, 4, 6, ...
            },
            line: {
                width: 2,
                color: 'black'
            },
            colorbar: { show: false }
        }];

        Plotly.newPlot(
            'leontiefPlot',
            data,
            layout(`Leontief Utility (a = ${a.toFixed(2)}, b = ${b.toFixed(2)})`, 'Good X', 'Good Y'),
            { responsive: true }
        );
    }

    plotLeontief(parseFloat(aSlider.value), parseFloat(bSlider.value));
    aSlider.addEventListener("input", () =>
        plotLeontief(parseFloat(aSlider.value), parseFloat(bSlider.value))
    );
    bSlider.addEventListener("input", () =>
        plotLeontief(parseFloat(aSlider.value), parseFloat(bSlider.value))
    );
});
