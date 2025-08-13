// Monopoly, Two Firms, N Firms Interactive Graph
const q_vals = Array.from({length:500}, (_, i) => 1 + i*0.038); // 1 to 20

function updateGraph(q_one=8, q_two=6, q_n=4){
    function demand_one(q){ return 10 - 0.5*q; }
    function mr_one(q){ return 10 - q; }
    function demand_two(q){ return 8 - 0.4*q; }
    function mr_two(q){ return 8 - 0.8*q; }
    function demand_n(q){ return 6 - 0.3*q; }
    function mr_n(q){ return 6 - 0.6*q; }
    function mc(q){ return 2 + 0.1*q; }
    function atc(q, fixed_cost=5){ return mc(q) + fixed_cost/q; }

    // Monopoly traces
    const traceMonDemand = {x:q_vals, y:q_vals.map(demand_one), type:'scatter', mode:'lines', name:'Monopoly Demand', line:{color:'blue'}};
    const traceMonMR = {x:q_vals, y:q_vals.map(mr_one), type:'scatter', mode:'lines', name:'MR', line:{color:'purple'}};
    const traceMC = {x:q_vals, y:q_vals.map(mc), type:'scatter', mode:'lines', name:'MC', line:{color:'red'}};
    const traceATC = {x:q_vals, y:q_vals.map(atc), type:'scatter', mode:'lines', name:'ATC', line:{color:'skyblue'}};
    const eqMon = {x:[q_one], y:[demand_one(q_one)], mode:'markers+text', text:['Monopoly Eq'], textposition:'top center', marker:{color:'black', size:8}};

    // Two firms traces
    const traceTwoDemand = {x:q_vals, y:q_vals.map(demand_two), type:'scatter', mode:'lines', name:'Two Firms Demand', line:{color:'blue', dash:'dot'}};
    const traceTwoMR = {x:q_vals, y:q_vals.map(mr_two), type:'scatter', mode:'lines', name:'Two Firms MR', line:{color:'purple', dash:'dot'}};
    const eqTwo = {x:[q_two], y:[demand_two(q_two)], mode:'markers+text', text:['Two Firms Eq'], textposition:'top center', marker:{color:'black', size:8}};

    // N firms traces
    const traceNDemand = {x:q_vals, y:q_vals.map(demand_n), type:'scatter', mode:'lines', name:'N Firms Demand', line:{color:'blue', dash:'dash'}};
    const traceNMR = {x:q_vals, y:q_vals.map(mr_n), type:'scatter', mode:'lines', name:'N Firms MR', line:{color:'purple', dash:'dash'}};
    const eqN = {x:[q_n], y:[demand_n(q_n)], mode:'markers+text', text:['N Firms Eq'], textposition:'top center', marker:{color:'black', size:8}};

    const layout = {
        title:'Monopoly → Two Firms → N Firms',
        xaxis:{title:'Quantity Q', range:[0,20]},
        yaxis:{title:'Price/Cost ($)', range:[0,12]}
    };

    Plotly.newPlot('graph4',[traceMonDemand, traceMonMR, traceMC, traceATC, eqMon,
                             traceTwoDemand, traceTwoMR, eqTwo,
                             traceNDemand, traceNMR, eqN], layout);
}

// Initial plot
updateGraph();

// Slider controls
const container4 = document.getElementById('graph4');

const sliderQ1 = document.createElement('input');
sliderQ1.type='range'; sliderQ1.min=1; sliderQ1.max=20; sliderQ1.step=0.1; sliderQ1.value=8; sliderQ1.style.width='300px';
const sliderQ2 = document.createElement('input');
sliderQ2.type='range'; sliderQ2.min=1; sliderQ2.max=20; sliderQ2.step=0.1; sliderQ2.value=6; sliderQ2.style.width='300px';
const sliderQN = document.createElement('input');
sliderQN.type='range'; sliderQN.min=1; sliderQN.max=20; sliderQN.step=0.1; sliderQN.value=4; sliderQN.style.width='300px';

sliderQ1.oninput = () => updateGraph(parseFloat(sliderQ1.value), parseFloat(sliderQ2.value), parseFloat(sliderQN.value));
sliderQ2.oninput = () => updateGraph(parseFloat(sliderQ1.value), parseFloat(sliderQ2.value), parseFloat(sliderQN.value));
sliderQN.oninput = () => updateGraph(parseFloat(sliderQ1.value), parseFloat(sliderQ2.value), parseFloat(sliderQN.value));

container4.appendChild(sliderQ1);
container4.appendChild(sliderQ2);
container4.appendChild(sliderQN);
