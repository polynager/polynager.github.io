const Y_values = Array.from({length: 10}, (_, i) => 1 + i); // Outputs 1 to 10
        const K = Array.from({length: 100}, (_, i) => 0.1 + i*0.099);
        const L = Array.from({length: 100}, (_, i) => 0.1 + i*0.099);

        function meshgrid(x, y) {
            const X = [], Y = [];
            for (let i = 0; i < y.length; i++) {
                X.push(x);
                Y.push(Array(x.length).fill(y[i]));
            }
            return [X, Y];
        }

        const [K_grid, L_grid] = meshgrid(K, L);

        function production(K, L, alpha, beta) {
            const Z = [];
            for (let i = 0; i < K.length; i++) {
                const row = [];
                for (let j = 0; j < K[0].length; j++) {
                    row.push(Math.pow(K[i][j], alpha) * Math.pow(L[i][j], beta));
                }
                Z.push(row);
            }
            return Z;
        }

        function optimal_input_mix(Y, w, r, alpha, beta) {
            // Tangency condition: MRTS = w/r
            const L_star = Math.pow(Y / Math.pow((beta/alpha)*(w/r), alpha), 1/(alpha+beta));
            const K_star = (beta/alpha) * (L_star * w/r);
            return [K_star, L_star];
        }

        function total_cost(K, L, w, r) {
            return r*K + w*L;
        }

        function plot(w, r, alpha, beta) {
            const iso_traces = [];
            const optimal_K = [];
            const optimal_L = [];
            const total_costs = [];

            for (let i = 0; i < Y_values.length; i++) {
                const Y = Y_values[i];
                const Z = production(K_grid, L_grid, alpha, beta);

                // Isoquant contour trace
                iso_traces.push({
                    z: Z,
                    x: K,
                    y: L,
                    type: 'contour',
                    contours: {start: Y, end: Y, coloring: 'lines'},
                    line: {color: 'blue'},
                    showscale: false,
                    name: `Y=${Y}`
                });

                // Optimal input mix
                const [K_star, L_star] = optimal_input_mix(Y, w, r, alpha, beta);
                optimal_K.push(K_star);
                optimal_L.push(L_star);
                total_costs.push(total_cost(K_star, L_star, w, r));
            }

            // Panel 1: Isoquants + optimal points
            const panel1 = {
                xaxis: {domain: [0, 0.45], title: 'Capital (K)'},
                yaxis: {domain: [0, 1], title: 'Labor (L)'}
            };

            const optimal_trace = {
                x: optimal_K,
                y: optimal_L,
                mode: 'markers+text',
                type: 'scatter',
                text: Y_values.map((y, i) => `Y=${y}, C=${total_costs[i].toFixed(1)}`),
                textposition: 'top center',
                marker: {color: 'red', size: 8},
                name: 'Optimal Points'
            };

            // Panel 2: Total cost curve
            const panel2 = {
                xaxis: {domain: [0.55, 1], title: 'Output (Y)'},
                yaxis: {domain: [0, 1], title: 'Total Cost (C)'}
            };

            const total_cost_trace = {
                x: Y_values,
                y: total_costs,
                mode: 'lines+markers',
                type: 'scatter',
                xaxis: 'x2',
                yaxis: 'y2',
                name: 'Total Cost',
                line: {color: 'green'}
            };

            const layout = {
                title: 'Cobb-Douglas Isoquants & Total Cost Curve',
                grid: {rows: 1, columns: 2, pattern: 'independent'}
            };

            Plotly.newPlot('Technology-chapter6', [...iso_traces, optimal_trace, total_cost_trace], layout);
        }

        const sliders = ['w', 'r', 'alpha', 'beta'];
        sliders.forEach(id => {
            document.getElementById(id).addEventListener('input', () => {
                const w = parseFloat(document.getElementById('w').value);
                const r = parseFloat(document.getElementById('r').value);
                const alpha = parseFloat(document.getElementById('alpha').value);
                const beta = parseFloat(document.getElementById('beta').value);

                document.getElementById('wVal').innerText = w;
                document.getElementById('rVal').innerText = r;
                document.getElementById('alphaVal').innerText = alpha;
                document.getElementById('betaVal').innerText = beta;

                plot(w, r, alpha, beta);
            });
        });

        // Initial plot
        plot(1, 1, 0.5, 0.5);
