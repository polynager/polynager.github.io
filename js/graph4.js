// Functions
function demandOne(q) { return 10 - 0.5*q; }
function mrOne(q) { return 10 - q; }
function demandTwo(q) { return 8 - 0.4*q; }
function mrTwo(q) { return 8 - 0.8*q; }
function demandN(q) { return 6 - 0.3*q; }
function mrN(q) { return 6 - 0.6*q; }
function mc(q) { return 2 + 0.1*q; }
function atc(q, fixedCost=5) { return mc(q) + fixedCost/q; }

// Quantities
const q = Array.from({length:500}, (_,i) => 1 + i*(20-1)/499);

// Traces for Monopoly, Two Firms, and N Firms
const monopoly = [
    {x:q, y:q.map(demandOne), type:'scatter', mode:'lines', name:'Demand', line:{color:'blue'}},
    {x:q, y:q.map(mrOne), type:'scatter', mode:'lines', name:'MR', line:{color:'purple'}},
    {x:q, y:q.map(mc), type:'scatter', mode:'lines', name:'MC', line:{color:'red'}},
    {x:q, y:q.map(atc), type:'scatter', mode:'lines', name:'ATC', line:{color:'skyblue'}},
    {x:[8], y:[demandOne(8)], type:'scatter', mode:'markers', name:'Equilibrium', marker:{color:'black', size:8}},
    {x:[8,8], y:[0,demandOne(8)], type:'scatter', mode:'lines', line:{dash:'dash', color:'gray'}, showlegend:false},
    {x:[0,8], y:[demandOne(8),demandOne(8)], type:'scatter', mode:'lines', line:{dash:'dash', color:'gray'}, showlegend:false}
];

const twoFirms = [
    {x:q, y:q.map(demandTwo), type:'scatter', mode:'lines', name:'Residual Demand', line:{color:'blue'}},
    {x:q, y:q.map(mrTwo), type:'scatter', mode:'lines', name:'Residual MR', line:{color:'purple'}},
    {x:q, y:q.map(mc), type:'scatter', mode:'lines', name:'MC', line:{color:'red'}},
    {x:q, y:q.map(atc), type:'scatter', mode:'lines', name:'ATC', line:{color:'skyblue'}},
    {x:[6], y:[demandTwo(6)], type:'scatter', mode:'markers', name:'Equilibrium', marker:{color:'black', size:8}},
    {x:[6,6], y:[0,demandTwo(6)], type:'scatter', mode:'lines', line:{dash:'dash', color:'gray'}, showlegend:false},
    {x:[0,6], y:[demandTwo(6),demandTwo(6)], type:'scatter', mode:'lines', line:{dash:'dash', color:'gray'}, showlegend:false}
];

const longRun = [
    {x:q, y:q.map(demandN), type:'scatter', mode:'lines', name:'Demand N', line:{color:'blue'}},
    {x:q, y:q.map(mrN), type:'scatter', mode:'lines', name:'MR N', line:{color:'purple'}},
    {x:q, y:q.map(mc), type:'scatter', mode:'lines', name:'MC', line:{color:'red'}},
    {x:q, y:q.map(atc), type:'scatter', mode:'lines', name:'ATC', line:{color:'skyblue'}},
    {x:[4], y:[demandN(4)], type:'scatter', mode:'markers', name:'Equilibrium', marker:{color:'black', size:8}},
    {x:[4,4], y:[0,demandN(4)], type:'scatter', mode:'lines', line:{dash:'dash', color:'gray'}, showlegend:false},
    {x:[0,4], y:[demandN(4),demandN(4)], type:'scatter', mode:'lines', line:{dash:'dash', color:'gray'}, showlegend:false}
];

// Layouts
const layout = {
    title:'Market Evolution: Monopoly → Two Firms → N Firms',
    xaxis:{title:'Quantity of meals (Q)'},
    yaxis:{title:'Price and cost ($)', range:[0,12]},
    legend:{font:{size:10}},
    margin:{l:60,r:30,t:50,b:50}
};

// Use a dropdown to switch between market structures
const data = monopoly; // default view

const config = {responsive:true};

Plotly.newPlot('graph4', data, layout, config);

// Dropdown menu
const updateMenus = [{
    y:1.15,
    buttons:[
        {method:'restyle', label:'Monopoly', args:['x', [monopoly.map(t=>t.x)], 0]},
        {method:'restyle', label:'Two Firms', args:['x', [twoFirms.map(t=>t.x)], 0]},
        {method:'restyle', label:'Long Run', args:['x', [longRun.map(t=>t.x)], 0]}
    ]
}];
