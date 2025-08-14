(function() {
    // Cobb-Douglas production function
    function productionFunction(K, L, alpha, beta) {
        return Math.pow(K, alpha) * Math.pow(L, beta);
    }

    // Optimal input combination
    function optimalInputMix(Y, w, r, alpha, beta) {
        const L_star = Math.pow(Y / Math.pow(w/r, alpha/beta), 1/(alpha+beta));
        const K_star = (L_star * (w/r)) * (beta/alpha);
        return [K_star, L_star];
    }

    // Total cost
    function totalCost(K, L, w, r) {
        return r*K + w*L;
    }

    // Main plot function
    function plotIsoquantsAndCost(w, r, alpha, beta) {
        const Y_values = Array.from({length:10}, (_,i)=>1 + i*(10-1)/9);
        const K_grid = Array.from({length:50}, (_,i)=>0.1 + i*(10-0.1)/49);
        const L_grid = Array.from({length:50}, (_,i)=>0.1 + i*(10-0.1)/49);

        // Isoquants traces (dark purple)
        const isoquantsTraces = Y_values.map(Y => {
            const K_line = [];
            const L_line = [];
            K_grid.forEach(K => {
                const L_val = Math.pow(Y / Math.pow(K, alpha), 1/beta);
                if(L_val <= Math.max(...L_grid)) {
                    K_line.push(K);
                    L_line.push(L_val);
                }
            });
            return {
                x: K_line,
                y: L_line,
                mode: 'lines',
                line: {color: 'darkviolet', width: 2},
                name: `Y=${Y.toFixed(1)}`
            };
        });

        // Optimal points
        const optimal_K = [], optimal_L = [], total_costs = [];
        Y_values.forEach(Y=>{
            const [K_star, L_star] = optimalInputMix(Y, w, r, alpha, beta);
            optimal_K.push(K_star);
            optimal_L.push(L_star);
            total_costs.push(totalCost(K_star, L_star, w, r));
        });

        const optimalPointsTrace = {
            x: optimal_K,
            y: optimal_L,
            mode: 'markers+text',
            text: Y_values.map((Y,i)=>`Y=${Y.toFixed(1)}, C=${total_costs[i].toFixed(1)}`),
            textposition: 'top right',
            marker: {color: 'red', size: 8},
            name: 'Cost-minimizing points'
        };

        // Total cost trace
        const totalCostTrace = {
            x: Y_values,
            y: total_costs,
            mode: 'lines+markers',
            line: {color: 'green'},
            name: 'Total Cost'
        };

        const layout = {
            grid: {rows:1, columns:2, pattern:'independent'},
            title: 'Cobb-Douglas Isoquants and Total Cost Curve',
            xaxis: {title:'Capital (K)'},
            yaxis: {title:'Labor (L)'},
            xaxis2: {title:'Output (Y)'},
            yaxis2: {title:'Total Cost (C)'}
        };

        Plotly.newPlot('plotContainer', 
            [...isoquantsTraces.map(trace => ({...trace, xaxis:'x1', yaxis:'y1'})), 
             {...optimalPointsTrace, xaxis:'x1', yaxis:'y1'}, 
             {...totalCostTrace, xaxis:'x2', yaxis:'y2'}], 
            layout
        );
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
})();
