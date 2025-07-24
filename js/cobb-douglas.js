document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("alphaSlider");
    const alphaVal = document.getElementById("alphaVal");
    const plotDiv = document.getElementById("cobbDouglasPlot");

    function linspace(start, end, num) {
        const arr = [];
        const step = (end - start) / (num - 1);
        for (let i = 0; i < num; i++) arr.push(start + step * i);
        return arr;
    }

    const layout = (alpha) => ({
        title: `Cobb-Douglas Utility (α = ${parseFloat(alpha).toFixed(2)})`,
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
        font: { color: 'black' },
        height: 400,
        width: 600,
        showlegend: false
    });

    function plotCobbDouglas(alpha) {
        alphaVal.textContent = parseFloat(alpha).toFixed(2);
        const x = linspace(0.1, 10, 100);
        const y = linspace(0.1, 10, 100);
        const z = y.map(yVal =>
            x.map(xVal => Math.pow(xVal, alpha) * Math.pow(yVal, 1 - alpha))
        );

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
            line: { width: 2, color: 'blue' },
            colorscale: null,
            colorbar: { show: false }
        }];

        Plotly.newPlot(plotDiv, data, layout(alpha), { responsive: true });
    }

    slider.addEventListener("input", () => plotCobbDouglas(slider.value));
    plotCobbDouglas(slider.value); // Initial plot
});
