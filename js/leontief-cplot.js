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

    // Utility levels to plot
    const cLevels = [10, 15, 20];

    // Calculate required income for the middle utility (for budget set & line)
    const min_U = 15;
    const xOpt = min_U / a;
    const yOpt = min_U / b;
    const reqIncome = pX * xOpt + pY * yOpt;

    // Budget line points based on required income
    const xBudget = [];
    const yBudget = [];
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * (reqIncome / pX);
      xBudget.push(x);
      yBudget.push((reqIncome - pX * x) / pY);
    }

    // Isoquant traces with labels on the plot (no legend entries)
    const isoquantTraces = [];
    cLevels.forEach((c, i) => {
      if (c <= 0) return;

      // Horizontal segment (y = c/b) from x = c/a to 20
      isoquantTraces.push({
        x: [c / a, 20],
        y: [c / b, c / b],
        mode: 'lines+text',
        line: { color: 'blue', width: 2, dash: 'dot' },
        text: [`U = ${c}`, ''],
        textposition: 'top right',
        showlegend: false,
        hoverinfo: 'skip',
      });

      // Vertical segment (x = c/a) from y = c/b to 20
      isoquantTraces.push({
        x: [c / a, c / a],
        y: [c / b, 20],
        mode: 'lines',
        line: { color: 'blue', width: 2, dash: 'dot' },
        showlegend: false,
        hoverinfo: 'skip',
      });
    });

    // Budget set polygon
    const budgetArea = {
      type: 'scatter',
      x: [...xBudget, 0],
      y: [...yBudget, 0],
      fill: 'toself',
      fillcolor: 'rgba(40, 167, 69, 0.2)', // green transparent
      line: { color: 'rgba(40, 167, 69, 0)' },
      name: 'Budget Set',
      hoverinfo: 'skip',
      showlegend: true,
    };

    // Budget line trace
    const budgetLine = {
      x: xBudget,
      y: yBudget,
      mode: 'lines',
      line: { color: 'black', width: 2 },
      name: 'Budget Line',
    };

    // Optimal bundle point
    const optimalBundle = {
      x: [xOpt],
      y: [yOpt],
      mode: 'markers',
      marker: { color: 'red', size: 10 },
      name: 'Optimal Bundle',
    };

    // Compose traces
    const data = [budgetArea, budgetLine, optimalBundle, ...isoquantTraces];

    // Layout
    const layout = {
      title: `Leontief Utility: a=${a.toFixed(2)}, b=${b.toFixed(2)}, pX=${pX.toFixed(2)}, pY=${pY.toFixed(2)}`,
      xaxis: { title: 'Good X', range: [0, 20] },
      yaxis: { title: 'Good Y', range: [0, 20] },
      showlegend: true,
      height: 450,
    };

    Plotly.newPlot(plotDiv, data, layout, { responsive: true });
  }

  pXSlider.addEventListener('input', plot);
  pYSlider.addEventListener('input', plot);
  aSlider.addEventListener('input', plot);
  bSlider.addEventListener('input', plot);

  plot();
});
