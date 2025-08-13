(() => {
  // Constants
  const K_fixed = 3;
  const A = 15;
  const alpha_K = 0.25;
  const alpha_L = 0.75;

  // Short-term production function Q = f(K*, L)
  function shortTermProduction(L) {
    return A * Math.pow(K_fixed, alpha_K) * Math.pow(L, alpha_L);
  }

  // Marginal product of labor
  function marginalProductOfLabor(L) {
    return A * Math.pow(K_fixed, alpha_K) * alpha_L * Math.pow(L, alpha_L - 1);
  }

  // Average product of labor
  function averageProductOfLabor(L) {
    return shortTermProduction(L) / L;
  }

  // Generate L values
  const L_values = Array.from({length: 500}, (_, i) => i * 0.198 + 1); // 1 to 100

  // Calculate MPL and APL values
  const MPL_values = L_values.map(L => marginalProductOfLabor(L));
  const APL_values = L_values.map(L => averageProductOfLabor(L));

  // Plotly traces
  const traces = [
    {
      x: L_values,
      y: MPL_values,
      mode: 'lines',
      name: 'Marginal Product of Labour (MPL)',
      line: {color: 'orange', width: 3}
    },
    {
      x: L_values,
      y: APL_values,
      mode: 'lines',
      name: 'Average Product of Labour (APL)',
      line: {color: 'blue', width: 3}
    }
  ];

  // Layout
  const layout = {
    title: 'Relationship Between MPL and APL in the Short-run',
    xaxis: {title: 'Labour (L)'},
    yaxis: {title: 'Product (Output per Unit of Labour)'},
    legend: {x: 0.1, y: 1.1},
    margin: {t: 80, b: 60},
    grid: {rows: 1, columns: 1}
  };

  Plotly.newPlot('MPL-chapter6', traces, layout);
})();
