document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
            {
    
            question: "What does HTML stand for?",
            answer: "Hyper Text Markup Language",
            options: ["Hyper Text Preprocessor",
              "Hyper Text Markup Language",
              "Hyper Text Multiple Language",
              "Hyper Tool Multi Language"],
            
          },
            {
           
            question: "What does CSS stand for?",
            answer: "Cascading Style Sheet",
            options: ["Common Style Sheet",
              "Colorful Style Sheet",
              "Computer Style Sheet",
              "Cascading Style Sheet"]
            
          },

            {
            
            question: "Which of the following is not a programming language?",
            answer: "CSS",
            options: ["Python",
              "CSS",
              "Java",
              "Ruby"]
            
          },
            {
            
            question: "In Python, what is used to inticate a block of code following a conditional statement or loop",
            answer: "Indentation",
            options: ["Parenthesis",
              "Curly Brackets",
              "Indentation",
              "Quotation marks"]
            
          },
            {
            
            question: "What does XML stand for?",
            answer: "eXtensible Markup Language",
            options: ["eXtensible Markup Language",
              "eXecutable Multiple Language",
              "eXTra Multi-Program Language",
              "eXamine Multiple Language"]
            
          },
        
          {
            
            question: "Which symbol is used for a single-line comment in most programming language?",
            answer: "//",
            options: ["//",
              "#",
              "--",
              "/**/"]
            
          },
        
          {
            
            question: 'What is the purpose of the "git" version control system?',
            answer: "To manage and track changes in files",
            options: ["To write and execute code",
              "To manage and track changes in files",
              "To design user interface",
              "To optimize website loading speed"]
            
          },
        
          {
           
            question: "What does the acronym API stand for in programming?",
            answer: "Application Programming Interface",
            options: ["Application Programming Interface",
              "Advanced Programming Interface",
              "Automated Program Integration",
              "All Purpose Interface"]
            
          },
      
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