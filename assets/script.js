document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
      {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Madrid", "Rome"],
        answer: "Paris"
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Jupiter", "Mars", "Venus", "Mercury"],
        answer: "Mars"
      },
      // Add more quiz data as needed...
    ];
  
    const startBtn = document.getElementById('startBtn');
    const quizElement = document.getElementById('quiz');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const gameOverElement = document.getElementById('gameOver');
    const saveBtn = document.getElementById('saveBtn');
    const initialsInput = document.getElementById('initials');
    const finalScoreElement = document.getElementById('finalScore');
  
    let currentQuestion = 0;
    let score = 0;
    let countdownValue = 60; // Set your countdown value here
    let countdownTimer;
  
    function startQuiz() {
      startBtn.style.display = 'none';
      quizElement.style.display = 'block';
      displayQuestion();
      startTimer();
    }
  
    function displayQuestion() {
      const currentQuizData = quizData[currentQuestion];
      questionElement.textContent = currentQuizData.question;
      optionsElement.innerHTML = '';
      currentQuizData.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(button);
      });
    }
  
    function checkAnswer(answer) {
      const currentQuizData = quizData[currentQuestion];
      if (answer === currentQuizData.answer) {
        score++;
      } else {
        countdownValue -= 10; // Subtract time if the answer is incorrect
      }
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    }
  
    function startTimer() {
      countdownTimer = setInterval(updateTimer, 1000);
    }
  
    function updateTimer() {
      countdownValue--;
      if (countdownValue <= 0 || currentQuestion >= quizData.length) {
        clearInterval(countdownTimer);
        endQuiz();
      }
    }
  
    function endQuiz() {
      quizElement.style.display = 'none';
      gameOverElement.style.display = 'block';
      finalScoreElement.textContent = score;
    }
  
    saveBtn.addEventListener('click', () => {
      const initials = initialsInput.value.trim();
      if (initials !== '') {
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        scores.push({ initials, score });
        localStorage.setItem('scores', JSON.stringify(scores));
        alert('Score saved!');
      } else {
        alert('Please enter your initials.');
      }
    });
  
    startBtn.addEventListener('click', startQuiz);
  });