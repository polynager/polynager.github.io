document.addEventListener('DOMContentLoaded', () => {
  const pXSlider = document.getElementById('pXLeontiefSlider');
  const pYSlider = document.getElementById('pYLeontiefSlider');
  const aSlider = document.getElementById('aLeontiefSlider');
  const bSlider = document.getElementById('bLeontiefSlider');
  const plotDiv = document.getElementById('leontiefBundlePlot');

  function plot() {
    const pX = parseFloat(pXSlider.value);
    const pY = parseFloat(pYSlider.value);
    const a = parseFloat(aSlider.value);
    const b = parseFloat(bSlider.value);
    const income = 10; // fixed or add slider

    // Leontief utility: U = min(ax, by)
    // Optimal bundle on budget line where ax = by and pX*x + pY*y = income

    // Solve for x and y:
    // From ax = by => y = (a/b)*x
    // Budget: pX*x + pY*y = income => pX*x + pY*(a/b)*x = income
    // => x*(pX + pY*(a/b)) = income => xStar = income / (pX + pY*(a/b))
    const xStar = income / (pX + pY * (a / b));
    const yStar = (a / b) * xStar;

    // Budget line points
    const xBudget = [];
    const yBudget = [];
    for(let i = 0; i <= 100; i++) {
      const x = i * (income / pX) / 100;
      xBudget.push(x);
      yBudget.push((income - pX * x) / pY);
    }

    // Utility isoquants (lines where min(ax,by) = c)
    // We'll plot isoquants for some utility levels c
    const cLevels = [1, 2, 3, 4, 5];

    // For each c, plot the kink-shaped isoquant made of two lines:
    // 1) ax = c => x = c/a (vertical line for y>= c/b)
    // 2) by = c => y = c/b (horizontal line for x >= c/a)

    // Prepare traces for isoquants
    const isoTraces = cLevels.map(c => {
      return {
        x: [c/a, 10],
        y: [c/b, c/b],
        mode: 'lines',
        line: {color: 'blue', width: 2, dash: 'dot'},
        name: `U = ${c.toFixed(1)}`,
        showlegend: true,
      };
    });

    // We'll add vertical parts of isoquants as separate traces (or combine)

    // Vertical parts
    const verticalTraces = cLevels.map(c => ({
      x: [c/a, c/a],
      y: [c/b, 10],
      mode: 'lines',
      line: {color: 'blue', width: 2, dash: 'dot'},
      showlegend: false,
      hoverinfo: 'skip'
    }));

    // Combine horizontal and vertical parts for isoquants
    const isoquantTraces = [];
    for(let i=0; i < cLevels.length; i++) {
      isoquantTraces.push({
        x: [cLevels[i]/a, 10],
        y: [cLevels[i]/b, cLevels[i]/b],
        mode: 'lines',
        line: {color: 'blue', width: 2, dash: 'dot'},
        name: `U = ${cLevels[i].toFixed(1)}`,
        showlegend: i===0,
      });
      isoquantTraces.push({
        x: [cLevels[i]/a, cLevels[i]/a],
        y: [cLevels[i]/b, 10],
        mode: 'lines',
        line: {color: 'blue', width: 2, dash: 'dot'},
        showlegend: false,
        hoverinfo: 'skip'
      });
    }

    // Budget set polygon
    const budgetArea = {
      type: 'scatter',
      x: [...xBudget, 0],
      y: [...yBudget, 0],
      fill: 'toself',
      fillcolor: 'rgba(40, 167, 69, 0.2)', // greenish
      line: {color: 'rgba(40, 167, 69, 0)'},
      name: 'Budget Set',
      hoverinfo: 'skip',
      showlegend: true,
    };

    const budgetLine = {
      x: xBudget,
      y: yBudget,
      mode: 'lines',
      line: {color: 'black', width: 2},
      name: 'Budget Line'
    };

    // Optimal bundle point
    const optimalBundle = {
      x: [xStar],
      y: [yStar],
      mode: 'markers',
      marker: {color: 'red', size: 10},
      name: 'Optimal Bundle'
    };

    const data = [budgetArea, budgetLine, optimalBundle, ...isoquantTraces];

    const layout = {
      title: `Leontief Utility with Budget Constraint (a=${a.toFixed(2)}, b=${b.toFixed(2)}, pX=${pX.toFixed(2)}, pY=${pY.toFixed(2)})`,
      xaxis: {title: 'Good X', range: [0, 10]},
      yaxis: {title: 'Good Y', range: [0, 10]},
      showlegend: true,
      height: 400,
    };

    Plotly.newPlot(plotDiv, data, layout, {responsive: true});
  }

  pXSlider.addEventListener('input', plot);
  pYSlider.addEventListener('input', plot);
  aSlider.addEventListener('input', plot);
  bSlider.addEventListener('input', plot);

  plot(); // initial plot
});
