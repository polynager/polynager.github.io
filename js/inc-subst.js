const α = 0.6;
const income = 50;
const px_initial = 5;
const py = 5;

const pxSlider = document.getElementById("pxSlider");
const pxVal = document.getElementById("pxVal");
const outputText = document.getElementById("outputText");

pxSlider.addEventListener("input", () => {
  pxVal.textContent = parseFloat(pxSlider.value).toFixed(2);
  updateGraph(parseFloat(pxSlider.value));
});

function updateGraph(px_new) {
  // ORIGINAL BUNDLE
  const x0 = (income / px_initial) * α;
  const y0 = (income / py) * (1 - α);
  const U = Math.pow(x0, α) * Math.pow(y0, 1 - α);

  // COMPENSATED BUNDLE
  const x_sub = Math.pow((α / (1 - α)) * (py / px_new), 1 - α) * (income / px_initial) * α;
  const y_sub = Math.pow(U, 1 / (1 - α)) * Math.pow(x_sub, -α / (1 - α));
  const income_comp = px_new * x_sub + py * y_sub;

  // NEW BUNDLE
  const x1 = (income / px_new) * α;
  const y1 = (income / py) * (1 - α);
  const U_new = Math.pow(x1, α) * Math.pow(y1, 1 - α);

  // Curves
  const x_vals = Array.from({ length: 400 }, (_, i) => 0.1 + i * (20 - 0.1) / 400);
  const y_budget_orig = x_vals.map(x => (income - px_initial * x) / py);
  const y_budget_new = x_vals.map(x => (income - px_new * x) / py);
  const y_budget_comp = x_vals.map(x => (income_comp - px_new * x) / py);

  const y_indiff_orig = x_vals.map(x => Math.pow(U, 1 / (1 - α)) * Math.pow(x, -α / (1 - α)));
  const y_indiff_new = x_vals.map(x => Math.pow(U_new, 1 / (1 - α)) * Math.pow(x, -α / (1 - α)));

  // Plotly Data
  const data = [
    {
      x: x_vals, y: y_budget_orig,
      mode: "lines", name: "Original Budget", line: { dash: "dash", color: "gray" }
    },
    {
      x: x_vals, y: y_budget_new,
      mode: "lines", name: "New Budget", line: { color: "black" }
    },
    {
      x: x_vals, y: y_budget_comp,
      mode: "lines", name: "Compensated Budget", line: { dash: "dot", color: "purple" }
    },
    {
      x: x_vals, y: y_indiff_orig,
      mode: "lines", name: "Original Indifference", line: { dash: "dot", color: "blue" }
    },
    {
      x: x_vals, y: y_indiff_new,
      mode: "lines", name: "New Indifference", line: { dash: "dot", color: "green" }
    },
    {
      x: [x0, x_sub, x1], y: [y0, y0, y0],
      mode: "markers+text", name: "Bundles",
      text: ["Original", "Substitution", "New"],
      textposition: "top center",
      marker: { size: 10, color: ["red", "magenta", "green"] }
    }
  ];

  const layout = {
    title: `Substitution & Income Effects (pₓ: ${px_initial} → ${px_new.toFixed(2)})`,
    xaxis: { title: "Good X", range: [0, 20] },
    yaxis: { title: "Good Y", range: [0, 20] },
    showlegend: true
  };

  Plotly.newPlot("plot", data, layout, { responsive: true });

  // Explanation text
  outputText.textContent =
    `Original price of Good X: ${px_initial}
New price of Good X: ${px_new.toFixed(2)}

Original bundle: x = ${x0.toFixed(2)}, y = ${y0.toFixed(2)}
Substitution bundle: x = ${x_sub.toFixed(2)}, y = ${y0.toFixed(2)}
New bundle: x = ${x1.toFixed(2)}, y = ${y1.toFixed(2)}

Total Δx: ${(x1 - x0).toFixed(2)} 
  = Substitution: ${(x_sub - x0).toFixed(2)} 
  + Income: ${(x1 - x_sub).toFixed(2)}`;
}

// Initial render
updateGraph(parseFloat(pxSlider.value));
