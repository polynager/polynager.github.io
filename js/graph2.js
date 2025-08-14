// Residual demand curves
  function residualDemand1(qS) { return 200 - 3*qS - 30; }  // q_I = 10
  function residualDemand2(qS) { return 200 - 3*qS - 90; }  // q_I = 30

  // Residual marginal revenue curves
  function residualMR1(qS) { return 200 - 6*qS - 30; }
  function residualMR2(qS) { return 200 - 6*qS - 90; }

  const MC = 20;

  // Quantities
  const qS = Array.from({length: 100}, (_, i) => i * 40 / 99);

  // Compute curve points
  const RD1 = qS.map(residualDemand1);
  const RD2 = qS.map(residualDemand2);
  const RMR1 = qS.map(residualMR1);
  const RMR2 = qS.map(residualMR2);

  // Equilibrium points
  const eq1_q = 25;
  const eq1_p = residualDemand1(eq1_q);
  const eq2_q = 15;
  const eq2_p = residualDemand2(eq2_q);

  // Traces
  const traces = [
    {x: qS, y: RD1, type: 'scatter', mode: 'lines', name: 'RD¹_S', line: {color: 'red'}},
    {x: qS, y: RD2, type: 'scatter', mode: 'lines', name: 'RD²_S', line: {color: 'red', dash: 'dash'}},
    {x: qS, y: RMR1, type: 'scatter', mode: 'lines', name: 'RMR¹_S', line: {color: 'blue'}},
    {x: qS, y: RMR2, type: 'scatter', mode: 'lines', name: 'RMR²_S', line: {color: 'blue', dash: 'dash'}},
    {x: [0, 40], y: [MC, MC], type: 'scatter', mode: 'lines', name: 'MC', line: {color: 'pink'}},
    // Equilibrium points
    {x: [eq1_q], y: [eq1_p], type: 'scatter', mode: 'markers', name: 'Eq1', marker: {color: 'black', size: 8}},
    {x: [eq2_q], y: [eq2_p], type: 'scatter', mode: 'markers', name: 'Eq2', marker: {color: 'black', size: 8}},
    // Dashed lines for equilibrium points
    {x: [eq1_q, eq1_q], y: [0, eq1_p], mode:'lines', line:{dash:'dash', color:'gray'}, type:'scatter', showlegend:false},
    {x: [0, eq1_q], y: [eq1_p, eq1_p], mode:'lines', line:{dash:'dash', color:'gray'}, type:'scatter', showlegend:false},
    {x: [eq2_q, eq2_q], y: [0, eq2_p], mode:'lines', line:{dash:'dash', color:'gray'}, type:'scatter', showlegend:false},
    {x: [0, eq2_q], y: [eq2_p, eq2_p], mode:'lines', line:{dash:'dash', color:'gray'}, type:'scatter', showlegend:false},
  ];

  const layout = {
    title: "Saudi Arabia's Residual Demand and Marginal Revenue",
    xaxis: {title: "Saudi Arabia's Quantity of Oil (q_S, millions of barrels/day)", range: [0, 40]},
    yaxis: {title: "Price ($/barrel)", range: [0, 180]},
    legend: {x: 0.7, y: 1},
    grid: {rows:1, columns:1}
  };

  Plotly.newPlot('graph2', traces, layout);
