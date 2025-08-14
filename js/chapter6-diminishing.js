(function() {
    // Constants
    const K_fixed = 3;
    const A = 15;
    const alpha_K = 0.25;
    const alpha_L = 0.75;

    // Production function Q = f(K*, L)
    function shortTermProduction(L, K_fixed){
        return L.map(l => A * Math.pow(K_fixed, alpha_K) * Math.pow(l, alpha_L));
    }

    // Marginal Product of Labor (MPL)
    function marginalProductOfLabor(L, K_fixed){
        return L.map(l => A * Math.pow(K_fixed, alpha_K) * alpha_L * Math.pow(l, alpha_L - 1));
    }

    // Generate labour values
    const L_values = [];
    const N = 500;
    for(let i=1; i<=N; i++){
        L_values.push(i * 100 / N); // 1 to 100
    }

    // Calculate Q and MPL
    const Q_values = shortTermProduction(L_values, K_fixed);
    const MPL_values = marginalProductOfLabor(L_values, K_fixed);

    // Plot traces
    const traceQ = {
        x: L_values,
        y: Q_values,
        mode: 'lines',
        name: 'Short-term Production Function Q = f(K*, L)',
        line: {color: 'blue'}
    };

    const traceMPL = {
        x: L_values,
        y: MPL_values,
        mode: 'lines',
        name: 'Marginal Product of Labour (MPL)',
        line: {color: 'green'}
    };

    // Plot layout
    const layout = {
        title: 'Short-term Production Function and Marginal Product of Labour',
        grid: {rows: 2, columns: 1, pattern: 'independent'},
        xaxis: {title: 'Labour (L)'},
        yaxis: {title: 'Output (Q)'},
        xaxis2: {title: 'Labour (L)'},
        yaxis2: {title: 'MPL'}
    };

    // Plot figure
    Plotly.newPlot('Chapter6-productionPlot', 
        [ {...traceQ, xaxis:'x', yaxis:'y'}, {...traceMPL, xaxis:'x2', yaxis:'y2'} ],
        layout
    );

})();
