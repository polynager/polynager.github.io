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
    const income = 10;

    const ratioX = a / pX;
    const ratioY = b / pY;

    let xStar, yStar;
    if (ratioX > ratioY) {
      xStar = income / pX;
      yStar = 0;
    } else if (ratioY > ratioX) {
      xStar = 0;
      yStar = income / pY;
    } else {
      xStar = income / pX;
      yStar = 0;
    }

    const xBudget = [];
    const yBudget = [];
    for(let i = 0; i <= 100; i++) {
      const x = i * (income / pX) / 100;
      xBudget.push(x);
      yBudget.push((income - pX * x) / pY);
    }

    const maxU = Math.max(a * (income / pX), b * (income / pY));
    const uLevels = [0.5 * maxU, 0.75 * maxU, maxU];

    const isoTraces = uLevels.map(c => {
      const xVals = numeric.linspace(0, income / pX, 100);
      const yVals = xVals.map(x => (c - a*x)/b);

      return {
        x: xVals,
        y: yVals,
        type: 'scatter',
        mode: 'lines+text',
        line: {color: 'blue', width: 2, dash: 'dot'},
        text: [`U = ${c.toFixed(2)}`],
        textposition: 'top right',
        textfont: {
          family: 'Arial',
          size: 12,
          color: 'blue'
        },
        showlegend: false  // ← Hide from legend
      };
    });

    const budgetArea = {
      type: 'scatter',
      x: [...xBudget, 0],
      y: [...yBudget, 0],
      fill: 'toself',
      fillcolor: 'rgba(255, 193, 7, 0.2)',
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
