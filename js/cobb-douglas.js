
document.getElementById("alphaSlider").addEventListener("input", function() {
    let alpha = parseFloat(this.value);
    document.getElementById("alphaVal").innerText = alpha.toFixed(2);

    let x = [];
    let y = [];
    for (let i = 1; i <= 100; i++) {
        x.push(i / 10);
        y.push(i / 10);
    }

    let z = x.map(xi => y.map(yi => Math.pow(xi, alpha) * Math.pow(yi, 1 - alpha)));

Plotly.newPlot('cobbDouglasPlot', [trace], {
    title: `Cobb-Douglas Utility (α = ${alpha.toFixed(2)})`,
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
    font: {
        color: 'black'
    }
});

document.getElementById("alphaSlider").dispatchEvent(new Event("input"));
