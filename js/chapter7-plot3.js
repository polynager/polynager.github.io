const Q3 = Array.from({length: 100}, (_, i) => 1 + i * (99/99)); // 1 to 100

function TC_new(Q) { return Q.map(q => q**3 - 60*q**2 + 910*q + 11000); }
function ATC_new(Q) { return TC_new(Q).map((tc,q) => tc/q); }
function AVC_new(Q) { return Q.map(q => (q**3 - 60*q**2 + 910*q)/q); }
function MC_new(Q) { return Q.map(q => 3*q**2 - 120*q + 910); }

function argMin(arr) { return arr.indexOf(Math.min(...arr)); }
const min_atc_idx = argMin(ATC_new(Q3));
const min_avc_idx = argMin(AVC_new(Q3));

Plotly.newPlot('plot3', [
  { x: Q3, y: ATC_new(Q3), name: 'ATC', type: 'scatter', line: {color: 'blue', width: 2} },
  { x: Q3, y: AVC_new(Q3), name: 'AVC', type: 'scatter', line: {color: 'red', dash: 'dash', width: 2} },
  { x: Q3, y: MC_new(Q3), name: 'MC', type: 'scatter', line: {color: 'green', width: 2} },
  { x: [Q3[min_atc_idx]], y: [ATC_new(Q3)[min_atc_idx]], mode: 'markers', name: 'Min ATC', marker: {color:'blue', size:8} },
  { x: [Q3[min_avc_idx]], y: [AVC_new(Q3)[min_avc_idx]], mode: 'markers', name: 'Min AVC', marker: {color:'red', size:8} }
], {
  title: 'Average Costs and Marginal Cost with New Function',
  xaxis: {title: 'Quantity (Q)'},
  yaxis: {title: 'Cost', range:[-1000,10000]},
  legend: {x:0, y:1.1}
});
