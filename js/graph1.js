(function() { function demand(q) { return 20 - q; }
  function marginalRevenue(q) { return 20 - 2*q; }

  const MC = 4;

  // Collusion and cheating points
  const qCollusion = 8;
  const pCollusion = demand(qCollusion);

  const qCheating = 9;
  const pCheating = demand(qCheating);

  // Generate data points
  const q = Array.from({length: 100}, (_, i) => i * 20 / 99);
  const p = q.map(demand);
  const mr = q.map(marginalRevenue);

  // Traces
  const traceDemand = {x: q, y: p, type: 'scatter', mode: 'lines', name: 'D (Demand Curve)', line: {color: 'blue'}};
  const traceMR = {x: q, y: mr, type: 'scatter', mode: 'lines', name: 'MR (Marginal Revenue)', line: {color: 'purple'}};
  const traceMC = {x: [0, 20], y: [MC, MC], type: 'scatter', mode: 'lines', name: `MC = $${MC}`, line: {color: 'red'}};

  // Collusion point and dashed lines
  const traceCollusion = {
    x: [qCollusion], y: [pCollusion], type: 'scatter', mode: 'markers',
    name: `Collusion (Q=${qCollusion}, P=$${pCollusion})`, marker: {color: 'black', size: 8}
  };
  const collusionVline = {x: [qCollusion, qCollusion], y: [0, pCollusion], mode:'lines', line:{dash:'dash', color:'gray'}, type:'scatter', showlegend:false};
  const collusionHline = {x: [0, qCollusion], y: [pCollusion, pCollusion], mode:'lines', line:{dash:'dash', color:'gray'}, type:'scatter', showlegend:false};

  // Cheating point and dashed lines
  const traceCheating = {
    x: [qCheating], y: [pCheating], type: 'scatter', mode: 'markers',
    name: `Cheating (Q=${qCheating}, P=$${pCheating})`, marker: {color: 'black', size: 8}
  };
  const cheatingVline = {x: [qCheating, qCheating], y: [0, pCheating], mode:'lines', line:{dash:'dash', color:'gray'}, type:'scatter', showlegend:false};
  const cheatingHline = {x: [0, qCheating], y: [pCheating, pCheating], mode:'lines', line:{dash:'dash', color:'gray'}, type:'scatter', showlegend:false};

  const data = [traceDemand, traceMR, traceMC, traceCollusion, collusionVline, collusionHline, traceCheating, cheatingVline, cheatingHline];

  const layout = {
    title: 'Collusion and Cheating in Oligopoly',
    xaxis: {title: 'Quantity', range: [0, 20]},
    yaxis: {title: 'Price ($/unit)', range: [0, 20]},
    legend: {x: 0.7, y: 1},
    grid: {rows: 1, columns: 1},
  };

  Plotly.newPlot('graph1', data, layout);
  })();

