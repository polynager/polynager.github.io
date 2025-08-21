const questions = [
      {
        text: "Question 1: What happens to the demand curve when demand is perfectly inelastic (E = 0)?",
        options: [
          "The demand curve becomes horizontal.",
          "The demand curve becomes vertical.",
          "The demand curve flattens.",
          "The demand curve steepens."
        ],
        correct: 1,
        explanation: {
          correct: "✅ Correct! When demand is perfectly inelastic, the quantity demanded does not change regardless of price, making the demand curve vertical.",
          incorrect: "❌ Not quite. A perfectly inelastic demand curve is vertical."
        }
      },
      {
        text: "Question 2: What does a perfectly elastic demand curve (E = ∞) imply about consumer behavior?",
        options: [
          "Consumers will only buy at a specific price.",
          "Consumers will buy regardless of price changes.",
          "A small price increase leads to only a slight decrease in quantity demanded.",
          "Quantity demanded is fixed at all price levels."
        ],
        correct: 0,
        explanation: {
          correct: "✅ Correct! In a perfectly elastic demand curve, consumers are extremely price-sensitive and will only buy at one price; any increase in price will drop the quantity demanded to zero.",
          incorrect: "❌ Not quite. Perfectly elastic demand means consumers will only purchase at a very specific price; any deviation leads to zero demand."
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

      if (window.MathJax) MathJax.typesetPromise();
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

      if (window.MathJax) MathJax.typesetPromise();
    }

    document.addEventListener("DOMContentLoaded", renderQuiz);
