// document.addEventListener('DOMContentLoaded', () => {
//   const alphaSlider = document.getElementById('alphaBundleSlider');
//   const pXSlider = document.getElementById('pXBundleSlider');
//   const pYSlider = document.getElementById('pYBundleSlider');
//   const plotDiv = document.getElementById('cobbDouglasBundlePlot');

//   function plot() {
//     const alpha = parseFloat(alphaSlider.value);
//     const pX = parseFloat(pXSlider.value);
//     const pY = parseFloat(pYSlider.value);
//     const income = 10; // fixed income (or add slider)

//     // Compute optimal bundle (Cobb-Douglas)
//     const xStar = (alpha * income) / pX;
//     const yStar = ((1 - alpha) * income) / pY;

//     // Budget line points
//     const xBudget = [];
//     const yBudget = [];
//     for(let i = 0; i <= 100; i++){
//       const x = i * (income / pX) / 100;
//       xBudget.push(x);
//       yBudget.push((income - pX * x) / pY);
//     }

//     // Utility contours - Cobb-Douglas: U = x^alpha * y^(1-alpha)
//     // Plot over grid
//     const x = numeric.linspace(0.01, 10, 100);
//     const y = numeric.linspace(0.01, 10, 100);
//     const z = [];
//     for(let i=0; i<y.length; i++) {
//       const row = [];
//       for(let j=0; j<x.length; j++) {
//         row.push(Math.pow(x[j], alpha) * Math.pow(y[i], 1-alpha));
//       }
//       z.push(row);
//     }

//     // Create filled shape for budget area under the budget line
//     const budgetArea = {
//       type: 'scatter',
//       x: [...xBudget, 0],
//       y: [...yBudget, 0],
//       fill: 'toself',
//       fillcolor: 'rgba(0, 123, 255, 0.2)',
//       line: {color: 'rgba(0, 123, 255, 0)'},
//       name: 'Budget Set',
//       hoverinfo: 'skip',
//       showlegend: true,
//     };

//     // Budget line trace
//     const budgetLine = {
//       x: xBudget,
//       y: yBudget,
//       mode: 'lines',
//       line: {color: 'black', width: 2},
//       name: 'Budget Line'
//     };

//     // Utility contour trace — remove 'name' to hide from legend, and set showlegend false just in case
//     const utilityContour = {
//       x: x,
//       y: y,
//       z: z,
//       type: 'contour',
//       contours: {
//         coloring: 'lines',
//         showlabels: false
//       },
//       line: {width: 2},
//       colorscale: 'Blues',
//       showlegend: false
//       // name is omitted intentionally
//     };

//     // Optimal bundle point
//     const optimalBundle = {
//       x: [xStar],
//       y: [yStar],
//       mode: 'markers',
//       marker: {color: 'red', size: 10},
//       name: 'Optimal Bundle'
//     };

//     const data = [budgetArea, budgetLine, utilityContour, optimalBundle];

//     const layout = {
//       title: `Cobb-Douglas Utility with Budget Constraint (α=${alpha.toFixed(2)}, pX=${pX.toFixed(2)}, pY=${pY.toFixed(2)})`,
//       xaxis: {title: 'Good X', range: [0, 10]},
//       yaxis: {title: 'Good Y', range: [0, 10]},
//       showlegend: true,
//       height: 400,
//     };

//     Plotly.newPlot(plotDiv, data, layout, {responsive: true});
//   }

//   alphaSlider.addEventListener('input', plot);
//   pXSlider.addEventListener('input', plot);
//   pYSlider.addEventListener('input', plot);

//   plot(); // initial plot
// });
