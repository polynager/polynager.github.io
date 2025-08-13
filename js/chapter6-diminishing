(() => {
  // Constants
  const K_fixed = 3;
  const A = 15;
  const alpha_K = 0.25;
  const alpha_L = 0.75;

  // Production function Q = f(K*, L)
  function shortTermProduction(L) {
    return A * Math.pow(K_fixed, alpha_K) * Math.pow(L, alpha_L);
  }

  // Marginal product of labor
  function marginalProductOfLabor(L) {
    return A * Math.pow(K_fixed, alpha_K) * alpha_L * Math.pow(L, alpha_L - 1);
  }

  // Generate labor values
  const L_values = Array.from({length: 500}, (_, i) => i * 0.2 + 1); // 1 to 100

  // Calculate Q and MPL
  const Q_values = L_values.map(L => shortTermProduction(L));
  const MPL_values = L_values.map(L => marginalProductOfLabor(L));

  // Plotly traces
  const traces = [
    {
      x: L_values,
      y: Q_values,
      mode: 'lines',
      name: 'Short-term Production Q = f(K*, L)',
      line: {color: 'blue', width: 3}
    },
    {
      x: L_values,
      y: MPL_values,
      mode: 'lines',
      name: 'Marginal Product of Labour (MPL)',
      line: {color: 'green', width: 3}
    }
  ];

  // Layout
  const layout = {
    title: 'Short-term Production Function & Marginal Product of Labour',
    xaxis: {title: 'Labour (L)'},
    yaxis: {title: 'Output / MPL'},
    legend: {x: 0.1, y: 1.1},
    margin: {t: 80, b: 60}
  };

  Plotly.newPlot('Diminishing-chapter6', traces, layout);
})();
