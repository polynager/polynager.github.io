function generateMarketData(demandShift = 0) {
  const price = [];
  const quantityDemanded = [];
  const quantitySupplied = [];
  for (let q = 0; q <= 20; q += 1) {
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
  for (let q = 1; q <= 10; q += 1) {
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
const marketCtx = document.getElementById('marketChart').getContext('2d');
let marketData = generateMarketData();
const marketChart = new Chart(marketCtx, {
  type: 'line',
  data: {
    labels: marketData.price,
    datasets: [
      {
        label: 'Demand',
        data: marketData.quantityDemanded,
        borderColor: 'blue',
        fill: false
      },
      {
        label: 'Supply',
        data: marketData.quantitySupplied,
        borderColor: 'red',
        fill: false
      }
    ]
  },
  options: {
    responsive: false,
    scales: { y: { beginAtZero: true } }
  }
});

document.getElementById('demandShift').addEventListener('input', (e) => {
  const shift = parseFloat(e.target.value);
  const newData = generateMarketData(shift);
  marketChart.data.datasets[0].data = newData.quantityDemanded;
  marketChart.update();
});

// -----------------------
// Firm Chart
// -----------------------
const firmCtx = document.getElementById('firmChart').getContext('2d');
let firmData = generateFirmData();
const firmChart = new Chart(firmCtx, {
  type: 'line',
  data: {
    labels: firmData.quantity,
    datasets: [
      { label: 'MC', data: firmData.mc, borderColor: 'green', fill: false },
      { label: 'ATC', data: firmData.atc, borderColor: 'orange', fill: false },
      { label: 'AVC', data: firmData.avc, borderColor: 'purple', fill: false }
    ]
  },
  options: { responsive: false, scales: { y: { beginAtZero: true } } }
});

document.getElementById('avcShift').addEventListener('input', (e) => {
  const shift = parseFloat(e.target.value);
  const newData = generateFirmData(shift);
  firmChart.data.datasets[2].data = newData.avc;
  firmChart.update();
});

// -----------------------
// Industry Chart
// -----------------------
const industryCtx = document.getElementById('industryChart').getContext('2d');
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

  cb.addEventListener('change', () => updateIndustryChart());
});

function aggregateIndustrySupply() {
  const aggregated = [];
  for (let q = 1; q <= 10; q++) {
    let sum = 0;
    firms.forEach((firm, i) => {
      const cb = document.getElementById(`firm${i}`);
      if (cb.checked) sum += firm.data[q-1];
    });
    aggregated.push(sum);
  }
  return aggregated;
}

let industryChart = new Chart(industryCtx, {
  type: 'line',
  data: {
    labels: Array.from({length: 10}, (_, i) => i + 1),
    datasets: [{ label: 'Industry Supply', data: aggregateIndustrySupply(), borderColor: 'brown', fill: false }]
  },
  options: { responsive: false, scales: { y: { beginAtZero: true } } }
});

function updateIndustryChart() {
  industryChart.data.datasets[0].data = aggregateIndustrySupply();
  industryChart.update();
}
