document.addEventListener('DOMContentLoaded', () => {
  const pXSlider = document.getElementById('pXLinearSlider');
  const pYSlider = document.getElementById('pYLinearSlider');
  const aSlider = document.getElementById('aLinearSlider');
  const bSlider = document.getElementById('bLinearSlider');
  const plotDiv = document.getElementById('linearBundlePlot');

  function plot() {
    const pX = parseFloat(pXSlider.value);
    const pY = parseFloat(pYSlider.value);
    const a = parseFloat(aSlider.value);
    const b = parseFloat(bSlider.value);
    const income = 10; // fixed or add slider

    // Linear utility: U = a*x + b*y
    // Maximizing utility under budget constraint pX*x + pY*y = income
    // Optimal corner solution depends on utility/price ratio

    // Calculate utility per price ratios
    const ratioX = a / pX;
    const ratioY = b / pY;

    let xStar, yStar;

    if (ratioX > ratioY) {
      // Spend all income on x
      xStar = income / pX;
      yStar = 0;
    } else if (ratioY > ratioX) {
      // Spend all income on y
      xStar = 0;
      yStar = income / pY;
    } else {
      // Indifferent, any point on budget line is optimal; pick corner (all x)
      xStar = income / pX;
      yStar = 0;
    }

    // Budget line points
    const xBudget = [];
    const yBudget = [];
    for(let i = 0; i <= 100; i++) {
      const x = i * (income / pX) / 100;
      xBudget.push(x);
      yBudget.push((income - pX * x) / pY);
    }

    // Utility lines (isoquants): a*x + b*y = c
    // We'll plot several utility levels c between 0 and max possible

    const maxU = Math.max(a * (income / pX), b * (income / pY));
    const uLevels = [0.5 * maxU, 0.75 * maxU, maxU];

    // For each c, plot the line y = (c - a*x)/b
    const isoTraces = uLevels.map(c => {
      const xVals = numeric.linspace(0, income / pX, 100);
      const yVals = xVals.map(x => (c - a*x)/b);

      return {
        x: xVals,
        y: yVals,
        mode: 'lines',
        line: {color: 'blue', width: 2, dash: 'dot'},
        name: `U = ${c.toFixed(2)}`,
      };
    });

    // Budget set polygon
    const budgetArea = {
      type: 'scatter',
      x: [...xBudget, 0],
      y: [...yBudget, 0],
      fill: 'toself',
      fillcolor: 'rgba(255, 193, 7, 0.2)', // yellowish
      line: {color: 'rgba(255, 193, 7, 0)'},
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

    const optimalBundle = {
      x: [xStar],
      y: [yStar],
      mode: 'markers',
      marker: {color: 'red', size: 10},
      name: 'Optimal Bundle'
    };

    const data = [budgetArea, budgetLine, optimalBundle, ...isoTraces];

    const layout = {
      title: `Linear Utility with Budget Constraint (a=${a.toFixed(2)}, b=${b.toFixed(2)}, pX=${pX.toFixed(2)}, pY=${pY.toFixed(2)})`,
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

  plot();
});
