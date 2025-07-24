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
    const min_U = 10;  // fixed utility level

    // Calculate required income to achieve min_U
    const xOpt = min_U / a;
    const yOpt = min_U / b;
    const reqIncome = pX * xOpt + pY * yOpt;

    // Create budget line points based on required income
    const xBudget = [];
    const yBudget = [];
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * (reqIncome / pX);
      xBudget.push(x);
      yBudget.push((reqIncome - pX * x) / pY);
    }

    // Isoquant levels around min_U
    const cLevels = [min_U - 5, min_U, min_U + 5];

    // Create traces for isoquants (L-shaped)
    const isoquantTraces = [];
    for (let i = 0; i < cLevels.length; i++) {
      const c = cLevels[i];
      if (c <= 0) continue;  // skip invalid levels
      const label = `U = ${c.toFixed(1)}`;

      // Horizontal part: y = c/b for x >= c/a
      isoquantTraces.push({
        x: [c / a, 20],
        y: [c / b, c / b],
        mode: 'lines+text',
        line: { color: 'blue', width: 2, dash: 'dot' },
        name: label,
        text: i === 1 ? [label, ''] : ['', ''],  // only label middle curve
        textposition: 'top right',
        showlegend: i === 1,
        hoverinfo: 'skip',
      });

      // Vertical part: x = c/a for y >= c/b
      isoquantTraces.push({
        x: [c / a, c / a],
        y: [c / b, 20],
        mode: 'lines',
        line: { color: 'blue', width: 2, dash: 'dot' },
        showlegend: false,
        hoverinfo: 'skip',
      });
    }

    // Budget set polygon (area under budget line)
    const budgetArea = {
      type: 'scatter',
      x: [...xBudget, 0],
      y: [...yBudget, 0],
      fill: 'toself',
      fillcolor: 'rgba(40, 167, 69, 0.2)', // greenish transparent
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

    // Compose all traces
    const data = [budgetArea, budgetLine, optimalBundle, ...isoquantTraces];

    // Layout
    const layout = {
      title: `Leontief Utility: a=${a.toFixed(2)}, b=${b.toFixed(2)}, pX=${pX.toFixed(2)}, pY=${pY.toFixed(2)}, U=${min_U}`,
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
