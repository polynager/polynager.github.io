function demandOne(q) { return 10 - 0.5*q; }
  function mrOne(q) { return 10 - q; }
  function demandTwo(q) { return 8 - 0.4*q; }
  function mrTwo(q) { return 8 - 0.8*q; }
  function demandN(q) { return 6 - 0.3*q; }
  function mrN(q) { return 6 - 0.6*q; }
  function mc(q) { return 2 + 0.1*q; }
  function atc(q, fixedCost=5) { return mc(q) + fixedCost/q; }

  // Quantities
  const q = Array.from({length:500}, (_,i) => 1 + i*(20-1)/499);

  // ---------- Monopoly ----------
  const monopolyTraces = [
    {x:q, y:q.map(demandOne), type:'scatter', mode:'lines', name:'DONE (Demand)', line:{color:'blue'}},
    {x:q, y:q.map(mrOne), type:'scatter', mode:'lines', name:'MRONE', line:{color:'purple'}},
    {x:q, y:q.map(mc), type:'scatter', mode:'lines', name:'MC', line:{color:'red'}},
    {x:q, y:q.map(atc), type:'scatter', mode:'lines', name:'ATC', line:{color:'skyblue'}},
    {x:[8], y:[demandOne(8)], type:'scatter', mode:'markers', name:'Equilibrium (Q*ONE, P*ONE)', marker:{color:'black', size:8}},
    {x:[8,8], y:[0,demandOne(8)], type:'scatter', mode:'lines', line:{dash:'dash', color:'gray'}, showlegend:false},
    {x:[0,8], y:[demandOne(8),demandOne(8)], type:'scatter', mode:'lines', line:{dash:'dash', color:'gray'}, showlegend:false}
  ];

  const layoutMonopoly = {
    title:'Monopoly: Single Firm in the Market',
    xaxis:{title:'Quantity of meals (Q)'},
    yaxis:{title:'Price and cost ($)', range:[0,12]},
    legend:{font:{size:10}},
    grid:{rows:1, columns:1}
  };

  Plotly.newPlot('monopoly', monopolyTraces, layoutMonopoly);

  // ---------- Two Firms ----------
  const twoFirmsTraces = [
    {x:q, y:q.map(demandOne), type:'scatter', mode:'lines', name:'DONE (Initial Demand)', line:{color:'blue', dash:'dash'}},
    {x:q, y:q.map(mrOne), type:'scatter', mode:'lines', name:'MRONE (Initial MR)', line:{color:'purple', dash:'dash'}},
    {x:q, y:q.map(demandTwo), type:'scatter', mode:'lines', name:'DTWO (Residual Demand)', line:{color:'blue'}},
    {x:q, y:q.map(mrTwo), type:'scatter', mode:'lines', name:'MRTWO (Residual MR)', line:{color:'purple'}},
    {x:q, y:q.map(mc), type:'scatter', mode:'lines', name:'MC', line:{color:'red'}},
    {x:q, y:q.map(atc), type:'scatter', mode:'lines', name:'ATC', line:{color:'skyblue'}},
    {x:[6], y:[demandTwo(6)], type:'scatter', mode:'markers', name:'Equilibrium (Q*TWO, P*TWO)', marker:{color:'black', size:8}},
    {x:[6,6], y:[0,demandTwo(6)], type:'scatter', mode:'lines', line:{dash:'dash', color:'gray'}, showlegend:false},
    {x:[0,6], y:[demandTwo(6),demandTwo(6)], type:'scatter', mode:'lines', line:{dash:'dash', color:'gray'}, showlegend:false}
  ];

  const layoutTwoFirms = {
    title:'Two Firms in the Market',
    xaxis:{title:'Quantity of meals (Q)'},
    yaxis:{title:'Price and cost ($)', range:[0,12]},
    legend:{font:{size:10}}
  };

  Plotly.newPlot('two-firms', twoFirmsTraces, layoutTwoFirms);

  // ---------- Long-Run Equilibrium ----------
  const longRunTraces = [
    {x:q, y:q.map(demandN), type:'scatter', mode:'lines', name:'DN (Demand)', line:{color:'blue'}},
    {x:q, y:q.map(mrN), type:'scatter', mode:'lines', name:'MRN', line:{color:'purple'}},
    {x:q, y:q.map(mc), type:'scatter', mode:'lines', name:'MC', line:{color:'red'}},
    {x:q, y:q.map(atc), type:'scatter', mode:'lines', name:'ATC', line:{color:'skyblue'}},
    {x:[4], y:[demandN(4)], type:'scatter', mode:'markers', name:'Equilibrium (Q*N, P*N)', marker:{color:'black', size:8}},
    {x:[4,4], y:[0,demandN(4)], type:'scatter', mode:'lines', line:{dash:'dash', color:'gray'}, showlegend:false},
    {x:[0,4], y:[demandN(4),demandN(4)], type:'scatter', mode:'lines', line:{dash:'dash', color:'gray'}, showlegend:false}
  ];

  const layoutLongRun = {
    title:'Long-Run Equilibrium with N Firms',
    xaxis:{title:'Quantity of meals (Q)'},
    yaxis:{title:'Price and cost ($)', range:[0,12]},
    legend:{font:{size:10}}
  };

  Plotly.newPlot('long-run', longRunTraces, layoutLongRun);
</script>
