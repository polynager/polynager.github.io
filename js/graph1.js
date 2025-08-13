// Collusion vs Cheating Interactive Graph
const q = Array.from({length: 101}, (_, i) => i * 0.2); // 0 to 20

function updateGraph(q_collusion=8, q_cheating=9) {
    const demand = q.map(qi => 20 - qi);
    const mr = q.map(qi => 20 - 2 * qi);
    const MC = Array(q.length).fill(4);

    const collusion = {x: [q_collusion], y: [20 - q_collusion], text: [`Collusion (Q=${q_collusion}, P=${20-q_collusion})`]};
    const cheating = {x: [q_cheating], y: [20 - q_cheating], text: [`Cheating (Q=${q_cheating}, P=${20-q_cheating})`]};

    const trace1 = {x: q, y: demand, type: 'scatter', mode: 'lines', name: 'Demand', line: {color: 'blue'}};
    const trace2 = {x: q, y: mr, type: 'scatter', mode: 'lines', name: 'Marginal Revenue', line: {color: 'purple'}};
    const trace3 = {x: q, y: MC, type: 'scatter', mode: 'lines', name: 'MC = $4', line: {color: 'red'}};
    const trace4 = {x: collusion.x, y: collusion.y, mode:'markers+text', name:'Collusion', text: collusion.text, textposition: 'top center', marker: {color: 'black', size:8}};
    const trace5 = {x: cheating.x, y: cheating.y, mode:'markers+text', name:'Cheating', text: cheating.text, textposition: 'top center', marker: {color: 'black', size:8}};

    const layout = {
        title: 'Collusion and Cheating in Oligopoly',
        xaxis: {title: 'Quantity', range: [0,20]},
        yaxis: {title: 'Price ($/unit)', range: [0,20]},
        showlegend: true,
        sliders: [
            {
                pad: {t: 30},
                currentvalue: {prefix: "Collusion Q: "},
                steps: q.map(val => ({label: val.toFixed(1), method:'update', args:[{x:[val], y:[20-val]}, {title:'Updated Collusion Q'}]}))
            }
        ]
    };

    Plotly.newPlot('graph1', [trace1, trace2, trace3, trace4, trace5], layout);
}

// Initial graph
updateGraph();

// Optional: create HTML sliders separately for finer control
const container = document.getElementById('graph1');
const sliderCollusion = document.createElement('input');
sliderCollusion.type = 'range';
sliderCollusion.min = 0;
sliderCollusion.max = 20;
sliderCollusion.step = 0.1;
sliderCollusion.value = 8;
sliderCollusion.style.width = '300px';
sliderCollusion.oninput = () => updateGraph(parseFloat(sliderCollusion.value), parseFloat(sliderCheating.value));
container.appendChild(sliderCollusion);

const sliderCheating = document.createElement('input');
sliderCheating.type = 'range';
sliderCheating.min = 0;
sliderCheating.max = 20;
sliderCheating.step = 0.1;
sliderCheating.value = 9;
sliderCheating.style.width = '300px';
sliderCheating.oninput = () => updateGraph(parseFloat(sliderCollusion.value), parseFloat(sliderCheating.value));
container.appendChild(sliderCheating);
