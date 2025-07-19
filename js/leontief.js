
function plotLeontief() {
    let a = parseFloat(document.getElementById("aSlider").value);
    let b = parseFloat(document.getElementById("bSlider").value);

    let x = [], y = [];
    for (let i = 1; i <= 100; i++) {
        x.push(i / 10);
        y.push(i / 10);
    }

    let z = x.map(xi => y.map(yi => Math.min(a * xi, b * yi)));

    Plotly.newPlot("leontiefPlot", [{
        z: z,
        x: x,
        y: y,
        type: "contour"
    }], {
        title: `Leontief Utility (a = ${a}, b = ${b})`,
        xaxis: { title: "Good X" },
        yaxis: { title: "Good Y" }
    });
}

document.getElementById("aSlider").addEventListener("input", plotLeontief);
document.getElementById("bSlider").addEventListener("input", plotLeontief);
plotLeontief();
