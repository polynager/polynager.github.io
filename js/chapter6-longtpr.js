(function() {
    // Constants
    const A = 15;
    const alpha_K = 0.25;
    const alpha_L = 0.75;
    const L_values = Array.from({length:500}, (_,i) => 1 + i*(100-1)/499);
    const K_fixed_initial = 3;

    // Production function
    function longTermProduction(L, K){
        return L.map(l => A * Math.pow(K, alpha_K) * Math.pow(l, alpha_L));
    }

    // Marginal Product of Labor
    function marginalProductOfLabor(L, K){
        return L.map(l => A * Math.pow(K, alpha_K) * alpha_L * Math.pow(l, alpha_L - 1));
    }

    // Plotting function
    function plotProduction(K_new){
        const Q_original = longTermProduction(L_values, K_fixed_initial);
        const MPL_original = marginalProductOfLabor(L_values, K_fixed_initial);
        const Q_new = longTermProduction(L_values, K_new);
        const MPL_new = marginalProductOfLabor(L_values, K_new);

        const traceQ_orig = {x:L_values, y:Q_original, name:`Original Q (K*=${K_fixed_initial})`, mode:'lines', line:{color:'blue', dash:'dash'}};
        const traceQ_new = {x:L_values, y:Q_new, name:`Adjusted Q (K*=${K_new})`, mode:'lines', line:{color:'red'}};
        const traceMPL_orig = {x:L_values, y:MPL_original, name:`Original MPL (K*=${K_fixed_initial})`, mode:'lines', line:{color:'green', dash:'dash'}};
        const traceMPL_new = {x:L_values, y:MPL_new, name:`Adjusted MPL (K*=${K_new})`, mode:'lines', line:{color:'orange'}};

        const fig = {
            data: [traceQ_orig, traceQ_new, traceMPL_orig, traceMPL_new],
            layout: {
                title: 'Long-term Production Function and Marginal Product of Labour',
                grid: {rows:2, columns:1, pattern:'independent'},
                xaxis: {title:'Labour (L)'},
                yaxis: {title:'Output (Q)'},
                xaxis2: {title:'Labour (L)', anchor:'y2'},
                yaxis2: {title:'MPL', anchor:'x2'},
                height:600
            }
        };
        Plotly.newPlot('longTermPlot', fig.data, fig.layout);

        // Explanation text
        let explanation = '';
        if(K_new > 3){
            explanation = "Using more capital with labor allows the firm to reduce diminishing marginal returns, increasing output more efficiently.";
        } else if(K_new < 3){
            explanation = "Reducing capital per worker increases diminishing marginal returns, lowering productivity for additional labor.";
        } else {
            explanation = "This represents the short-run fixed capital scenario. Adjusting K* shows how firms can balance capital and labor in the long run.";
        }
        document.getElementById('longTermExplanation').innerText = explanation;
    }

    // Initial plot
    plotProduction(K_fixed_initial);

    // Slider interaction
    const KSlider = document.getElementById('KSlider');
    const KValue = document.getElementById('KValue');
    KSlider.addEventListener('input', () => {
        const K_new = parseFloat(KSlider.value);
        KValue.textContent = K_new.toFixed(1);
        plotProduction(K_new);
    });

})();
