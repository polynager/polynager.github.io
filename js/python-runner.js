// python-runner.js

let pyodideReady = loadPyodide({
  indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
});

async function runPython() {
  const pyodide = await pyodideReady;
  await pyodide.loadPackage(["matplotlib", "numpy"]);

  const userCode = document.getElementById("python-code").value;
  document.getElementById("py-output").innerHTML = "⏳ Running...";

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

    document.getElementById("py-output").innerHTML = outputHTML;
  } catch (err) {
    document.getElementById("py-output").innerText = "⚠️ Error:\n" + err;
  }
}
