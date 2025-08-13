// Saudi Arabia Residual Demand Interactive Graph
const q_S = Array.from({length: 101}, (_, i) => i * 0.4); // 0 to 40

function updateGraph(q_S1=25, q_S2=15) {
    function residual_demand1(q) { return 200 - 3*q - 30; }
    function residual_demand2(q) { return 200 - 3*q - 90; }
    function residual_mr1(q) { return 200 - 6*q - 30; }
    function residual_mr2(q) { return 200 - 6*q - 90; }
    const MC = 20;

    const traceRD1 = {x: q_S, y: q_S.map(residual_demand1), type:'scatter', mode:'lines', name:'RD^1_S', line:{color:'red'}};
    const traceRD2 = {x: q_S, y: q_S.map(residual_demand2), type:'scatter', mode:'lines', name:'RD^2_S', line:{color:'red', dash:'dash'}};
    const traceMR1 = {x: q_S, y: q_S.map(residual_mr1), type:'scatter', mode:'lines', name:'RMR^1_S', line:{color:'blue'}};
    const traceMR2 = {x: q_S, y: q_S.map(residual_mr2), type:'scatter', mode:'lines', name:'RMR^2_S', line:{color:'blue', dash:'dash'}};
    const traceMC = {x: q_S, y: Array(q_S.length).fill(MC), type:'scatter', mode:'lines', name:'MC', line:{color:'pink'}};

    const eq1 = {x:[q_S1], y:[residual_demand1(q_S1)], mode:'markers+text', text:['Eq1'], textposition:'top center', marker:{color:'black', size:8}};
    const eq2 = {x:[q_S2], y:[residual_demand2(q_S2)], mode:'markers+text', text:['Eq2'], textposition:'top center', marker:{color:'black', size:8}};

    const layout = {
        title: "Saudi Arabia's Residual Demand and Marginal Revenue",
        xaxis: {title:"Saudi Arabia Quantity (q_S)", range:[0,40]},
        yaxis: {title:"Price ($/barrel)", range:[0,180]}
    };

    Plotly.newPlot('graph2', [traceRD1, traceRD2, traceMR1, traceMR2, traceMC, eq1, eq2], layout);
}

// Initial plot
updateGraph();

// Slider controls
const container2 = document.getElementById('graph2');

const sliderQ1 = document.createElement('input');
sliderQ1.type='range'; sliderQ1.min=0; sliderQ1.max=40; sliderQ1.step=0.1; sliderQ1.value=25; sliderQ1.style.width='300px';
sliderQ1.oninput = () => updateGraph(parseFloat(sliderQ1.value), parseFloat(sliderQ2.value));
container2.appendChild(sliderQ1);

const sliderQ2 = document.createElement('input');
sliderQ2.type='range'; sliderQ2.min=0; sliderQ2.max=40; sliderQ2.step=0.1; sliderQ2.value=15; sliderQ2.style.width='300px';
sliderQ2.oninput = () => updateGraph(parseFloat(sliderQ1.value), parseFloat(sliderQ2.value));
container2.appendChild(sliderQ2);
