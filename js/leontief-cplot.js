document.addEventListener('DOMContentLoaded', () => {
      const pXSlider = document.getElementById('pXLeontiefSlider');
      const pYSlider = document.getElementById('pYLeontiefSlider');
      const aSlider = document.getElementById('aLeontiefSlider');
      const bSlider = document.getElementById('bLeontiefSlider');

      const pXValue = document.getElementById('pXValue');
      const pYValue = document.getElementById('pYValue');
      const aValue = document.getElementById('aValue');
      const bValue = document.getElementById('bValue');

      const plotDiv = document.getElementById('leontiefBundlePlot');

      function plot() {
        const pX = parseFloat(pXSlider.value);
        const pY = parseFloat(pYSlider.value);
        const a = parseFloat(aSlider.value);
        const b = parseFloat(bSlider.value);
        const income = 10; // fixed income, you can add a slider if needed

        pXValue.textContent = pX.toFixed(1);
        pYValue.textContent = pY.toFixed(1);
        aValue.textContent = a.toFixed(1);
        bValue.textContent = b.toFixed(1);

        // Optimal bundle calculation:
        // from ax = by => y = (a/b)*x
        // budget: pX*x + pY*y = income
        // xStar = income / (pX + pY * (a/b))
        const xStar = income / (pX + pY * (a / b));
        const yStar = (a / b) * xStar;

        // Budget line points
        const xBudget = [];
        const yBudget = [];
        for (let i = 0; i <= 100; i++) {
          const x = i * (income / pX) / 100;
          xBudget.push(x);
          yBudget.push((income - pX * x) / pY);
        }

        // Isoquant levels (utility levels)
        const cLevels = [1, 2, 3, 4, 5];

        // Isoquant traces (horizontal and vertical parts)
        const isoquantTraces = [];
        for (let i = 0; i < cLevels.length; i++) {
          const c = cLevels[i];
          const uVal = `U = ${c.toFixed(1)}`;

          // horizontal part
          isoquantTraces.push({
            x: [c / a, 10],
            y: [c / b, c / b],
            mode: 'lines+text',
            line: { color: 'blue', width: 2, dash: 'dot' },
            name: uVal,
            text: [uVal, ''],
            textposition: 'top right',
            showlegend: i === 0,
            hoverinfo: 'skip',
          });

          // vertical part
          isoquantTraces.push({
            x: [c / a, c / a],
            y: [c / b, 10],
            mode: 'lines',
            line: { color: 'blue', width: 2, dash: 'dot' },
            showlegend: false,
            hoverinfo: 'skip',
          });
        }

        // Budget set polygon
        const budgetArea = {
          type: 'scatter',
          x: [...xBudget, 0],
          y: [...yBudget, 0],
          fill: 'toself',
          fillcolor: 'rgba(40, 167, 69, 0.2)', // greenish
          line: { color: 'rgba(40, 167, 69, 0)' },
          name: 'Budget Set',
          hoverinfo: 'skip',
          showlegend: true,
        };

        // Budget line
        const budgetLine = {
          x: xBudget,
          y: yBudget,
          mode: 'lines',
          line: { color: 'black', width: 2 },
          name: 'Budget Line',
        };

        // Optimal bundle marker
        const optimalBundle = {
          x: [xStar],
          y: [yStar],
          mode: 'markers',
          marker: { color: 'red', size: 10 },
          name: 'Optimal Bundle',
        };

        const data = [budgetArea, budgetLine, optimalBundle, ...isoquantTraces];

        const layout = {
          title: `Leontief Utility with Budget Constraint (a=${a.toFixed(2)}, b=${b.toFixed(2)}, pX=${pX.toFixed(2)}, pY=${pY.toFixed(2)})`,
          xaxis: { title: 'Good X', range: [0, 10] },
          yaxis: { title: 'Good Y', range: [0, 10] },
          showlegend: true,
          height: 500,
          margin: { t: 50, b: 50, l: 50, r: 50 },
        };

        Plotly.newPlot(plotDiv, data, layout, { responsive: true });
      }

      pXSlider.addEventListener('input', plot);
      pYSlider.addEventListener('input', plot);
      aSlider.addEventListener('input', plot);
      bSlider.addEventListener('input', plot);

      plot(); // initial plot
    });
