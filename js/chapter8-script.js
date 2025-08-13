// -----------------------
// Sample Data Functions
// -----------------------
function generateMarketData(demandShift = 0) {
  const price = [];
  const quantityDemanded = [];
  const quantitySupplied = [];
  for (let q = 0; q <= 20; q++) {
    price.push(q);
    quantityDemanded.push(20 - q + demandShift);
    quantitySupplied.push(q);
  }
  return { price, quantityDemanded, quantitySupplied };
}

function generateFirmData(avcShift = 0) {
  const quantity = [];
  const mc = [];
  const atc = [];
  const avc = [];
  for (let q = 1; q <= 10; q++) {
    quantity.push(q);
    mc.push(1 + 0.5 * q);
    atc.push(2 + 1.2 * q);
    avc.push(1 + 0.5 * q + avcShift);
  }
  return { quantity, mc, atc, avc };
}

// -----------------------
// Market Chart
// -----------------------
let marketData = generateMarketData();
Plotly.newPlot('marketChart', [
  { x: marketData.quantityDemanded, y: marketData.price, mode: 'lines', name: 'Demand', line: { color: 'blue' } },
  { x: marketData.quantitySupplied, y: marketData.price, mode: 'lines', name: 'Supply', line: { color: 'red' } }
], { xaxis: { title: 'Quantity' }, yaxis: { title: 'Price' } });

document.getElementById('demandShift').addEventListener('input', (e) => {
  const shift = parseFloat(e.target.value);
  const newData = generateMarketData(shift);
  Plotly.update('marketChart', {
    x: [newData.quantityDemanded],
    y: [newData.price]
  }, {}, [0]);
});

// -----------------------
// Firm Chart
// -----------------------
let firmData = generateFirmData();
Plotly.newPlot('firmChart', [
  { x: firmData.quantity, y: firmData.mc, mode: 'lines', name: 'MC', line: { color: 'green' } },
  { x: firmData.quantity, y: firmData.atc, mode: 'lines', name: 'ATC', line: { color: 'orange' } },
  { x: firmData.quantity, y: firmData.avc, mode: 'lines', name: 'AVC', line: { color: 'purple' } }
], { xaxis: { title: 'Quantity' }, yaxis: { title: 'Cost' } });

document.getElementById('avcShift').addEventListener('input', (e) => {
  const shift = parseFloat(e.target.value);
  const newData = generateFirmData(shift);
  Plotly.update('firmChart', { y: [newData.mc, newData.atc, newData.avc] }, {}, [0,1,2]);
});

// -----------------------
// Industry Chart
// -----------------------
const firms = [
  { name: 'Firm 1', data: generateFirmData().mc },
  { name: 'Firm 2', data: generateFirmData(0.5).mc },
  { name: 'Firm 3', data: generateFirmData(1).mc }
];

const firmCheckboxesDiv = document.getElementById('firmCheckboxes');
firms.forEach((firm, i) => {
  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.id = `firm${i}`;
  cb.checked = true;
  const label = document.createElement('label');
  label.htmlFor = `firm${i}`;
  label.innerText = firm.name;
  firmCheckboxesDiv.appendChild(cb);
  firmCheckboxesDiv.appendChild(label);
  firmCheckboxesDiv.appendChild(document.createElement('br'));

  cb.addEventListener('change', updateIndustryChart);
});

function aggregateIndustrySupply() {
  const aggregated = [];
  for (let q = 0; q < 10; q++) {
    let sum = 0;
    firms.forEach((firm, i) => {
      const cb = document.getElementById(`firm${i}`);
      if (cb.checked) sum += firm.data[q];
    });
    aggregated.push(sum);
  }
  return aggregated;
}

Plotly.newPlot('industryChart', [
  { x: Array.from({length:10}, (_,i)=>i+1), y: aggregateIndustrySupply(), mode: 'lines', name: 'Industry Supply', line: { color: 'brown' } }
], { xaxis: { title: 'Quantity' }, yaxis: { title: 'Supply' } });

function updateIndustryChart() {
  Plotly.update('industryChart', { y: [aggregateIndustrySupply()] }, {}, [0]);
}
