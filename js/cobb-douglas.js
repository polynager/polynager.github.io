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

  function plotCobbDouglas(alpha) {
    alphaVal.textContent = parseFloat(alpha).toFixed(2);
    const x = linspace(0.1, 10, 100);
    const y = linspace(0.1, 10, 100);
    const z = y.map(yVal =>
      x.map(xVal => Math.pow(xVal, alpha) * Math.pow(yVal, 1 - alpha))
    );

    const contour = {
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
      showscale: false
    };

    const layout = {
      title: `Cobb-Douglas Utility (α = ${parseFloat(alpha).toFixed(2)})`,
      xaxis: { title: 'Good X', range: [0, 10] },
      yaxis: { title: 'Good Y', range: [0, 10] },
      height: 600,
      width: 600,
      showlegend: false
    };

    Plotly.newPlot(plotDiv, [contour], layout, { responsive: true });
  }

  slider.addEventListener("input", () => plotCobbDouglas(slider.value));
  plotCobbDouglas(slider.value);
});
