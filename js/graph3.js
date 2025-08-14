// Reaction curves
  function burtonReaction(pK) { return 333.33 + 0.5 * pK; }
  function k2Reaction(pK) { return 8 * pK - 1600; }

  // Range for pK
  const pK = Array.from({length: 500}, (_, i) => 200 + i * (300 - 200) / 499);

  // Calculate pB values
  const pB_burton = pK.map(burtonReaction);
  const pB_k2 = pK.map(k2Reaction);

  // Intersection point
  const pK_intersection = 257.78;
  const pB_intersection = 462.22;

  const traces = [
    {x: pK, y: pB_burton, type: 'scatter', mode: 'lines', name: "Burton's Reaction Curve (p_B = 333.33 + 0.5p_K)", line: {color: 'blue'}},
    {x: pK, y: pB_k2, type: 'scatter', mode: 'lines', name: "K2's Reaction Curve (p_B = 8p_K - 1600)", line: {color: 'green'}},
    {x: [pK_intersection], y: [pB_intersection], type: 'scatter', mode: 'markers', name: "Intersection (p_B=462.22, p_K=257.78)", marker: {color: 'red', size: 8}},
    // Dashed lines for equilibrium
    {x: [pK[0], pK_intersection], y: [pB_intersection, pB_intersection], mode:'lines', line:{dash:'dash', color:'gray'}, type:'scatter', showlegend:false},
    {x: [pK_intersection, pK_intersection], y: [pB_burton[0], pB_intersection], mode:'lines', line:{dash:'dash', color:'gray'}, type:'scatter', showlegend:false}
  ];

  const layout = {
    title: "Reaction Curves and Nash Equilibrium",
    xaxis: {title: "K2's Price (p_K)", range: [200, 300]},
    yaxis: {title: "Burton's Price (p_B)", range: [300, 500]},
    legend: {x: 0.5, y: 1},
    grid: {rows:1, columns:1}
  };

  Plotly.newPlot('graph3', traces, layout);
