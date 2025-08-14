const Q1 = Array.from({length: 100}, (_, i) => i * 10 / 99); // 0 to 10

function TC(Q) { return Q.map(q => 5 + 3*q + q*q); }
function FC(Q) { return Q.map(_ => 5); }
function VC(Q) { return Q.map(q => 3*q + q*q); }

Plotly.newPlot('plot1', [
  { x: Q1, y: TC(Q1), name: 'Total Cost (TC)', type: 'scatter', line: {color: 'blue', width: 2} },
  { x: Q1, y: FC(Q1), name: 'Fixed Cost (FC)', type: 'scatter', line: {color: 'green', dash: 'dash', width: 2} },
  { x: Q1, y: VC(Q1), name: 'Variable Cost (VC)', type: 'scatter', line: {color: 'red', width: 2} }
], {
  title: 'Total Cost, Fixed Cost, and Variable Cost',
  xaxis: {title: 'Quantity (Q)'},
  yaxis: {title: 'Cost'},
  legend: {x:0, y:1.1}
});
