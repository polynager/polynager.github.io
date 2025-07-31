function drawLinear3D(a = 1, b = 1) {
  const N = 100;
  const x = numeric.linspace(0, 10, N);
  const y = numeric.linspace(0, 10, N);
  const z = [];

  for (let i = 0; i < y.length; i++) {
    const row = [];
    for (let j = 0; j < x.length; j++) {
      const u = a * x[j] + b * y[i];
      row.push(u);
    }
    z.push(row);
  }

  const surface = {
    type: 'surface',
    x: x,
    y: y,
    z: z,
    colorscale: 'Cividis',
    contours: {
      z: {
        show: true,
        usecolormap: true,
        highlightcolor: "#ff7f0e",
        project: { z: true }
      }
    }
  };

  const layout = {
    title: 'Linear Utility Surface',
    scene: {
      xaxis: { title: 'Good X' },
      yaxis: { title: 'Good Y' },
      zaxis: { title: 'Utility' }
    },
    margin: { l: 0, r: 0, b: 0, t: 40 }
  };

  Plotly.newPlot('linear3DPlot', [surface], layout);
}

// Draw when page loads
window.addEventListener("DOMContentLoaded", () => {
  drawLinear3D();
});
