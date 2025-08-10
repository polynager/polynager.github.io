// Basic parameters
  const a = 100; // intercept for demand (quantity when price = 0)
  const priceMax = 15;
  const quantityMax = 150;

  // Get DOM elements
  const elasticitySlider = document.getElementById('elasticity');
  const elasticityVal = document.getElementById('elasticityVal');
  const perfectlyInelasticCheckbox = document.getElementById('perfectlyInelastic');
  const perfectlyElasticCheckbox = document.getElementById('perfectlyElastic');
  const explanationDiv = document.getElementById('explanation');

  // Calculate demand quantity for given price and elasticity
  // Use midpoint formula for slope based on elasticity E:
  // E = |(dQ/dP) * (P/Q)| => slope b = E * a / midpoint_price (approx)
  // We'll keep midpoint_price ~ 5 for scaling purposes
  function demandCurve(prices, E) {
    // If elasticity = 0 (perfectly inelastic), quantity is fixed at 50 (example)
    // If elasticity is large, slope becomes flatter.
    let b = E * a / 10; 
    return prices.map(p => Math.max(0, a - b * p));
  }

  // Plot function
  function plot() {
    const E = parseFloat(elasticitySlider.value);
    elasticityVal.textContent = E.toFixed(1);

    const perfectlyInelastic = perfectlyInelasticCheckbox.checked;
    const perfectlyElastic = perfectlyElasticCheckbox.checked;

    if (perfectlyInelastic && perfectlyElastic) {
      explanationDiv.textContent = "Error: You cannot select both perfectly elastic and perfectly inelastic.";
      Plotly.purge('plot');
      return;
    }

    explanationDiv.textContent = "";

    const prices = [];
    for(let i=0; i<=100; i++) {
      prices.push(i * priceMax / 100);
    }

    // Original demand: E=1
    const originalQuantities = demandCurve(prices, 1);

    // Data traces
    const traces = [
      {
        x: originalQuantities,
        y: prices,
        mode: 'lines',
        name: 'Original Demand (E=1)',
        line: {dash: 'dash', color: 'blue'}
      }
    ];

    let explanation = "";

    if (perfectlyInelastic) {
      // Vertical line at fixed quantity (say 50)
      traces.push({
        x: Array(prices.length).fill(50),
        y: prices,
        mode: 'lines',
        name: 'Perfectly Inelastic (E=0)',
        line: {dash: 'dashdot', color: 'red'}
      });
      explanation = "The demand curve is perfectly inelastic (E=0), meaning quantity demanded remains constant regardless of price.";
    } else if (perfectlyElastic) {
      // Horizontal line at price 10 (chosen)
      traces.push({
        x: [0, quantityMax],
        y: [10, 10],
        mode: 'lines',
        name: 'Perfectly Elastic (E=∞)',
        line: {dash: 'dashdot', color: 'red'}
      });
      explanation = "The demand curve is perfectly elastic (E=∞), meaning consumers buy any quantity at a fixed price, but zero at higher prices.";
    } else {
      // New demand curve with selected elasticity
      const newQuantities = demandCurve(prices, E);
      traces.push({
        x: newQuantities,
        y: prices,
        mode: 'lines',
        name: `New Demand (E=${E.toFixed(2)})`,
        line: {color: 'green'}
      });

      if (E > 1) {
        explanation = `Demand is more elastic (E=${E.toFixed(2)}): the curve is flatter, so quantity changes more with price.`;
      } else if (E < 1 && E > 0) {
        explanation = `Demand is more inelastic (E=${E.toFixed(2)}): the curve is steeper, so quantity changes less with price.`;
      } else if (E === 1) {
        explanation = "Demand is unit elastic (E=1): quantity changes proportionally with price.";
      } else if (E === 0) {
        explanation = "Demand is perfectly inelastic (E=0): quantity demanded does not change with price.";
      }
    }

    const layout = {
      title: "Demand Curves with Varying Elasticity",
      xaxis: { title: "Quantity", range: [0, quantityMax] },
      yaxis: { title: "Price", range: [0, priceMax], autorange: false },
      height: 600,
      width: 800,
      showlegend: true,
      grid: {rows: 1, columns: 1}
    };

    Plotly.newPlot('plot', traces, layout, {responsive: true});
    explanationDiv.textContent = explanation;
  }

  // Prevent both checkboxes being checked at once
  perfectlyInelasticCheckbox.addEventListener('change', () => {
    if (perfectlyInelasticCheckbox.checked) {
      perfectlyElasticCheckbox.checked = false;
    }
    plot();
  });

  perfectlyElasticCheckbox.addEventListener('change', () => {
    if (perfectlyElasticCheckbox.checked) {
      perfectlyInelasticCheckbox.checked = false;
    }
    plot();
  });

  elasticitySlider.addEventListener('input', () => {
    plot();
  });

  // Initial plot
  plot();
