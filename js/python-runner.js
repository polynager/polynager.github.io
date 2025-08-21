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
`, x:`import numpy as np
import matplotlib.pyplot as plt

# Fixed initial conditions
income_initial = 10
px_initial = 1
py_initial = 1
alpha_initial = 0.6

def cobb_douglas_income_effect(px=1.0, py=1.0, income=10.0, α=0.6):
    x_vals = np.linspace(0, 20, 200)

    # === Original optimal bundle and budget line ===
    x0 = (income_initial / px_initial) * α
    y0 = (income_initial / py_initial) * (1 - α)
    y_budget0 = (income_initial - px_initial * x_vals) / py_initial
    y_budget0[y_budget0 < 0] = np.nan

    # === New optimal bundle and budget line ===
    x1 = (income / px) * α
    y1 = (income / py) * (1 - α)
    y_budget1 = (income - px * x_vals) / py
    y_budget1[y_budget1 < 0] = np.nan

    # === Plotting ===
    plt.figure(figsize=(8, 6))

    # Shaded area under new budget line
    plt.fill_between(x_vals, 0, y_budget1, color='#e0f7fa', alpha=0.5, label='New Feasible Set')

    # Plot new and original budget lines
    plt.plot(x_vals, y_budget1, color='black', label='New Budget Line')
    plt.plot(x_vals, y_budget0, color='gray', linestyle='--', label='Original Budget Line')

    # Optimal bundles
    plt.plot(x0, y0, 'ro', label='Original Bundle')
    plt.plot(x1, y1, 'go', label='New Bundle')

    # Labels and limits
    plt.xlabel('Good X')
    plt.ylabel('Good Y')
    plt.title(f'Income Effect — α={α:.2f}, pₓ={px:.2f}, pᵧ={py:.2f}, I={income:.2f}')
    plt.xlim(0, 20)
    plt.ylim(0, 20)
    plt.legend()
    plt.grid(True)
    plt.show()

# Change values if needed
cobb_douglas_income_effect(px=1.0, py=1.0, income=10.0, α=0.6)
`, y: `import numpy as np
import matplotlib.pyplot as plt

def substitution_income_decomposition(px_new=2.0):
    # === PARAMETERS ===
    α = 0.6
    income = 50
    px_initial = 5
    py = 5

    # === ORIGINAL OPTIMAL BUNDLE ===
    x0 = (income / px_initial) * α
    y0 = (income / py) * (1 - α)

    # === ORIGINAL UTILITY LEVEL ===
    U = (x0**α) * (y0**(1 - α))

    # === COMPENSATED BUNDLE (substitution effect) ===
    def compensated_y(x):
        return U**(1 / (1 - α)) * x**(-α / (1 - α))

    x_sub = (α / (1 - α) * py / px_new) ** (1 - α) * (income / px_initial) * α
    y_sub = compensated_y(x_sub)

    # === NEW OPTIMAL BUNDLE ===
    x1 = (income / px_new) * α
    y1 = (income / py) * (1 - α)

    # === BUDGET LINES ===
    x_vals = np.linspace(0.1, 20, 400)
    y_budget_orig = (income - px_initial * x_vals) / py
    y_budget_new = (income - px_new * x_vals) / py
    income_compensated = px_new * x_sub + py * y_sub
    y_budget_comp = (income_compensated - px_new * x_vals) / py

    # === INDIFFERENCE CURVES ===
    def indiff_curve(U_level):
        return U_level**(1 / (1 - α)) * x_vals**(-α / (1 - α))
    
    y_indiff_orig = indiff_curve(U)
    U_new = (x1**α) * (y1**(1 - α))
    y_indiff_new = indiff_curve(U_new)

    # === PLOTTING ===
    plt.figure(figsize=(8, 6))
    plt.plot(x_vals, y_budget_orig, 'gray', linestyle='--', label='Original Budget Line')
    plt.plot(x_vals, y_budget_new, 'black', label='New Budget Line')
    plt.plot(x_vals, y_budget_comp, 'purple', linestyle=':', label='Compensated Budget Line')

    plt.plot(x_vals, y_indiff_orig, 'blue', linestyle='--', label='Original Indifference Curve')
    plt.plot(x_vals, y_indiff_new, 'green', linestyle='--', label='New Indifference Curve')

    # Bundles
    plt.plot(x0, y0, 'ro', label='Original Bundle')
    plt.plot(x_sub, y0, 'mo', label='Substitution Bundle (horizontal)')
    plt.plot(x1, y0, 'go', label='New Bundle (horizontal y=y₀)')

    # Horizontal Arrows
    plt.annotate('', xy=(x_sub, y0), xytext=(x0, y0),
                 arrowprops=dict(arrowstyle='->', color='purple', lw=2), annotation_clip=False)
    plt.text((x0 + x_sub)/2, y0 + 0.5, 'Substitution Effect', color='purple')

    plt.annotate('', xy=(x1, y0), xytext=(x_sub, y0),
                 arrowprops=dict(arrowstyle='->', color='orange', lw=2), annotation_clip=False)
    plt.text((x_sub + x1)/2, y0 + 0.5, 'Income Effect', color='orange')

    # Labels
    plt.xlabel("Good X")
    plt.ylabel("Good Y")
    plt.title(f"Substitution & Income Effects (pₓ changes from {px_initial} → {px_new})")
    plt.xlim(0, 20)
    plt.ylim(0, 20)
    plt.grid(True)
    plt.legend()
    plt.show()

# Change values if needed
substitution_income_decomposition(px_new=2.0)
`, z:`import numpy as np
import matplotlib.pyplot as plt

# Define demand functions for three individuals
def individual_demand_1(price):
    return max(10 - 2 * price, 0)  # Individual 1: high sensitivity to price

def individual_demand_2(price):
    return max(15 - 3 * price, 0)  # Individual 2: moderate sensitivity to price

def individual_demand_3(price):
    return max(8 - 1.5 * price, 0)  # Individual 3: low sensitivity to price

# Market demand is the sum of individual demands
def market_demand(price):
    return individual_demand_1(price) + individual_demand_2(price) + individual_demand_3(price)

# Price range
prices = np.linspace(0, 5, 100)

# Calculate quantities demanded by each individual and the market
quantities_1 = [individual_demand_1(p) for p in prices]
quantities_2 = [individual_demand_2(p) for p in prices]
quantities_3 = [individual_demand_3(p) for p in prices]
market_quantities = [market_demand(p) for p in prices]

# Plotting the demand curves
fig, ax = plt.subplots(figsize=(8, 6))

# Plot individual demand curves
ax.plot(prices, quantities_1, label="Individual 1", color='blue', linestyle='--')
ax.plot(prices, quantities_2, label="Individual 2", color='green', linestyle='--')
ax.plot(prices, quantities_3, label="Individual 3", color='purple', linestyle='--')

# Plot market demand curve
ax.plot(prices, market_quantities, label="Market Demand", color='red', linewidth=2)

# Labels and titles
ax.set_xlabel("Price")
ax.set_ylabel("Quantity Demanded")
ax.set_title("Individual Demand Curves and Market Demand Curve")

# Show legend
ax.legend()

# Display grid
ax.grid(True)

# Show plot
plt.tight_layout()
plt.show()`
, w: `import numpy as np
import matplotlib.pyplot as plt
import numpy as np

income = 3000
alpha = 0.3
px_initial = 1.80
py = 1.00
px_new = px_initial * 0.8

x0 = (income / px_initial) * alpha
y0 = (income / py) * (1 - alpha)
U = (x0**alpha) * (y0**(1 - alpha))

def compensated_y(x):
    return U**(1 / (1 - alpha)) * x**(-alpha / (1 - alpha))

x_sub = (alpha / (1 - alpha) * py / px_new) ** (1 - alpha) * (income / px_initial) * alpha
y_sub = y0

x1 = (income / px_new) * alpha
y1 = (income / py) * (1 - alpha)

x_vals = np.linspace(0.1, 2000, 500)
y_budget_initial = (income - px_initial * x_vals) / py
y_budget_new = (income - px_new * x_vals) / py
income_compensated = px_new * x_sub + py * y_sub
y_budget_comp = (income_compensated - px_new * x_vals) / py

def indiff(U_level):
    return U_level**(1 / (1 - alpha)) * x_vals**(-alpha / (1 - alpha))

U_new = (x1**alpha) * (y1**(1 - alpha))
y_indiff_orig = indiff(U)
y_indiff_new = indiff(U_new)

plt.figure(figsize=(10, 7))
plt.plot(x_vals, y_budget_initial, 'gray', linestyle='--', label='Original Budget')
plt.plot(x_vals, y_budget_new, 'black', label='New Budget (After Tax Cut)')
plt.plot(x_vals, y_budget_comp, 'purple', linestyle=':', label='Compensated Budget')

plt.plot(x_vals, y_indiff_orig, 'blue', linestyle='--', label='Original Indifference Curve')
plt.plot(x_vals, y_indiff_new, 'green', linestyle='--', label='New Indifference Curve')

plt.plot(x0, y0, 'ro', label='Original Bundle')
plt.plot(x_sub, y0, 'mo', label='Substitution Bundle')
plt.plot(x1, y0, 'go', label='New Bundle')

plt.annotate('', xy=(x_sub, y0), xytext=(x0, y0),
             arrowprops=dict(arrowstyle='->', color='purple', lw=2), annotation_clip=False)
plt.text((x0 + x_sub)/2, y0 + 50, 'Substitution Effect', color='purple')

plt.annotate('', xy=(x1, y0), xytext=(x_sub, y0),
             arrowprops=dict(arrowstyle='->', color='orange', lw=2), annotation_clip=False)
plt.text((x_sub + x1)/2, y0 + 50, 'Income Effect', color='orange')

plt.xlabel("Gasoline (litres)")
plt.ylabel("Groceries (units)")
plt.title("Impact of a 20% Carbon Tax Cut on Household Consumption")
plt.xlim(0, 2000)
plt.ylim(0, 3500)
plt.grid(True)
plt.legend()
plt.show() `,chapter2.1:`import numpy as np
import matplotlib.pyplot as plt

# Updated demand curve function to fit the new conditions
def basic_demand_curve(p, a=100, b=10):
    return a - b * p

# Generate a range of prices
prices = np.linspace(0, 15, 100)
quantities = basic_demand_curve(prices)

# Create the plot
plt.plot(quantities, prices, label="Demand Curve")
plt.xlabel("Quantity")
plt.ylabel("Price")
plt.title("Basic Demand Curve")
plt.xlim(0, 150)  # Set the quantity range from 0 to 150
plt.ylim(0, 15)   # Set the price range from 0 to 15
plt.grid(True)
plt.legend()
plt.show()`, chapter2.2:`import ipywidgets as widgets
from ipywidgets import interact
import numpy as np
import matplotlib.pyplot as plt

# Updated demand curve function
def basic_demand_curve(p, a=100, b=10):
    return a - b * p

# Generate price range
prices = np.linspace(0, 15, 100)

# Shift function for the demand curve
def demand_shift(change_in_preference=False, price_of_substitute=False):
    shift = 0
    explanation = "No change in demand."

    # Adjust shift based on selected factors
    if change_in_preference:
        shift += 30  # Scaled to match the new intercept of 100
        explanation = (
            "Consumer preference for the good has increased. This means that consumers are willing to pay "
            "higher prices at every quantity level, reflecting an increase in demand. The maximum price consumers "
            "are willing to pay for the first unit has risen, causing the entire demand curve to shift to the right."
        )

    if price_of_substitute:
        shift += -20  # Scaled to match the new intercept of 100
        explanation = (
            "The price of a substitute good has decreased. As consumers find the substitute cheaper, they are less "
            "willing to purchase the original good at the same price. As a result, demand for the original good falls, "
            "leading to a leftward shift in the demand curve. Consumers now require a lower price to buy the same quantities."
        )

    # Original and shifted demand curves
    original_quantities = basic_demand_curve(prices)
    shifted_quantities = basic_demand_curve(prices, a=100 + shift)

    # Plot the curves
    plt.figure(figsize=(8, 6))
    plt.plot(original_quantities, prices, label="Original Demand")
    plt.plot(shifted_quantities, prices, label="Shifted Demand", linestyle='--')
    plt.xlabel("Quantity")
    plt.ylabel("Price")
    plt.title("Impact of Demand Shifts")
    plt.xlim(0, 150)  # Adjust x-axis range for quantity
    plt.ylim(0, 15)   # Adjust y-axis range for price
    plt.grid(True)
    plt.legend()
    plt.show()
`, chapter2.3:`import numpy as np
import matplotlib.pyplot as plt

# Define the supply curve function
def basic_supply_curve(p, c=10, d=0):
    """Basic supply curve with a slope that fits the new price and quantity ranges."""
    return c * p - d  # c is the slope, d is the intercept

# Define price range from 0 to 15 (as per the demand curve space)
prices = np.linspace(0, 15, 100)
quantities_supplied = basic_supply_curve(prices, c=10, d=0)

# Filter to show only the positive quantities (i.e., quantities >= 0 and prices >= 0)
positive_quantities = quantities_supplied[quantities_supplied >= 0]
positive_prices = prices[:len(positive_quantities)]

# Plot the supply curve
plt.figure(figsize=(8, 6))
plt.plot(positive_quantities, positive_prices, label="Supply Curve")
plt.xlim(0, 150)  # Adjust quantity limit to match the demand function
plt.ylim(0, 15)   # Adjust price limit to match the demand function
plt.xlabel("Quantity")
plt.ylabel("Price")
plt.title("Basic Supply Curve")

# Show grid and legend
plt.grid(True)
plt.legend()
plt.show()
`, chapter2.4:`import numpy as np
import matplotlib.pyplot as plt
import ipywidgets as widgets

# Define the basic supply curve function
def basic_supply_curve(p, c=10, d=0):
    """Supply curve function with slope and intercept."""
    return c * p - d

# Shift function for the supply curve
def supply_shift(change_in_technology=False, production_costs=False):
    shift = 0
    explanation = "No change in supply."

    # Adjust shift based on selected factors
    if change_in_technology:
        shift -= 30  # Scaled shift for improved technology
        explanation = (
            "Supply increased due to better technology. New technologies allow firms to produce goods more efficiently, "
            "lowering production costs and enabling them to supply more at every price level. This shifts the supply curve to the right."
        )

    if production_costs:
        shift -= 20  # Scaled shift for lower production costs
        explanation = (
            "Supply increased due to lower production costs. A decrease in the cost of inputs such as labor or raw materials allows firms "
            "to produce more at the same price level. As a result, firms can offer higher quantities at any given price, shifting the supply curve to the right."
        )

    # Define price range from 0 to 15 (as per the supply curve space)
    prices = np.linspace(0, 15, 100)
    
    # Original and shifted supply curves
    original_supply = basic_supply_curve(prices)
    shifted_supply = basic_supply_curve(prices, d=0 + shift)  # Adjust intercept based on shift

    # Filter to show only positive quantities (i.e., quantities >= 0 and prices >= 0)
    positive_original_supply = original_supply[original_supply >= 0]
    positive_prices_original = prices[:len(positive_original_supply)]
    
    positive_shifted_supply = shifted_supply[shifted_supply >= 0]
    positive_prices_shifted = prices[:len(positive_shifted_supply)]

    # Plot the curves
    plt.figure(figsize=(8, 6))
    plt.plot(positive_original_supply, positive_prices_original, label="Original Supply")
    plt.plot(positive_shifted_supply, positive_prices_shifted, label="Shifted Supply", linestyle='--')
    plt.xlim(0, 150)  # Adjust quantity range to match the demand function
    plt.ylim(0, 15)   # Adjust price range to match the demand function
    plt.xlabel("Quantity")
    plt.ylabel("Price")
    plt.title("Impact of Supply Shifts")
    plt.grid(True)
    plt.legend()
    plt.show()
`, chapter2.5:`import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import fsolve
from ipywidgets import interact, FloatSlider, Checkbox

# Define the demand and supply functions with shifts
def demand_curve(p, slope_d=10, shift_d=0):
    """Demand curve with shift."""
    return 100 - slope_d * p + shift_d  # Adjusted for larger price and quantity ranges

def supply_curve(p, slope_s=10, shift_s=0):
    """Supply curve with shift."""
    return slope_s * p - 50 + shift_s  # Adjusted for larger price and quantity ranges

# Function to solve for equilibrium
def equilibrium_system(p, slope_d, slope_s, shift_d, shift_s):
    return demand_curve(p, slope_d, shift_d) - supply_curve(p, slope_s, shift_s)

# Function to dynamically explain why equilibrium changes
def equilibrium_explanation(change_in_preferences, consumer_preference_shift, change_in_production_costs, production_cost_shift):
    explanation = "The equilibrium point has changed due to the following reasons:\n"
    
    if change_in_preferences and consumer_preference_shift != 0:
        if consumer_preference_shift > 0:
            explanation += f"- The demand curve shifted **upward** by {consumer_preference_shift}, reflecting an increase in consumer preferences, which increased the quantity demanded at each price level.\n"
        else:
            explanation += f"- The demand curve shifted **downward** by {abs(consumer_preference_shift)}, reflecting a decrease in consumer preferences, which decreased the quantity demanded at each price level.\n"
    
    if change_in_production_costs and production_cost_shift != 0:
        if production_cost_shift > 0:
            explanation += f"- The supply curve shifted **downward** by {production_cost_shift}, reflecting a decrease in production costs, which increased the quantity supplied at each price level.\n"
        else:
            explanation += f"- The supply curve shifted **upward**, reflecting an increase in production costs, which decreased the quantity supplied at each price level.\n"
    
    if explanation == "The equilibrium point has changed due to the following reasons:\n":
        explanation += "- No changes were made to demand or supply curves."
    
    return explanation

# Function to plot supply, demand, and equilibrium with interactive shifts and explanation
def plot_supply_demand_equilibrium(change_in_preferences=False, consumer_preference_shift=0,
                                   change_in_production_costs=False, production_cost_shift=0,
                                   slope_d=10, slope_s=10):
    prices = np.linspace(0, 15, 100)  # Adjusted price range
    
    # Apply shifts only if the checkboxes are checked
    demand_shift_value = consumer_preference_shift if change_in_preferences else 0
    supply_shift_value = -production_cost_shift if change_in_production_costs else 0
    
    # Original curves (no shifts)
    original_demand = demand_curve(prices, slope_d, 0)
    original_supply = supply_curve(prices, slope_s, 0)
    
    # Shifted curves
    shifted_demand = demand_curve(prices, slope_d, demand_shift_value)
    shifted_supply = supply_curve(prices, slope_s, supply_shift_value)
    
    # Solve for original equilibrium price and quantity
    original_eq_price = fsolve(equilibrium_system, 1, args=(slope_d, slope_s, 0, 0))[0]
    original_eq_quantity = demand_curve(original_eq_price, slope_d, 0)
    
    # Solve for new equilibrium price and quantity
    shifted_eq_price = fsolve(equilibrium_system, 1, args=(slope_d, slope_s, demand_shift_value, supply_shift_value))[0]
    shifted_eq_quantity = demand_curve(shifted_eq_price, slope_d, demand_shift_value)

    # Plot original and shifted demand and supply curves
    plt.figure(figsize=(8, 6))
    
    # Plot original demand and supply curves
    plt.plot(original_demand, prices, label="Original Demand", linestyle='--')
    plt.plot(original_supply, prices, label="Original Supply", linestyle='--')
    
    # Plot shifted demand and supply curves
    plt.plot(shifted_demand, prices, label="Shifted Demand")
    plt.plot(shifted_supply, prices, label="Shifted Supply")
    
    # Plot original and new equilibrium points
    plt.scatter(original_eq_quantity, original_eq_price, color='blue', zorder=5, label="Original Equilibrium")
    plt.text(original_eq_quantity, original_eq_price, f"P={original_eq_price:.2f}, Q={original_eq_quantity:.2f}", color="blue")
    
    plt.scatter(shifted_eq_quantity, shifted_eq_price, color='red', zorder=5, label="Shifted Equilibrium")
    plt.text(shifted_eq_quantity, shifted_eq_price, f"P={shifted_eq_price:.2f}, Q={shifted_eq_quantity:.2f}", color="red")
    
    # Labels and plot settings
    plt.xlabel("Quantity")
    plt.ylabel("Price")
    plt.title(f"Market Equilibrium: Original vs. Shifted")
    plt.xlim(0, 150)  # Adjusted for quantity range
    plt.ylim(0, 15)   # Adjusted for price range
    plt.legend()
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
