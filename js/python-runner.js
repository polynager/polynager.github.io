let pyodideReadyPromise = loadPyodide({
  indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
});

const defaultCodes = {
  cobbDouglas: `
# Cobb-Douglas utility function
def cobb_douglas_utility(x, y, alpha):
    return (x**alpha) * (y**(1 - alpha))

# Plotting function
def plot_cobb_douglas(α):
    x = np.linspace(0.1, 10, 100)
    y = np.linspace(0.1, 10, 100)
    X, Y = np.meshgrid(x, y)
    U = cobb_douglas_utility(X, Y, α)
    
    plt.figure(figsize=(6, 5))
    contour = plt.contour(X, Y, U, levels=5)
    plt.clabel(contour, inline=1, fontsize=10)
    plt.xlabel('Good X')
    plt.ylabel('Good Y')
    plt.title(f'Cobb-Douglas Utility (α = {α:.2f})')
    plt.grid(True)
    plt.show()

#Edit this value for any graph changes
alpha = 0.5
plot_cobb_douglas(alpha)`
,
cobbDouglas3D:`
# 3D Cobb-Douglas surface plot with contour
from mpl_toolkits.mplot3d import Axes3D
from matplotlib import cm

fig = plt.figure(figsize=(10, 7))
ax = fig.add_subplot(111, projection='3d')

X, Y = np.meshgrid(np.linspace(0.1, 10, 100), np.linspace(0.1, 10, 100))
α = 0.5
U = X ** α * Y ** (1 - α)

ax.plot_surface(X, Y, U, cmap=cm.viridis, alpha=0.8, edgecolor='none')
ax.contour(X, Y, U, levels=10, offset=0, cmap=cm.viridis)

ax.set_xlabel('Good X')
ax.set_ylabel('Good Y')
ax.set_zlabel('Utility')
ax.set_title('Cobb-Douglas Utility Surface')
plt.tight_layout()
plt.show()`
,
leontief: `
# Leontief utility function (corrected)
def leontief_utility(x, y, a, b):
    return np.minimum(a * x, b * y)

# Plotting function
def plot_leontief(a, b):
    x = np.linspace(0.1, 10, 100)
    y = np.linspace(0.1, 10, 100)
    X, Y = np.meshgrid(x, y)
    U = leontief_utility(X, Y, a, b)
    
    plt.figure(figsize=(6, 5))
    contour = plt.contour(X, Y, U, levels=5)
    plt.clabel(contour, inline=1, fontsize=10)
    plt.xlabel('Good X')
    plt.ylabel('Good Y')
    plt.title(f'Leontief Utility (a = {a:.2f}, b = {b:.2f})')
    plt.grid(True)
    plt.show()

# Edit values if needed
plot_leontief(a = 0.5, b = 0.5)
`, leontief3D:`
# 3D Leontief utility surface plot with contour
from matplotlib import cm

fig = plt.figure(figsize=(10, 7))
ax = fig.add_subplot(111, projection='3d')

X, Y = np.meshgrid(np.linspace(0.1, 10, 100), np.linspace(0.1, 10, 100))
a, b = 1, 1
U = np.minimum(a * X, b * Y)

ax.plot_surface(X, Y, U, cmap=cm.plasma, alpha=0.8, edgecolor='none')
ax.contour(X, Y, U, levels=10, offset=0, cmap=cm.plasma)

ax.set_xlabel('Good X')
ax.set_ylabel('Good Y')
ax.set_zlabel('Utility')
ax.set_title('Leontief Utility Surface')
plt.tight_layout()
plt.show()
`,
linear: `
# Linear utility function (corrected)
from matplotlib import cm

def linear_utility(x, y, a, b):
    return a * x + b * y

# Plotting function
def plot_linear(a, b):
    x = np.linspace(0.1, 10, 100)
    y = np.linspace(0.1, 10, 100)
    X, Y = np.meshgrid(x, y)
    U = linear_utility(X, Y, a, b)
    
    plt.figure(figsize=(6, 5))
    contour = plt.contour(X, Y, U, levels=5)
    plt.clabel(contour, inline=1, fontsize=10)
    plt.xlabel('Good X')
    plt.ylabel('Good Y')
    plt.title(f'Linear Utility (a = {a:.2f}, b = {b:.2f})')
    plt.grid(True)
    plt.show()

# Change values if needed
plot_linear(a = 0.5, b = 0.5)  
  
`, linear3D:`
# 3D Linear utility surface plot with contour
from matplotlib import cm

fig = plt.figure(figsize=(10, 7))
ax = fig.add_subplot(111, projection='3d')

X, Y = np.meshgrid(np.linspace(0, 10, 100), np.linspace(0, 10, 100))
# Change values if needed
a = 1
b = 1
U = a * X + b * Y

ax.plot_surface(X, Y, U, cmap=cm.cividis, alpha=0.8, edgecolor='none')
ax.contour(X, Y, U, levels=10, offset=0, cmap=cm.cividis)

ax.set_xlabel('Good X')
ax.set_ylabel('Good Y')
ax.set_zlabel('Utility')
ax.set_title('Linear Utility Surface')
plt.tight_layout()
plt.show()
`, budgetset:`def plot_budget_set(p_X, p_Y, I):
    # Reference budget set (always pX = 1, pY = 1, I = 10)
    ref_pX, ref_pY, ref_I = 1, 1, 10
    ref_x_max = ref_I / ref_pX
    ref_y_max = ref_I / ref_pY
    ref_x_fill = [0, ref_x_max, 0]
    ref_y_fill = [0, 0, ref_y_max]
    ref_x = np.linspace(0, ref_x_max, 100)
    ref_y = (ref_I - ref_pX * ref_x) / ref_pY

    # Current budget set
    x_max = I / p_X
    y_max = I / p_Y
    x_fill = [0, x_max, 0]
    y_fill = [0, 0, y_max]
    x = np.linspace(0, x_max, 100)
    y = (I - p_X * x) / p_Y

    # Plot
    plt.figure(figsize=(6, 5))

    # Plot reference (in blue, faded)
    plt.plot(ref_x, ref_y, 'b--', linewidth=1.5, label='Reference Budget Line (pX=1, pY=1, I=10)')
    plt.fill(ref_x_fill, ref_y_fill, color='blue', alpha=0.15, label='Reference Budget Set')

    # Plot current (in red)
    plt.plot(x, y, 'r-', linewidth=2, label='Current Budget Line')
    plt.fill(x_fill, y_fill, color='red', alpha=0.3, label='Current Budget Set')

    plt.xlim(0, max(10, x_max, ref_x_max))
    plt.ylim(0, max(10, y_max, ref_y_max))
    plt.xlabel('Good X')
    plt.ylabel('Good Y')
    plt.title(f'Budget Set (I={I:.1f}, pX={p_X:.1f}, pY={p_Y:.1f})')
    plt.grid(True)
    plt.legend()
    plt.show()

# Change values if needed
plot_budget_set(p_X=1, p_Y=1, I=10)
    
    `, 
  cobbDouglasutility: `def cobb_douglas_cplot(p_X, p_Y, α):
    x = np.linspace(0.1, 20, 100)
    y = np.linspace(0.1, 20, 100)
    X, Y = np.meshgrid(x, y)
    min_U = 10

    # Utility function
    U = (X ** α) * (Y ** (1 - α))

    # Contour utility levels
    levels = [min_U - 5, min_U, min_U + 5]

    # Optimal bundle
    x_optimal = min_U / ((p_X / p_Y) * ((1 - α) / α)) ** (1 - α)
    y_optimal = (p_X / p_Y) * ((1 - α) / α) * x_optimal

    # Required income
    req_I = p_X * x_optimal + p_Y * y_optimal

    # Budget set condition
    budget_mask = p_X * X + p_Y * Y <= req_I

    # Plot
    plt.figure(figsize=(8, 6))

    # Shade the budget set
    plt.contourf(X, Y, budget_mask, levels=[0.5, 1], colors=['#e0f7fa'], alpha=0.5)

    # Budget line
    budget_line_y = (req_I - p_X * x) / p_Y
    budget_line_y[budget_line_y < 0] = np.nan  # Avoid plotting negative values
    plt.plot(x, budget_line_y, label="Budget Line", color='black')

    # Utility contours
    contours = plt.contour(X, Y, U, levels=levels, colors=['#999999', '#0066cc', '#999999'], linestyles='--')
    plt.clabel(contours, inline=True, fontsize=8, fmt='U=%.0f')

    # Optimal bundle
    plt.plot(x_optimal, y_optimal, 'ro', label='Optimal Bundle')

    # Labels and legend
    plt.xlabel('Good X')
    plt.ylabel('Good Y')
    plt.title(f'α = {α:.2f}, p_X = {p_X:.2f}, p_Y = {p_Y:.2f}')
    plt.xlim(0, 20)
    plt.ylim(0, 20)
    plt.legend()
    plt.grid(True)
    plt.show()

# Change values if needed
cobb_douglas_cplot(p_X=1.0, p_Y=2.0, α=0.5)

`, leontieffutility:`def leontief_cplot(p_X, p_Y, a, b):
    min_U = 10

    # Grid
    x = np.linspace(0.1, 20, 400)
    y = np.linspace(0.1, 20, 400)
    X, Y = np.meshgrid(x, y)

    # Utility function
    U = np.minimum(a * X, b * Y)

    # Utility levels for contours
    levels = [min_U - 5, min_U, min_U + 5]

    # Budget constraint: Income needed to get min_U
    x_optimal = min_U / a
    y_optimal = min_U / b
    req_I = p_X * x_optimal + p_Y * y_optimal

    # Budget set mask
    budget_mask = p_X * X + p_Y * Y <= req_I

    # Plot
    plt.figure(figsize=(8, 6))

    # Budget set shading
    plt.contourf(X, Y, budget_mask, levels=[0.5, 1], colors=['#e0f7fa'], alpha=0.5)

    # Budget line
    budget_line_y = (req_I - p_X * x) / p_Y
    budget_line_y[budget_line_y < 0] = np.nan
    plt.plot(x, budget_line_y, color='black', label='Budget Line')

    # Plot Leontief indifference curves
    colors = ['#999999', '#0066cc', '#999999']
    for level, color in zip(levels, colors):
        x_c = level / a
        y_c = level / b
        # Vertical and horizontal segments of the L shape
        plt.plot([x_c, x_c], [y_c, 20], color=color, linestyle='--')
        plt.plot([x_c, 20], [y_c, y_c], color=color, linestyle='--')
        plt.text(x_c + 0.2, y_c + 0.2, f"U={level}", color=color)

    # Optimal bundle
    plt.plot(x_optimal, y_optimal, 'ro', label='Optimal Bundle')

    # Labels and aesthetics
    plt.xlabel('Good X')
    plt.ylabel('Good Y')
    plt.title(f'Leontief Utility: a={a:.1f}, b={b:.1f}, p_X={p_X:.1f}, p_Y={p_Y:.1f}')
    plt.xlim(0, 20)
    plt.ylim(0, 20)
    plt.grid(True)
    plt.legend()
    plt.show()

# Change values if needed
leontief_cplot(p_X=1.0, p_Y=2.0, a=1.0, b=1.0)
`, 
 linearutility:`def linear_utility_cplot(p_X, p_Y, a, b):
    x = np.linspace(0.01, 10, 400)
    y = np.linspace(0.01, 10, 400)
    X, Y = np.meshgrid(x, y)

    U_min = 10
    U = a * X + b * Y
    levels = [U_min - 5, U_min, U_min + 5]

    # Value per dollar
    ratio_X = a / p_X
    ratio_Y = b / p_Y

    if np.isclose(ratio_X, ratio_Y):
        print("Since a/p_X = b/p_Y, utility per dollar is equal for both goods.")
        print("→ Infinite number of optimal bundles along the budget line.")
        x_optimal = np.linspace(0, U_min / a, 100)
        y_optimal = (U_min - a * x_optimal) / b
    elif ratio_X > ratio_Y:
        print("Since a/p_X > b/p_Y, Good X gives more utility per dollar.")
        print("→ Corner solution: spend entire income on Good X.")
        x_optimal = U_min / a
        y_optimal = 0
    else:
        print("Since a/p_X < b/p_Y, Good Y gives more utility per dollar.")
        print("→ Corner solution: spend entire income on Good Y.")
        x_optimal = 0
        y_optimal = U_min / b

    # Required income
    if isinstance(x_optimal, np.ndarray):
        req_I = p_X * x_optimal[0] + p_Y * y_optimal[0]
    else:
        req_I = p_X * x_optimal + p_Y * y_optimal

    # Budget mask
    budget_mask = p_X * X + p_Y * Y <= req_I

    # Plot
    plt.figure(figsize=(8, 6))

    # Budget set shading
    plt.contourf(X, Y, budget_mask, levels=[0.5, 1], colors=['#e0f7fa'], alpha=0.5)

    # Budget line
    budget_line_y = (req_I - p_X * x) / p_Y
    budget_line_y[budget_line_y < 0] = np.nan
    plt.plot(x, budget_line_y, label='Budget Line', color='black')

    # Utility contours
    contours = plt.contour(X, Y, U, levels=levels, colors=['#999999', '#0066cc', '#999999'], linestyles='--')
    plt.clabel(contours, inline=True, fontsize=8, fmt='U=%.0f')

    # Optimal bundle(s)
    if isinstance(x_optimal, np.ndarray):
        plt.plot(x_optimal, y_optimal, 'ro', label='Optimal Bundles')
    else:
        plt.plot(x_optimal, y_optimal, 'ro', label='Optimal Bundle')

    # Labels and aesthetics
    plt.xlabel('Good X')
    plt.ylabel('Good Y')
    plt.title(f'Linear Utility: a={a:.1f}, b={b:.1f}, p_X={p_X:.1f}, p_Y={p_Y:.1f}')
    plt.xlim(0, 10)
    plt.ylim(0, 10)
    plt.legend()
    plt.grid(True)
    plt.show()

# Change values if needed
linear_utility_cplot(p_X=1.0, p_Y=2.0, a=1.0, b=1.0)
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
  modalTitle.textContent = `See and Edit Python Code: `;
  modalOutput.innerHTML = "";

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

plt.show = lambda *args, **kwargs: None

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

    if (!outputHTML) outputHTML = "Code ran, but returned no output.";
    modalOutput.innerHTML = outputHTML;
  } catch (err) {
    modalOutput.innerHTML = `<pre style="color:red;">⚠️ Error:\n${err}</pre>`;
  }
  
}
