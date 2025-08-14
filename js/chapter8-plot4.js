const quantities = Array.from({length: 100}, (_, i) => 0.1 + i*(5-0.1)/99);
const market_price = 5;

// Base total cost function
function base_total_cost(Q) {
    return Q**3 - 2*Q**2 + 1.1*Q + 12;
}

// Marginal cost with shift
function marginal_cost(Q, shift) {
    return 3*Q**2 - 4*Q + 1.1 + shift;
}

// Average total cost with shift
function average_total_cost(Q, shift) {
    return quantities.map(q => (base_total_cost(q) + shift*q)/q);
}

// Find optimal quantity (MC = P) using simple numeric search
function find_optimal_quantity(shift) {
    for (let i = 0; i < quantities.length; i++) {
        if (marginal_cost(quantities[i], shift) >= market_price) {
            return quantities[i];
        }
    }
    return quantities[quantities.length-1];
}

function updatePlot(shift) {
    const mc_values = quantities.map(q => marginal_cost(q, shift));
    const atc_values = average_total_cost(quantities, shift);
    const market_price_line = quantities.map(_ => market_price);

    const Q_star = find_optimal_quantity(shift);
    const MC_star = marginal_cost(Q_star, shift);

    // Producer surplus area points
    const ps_quantities = quantities.filter(q => q <= Q_star);
    const ps_mc = ps_quantities.map(q => marginal_cost(q, shift));
    const ps_price = ps_quantities.map(_ => market_price);

    const mc_trace = {x: quantities, y: mc_values, mode: 'lines', name: 'MC', line: {color:'red'}};
    const atc_trace = {x: quantities, y: atc_values, mode: 'lines', name: 'ATC', line: {color:'purple'}};
    const price_trace = {x: quantities, y: market_price_line, mode: 'lines', name: 'Market Price', line: {color:'blue', dash:'dash'}};
    const ps_trace = {x: ps_quantities.concat(ps_quantities.reverse()), 
                      y: ps_price.concat(ps_mc.reverse()), 
                      fill: 'toself', fillcolor: 'rgba(255,165,0,0.3)', line: {color:'orange'}, name: 'Producer Surplus', type:'scatter'};
    const opt_q_trace = {x:[Q_star], y:[MC_star], mode:'markers+text', name:'Q*', text:['Q*'], textposition:'top right', marker:{color:'black', size:8}};

    Plotly.newPlot('Chapter8-plot4', [mc_trace, atc_trace, price_trace, ps_trace, opt_q_trace], 
                   {xaxis:{title:'Quantity'}, yaxis:{title:'Price / Cost', range:[0,20]}, title:'Producer Surplus with Adjustable Total Cost'});
}

// Initialize
const slider = document.getElementById('shift');
const shiftValue = document.getElementById('shift-value');

slider.addEventListener('input', function() {
    const shift = parseFloat(this.value);
    shiftValue.textContent = shift;
    updatePlot(shift);
});

// Initial plot
updatePlot(0);
