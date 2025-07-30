const questions = [
  {
    text: "Question 1\nFor the Cobb-Douglas utility form, if the prices of Good X and Good Y are equal, how does the parameter \u03b1 determine the share of Good X and Good Y consumed?",
    options: [
      "The consumer will always consume equal amounts of Good X and Good Y, regardless of \u03b1, because prices are equal.",
      "The consumer will spend a fraction \u03b1 of their income on Good X and a fraction 1 – \u03b1 on Good Y.",
      "The consumer will only consume Good X if \u03b1 > 0.5 and only Good Y if \u03b1 < 0.5."
    ],
    correct: 1,
    explanation: {
      correct: "✅ Correct! Cobb-Douglas utility leads to fixed expenditure shares: \u03b1 on Good X and 1–\u03b1 on Good Y.",
      incorrect: "❌ Not quite. Cobb-Douglas utility determines spending shares, not quantities or exclusive consumption."
    }
  },
  {
    text: "Question 2\nConsider the Leontief utility of the form min(X, Y). If the consumer receives an additional 10 units of Good Y, how much extra utility do they gain?",
    options: ["10 units", "1 unit", "0 units."],
    correct: 2,
    explanation: {
      correct: "✅ Correct! Extra Y does nothing unless X also increases—Leontief utility requires balance.",
      incorrect: "❌ Not quite. With Leontief utility, utility depends on the *minimum*—extra Y alone doesn’t help."
    }
  },
  {
    text: "Question 3\nIn the linear utility form, aX + bY, what does the ratio a/p_X and b/p_Y represent?",
    options: ["The price per unit of goods.", "The marginal utility per dollar.", "The budget line."],
    correct: 1,
    explanation: {
      correct: "✅ Correct! These ratios give the marginal utility per dollar for each good.",
      incorrect: "❌ Not quite. The ratio a/p_X tells us the marginal utility you get per dollar spent on Good X."
    }
  },
  {
    text: "Question 4\nIn the linear utility form, aX + bY, suppose the ratio a/p_X is greater than the ratio b/p_Y. Where does the optimal bundle lie?",
    options: [
      "At the corner of the budget line, intersecting the x-axis.",
      "At the corner of the budget line, intersecting the y-axis.",
      "Infinitely many bundles along the budget line."
    ],
    correct: 0,
    explanation: {
      correct: "✅ Correct! The consumer will spend all income on the good with higher marginal utility per dollar—Good X.",
      incorrect: "❌ Not quite. When a/p_X > b/p_Y, all spending goes to X for maximum utility."
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
}

document.addEventListener("DOMContentLoaded", renderQuiz);
