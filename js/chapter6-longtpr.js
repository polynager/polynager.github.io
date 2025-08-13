(() => {
  const A = 15;
  const alpha_K = 0.25;
  const alpha_L = 0.75;
  const L_values = Array.from({length: 500}, (_, i) => 1 + i * (99/499)); // L from 1 to 100
  const K_initial = 3;

  // Production function
  function longTermProduction(L, K) {
    return A * Math.pow(K, alpha_K) * Math.pow(L, alpha_L);
  }

  // Marginal product of labor
  function MPL(L, K) {
    return A * Math.pow(K, alpha_K) * alpha_L * Math.pow(L, alpha_L - 1);
  }

  // Generate initial traces
  let traceQ = {
    x: L_values,
    y: L_values.map(L => longTermProduction(L, K_initial)),
    name: `Q (K*=${K_initial})`,
    line: {color: 'blue'},
    type: 'scatter'
  };

  let traceMPL = {
    x: L_values,
    y: L_values.map(L => MPL(L, K_initial)),
    name: `MPL (K*=${K_initial})`,
    line: {color: 'green'},
    yaxis: 'y2',
    type: 'scatter'
  };

  const layout = {
    title: "Long-term Production Function with Adjustable Capital",
    xaxis: {title: "Labour (L)"},
    yaxis: {title: "Output (Q)", side: 'left'},
    yaxis2: {title: "MPL", overlaying: 'y', side: 'right'},
    legend: {x:0.05, y:1.15},
    margin: {t:80, b:60}
  };

  Plotly.newPlot('LongTPr', [traceQ, traceMPL], layout);

  // Update function when slider changes
  const KSlider = document.getElementById('KSlider');
  const KValue = document.getElementById('KValue');
  const explanationDiv = document.getElementById('explanation');

  KSlider.addEventListener('input', () => {
    const K_new = parseFloat(KSlider.value);
    KValue.innerText = K_new.toFixed(1);

    // Update traces
    Plotly.update('plotlyProduction', {
      y: [
        L_values.map(L => longTermProduction(L, K_new)),
        L_values.map(L => MPL(L, K_new))
      ]
    });

    // Update explanation
    let explanation = "";
    if (K_new > K_initial) {
      explanation = "Increasing capital (K*) allows workers to use more machines/resources, " +
                    "so output rises faster and the effect of diminishing marginal product of labor is reduced.";
    } else if (K_new < K_initial) {
      explanation = "Decreasing capital (K*) means fewer resources per worker, " +
                    "so each additional worker adds less output, highlighting diminishing marginal returns.";
    } else {
      explanation = "Capital is fixed at K* = 3, representing the short-run scenario. " +
                    "Adjusting K* illustrates how more capital can offset diminishing returns of labor.";
    }
    explanationDiv.innerText = explanation;
  });
})();
