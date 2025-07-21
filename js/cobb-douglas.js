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
    const x = [...Array(100).keys()].map(i => 0.1 + i * 0.1);
    const y = x;
    const z = x.map(xVal => y.map(yVal => Math.pow(xVal, alpha) * Math.pow(yVal, 1 - alpha)));

    Plotly.newPlot('cobbDouglasPlot', [{
        z: z,
        x: x,
        y: y,
        type: 'contour',
        colorscale: 'Viridis'
    }], layout(`Cobb-Douglas Utility (α = ${alpha.toFixed(2)})`, 'Good X', 'Good Y'));
}

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("alphaSlider");
    const alphaVal = document.getElementById("alphaVal");

    function plotCobbDouglas(alpha) {
        alphaVal.textContent = alpha.toFixed(2);
        const x = numeric.linspace(0.1, 10, 100);
        const y = numeric.linspace(0.1, 10, 100);
        const z = [];

        for (let i = 0; i < y.length; i++) {
            const row = [];
            for (let j = 0; j < x.length; j++) {
                row.push(Math.pow(x[j], alpha) * Math.pow(y[i], 1 - alpha));
            }
            z.push(row);
        }

        const data = [{
            z: z,
            x: x,
            y: y,
            type: 'contour',
            colorscale: 'Jet',
            contours: {
                coloring: 'lines',  // ← Just draw lines (no fill)
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
                show: false  // ← Hide color legend
            }
        }];

        const layout = {
            title: `Cobb-Douglas Utility (α = ${alpha.toFixed(2)})`,
            xaxis: {
                title: 'Good X',
                gridcolor: 'black',
                zeroline: false
            },
            yaxis: {
                title: 'Good Y',
                gridcolor: 'black',
                zeroline: false
            },
            plot_bgcolor: 'white',
            paper_bgcolor: 'white'
        };

        Plotly.newPlot('cobbDouglasPlot', data, layout, {responsive: true});
    }

    plotCobbDouglas(parseFloat(slider.value));
    slider.addEventListener("input", () => plotCobbDouglas(parseFloat(slider.value)));
});
