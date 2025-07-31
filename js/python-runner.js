let pyodideReadyPromise = loadPyodide({
  indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
});

const defaultCodes = {
  cobbDouglas: `
import matplotlib.pyplot as plt
import numpy as np

alpha = 0.5
x = np.linspace(0.1, 10, 100)
y = (x ** (alpha)) * ((10 - x) ** (1 - alpha))

plt.plot(x, y)
plt.xlabel("Good X")
plt.ylabel("Utility")
plt.title("Cobb-Douglas Utility")
plt.grid(True)
plt.show()
`,
  leontief: `
import matplotlib.pyplot as plt
import numpy as np

a, b = 1, 1
x = np.linspace(0.1, 10, 100)
y = x * b / a

plt.plot(x, y)
plt.xlabel("Good X")
plt.ylabel("Good Y")
plt.title("Leontief Utility")
plt.grid(True)
plt.show()
`,
  linear: `
import matplotlib.pyplot as plt
import numpy as np

a, b = 1, 1
x = np.linspace(0, 10, 100)
y = -a/b * x + 10

plt.plot(x, y)
plt.xlabel("Good X")
plt.ylabel("Good Y")
plt.title("Linear Utility")
plt.grid(True)
plt.show()
`
};

let currentEditor = null;
let currentGraphKey = null;

function openModal(graphKey) {
  currentGraphKey = graphKey;

  const modal = document.getElementById("codeModal");
  const editorContainer = document.getElementById("modalEditor");
  const modalTitle = document.getElementById("modalTitle");
  const modalOutput = document.getElementById("modalOutput");

  modal.style.display = "flex";
  modalTitle.textContent = `Edit Python Code: ${graphKey}`;
  modalOutput.innerHTML = "";

  // Clean existing editor if any
  editorContainer.innerHTML = "";

  const textarea = document.createElement("textarea");
  textarea.id = "codeEditor";
  textarea.value = defaultCodes[graphKey] || "";
  editorContainer.appendChild(textarea);

  currentEditor = CodeMirror.fromTextArea(textarea, {
    mode: "python",
    lineNumbers: true,
    theme: "default",
    indentUnit: 4,
    tabSize: 4,
  });

  setTimeout(() => currentEditor.refresh(), 100); // Fix sizing
}

function closeModal() {
  const modal = document.getElementById("codeModal");
  modal.style.display = "none";
  currentEditor = null;
  currentGraphKey = null;
}

async function runModalCode() {
  if (!currentEditor) return;
  const userCode = currentEditor.getValue();
  const modalOutput = document.getElementById("modalOutput");
  modalOutput.innerHTML = "⏳ Running...";

  const pyodide = await pyodideReadyPromise;
  await pyodide.loadPackage(["matplotlib", "numpy"]);

  const wrappedCode = `
import matplotlib.pyplot as plt
import numpy as np
import io, base64
from contextlib import redirect_stdout

buf_out = io.StringIO()
img_data = None
plt.clf()

with redirect_stdout(buf_out):
    try:
${userCode.split("\n").map(line => "        " + line).join("\n")}
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
    modalOutput.innerHTML = outputHTML;
  } catch (err) {
    modalOutput.innerHTML = `<pre style="color:red;">⚠️ Error:\n${err}</pre>`;
  }
}
