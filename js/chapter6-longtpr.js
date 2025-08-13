(() => {
  const A = 15;
  const alpha_K = 0.25;
  const alpha_L = 0.75;
  const L_values = Array.from({length: 500}, (_, i) => 1 + i * (99/499));
  const K_initial = 3;

  // Production function
  function longTermProduction(L, K) {
    return A * Math.pow(K, alpha_K) * Math.pow(L, alpha_L);
  }

  // Marginal product of labor
  function MPL(L, K) {
    return A * Math.pow(K, alpha_K) * alpha_L * Math.pow(L, alpha_L - 1);
  }

  // Initial traces
  const traceQ_original = {
    x: L_values,
    y: L_values.map(L => longTermProduction(L, K_initial)),
    name: `Original Q (K*=${K_initial})`,
    line: {color: 'blue', dash: 'dash'},
    type: 'scatter'
  };

  const traceMPL_original = {
    x: L_values,
    y: L_values.map(L => MPL(L, K_initial)),
    name: `Original MPL (K*=${K_initial})`,
    line: {color: 'green', dash: 'dash'},
    yaxis: 'y2',
    type: 'scatter'
  };

  const traceQ_new = {
    x: L_values,
    y: L_values.map(L => longTermProduction(L, K_initial)),
    name: `Adjusted Q`,
    line: {color: 'red'},
    type: 'scatter'
  };

  const traceMPL_new = {
    x: L_values,
    y: L_values.map(L => MPL(L, K_initial)),
    name: `Adjusted MPL`,
    line: {color: 'orange'},
    yaxis: 'y2',
    type: 'scatter'
  };

  const layout = {
    title: "Long-term Production Function with Adjustable Capital",
    xaxis: {title: "Labour (L)"},
    yaxis: {title: "Output (Q)", side: 'left'},
    yaxis2: {title: "MPL", overlaying: 'y', side: 'right'},
    legend: {x:0, y:1.15},
    margin: {t:80, b:60}
  };

  Plotly.newPlot('LongTPr', [traceQ_original, traceMPL_original, traceQ_new, traceMPL_new], layout);

  const KSlider = document.getElementById('KSlider');
  const KValue = document.getElementById('KValue');
  const explanationDiv = document.getElementById('explanation');

  KSlider.addEventListener('input', () => {
    const K_new = parseFloat(KSlider.value);
    KValue.innerText = K_new.toFixed(1);

    // Update adjusted traces
    Plotly.update('LongTPr', {
      y: [
        null, // original Q stays the same
        null, // original MPL stays the same
        L_values.map(L => longTermProduction(L, K_new)), // adjusted Q
        L_values.map(L => MPL(L, K_new))                // adjusted MPL
      ]
    });

    // Update explanation
    let explanation = "";
    if (K_new > K_initial) {
      explanation = "Increasing capital (K*) allows workers to use more machines/resources, so output rises faster and diminishing marginal returns are reduced.";
    } else if (K_new < K_initial) {
      explanation = "Decreasing capital (K*) gives fewer resources per worker, so additional workers add less output, emphasizing diminishing returns.";
    } else {
      explanation = "Capital fixed at K* = 3 represents the short-run scenario. Adjusting K* shows how more capital affects productivity.";
    }
    explanationDiv.innerText = explanation;
  });
})();
