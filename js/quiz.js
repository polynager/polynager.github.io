const questions = [
  {
    text: "Question 1: In the Cobb-Douglas utility function, if the prices of Good X and Good Y are equal, how does the parameter \\( \\alpha \\) influence the consumption of each good?",
    options: [
      "The consumer will always consume equal quantities of X and Y, regardless of \\( \\alpha \\).",
      "The consumer will spend a fraction \\( \\alpha \\) of their income on Good X and \\( 1 - \\alpha \\) on Good Y.",
      "If \\( \\alpha > 0.5 \\), the consumer will only consume Good X; if \\( \\alpha < 0.5 \\), only Good Y."
    ],
    correct: 1,
    explanation: {
      correct: "✅ Correct! Cobb-Douglas utility implies fixed **expenditure shares**: \\( \\alpha \\) for X and \\( 1 - \\alpha \\) for Y.",
      incorrect: "❌ Not quite. The parameter \\( \\alpha \\) determines how much income is **spent** on each good, not how many units are consumed."
    }
  },
  {
    text: "Question 2: For a Leontief utility function of the form \\( U(X, Y) = \\min(X, Y) \\), what is the increase in utility if the consumer receives 10 extra units of Good Y (with X held constant)?",
    options: ["10 units", "1 unit", "0 units"],
    correct: 2,
    explanation: {
      correct: "✅ Correct! Additional Y doesn’t increase utility unless X also increases. Leontief utility depends on the **minimum**.",
      incorrect: "❌ Not quite. Leontief preferences require a **balance** — extra Y alone doesn’t help if X stays the same."
    }
  },
  {
    text: "Question 3: In the linear utility function \\( U(X, Y) = aX + bY \\), what does the ratio \\( \\frac{a}{p_X} \\) and \\( \\frac{b}{p_Y} \\) represent?",
    options: ["The price per unit of goods.", "The marginal utility per dollar.", "The slope of the budget line."],
    correct: 1,
    explanation: {
      correct: "✅ Correct! These ratios represent the **marginal utility per dollar** spent on each good.",
      incorrect: "❌ Not quite. \\( \\frac{a}{p_X} \\) shows how much utility you get per dollar spent on Good X."
    }
  },
  {
    text: "Question 4: Given a linear utility function \\( U(X, Y) = aX + bY \\), if \\( \\frac{a}{p_X} > \\frac{b}{p_Y} \\), where will the consumer choose to consume?",
    options: [
      "At the corner of the budget line on the X-axis.",
      "At the corner of the budget line on the Y-axis.",
      "Anywhere along the budget line — infinitely many choices."
    ],
    correct: 0,
    explanation: {
      correct: "✅ Correct! The consumer will spend all income on the good with **higher marginal utility per dollar** — Good X.",
      incorrect: "❌ Not quite. If \\( \\frac{a}{p_X} > \\frac{b}{p_Y} \\), the consumer should purchase only Good X."
    }
  }
];


function renderQuiz() {
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = "";

  questions.forEach((q, index) => {
    const qDiv = document.createElement("div");
    qDiv.className = "question";
    const qTitle = document.createElement("p");
    qTitle.innerHTML = `<strong>${q.text}</strong>`;
    qDiv.appendChild(qTitle);

    q.options.forEach((opt, i) => {
      const label = document.createElement("label");
      label.className = "option-label";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${index}`;
      input.value = i;
      label.appendChild(input);
      label.appendChild(document.createTextNode(opt));
      qDiv.appendChild(label);
    });

    const explanationDiv = document.createElement("div");
    explanationDiv.id = `explanation-${index}`;
    qDiv.appendChild(explanationDiv);

    quizContainer.appendChild(qDiv);
  });

  // Trigger MathJax to render math in newly inserted content
  MathJax.typesetPromise();
}

function submitQuiz() {
  questions.forEach((q, index) => {
    const radios = document.getElementsByName(`q${index}`);
    let selected = -1;
    radios.forEach((r) => {
      if (r.checked) selected = parseInt(r.value);
    });
    const explanation = document.getElementById(`explanation-${index}`);
    if (selected === q.correct) {
      explanation.innerHTML = `<p class='correct'>${q.explanation.correct}</p>`;
    } else {
      explanation.innerHTML = `<p class='incorrect'>${q.explanation.incorrect}</p>`;
    }
  });

  // Re-render MathJax for explanations
  MathJax.typesetPromise();
}


document.addEventListener("DOMContentLoaded", renderQuiz);
