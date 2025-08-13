// Reaction Curves Interactive Graph
const p_K_values = Array.from({length:101}, (_, i) => 200 + i); // 200 to 300

function updateGraph(p_K_inter=257.78, p_B_inter=462.22){
    function burton_reaction(p_K){ return 333.33 + 0.5*p_K; }
    function k2_reaction(p_K){ return 8*p_K - 1600; }

    const traceBurton = {x: p_K_values, y: p_K_values.map(burton_reaction), type:'scatter', mode:'lines', name:"Burton's Reaction Curve", line:{color:'blue'}};
    const traceK2 = {x: p_K_values, y: p_K_values.map(k2_reaction), type:'scatter', mode:'lines', name:"K2's Reaction Curve", line:{color:'green'}};
    const intersection = {x:[p_K_inter], y:[p_B_inter], mode:'markers+text', text:['Intersection'], textposition:'top center', marker:{color:'red', size:8}};

    const layout = {
        title:'Reaction Curves and Nash Equilibrium',
        xaxis:{title:"K2's Price", range:[200,300]},
        yaxis:{title:"Burton's Price", range:[300,500]}
    };

    Plotly.newPlot('graph3',[traceBurton, traceK2, intersection], layout);
}

// Initial plot
updateGraph();

// Slider controls
const container3 = document.getElementById('graph3');

const sliderPK = document.createElement('input');
sliderPK.type='range'; sliderPK.min=200; sliderPK.max=300; sliderPK.step=1; sliderPK.value=257.78; sliderPK.style.width='300px';
const sliderPB = document.createElement('input');
sliderPB.type='range'; sliderPB.min=300; sliderPB.max=500; sliderPB.step=1; sliderPB.value=462.22; sliderPB.style.width='300px';

sliderPK.oninput = () => updateGraph(parseFloat(sliderPK.value), parseFloat(sliderPB.value));
sliderPB.oninput = () => updateGraph(parseFloat(sliderPK.value), parseFloat(sliderPB.value));

container3.appendChild(sliderPK);
container3.appendChild(sliderPB);
