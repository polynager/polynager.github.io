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

// Trace generator
function makeTraces(demand, mr, eqQ, namePrefix) {
    return [
        {x:q, y:q.map(demand), type:'scatter', mode:'lines', name:`${namePrefix} Demand`, line:{color:'blue'}},
        {x:q, y:q.map(mr), type:'scatter', mode:'lines', name:`${namePrefix} MR`, line:{color:'purple'}},
        {x:q, y:q.map(mc), type:'scatter', mode:'lines', name:'MC', line:{color:'red'}},
        {x:q, y:q.map(atc), type:'scatter', mode:'lines', name:'ATC', line:{color:'skyblue'}},
        {x:[eqQ], y:[demand(eqQ)], type:'scatter', mode:'markers', name:'Equilibrium', marker:{color:'black', size:8}},
        {x:[eqQ, eqQ], y:[0,demand(eqQ)], type:'scatter', mode:'lines', line:{dash:'dash', color:'gray'}, showlegend:false},
        {x:[0,eqQ], y:[demand(eqQ),demand(eqQ)], type:'scatter', mode:'lines', line:{dash:'dash', color:'gray'}, showlegend:false}
    ];
}

// Datasets
const monopoly = makeTraces(demandOne, mrOne, 8, 'Monopoly');
const twoFirms = makeTraces(demandTwo, mrTwo, 6, 'Two Firms');
const longRun = makeTraces(demandN, mrN, 4, 'Long Run');

// Layout
const layout = {
    title:'Market Evolution: Monopoly → Two Firms → N Firms',
    xaxis:{title:'Quantity of meals (Q)'},
    yaxis:{title:'Price and cost ($)', range:[0,12]},
    legend:{font:{size:10}},
    margin:{l:60,r:30,t:50,b:50}
};

// Initial plot
Plotly.newPlot('graph4', monopoly, layout, {responsive:true});

// Add dropdown menu to switch datasets
const dropdown = document.createElement('select');
dropdown.style.marginBottom = '10px';
['Monopoly','Two Firms','Long Run'].forEach((label, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.text = label;
    dropdown.appendChild(option);
});
document.getElementById('graph4').prepend(dropdown);

dropdown.addEventListener('change', function() {
    const dataset = [monopoly, twoFirms, longRun][this.value];
    Plotly.react('graph4', dataset, layout);
});
