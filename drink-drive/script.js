const quizData = [
  {
    question: "음주운전은 자동차뿐만 아니라 자전거와 전동킥보드도 해당될 수 있다.",
    options: ["맞다", "아니다"],
    answer: 0
  },
  {
    question: "음주운전 사고를 냈더라도 보험처리를 하지 않으면 보험료는 할증되지 않는다.",
    options: ["맞다", "아니다"],
    answer: 1
  },
  {
    question: "아파트 주차장에서 차량을 운전하는 것도 음주운전에 해당될 수 있다.",
    options: ["맞다", "아니다"],
    answer: 0
  }
];

let currentQuestion = 0;
let selectedAnswer = null;
let userAnswers = [];
let score = 0;

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const pledgeScreen = document.getElementById("pledgeScreen");
const completeScreen = document.getElementById("completeScreen");

const stepText = document.getElementById("stepText");
const progressBar = document.getElementById("progressBar");
const questionText = document.getElementById("questionText");
const optionsBox = document.getElementById("options");
const scoreText = document.getElementById("scoreText");
const resultMessage = document.getElementById("resultMessage");

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen, pledgeScreen, completeScreen].forEach((item) => {
    item.classList.add("hidden");
  });

  screen.classList.remove("hidden");
}

function startQuiz() {
  currentQuestion = 0;
  selectedAnswer = null;
  userAnswers = [];
  score = 0;

  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  const item = quizData[currentQuestion];

  stepText.textContent = `Q${currentQuestion + 1} / ${quizData.length}`;
  questionText.textContent = item.question;

  const percent = ((currentQuestion + 1) / quizData.length) * 100;
  progressBar.style.width = `${percent}%`;

  optionsBox.innerHTML = "";
  selectedAnswer = null;

  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.textContent = option;

    button.addEventListener("click", () => {
      selectedAnswer = index;

      document.querySelectorAll(".option-btn").forEach((btn) => {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");
    });

    optionsBox.appendChild(button);
  });
}

function nextQuestion() {
  if (selectedAnswer === null) {
    alert("답변을 선택해 주세요.");
    return;
  }

  userAnswers.push(selectedAnswer);

  if (selectedAnswer === quizData[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  scoreText.textContent = `${score} / ${quizData.length}`;

  if (score === quizData.length) {
    resultMessage.innerHTML =
      "훌륭합니다!<br>음주운전에 대한 올바른 인식을 갖고 계시네요.";
  } else if (score === 2) {
    resultMessage.innerHTML =
      "좋아요!<br>오늘 알게 된 내용을 꼭 기억해 주세요.";
  } else {
    resultMessage.innerHTML =
      "참여해 주셔서 감사합니다.<br>음주운전은 단 한 번도 안 됩니다.";
  }

  showScreen(resultScreen);
}

function showPledge() {
  const pledgeCheck = document.getElementById("pledgeCheck");
  pledgeCheck.checked = false;

  showScreen(pledgeScreen);
}

function submitPledge() {
  const pledgeCheck = document.getElementById("pledgeCheck");

  if (!pledgeCheck.checked) {
    alert("서약 동의에 체크해 주세요.");
    return;
  }

  showScreen(completeScreen);
}
