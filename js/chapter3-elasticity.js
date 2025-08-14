const taxRate = 1;

function supply(q){ return q.map(x => x + 2); }
function demandPerfectlyElastic(q){ return q.map(_ => 5); }
function demandVariable(q,b){ return q.map(x => 5 - b*x); }

function calculateTaxIncidence(elasticity,b=0.5){
    let eqQOrig, eqPOrig, eqQTax, eqPConsumer, eqPProducer;
    if(elasticity === 'Perfectly Elastic'){
        eqQOrig = 3; eqPOrig = 5; eqQTax = 2; eqPConsumer = 5; eqPProducer = 4;
    } else if(elasticity === 'Perfectly Inelastic'){
        eqQOrig = 4; eqPOrig = 6; eqQTax = 4; eqPConsumer = 7; eqPProducer = 6;
    } else {
        eqQOrig = (5-2)/(1+b); eqPOrig = 5-b*eqQOrig;
        eqQTax = (5-(2+taxRate))/(1+b); eqPConsumer = 5-b*eqQTax; eqPProducer = 2+eqQTax;
    }
    let consumerInc = ((eqPConsumer-eqPOrig)/taxRate)*100;
    let producerInc = 100-consumerInc;
    return {eqQOrig,eqPOrig,eqQTax,eqPConsumer,eqPProducer,consumerInc,producerInc};
}

function plotElasticityFunc(){
    const elasticity = document.getElementById('elasticitySelect').value;
    const b = parseFloat(document.getElementById('bSlider').value);
    document.getElementById('bValue').textContent = b;

    const quantities = Array.from({length:500},(_,i)=>i*6/500);
    const demand = elasticity==='Perfectly Elastic'? demandPerfectlyElastic(quantities) :
                   elasticity==='Perfectly Inelastic'? quantities.map(_=>null) :
                   demandVariable(quantities,b);

    const incidence = calculateTaxIncidence(elasticity,b);

    const traces = [
        {x:quantities, y:supply(quantities), type:'scatter', name:'Supply (No Tax)', line:{color:'green'}},
        {x:quantities, y:supply(quantities).map(y=>y+taxRate), type:'scatter', name:'Supply (With Tax)', line:{color:'red'}},
        {x:quantities, y:demand, type:'scatter', name:'Demand', line:{color:'blue'}},
        {x:[incidence.eqQOrig], y:[incidence.eqPOrig], type:'scatter', mode:'markers+text', text:['Original Eq'], textposition:'top right', marker:{color:'black',size:8}},
        {x:[incidence.eqQTax], y:[incidence.eqPConsumer], type:'scatter', mode:'markers+text', text:['New Eq'], textposition:'top right', marker:{color:'orange',size:8}}
    ];

    Plotly.newPlot('plotElasticity', traces, {xaxis:{title:'Quantity', range:[0,6]}, yaxis:{title:'Price', range:[0,10]}, title:'Tax Incidence'});

    document.getElementById('tableElasticity').innerHTML = `
      <table border="1">
        <tr><th>Elasticity</th><th>Consumer Incidence (%)</th><th>Producer Incidence (%)</th></tr>
        <tr><td>${elasticity}</td><td>${incidence.consumerInc.toFixed(2)}</td><td>${incidence.producerInc.toFixed(2)}</td></tr>
      </table>`;

    let explanation = elasticity==='Perfectly Elastic'?'Consumers pay nothing; producers bear all tax.':
                      elasticity==='Perfectly Inelastic'?'Consumers bear all tax; producers pay nothing.':
                      `Variable elasticity: consumer incidence ${incidence.consumerInc.toFixed(2)}%, producer incidence ${incidence.producerInc.toFixed(2)}%.`;
    document.getElementById('explanationElasticity').textContent = explanation;
}

document.getElementById('elasticitySelect').addEventListener('change', plotElasticityFunc);
document.getElementById('bSlider').addEventListener('input', plotElasticityFunc);

plotElasticityFunc();
