(() => {
  const A = 15;
  const alpha_K = 0.25;
  const alpha_L = 0.75;

  const L_values = Array.from({length: 500}, (_, i) => 1 + i * (99/499)); // 1 to 100

  // Functions
  function longTermProduction(L, K) {
    return A * Math.pow(K, alpha_K) * Math.pow(L, alpha_L);
  }

  function MPL(L, K) {
    return A * Math.pow(K, alpha_K) * alpha_L * Math.pow(L, alpha_L - 1);
  }

  // Create traces for initial K = 3
  const K_initial = 3;
  const Q_initial = L_values.map(L => longTermProduction(L, K_initial));
  const MPL_initial = L_values.map(L => MPL(L, K_initial));

  // Plotly traces
  const traces = [
    {
      x: L_values,
      y: Q_initial,
      name: `Original Q (K*=${K_initial})`,
      line: {color: 'blue', dash: 'dash'},
      visible: true
    },
    {
      x: L_values,
      y: MPL_initial,
      name: `Original MPL (K*=${K_initial})`,
      line: {color: 'green', dash: 'dash'},
      visible: true,
      yaxis: 'y2'
    }
  ];

  // Layout with two y-axes
  const layout = {
    title: "Long-term Production Function with Adjustable Capital",
    xaxis: {title: "Labour (L)"},
    yaxis: {title: "Output (Q)", side: 'left'},
    yaxis2: {title: "MPL", overlaying: 'y', side: 'right'},
    legend: {x: 0.05, y: 1.15},
    margin: {t: 80, b: 60},
    sliders: [{
      pad: {t: 30},
      currentvalue: {prefix: "K* (Capital) = "},
      steps: Array.from({length: 91}, (_, i) => {
        const K = 1 + i*0.1;
        return {
          label: K.toFixed(1),
          method: 'update',
          args: [{
            y: [
              L_values.map(L => longTermProduction(L, K)),
              L_values.map(L => MPL(L, K))
            ]
          }]
        }
      })
    }]
  };

  Plotly.newPlot('plotlyProduction', traces, layout);
})();
