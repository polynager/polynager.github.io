// Cobb-Douglas production function
function productionFunction(K, L, alpha, beta) {
    return K.map((k,i) => K.map((_,j) => Math.pow(k, alpha) * Math.pow(L[j], beta)));
}

// Tangency condition: optimal input mix (approximation)
function optimalInputMix(Y, w, r, alpha, beta) {
    const L_star = Math.pow(Y / Math.pow((w/r), alpha/beta), 1/(alpha+beta));
    const K_star = (L_star * (w/r)) * (beta/alpha);
    return [K_star, L_star];
}

// Total cost
function totalCost(K, L, w, r) {
    return r*K + w*L;
}

// Plot function
function plotIsoquantsAndCost(w, r, alpha, beta) {
    const Y_values = Array.from({length:10}, (_,i)=>1 + i*(10-1)/9);
    const K = Array.from({length:100}, (_,i)=>0.1 + i*(10-0.1)/99);
    const L = Array.from({length:100}, (_,i)=>0.1 + i*(10-0.1)/99);

    // Isoquants
    const isoquantsTraces = Y_values.map(Y=>{
        const Z = K.map(k => L.map(l => Math.pow(k, alpha) * Math.pow(l, beta)));
        return {x:K, y:L, z:Z, type:'contour', contours:{showlabels:true}, showscale:false, name:`Y=${Y}`};
    });

    // Optimal points and total costs
    const optimal_K = [];
    const optimal_L = [];
    const total_costs = [];
    Y_values.forEach(Y=>{
        const [K_star,L_star] = optimalInputMix(Y,w,r,alpha,beta);
        optimal_K.push(K_star);
        optimal_L.push(L_star);
        total_costs.push(totalCost(K_star,L_star,w,r));
        isoquantsTraces.push({x:[K_star], y:[L_star], mode:'markers+text', text:[`Y=${Y.toFixed(1)}, C=${totalCost(K_star,L_star,w,r).toFixed(1)}`], textposition:'top right', marker:{color:'red', size:8}, name:`Optimal Y=${Y}`});
    });

    // Plot isoquants
    const layout = {title:'Isoquants and Optimal Input Combinations', xaxis:{title:'Capital (K)'}, yaxis:{title:'Labor (L)'}};
    Plotly.newPlot('isoquantsPlot', isoquantsTraces, layout);

    // Total cost curve
    const totalCostTrace = {x:Y_values, y:total_costs, mode:'lines+markers', name:'Total Cost', line:{color:'green'}};
    const totalCostLayout = {title:'Total Cost Curve', xaxis:{title:'Output (Y)'}, yaxis:{title:'Total Cost (C)'}};
    Plotly.newPlot('isoquantsPlot', [totalCostTrace], totalCostLayout);
}

// Initial plot
plotIsoquantsAndCost(1,1,0.5,0.5);

// Slider interactions
['w','r','alpha','beta'].forEach(param=>{
    const slider = document.getElementById(`${param}Slider`);
    const valueSpan = document.getElementById(`${param}Value`);
    slider.addEventListener('input', ()=>{
        valueSpan.textContent = slider.value;
        plotIsoquantsAndCost(
            parseFloat(document.getElementById('wSlider').value),
            parseFloat(document.getElementById('rSlider').value),
            parseFloat(document.getElementById('alphaSlider').value),
            parseFloat(document.getElementById('betaSlider').value)
        );
    });
});
