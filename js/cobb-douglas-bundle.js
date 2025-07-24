document.addEventListener('DOMContentLoaded', () => {
  const alphaSlider = document.getElementById('alphaBundleSlider');
  const pXSlider = document.getElementById('pXBundleSlider');
  const pYSlider = document.getElementById('pYBundleSlider');
  const plotDiv = document.getElementById('cobbDouglasBundlePlot');

  function plot() {
    const alpha = parseFloat(alphaSlider.value);
    const pX = parseFloat(pXSlider.value);
    const pY = parseFloat(pYSlider.value);

    // Base utility level to match Python's min_U=10
    const minU = 10;

    // Ratio from Python formula
    const ratio = (pX / pY) * ((1 - alpha) / alpha);

    // Optimal bundle based on minU and ratio
    const xStar = minU / Math.pow(ratio, 1 - alpha);
    const yStar = ratio * xStar;

    // Income needed to afford the optimal bundle
    const income = pX * xStar + pY * yStar;

    // Budget line points based on income
    const xBudget = [];
    const yBudget = [];
    for (let i = 0; i <= 100; i++) {
      const x = i * (income / pX) / 100;
      xBudget.push(x);
      yBudget.push((income - pX * x) / pY);
    }

    // Create grid for utility contours (x and y axes)
    const x = numeric.linspace(0.01, 10, 100);
    const y = numeric.linspace(0.01, 10, 100);
    const z = [];
    for (let i = 0; i < y.length; i++) {
      const row = [];
      for (let j = 0; j < x.length; j++) {
        row.push(Math.pow(x[j], alpha) * Math.pow(y[i], 1 - alpha));
      }
      z.push(row);
    }

    // Budget set shaded area
    const budgetArea = {
      type: 'scatter',
      x: [...xBudget, 0],
      y: [...yBudget, 0],
      fill: 'toself',
      fillcolor: 'rgba(0, 123, 255, 0.2)',
      line: { color: 'rgba(0, 123, 255, 0)' },
      name: 'Budget Set',
      hoverinfo: 'skip',
      showlegend: true,
    };

    // Budget line plot
    const budgetLine = {
      x: xBudget,
      y: yBudget,
      mode: 'lines',
      line: { color: 'black', width: 2 },
      name: 'Budget Line'
    };

    // Utility contours at levels similar to Python ([5, 10, 15])
    const utilityContour = {
      x: x,
      y: y,
      z: z,
      type: 'contour',
      contours: {
        coloring: 'lines',
        showlabels: true,
        labelfont: { size: 12, color: 'blue' },
        start: 5,
        end: 15,
        size: 5
      },
      line: { width: 2, color: 'red' },
      showlegend: false,
      showscale: false
    };

    // Mark optimal bundle on the plot
    const optimalBundle = {
      x: [xStar],
      y: [yStar],
      mode: 'markers',
      marker: { color: 'red', size: 10 },
      name: 'Optimal Bundle'
    };

    const data = [budgetArea, budgetLine, utilityContour, optimalBundle];

    const layout = {
      title: `Cobb-Douglas Utility with Budget Constraint (α=${alpha.toFixed(2)}, pX=${pX.toFixed(2)}, pY=${pY.toFixed(2)})`,
      xaxis: { title: 'Good X', range: [0, 10] },
      yaxis: { title: 'Good Y', range: [0, 10] },
      showlegend: true,
      height: 400,
    };

    Plotly.newPlot(plotDiv, data, layout, { responsive: true });
  }

  alphaSlider.addEventListener('input', plot);
  pXSlider.addEventListener('input', plot);
  pYSlider.addEventListener('input', plot);

  plot();
});
