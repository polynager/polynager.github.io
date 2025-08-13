(() => {
        // Generate labor and capital values
        const L = Array.from({length: 100}, (_, i) => 0.1 + i * 0.099);
        const K = Array.from({length: 100}, (_, i) => 0.1 + i * 0.099);

        // Meshgrid helper
        function meshgrid(x, y) {
            return [x.map(l => y.map(k => k)), x.map(l => y.map(k => l))];
        }

        // Production functions
        function cobbDouglas(L, K, alpha=0.5, A=1) {
            return L.map((row, i) => row.map((k, j) => A * Math.pow(L[i][j], alpha) * Math.pow(K[i][j], 1-alpha)));
        }

        function perfectSubstitutes(L, K, a=1, b=1) {
            return L.map((row, i) => row.map((k, j) => a * L[i][j] + b * K[i][j]));
        }

        function perfectComplements(L, K) {
            return L.map((row, i) => row.map((k, j) => Math.min(L[i][j], K[i][j])));
        }

        const [Lgrid, Kgrid] = meshgrid(L, K);

        // Isoquant levels
        const isoLevels = [0.5, 1, 2, 4];

        // Create traces for each production function
        function createTraces(prodFunc, name) {
            return isoLevels.map(level => ({
                z: prodFunc(Lgrid, Kgrid),
                type: 'contour',
                x: L,
                y: K,
                contours: {start: level, end: level, coloring: 'lines'},
                line: {width: 2},
                name: `${name} Q=${level}`,
                visible: name === "Cobb-Douglas" // only show CD by default
            }));
        }

        const traces = [
            ...createTraces(cobbDouglas, "Cobb-Douglas"),
            ...createTraces(perfectSubstitutes, "Perfect Substitutes"),
            ...createTraces(perfectComplements, "Perfect Complements")
        ];

        // Buttons to toggle production type
        const buttons = [
            {
                label: "Cobb-Douglas",
                method: "update",
                args: [{visible: traces.map((t, i) => i < 4)}, {title: "Cobb-Douglas Isoquants"}]
            },
            {
                label: "Perfect Substitutes",
                method: "update",
                args: [{visible: traces.map((t, i) => i >= 4 && i < 8)}, {title: "Perfect Substitutes Isoquants"}]
            },
            {
                label: "Perfect Complements",
                method: "update",
                args: [{visible: traces.map((t, i) => i >= 8)}, {title: "Perfect Complements Isoquants"}]
            }
        ];

        const layout = {
            title: "Cobb-Douglas Isoquants",
            xaxis: {title: 'Labor (L)'},
            yaxis: {title: 'Capital (K)'},
            updatemenus: [{
                type: "buttons",
                x: 1.15,
                y: 0.8,
                buttons: buttons
            }]
        };

        Plotly.newPlot('isoquantsPlot', traces, layout); 
    })();
