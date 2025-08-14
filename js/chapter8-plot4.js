const quantities4 = Array.from({length: 100}, (_, i) => 0.1 + i * (5 - 0.1) / 99);
const market_price4 = 5;

// Base total cost function
function base_total_cost4(Q) {
    return Q**3 - 2*Q**2 + 1.1*Q + 12;
}

// Marginal cost with shift
function marginal_cost4(Q, shift) {
    return 3*Q**2 - 4*Q + 1.1 + shift;
}

// Average total cost with shift
function average_total_cost4(shift) {
    return quantities4.map(q => (base_total_cost4(q) + shift * q) / q);
}

// Find optimal quantity (MC = P)
function find_optimal_quantity4(shift) {
    for (let i = 0; i < quantities4.length; i++) {
        if (marginal_cost4(quantities4[i], shift) >= market_price4) {
            return quantities4[i];
        }
    }
    return quantities4[quantities4.length - 1];
}

function updatePlot4(shift) {
    const mc_values = quantities4.map(q => marginal_cost4(q, shift));
    const atc_values = average_total_cost4(shift);
    const market_price_line = quantities4.map(_ => market_price4);

    const Q_star = find_optimal_quantity4(shift);
    const MC_star = marginal_cost4(Q_star, shift);

    // Producer surplus polygon: go along price, then MC back
    const ps_quantities = quantities4.filter(q => q <= Q_star);
    const ps_price = ps_quantities.map(_ => market_price4); // top line
    const ps_mc = ps_quantities.map(q => marginal_cost4(q, shift)); // bottom line

    // Include axes for textbook-style closure
    const ps_x = [0, ...ps_quantities, Q_star, ...ps_quantities.slice().reverse(), 0];
    const ps_y = [market_price4, ...ps_price, MC_star, ...ps_mc.slice().reverse(), 0];

    const mc_trace = {x: quantities4, y: mc_values, mode: 'lines', name: 'MC', line: {color: 'red'}};
    const atc_trace = {x: quantities4, y: atc_values, mode: 'lines', name: 'ATC', line: {color: 'purple'}};
    const price_trace = {x: quantities4, y: market_price_line, mode: 'lines', name: 'Market Price', line: {color: 'blue', dash: 'dash'}};
    
    const ps_trace = {
        x: ps_x,
        y: ps_y,
        fill: 'toself',
        fillcolor: 'rgba(255,165,0,0.3)',
        line: {color: 'orange'},
        name: 'Producer Surplus',
        type: 'scatter'
    };

    const opt_q_trace = {
        x:[Q_star], y:[MC_star], 
        mode:'markers+text', 
        name:'Q*', 
        text:['Q*'], 
        textposition:'top right', 
        marker:{color:'black', size:8}
    };

    Plotly.newPlot('Chapter8-plot4', [mc_trace, atc_trace, price_trace, ps_trace, opt_q_trace], 
                   {xaxis:{title:'Quantity'}, yaxis:{title:'Price / Cost', range:[0,20]}, 
                    title:'Producer Surplus with Adjustable Total Cost'});
}

// Slider for Plot 4
const shiftSlider4 = document.getElementById('shift');
const shiftValue4 = document.getElementById('shift-value');

shiftSlider4.addEventListener('input', function() {
    const shift = parseFloat(this.value);
    shiftValue4.textContent = shift;
    updatePlot4(shift);
});

// Initial plot
updatePlot4(0);
