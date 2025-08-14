    const LR_price = 250;
    const firm_quantity = 10;
    const initial_industry_quantity = 30000 - 50 * LR_price;
    const initial_firms = Math.floor(initial_industry_quantity / firm_quantity);
    function total_cost(Q) { return 300*Q - 10*Q**2 + 0.5*Q**3; }
    function marginal_cost(Q) { return 300 - 20*Q + 1.5*Q**2; }
    function average_total_cost(Q) { return 300 - 10*Q + 0.5*Q**2; }
    function demand_initial(P) { return 30000 - 50*P; }
    function demand_adjusted(P, shift) { return (30000 + shift) - 50*P; }
    function linspace(start, end, num) { const arr=[]; const step=(end-start)/(num-1); for(let i=0;i<num;i++) arr.push(start+step*i); return arr; }
    function updatePlots5() {
        const demandShift = parseFloat(document.getElementById("demandShift").value);
        document.getElementById("demandShiftValue").innerText = demandShift;
        const prices = linspace(200, 300, 500);
        const firm_quantities = linspace(0, 20, 500);
        const demand_Q_initial = prices.map(p => demand_initial(p));
        const demand_Q_adjusted = prices.map(p => demand_adjusted(p, demandShift));
        const new_quantity = demand_adjusted(LR_price, demandShift);
        const Q1 = initial_industry_quantity;
        const P1 = LR_price;
        const Q2 = new_quantity;
        const P2 = LR_price; // keep market price as LR_price
        const slope_sr_supply = (P2-P1)/(Q2-Q1);
        const extended_quantities = linspace(Q1-3000,Q2+3000,500);
        const sr_supply_prices = extended_quantities.map(Q => slope_sr_supply*(Q-Q1)+P1);
        const traces = [
            {x:demand_Q_initial, y:prices, type:'scatter', mode:'lines', name:'Initial Demand', line:{color:'blue'}},
            {x:[initial_industry_quantity], y:[LR_price], type:'scatter', mode:'markers', name:'Initial Equilibrium', marker:{color:'black', size:8}},
            {x:demand_Q_adjusted, y:prices, type:'scatter', mode:'lines', name:'Adjusted Demand', line:{color:'red'}},
            {x:extended_quantities, y:sr_supply_prices, type:'scatter', mode:'lines', name:'SR Supply Curve', line:{color:'green', dash:'dot'}},
            {x:firm_quantities, y:firm_quantities.map(Q=>marginal_cost(Q)), type:'scatter', mode:'lines', name:'MC', line:{color:'purple'}},
            {x:firm_quantities, y:firm_quantities.map(Q=>average_total_cost(Q)), type:'scatter', mode:'lines', name:'ATC', line:{color:'orange'}}
        ];
        const layout = {title:'Market Simulation', xaxis:{title:'Quantity (Q)'}, yaxis:{title:'Price (P)'}, showlegend:true};
        Plotly.newPlot('Chapter8-plot5', traces, layout);
    }
    updatePlots5();
    document.getElementById('demandShift').addEventListener('input', updatePlots5);
