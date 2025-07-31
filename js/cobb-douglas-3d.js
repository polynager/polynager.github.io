function drawCobbDouglas3D(alpha = 0.5) {
  const N = 100;
  const x = numeric.linspace(0.1, 10, N);
  const y = numeric.linspace(0.1, 10, N);
  const z = [];

  for (let i = 0; i < y.length; i++) {
    const row = [];
    for (let j = 0; j < x.length; j++) {
      const u = Math.pow(x[j], alpha) * Math.pow(y[i], 1 - alpha);
      row.push(u);
    }
    z.push(row);
  }

  const surface = {
    type: 'surface',
    x: x,
    y: y,
    z: z,
    colorscale: 'Viridis',
    contours: {
      z: {
        show: true,
        usecolormap: true,
        highlightcolor: "#42f462",
        project: { z: true }
      }
    }
  };

  const layout = {
    title: 'Cobb-Douglas Utility Surface',
    scene: {
      xaxis: { title: 'Good X' },
      yaxis: { title: 'Good Y' },
      zaxis: { title: 'Utility' }
    },
    margin: { l: 0, r: 0, b: 0, t: 40 }
  };

  Plotly.newPlot('cobbDouglas3DPlot', [surface], layout);
}

drawCobbDouglas3D();
