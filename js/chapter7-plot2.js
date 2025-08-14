const Q2 = Array.from({length: 100}, (_, i) => 0.1 + i * (9.9 / 99)); // 0.1 to 10

function ATC(Q) { return Q.map(q => 5/q + 3 + q); }
function AFC(Q) { return Q.map(q => 5/q); }
function AVC(Q) { return Q.map(q => 3 + q); }
function MC(Q) { return Q.map(q => 3 + 2*q); }

Plotly.newPlot('plot2', [
  { x: Q2, y: ATC(Q2), name: 'ATC', type: 'scatter', line: {color: 'blue', width: 2} },
  { x: Q2, y: AFC(Q2), name: 'AFC', type: 'scatter', line: {color: 'green', dash: 'dash', width: 2} },
  { x: Q2, y: AVC(Q2), name: 'AVC', type: 'scatter', line: {color: 'red', width: 2} },
  { x: Q2, y: MC(Q2), name: 'MC', type: 'scatter', line: {color: 'purple', width: 2} }
], {
  title: 'Average Costs and Marginal Cost',
  xaxis: {title: 'Quantity (Q)'},
  yaxis: {title: 'Cost'},
  legend: {x:0, y:1.1}
});
