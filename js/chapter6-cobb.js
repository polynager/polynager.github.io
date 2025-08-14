(function() {        
        const x1 = Array.from({length: 100}, (_, i) => 0.1 + i * 0.099);
        const x2 = Array.from({length: 100}, (_, i) => 0.1 + i * 0.099);

        function meshgrid(x, y) {
            const X = [];
            const Y = [];
            for (let i = 0; i < y.length; i++) {
                X.push(x);
                Y.push(Array(x.length).fill(y[i]));
            }
            return [X, Y];
        }

        const [X1, X2] = meshgrid(x1, x2);

        // Cobb-Douglas function
        function cobbDouglas(alpha, beta) {
            const Z = [];
            for (let i = 0; i < X1.length; i++) {
                const row = [];
                for (let j = 0; j < X1[0].length; j++) {
                    row.push(Math.pow(X1[i][j], alpha) * Math.pow(X2[i][j], beta));
                }
                Z.push(row);
            }
            return Z;
        }

        // Output levels for isoquants
        function getLevels(alpha, beta) {
            return [
                Math.pow(1, alpha) * Math.pow(1, beta),
                Math.pow(2, alpha) * Math.pow(2, beta),
                Math.pow(4, alpha) * Math.pow(4, beta)
            ];
        }

        // Plot function
        function plot(alpha, beta) {
            const Z = cobbDouglas(alpha, beta);
            const levels = getLevels(alpha, beta);

            const trace = {
                z: Z,
                x: x1,
                y: x2,
                type: 'contour',
                contours: {
                    start: levels[0],
                    end: levels[2],
                    size: (levels[2]-levels[0])/2,
                    coloring: 'lines'
                },
                line: {width: 2}
            };

            const layout = {
                title: `Cobb-Douglas Isoquants (α + β = ${(alpha+beta).toFixed(2)})`,
                xaxis: {title: 'Input x1'},
                yaxis: {title: 'Input x2'}
            };

            Plotly.newPlot('Cobb-chapter6', [trace], layout);

            // Returns to scale
            const sum = alpha + beta;
            let explanation = '';
            if (sum < 1) explanation = `Decreasing returns to scale: α + β = ${sum.toFixed(2)}`;
            else if (sum === 1) explanation = `Constant returns to scale: α + β = ${sum.toFixed(2)}`;
            else explanation = `Increasing returns to scale: α + β = ${sum.toFixed(2)}`;

            document.getElementById('returns').innerText = explanation;
        }

        // Initialize plot
        const alphaSlider = document.getElementById('alpha');
        const betaSlider = document.getElementById('beta');

        function updatePlot() {
            const alpha = parseFloat(alphaSlider.value);
            const beta = parseFloat(betaSlider.value);
            document.getElementById('alphaVal').innerText = alpha;
            document.getElementById('betaVal').innerText = beta;
            plot(alpha, beta);
        }

        alphaSlider.addEventListener('input', updatePlot);
        betaSlider.addEventListener('input', updatePlot);

        // Initial plot
        plot(parseFloat(alphaSlider.value), parseFloat(betaSlider.value));
        })();
