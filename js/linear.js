
function plotLinear() {
    let a = parseFloat(document.getElementById("laSlider").value);
    let b = parseFloat(document.getElementById("lbSlider").value);

    let x = [], y = [];
    for (let i = 1; i <= 100; i++) {
        x.push(i / 10);
        y.push(i / 10);
    }

    let z = x.map(xi => y.map(yi => a * xi + b * yi));

    Plotly.newPlot("linearPlot", [{
        z: z,
        x: x,
        y: y,
        type: "contour"
    }], {
        title: `Linear Utility (a = ${a}, b = ${b})`,
        xaxis: { title: "Good X" },
        yaxis: { title: "Good Y" }
    });
}

document.getElementById("laSlider").addEventListener("input", plotLinear);
document.getElementById("lbSlider").addEventListener("input", plotLinear);
plotLinear();
