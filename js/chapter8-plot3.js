const prices = Array.from({length: 100}, (_, i) => 0.1 + i * (10 - 0.1)/99);

// Marginal cost functions
function mcA(q) { return 3*q*q - 4*q + 1.1; }
function mcB(q) { return 3*q*q - 3.6*q + 1.3; }
function mcC(q) { return 3*q*q - 3*q + 1.5; }
function mcD(q) { return 3*q*q - 2.6*q + 1.7; }

// Inverse MC function (numerical interpolation)
function inverseMC(price, mcFunc) {
    const quantities = Array.from({length: 1000}, (_, i) => 0.1 + i * (10-0.1)/999);
    const mcVals = quantities.map(mcFunc);
    return price.map(p => {
        for(let i=0;i<mcVals.length;i++){
            if(mcVals[i]>=p) return quantities[i];
        }
        return quantities[quantities.length-1]; // max quantity if price above MC
    });
}

// Compute industry supply based on included firms
function industrySupply(includeA, includeB, includeC, includeD) {
    const supply = [];
    for(let p of prices){
        let total = 0;
        if(includeA && p >= 1) total += inverseMC([p], mcA)[0];
        if(includeB && p >= 2) total += inverseMC([p], mcB)[0];
        if(includeC && p >= 3) total += inverseMC([p], mcC)[0];
        if(includeD && p >= 5) total += inverseMC([p], mcD)[0];
        supply.push(total);
    }
    return supply;
}

// Plot function
function plotSupply() {
    const includeA = document.getElementById("firmA").checked;
    const includeB = document.getElementById("firmB").checked;
    const includeC = document.getElementById("firmC").checked;
    const includeD = document.getElementById("firmD").checked;

    const data = [];

    if(includeA){
        const qA = inverseMC(prices, mcA).map((q,p)=> prices.findIndex(pp=>pp==p)>=0? q : 0);
        data.push({x: qA, y: prices, name:"Firm A Supply (P≥1)", line:{color:"blue"}, type:"scatter"});
    }
    if(includeB){
        const qB = inverseMC(prices, mcB).map((q,p)=> prices.findIndex(pp=>pp==p)>=0? q : 0);
        data.push({x: qB, y: prices, name:"Firm B Supply (P≥2)", line:{color:"orange"}, type:"scatter"});
    }
    if(includeC){
        const qC = inverseMC(prices, mcC).map((q,p)=> prices.findIndex(pp=>pp==p)>=0? q : 0);
        data.push({x: qC, y: prices, name:"Firm C Supply (P≥3)", line:{color:"green"}, type:"scatter"});
    }
    if(includeD){
        const qD = inverseMC(prices, mcD).map((q,p)=> prices.findIndex(pp=>pp==p)>=0? q : 0);
        data.push({x: qD, y: prices, name:"Firm D Supply (P≥5)", line:{color:"red"}, type:"scatter"});
    }

    const industryQ = industrySupply(includeA, includeB, includeC, includeD);
    data.push({x: industryQ, y: prices, name:"Industry Supply Curve", line:{color:"black", width:2}, type:"scatter"});

    const layout = {
        title: "Short-Run Industry Supply Curve with Heterogeneous Firm Costs",
        xaxis: {title: "Quantity Supplied (Q)", range:[0,15]},
        yaxis: {title: "Price (P)", range:[0,10]},
        showlegend:true
    };

    Plotly.newPlot("Chapter8-plot3", data, layout);
}

// Initial plot
plotSupply();

// Add checkbox listeners
document.getElementById("firmA").addEventListener("change", plotSupply);
document.getElementById("firmB").addEventListener("change", plotSupply);
document.getElementById("firmC").addEventListener("change", plotSupply);
document.getElementById("firmD").addEventListener("change", plotSupply);
