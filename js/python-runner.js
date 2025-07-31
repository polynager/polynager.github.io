let pyodideReady = loadPyodide({
  indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
});

// Run main demo Python block
async function runPython() {
  runPythonFromEditor("python");
}

// Run Python code from an editor identified by `idPrefix`
// E.g., 'cobbDouglas' expects textarea with ID 'cobbDouglas-code' and output div 'cobbDouglas-output'
async function runPythonFromEditor(idPrefix) {
  const pyodide = await pyodideReady;
  await pyodide.loadPackage(["matplotlib", "numpy"]);

  const textarea = document.getElementById(`${idPrefix}-code`);
  const outputDiv = document.getElementById(`${idPrefix}-output`);

  if (!textarea || !outputDiv) return;

  const userCode = textarea.value;
  outputDiv.innerHTML = "⏳ Running...";

  const wrappedCode = `
import matplotlib.pyplot as plt
import numpy as np
import io, base64
import sys
from contextlib import redirect_stdout

buf_out = io.StringIO()
plt.clf()
img_data = None

with redirect_stdout(buf_out):
    try:
${userCode.split('\n').map(line => '        ' + line).join('\n')}
    except Exception as e:
        print("Error:", e)

if plt.get_fignums():
    img_buf = io.BytesIO()
    plt.savefig(img_buf, format='png')
    img_buf.seek(0)
    img_data = base64.b64encode(img_buf.read()).decode('utf-8')

text_output = buf_out.getvalue()
`;

  try {
    await pyodide.runPythonAsync(wrappedCode);
    const imgData = pyodide.globals.get("img_data");
    const textOutput = pyodide.globals.get("text_output");

    let outputHTML = "";

    if (imgData && imgData.toString().length > 0) {
      outputHTML += `<img src="data:image/png;base64,${imgData}" />`;
    }

    if (textOutput && textOutput.length > 0) {
      outputHTML += `<pre>${textOutput}</pre>`;
    }

    if (!outputHTML) outputHTML = "✅ Code ran, but returned no output.";

    outputDiv.innerHTML = outputHTML;
  } catch (err) {
    outputDiv.innerText = "⚠️ Error:\n" + err;
  }
}

// Show/hide code editor blocks
function toggleCodeEditor(editorId) {
  const container = document.getElementById(`${editorId}-editor-container`);
  if (container) {
    container.style.display = container.style.display === "none" ? "block" : "none";
  }
}
