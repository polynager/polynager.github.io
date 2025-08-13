const A = 15;
  const alpha_K = 0.25;
  const alpha_L = 0.75;
  const L_values = Array.from({length: 500}, (_, i) => 1 + i * (99/499));

  const KSlider = document.getElementById('KSlider');
  const KValue = document.getElementById('KValue');
  const explanationDiv = document.getElementById('explanation');

  function shortTermProduction(L, K) {
    return A * Math.pow(K, alpha_K) * Math.pow(L, alpha_L);
  }

  function marginalProductOfLabour(L, K) {
    return A * Math.pow(K, alpha_K) * alpha_L * Math.pow(L, alpha_L - 1);
  }

  function updatePlots(K) {
    const Q_values = L_values.map(L => shortTermProduction(L, K));
    const MPL_values = L_values.map(L => marginalProductOfLabour(L, K));

    // Update production plot
    Plotly.react('productionPlot', [{
      x: L_values,
      y: Q_values,
      mode: 'lines',
      name: `Short-term Production Q (K*=${K.toFixed(1)})`,
      line: { color: 'blue' }
    }], {
      title: 'Short-term Production Function',
      xaxis: { title: 'Labour (L)' },
      yaxis: { title: 'Output (Q)' }
    });

    // Update MPL plot
    Plotly.react('mplPlot', [{
      x: L_values,
      y: MPL_values,
      mode: 'lines',
      name: `MPL (K*=${K.toFixed(1)})`,
      line: { color: 'green' }
    }], {
      title: 'Marginal Product of Labour',
      xaxis: { title: 'Labour (L)' },
      yaxis: { title: 'MPL' }
    });

    // Update explanation dynamically
    let explanation = "";
    if (K > 3) {
      explanation = "Increasing capital (K*) gives more machines/resources per worker, increasing output and MPL.";
    } else if (K < 3) {
      explanation = "Decreasing capital (K*) means fewer resources per worker, reducing output and MPL more sharply.";
    } else {
      explanation = "Capital fixed at K* = 3 represents the short-run scenario. Adjusting K* shows the effect of more or fewer resources per worker.";
    }
    explanationDiv.innerText = explanation;
  }

  // Initial plot
  updatePlots(parseFloat(KSlider.value));

  // Slider listener
  KSlider.addEventListener('input', () => {
    const K_new = parseFloat(KSlider.value);
    KValue.innerText = K_new.toFixed(1);
    updatePlots(K_new);
  });
})();
