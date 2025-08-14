const prices = Array.from({length: 100}, (_, i) => 0.1 + i * (10 - 0.1)/99);

// Marginal cost functions
function mcA(q) { return 3*q*q - 4*q + 1.1; }
function mcB(q) { return 3*q*q - 3.6*q + 1.3; }
function mcC(q) { return 3*q*q - 3*q + 1.5; }
function mcD(q) { return 3*q*q - 2.6*q + 1.7; }

// Inverse MC using linear interpolation
function inverseMC(price, mcFunc) {
    const quantities = Array.from({length: 1000}, (_, i) => 0.1 + i * (10-0.1)/999);
    const mcVals = quantities.map(mcFunc);
    return price.map(p => {
        for(let i=0;i<mcVals.length;i++){
            if(mcVals[i]>=p) return quantities[i];
        }
        return quantities[quantities.length-1];
    });
}

// Compute industry supply
function industrySupply(includeA, includeB, includeC, includeD) {
    return prices.map(p => {
        let total = 0;
        if(includeA && p >= 1) total += inverseMC([p], mcA)[0];
        if(includeB && p >= 2) total += inverseMC([p], mcB)[0];
        if(includeC && p >= 3) total += inverseMC([p], mcC)[0];
        if(includeD && p >= 5) total += inverseMC([p], mcD)[0];
        return total;
    });
}

// Plot function
function plotSupply() {
    const includeA = document.getElementById("firmA").checked;
    const includeB = document.getElementById("firmB").checked;
    const includeC = document.getElementById("firmC").checked;
    const includeD = document.getElementById("firmD").checked;

    const data = [];

    if(includeA) data.push({
        x: inverseMC(prices, mcA).map((q,p)=> prices[p]>=1 ? q : 0),
        y: prices,
        name:"Firm A Supply (P≥1)",
        line:{color:"blue"},
        type:"scatter"
    });
    if(includeB) data.push({
        x: inverseMC(prices, mcB).map((q,p)=> prices[p]>=2 ? q : 0),
        y: prices,
        name:"Firm B Supply (P≥2)",
        line:{color:"orange"},
        type:"scatter"
    });
    if(includeC) data.push({
        x: inverseMC(prices, mcC).map((q,p)=> prices[p]>=3 ? q : 0),
        y: prices,
        name:"Firm C Supply (P≥3)",
        line:{color:"green"},
        type:"scatter"
    });
    if(includeD) data.push({
        x: inverseMC(prices, mcD).map((q,p)=> prices[p]>=5 ? q : 0),
        y: prices,
        name:"Firm D Supply (P≥5)",
        line:{color:"red"},
        type:"scatter"
    });

    // Industry supply
    data.push({
        x: industrySupply(includeA, includeB, includeC, includeD),
        y: prices,
        name:"Industry Supply Curve",
        line:{color:"black", width:2},
        type:"scatter"
    });

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
["firmA","firmB","firmC","firmD"].forEach(id=>{
    document.getElementById(id).addEventListener("change", plotSupply);
});
