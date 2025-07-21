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
    const x = [...Array(100).keys()].map(i => 0.1 + i * 0.1);
    const y = x;
    const z = x.map(xVal => y.map(yVal => a * xVal + b * yVal));

    Plotly.newPlot('linearPlot', [{
        z: z,
        x: x,
        y: y,
        type: 'contour',
        colorscale: 'Jet'
    }], layout(`Linear Utility (a=${a}, b=${b})`, 'Good X', 'Good Y'));
}

function updateLinear() {
    const a = parseFloat(document.getElementById('laSlider').value);
    const b = parseFloat(document.getElementById('lbSlider').value);
    plotLinear(a, b);
}

document.getElementById('laSlider').addEventListener('input', updateLinear);
document.getElementById('lbSlider').addEventListener('input', updateLinear);

plotLinear(1, 1);
