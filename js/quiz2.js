const questions = [
    {
      text: "Question 1: For the Cobb-Douglas utility form, if the prices of Good X and Good Y are equal, how does the parameter \\( \\alpha \\) determine the share of Good X and Good Y consumed?",
      options: [
        "The consumer will always consume equal amounts of Good X and Good Y, regardless of \\( \\alpha \\), because prices are equal.",
        "The consumer will spend a fraction \\( \\alpha \\) of their income on Good X and a fraction \\( 1 - \\alpha \\) on Good Y.",
        "The consumer will only consume Good X if \\( \\alpha > 0.5 \\) and only Good Y if \\( \\alpha < 0.5 \\)."
      ],
      correct: 1,
      explanation: {
        correct: "✅ Correct! Cobb-Douglas utility leads to fixed expenditure shares: \\( \\alpha \\) on Good X and \\( 1 - \\alpha \\) on Good Y.",
        incorrect: "❌ Not quite. Cobb-Douglas utility determines spending shares, not quantities or exclusive consumption."
      }
    },
    {
      text: "Question 2: Consider the Leontief utility of the form \\( \\min(X, Y) \\). If the consumer receives an additional 10 units of Good Y, how much extra utility do they gain?",
      options: [
        "10 units",
        "1 unit",
        "0 units"
      ],
      correct: 2,
      explanation: {
        correct: "✅ Correct! Extra Y does nothing unless X also increases—Leontief utility requires balance.",
        incorrect: "❌ Not quite. With Leontief utility, utility depends on the *minimum*—extra Y alone doesn’t help."
      }
    },
    {
      text: "Question 3: In the linear utility form \\( U(X, Y) = aX + bY \\), what does the ratio \\( \\frac{a}{p_X} \\) and \\( \\frac{b}{p_Y} \\) represent?",
      options: [
        "The price per unit of goods.",
        "The marginal utility per dollar.",
        "The slope of the budget line."
      ],
      correct: 1,
      explanation: {
        correct: "✅ Correct! These ratios represent the marginal utility per dollar spent on each good.",
        incorrect: "❌ Not quite. \\( \\frac{a}{p_X} \\) shows how much utility you get per dollar spent on Good X."
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
        label.appendChild(document.createTextNode(" " + opt));
        qDiv.appendChild(label);
      });

      const explanationDiv = document.createElement("div");
      explanationDiv.id = `explanation-${index}`;
      qDiv.appendChild(explanationDiv);

      quizContainer.appendChild(qDiv);
    });

    MathJax.typesetPromise(); // Render Math
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

    MathJax.typesetPromise(); // Re-render Math after updating explanations
  }

  document.addEventListener("DOMContentLoaded", renderQuiz);
