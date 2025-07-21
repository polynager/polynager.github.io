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
        colorscale: 'Rainbow'
    }], layout(`Cobb-Douglas Utility (α = ${alpha.toFixed(2)})`, 'Good X', 'Good Y'));
}

document.getElementById('alphaSlider').addEventListener('input', (e) => {
    const alpha = parseFloat(e.target.value);
    document.getElementById('alphaVal').innerText = alpha.toFixed(2);
    plotCobbDouglas(alpha);
});

plotCobbDouglas(0.5);
