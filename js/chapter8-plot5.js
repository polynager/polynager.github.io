const LR_price = 250;
const firm_quantity = 10;
const initial_industry_quantity = 30000 - 50 * LR_price;
const initial_firms = Math.floor(initial_industry_quantity / firm_quantity);

// Firm-level cost functions
function total_cost(Q) { return 300*Q - 10*Q**2 + 0.5*Q**3; }
function marginal_cost(Q) { return 300 - 20*Q + 1.5*Q**2; }
function average_total_cost(Q) { return 300 - 10*Q + 0.5*Q**2; }

// Demand functions
function demand_initial(P) { return 30000 - 50*P; }
function demand_adjusted(P, shift) { return 30000 + shift - 50*P; }

function plotMarket(demand_shift) {
    const prices = Array.from({length: 500}, (_, i) => 200 + i*(300-200)/499);
    const quantities = Array.from({length: 500}, (_, i) => i*100/499);

    const demand_Q_initial = prices.map(p => demand_initial(p));
    const demand_Q_adjusted = prices.map(p => demand_adjusted(p, demand_shift));

    const new_quantity = demand_adjusted(LR_price, demand_shift);
    const new_firm_quantity = new_quantity / initial_firms;
    const new_firm_price = marginal_cost(new_firm_quantity);

    const Q1 = initial_industry_quantity, P1 = LR_price;
    const Q2 = new_quantity, P2 = new_firm_price;
    const slope_sr_supply = (P2 - P1)/(Q2 - Q1);
    const extended_quantities = Array.from({length:500}, (_,i)=>Q1-3000 + i*(Q2+3000-(Q1-3000))/499);
    const sr_supply_prices = extended_quantities.map(Q => slope_sr_supply*(Q-Q1)+P1);

    // Firm-level curves
    const firm_quantities = Array.from({length:500}, (_,i)=>i*20/499);
    const mc_values = firm_quantities.map(marginal_cost);
    const atc_values = firm_quantities.map(average_total_cost);

    const traces = [
        // Initial Market
        {x:demand_Q_initial, y:prices, mode:'lines', name:'Initial Demand', line:{color:'blue'}},
        {x:[initial_industry_quantity], y:[LR_price], mode:'markers', name:'Initial Equilibrium', marker:{color:'black', size:8}},
        {x:[0, 50000], y:[LR_price, LR_price], mode:'lines', name:'LR Price', line:{color:'purple', dash:'dash'}},
        
        // Adjusted Demand
        {x:demand_Q_adjusted, y:prices, mode:'lines', name:'Adjusted Demand', line:{color:'red'}},
        {x:[new_quantity], y:[LR_price], mode:'markers', name:'New Equilibrium', marker:{color:'red', size:8}},

        // Firm-level curves
        {x:firm_quantities, y:mc_values, mode:'lines', name:'MC', line:{color:'orange'}},
        {x:firm_quantities, y:atc_values, mode:'lines', name:'ATC', line:{color:'purple'}},
        {x:[new_firm_quantity], y:[new_firm_price], mode:'markers', name:'New Firm Quantity', marker:{color:'red', size:8}},

        // Short-run supply curve
        {x:extended_quantities, y:sr_supply_prices, mode:'lines', name:'SR Supply', line:{color:'green', dash:'dot'}}
    ];

    const layout = {
        title: `Market Adjustment with Demand Shift = ${demand_shift}`,
        xaxis:{title:'Quantity (Q)'},
        yaxis:{title:'Price (P)'},
        showlegend:true,
        height:800
    };

    Plotly.newPlot('Chapter8-plot5', traces, layout);
}

// Slider event
const slider = document.getElementById('demandShift');
const sliderValue = document.getElementById('demandShiftValue');

slider.addEventListener('input', function(){
    const val = parseFloat(this.value);
    sliderValue.textContent = val;
    plotMarket(val);
});

// Initial plot
plotMarket(0);
