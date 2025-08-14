(function() {
    const outputLevel = 4;
    const K = Array.from({length: 100}, (_, i) => 0.1 + i * 0.099);
    const L = Array.from({length: 100}, (_, i) => 0.1 + i * 0.099);

    function meshgrid(x, y) {
        const X = [], Y = [];
        for (let i = 0; i < y.length; i++) {
            X.push(x);
            Y.push(Array(x.length).fill(y[i]));
        }
        return [X, Y];
    }

    const [K_grid, L_grid] = meshgrid(K, L);

    // Production function y = A * K^0.5 * L^0.5
    function production(K, L, A) {
        const Z = [];
        for (let i = 0; i < K.length; i++) {
            const row = [];
            for (let j = 0; j < K[0].length; j++) {
                row.push(A * Math.pow(K[i][j], 0.5) * Math.pow(L[i][j], 0.5));
            }
            Z.push(row);
        }
        return Z;
    }

    // Original isoquant with A=1
    const Z_original = production(K_grid, L_grid, 1);

    function plot(A) {
        const Z_new = production(K_grid, L_grid, A);

        const trace_original = {
            z: Z_original,
            x: K,
            y: L,
            type: 'contour',
            contours: {start: outputLevel, end: outputLevel, coloring: 'lines'},
            line: {color: 'blue', dash: 'dash', width:4},
            name: 'Original Isoquant (A=1)',
            showscale: false
        };

        const trace_new = {
            z: Z_new,
            x: K,
            y: L,
            type: 'contour',
            contours: {start: outputLevel, end: outputLevel, coloring: 'lines'},
            line: {color: 'red', width:4},
            name: `New Isoquant (A=${A.toFixed(2)})`,
            showscale: false
        };

        const layout = {
            title: `Isoquants for Output Level y = ${outputLevel} with Technology A`,
            xaxis: {title: 'Capital (K)'},
            yaxis: {title: 'Labor (L)'}
        };

        Plotly.newPlot('Isoquantoutput-chapter6', [trace_original, trace_new], layout);

        // Explanation
        let explanation = '';
        if (A > 1) explanation = `When technology (A = ${A.toFixed(2)}) increases, the isoquant shifts inward toward the origin. Less capital and labor are needed to produce y = ${outputLevel}.`;
        else if (A < 1) explanation = `When technology (A = ${A.toFixed(2)}) decreases, the isoquant shifts outward away from the origin. More capital and labor are needed to produce y = ${outputLevel}.`;
        else explanation = `With technology at A = ${A.toFixed(2)}, the isoquant represents the original technology level, no change occurs.`;

        document.getElementById('explanation').innerText = explanation;
    }

    const slider = document.getElementById('A');
    slider.addEventListener('input', () => {
        const A = parseFloat(slider.value);
        document.getElementById('AVal').innerText = A.toFixed(2);
        plot(A);
    });

    // Initial plot
    plot(parseFloat(slider.value));

})();
