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
    const x = [...Array(100).keys()].map(i => 0.1 + i * 0.1);
    const y = x;
    const z = x.map(xVal => y.map(yVal => Math.min(xVal / a, yVal / b)));

    Plotly.newPlot('leontiefPlot', [{
        z: z,
        x: x,
        y: y,
        type: 'contour',
        colorscale: 'Viridis'
    }], layout(`Leontief Utility (a=${a}, b=${b})`, 'Good X', 'Good Y'));
}

function updateLeontief() {
    const a = parseFloat(document.getElementById('aSlider').value);
    const b = parseFloat(document.getElementById('bSlider').value);
    plotLeontief(a, b);
}

document.getElementById('aSlider').addEventListener('input', updateLeontief);
document.getElementById('bSlider').addEventListener('input', updateLeontief);

plotLeontief(1, 1);
