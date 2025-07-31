// python-runner.js

let modalEditor = null;
let pyodide = null;
let currentSectionId = null;

// Python code samples for each graph
const codeSamples = {
  cobbDouglas: `import matplotlib.pyplot as plt
import numpy as np

def cobb_douglas_utility(x, y, alpha):
    return (x**alpha) * (y**(1 - alpha))

x = np.linspace(0.1, 10, 100)
y = np.linspace(0.1, 10, 100)
X, Y = np.meshgrid(x, y)
U = cobb_douglas_utility(X, Y, 0.5)

plt.figure(figsize=(6,5))
contour = plt.contour(X, Y, U, levels=5)
plt.clabel(contour)
plt.xlabel("Good X")
plt.ylabel("Good Y")
plt.title("Cobb-Douglas Utility (α = 0.5)")
plt.grid(True)
plt.show()
`,

  leontief: `import matplotlib.pyplot as plt
import numpy as np

def leontief_utility(x, y, a, b):
    return np.minimum(x / a, y / b)

x = np.linspace(0.1, 10, 100)
y = np.linspace(0.1, 10, 100)
X, Y = np.meshgrid(x, y)
U = leontief_utility(X, Y, 1, 1)

plt.figure(figsize=(6,5))
contour = plt.contour(X, Y, U, levels=5)
plt.clabel(contour)
plt.xlabel("Good X")
plt.ylabel("Good Y")
plt.title("Leontief Utility (a=1, b=1)")
plt.grid(True)
plt.show()
`,

  linear: `import matplotlib.pyplot as plt
import numpy as np

def linear_utility(x, y, a, b):
    return a * x + b * y

x = np.linspace(0.1, 10, 100)
y = np.linspace(0.1, 10, 100)
X, Y = np.meshgrid(x, y)
U = linear_utility(X, Y, 1, 1)

plt.figure(figsize=(6,5))
contour = plt.contour(X, Y, U, levels=5)
plt.clabel(contour)
plt.xlabel("Good X")
plt.ylabel("Good Y")
plt.title("Linear Utility (a=1, b=1)")
plt.grid(True)
plt.show()
`
};

function openModal(sectionId) {
  currentSectionId = sectionId;
  const modal = document.getElementById('codeModal');
  modal.style.display = 'flex';
  document.getElementById('modalTitle').textContent = `Edit Python Code: ${sectionId}`;

  if (!modalEditor) {
    modalEditor = CodeMirror(document.getElementById('modalEditor'), {
      mode: 'python',
      lineNumbers: true,
      theme: 'default',
      indentUnit: 4,
      tabSize: 4,
      lineWrapping: true,
    });
    modalEditor.setSize('100%', '100%');
  }

  modalEditor.setValue(codeSamples[sectionId] || "# No code available.");
  document.getElementById('modalOutput').innerHTML = '';
}

function closeModal() {
  document.getElementById('codeModal').style.display = 'none';
}

// Run Python code in modal, capture matplotlib plot as PNG, and display
async function runModalCode() {
  const outputDiv = document.getElementById('modalOutput');
  outputDiv.innerHTML = 'Running...';

  if (!pyodide) {
    pyodide = await loadPyodide();
    await pyodide.loadPackage(['matplotlib', 'numpy']);
    pyodide.runPython(`import matplotlib; matplotlib.use('AGG')`);
  }

  try {
    const code = modalEditor.getValue();

    const codeWithPlotSave = `
import io
import matplotlib.pyplot as plt

plt.close('all')

${code}

buf = io.BytesIO()
plt.savefig(buf, format='png')
buf.seek(0)
img_data = buf.read()
import base64
img_b64 = base64.b64encode(img_data).decode('ascii')
img_b64
`;

    const imgB64 = await pyodide.runPythonAsync(codeWithPlotSave);
    outputDiv.innerHTML = '<img src="data:image/png;base64,' + imgB64 + '" alt="Plot output" style="max-width:100%; height:auto;"/>';
  } catch (err) {
    outputDiv.innerHTML = '<pre style="color:red;">' + err + '</pre>';
  }
}
