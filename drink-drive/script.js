const quizData = [
  {
    question: "음주운전은 자전거와 전동킥보드도 해당될 수 있다.",
    options: ["맞다", "아니다"],
    answer: 0
  },
  {
    question: "음주운전은 보험료 할증에도 영향을 줄 수 있다.",
    options: ["맞다", "아니다"],
    answer: 0
  },
  {
    question: "음주 상태에서 지하주차장에서 운전하는 것도 음주운전이다.",
    options: ["맞다", "아니다"],
    answer: 0
  }
];

let currentQuestion = 0;
let selectedAnswer = null;
let score = 0;

function showScreen(id) {
  ["startScreen", "quizScreen", "resultScreen", "pledgeScreen", "completeScreen"].forEach(screen => {
    document.getElementById(screen).classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
}

function startQuiz() {
  currentQuestion = 0;
  selectedAnswer = null;
  score = 0;
  showScreen("quizScreen");
  showQuestion();
}

function showQuestion() {
  const quiz = quizData[currentQuestion];

  document.getElementById("stepText").textContent = `Q${currentQuestion + 1} / ${quizData.length}`;
  document.getElementById("questionText").textContent = quiz.question;

  const optionsBox = document.getElementById("options");
  optionsBox.innerHTML = "";

  quiz.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => {
      selectedAnswer = index;
document.querySelectorAll(".options button").forEach(btn => {
  btn.classList.remove("selected");
});
button.classList.add("selected");
    };
    optionsBox.appendChild(button);
  });
}

function nextQuestion() {
  if (selectedAnswer === null) {
    alert("답을 선택해 주세요.");
    return;
  }

  if (selectedAnswer === quizData[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;
  selectedAnswer = null;

  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("scoreText").textContent = `${score} / ${quizData.length}`;
  document.getElementById("resultMessage").textContent =
    score === quizData.length
      ? "훌륭합니다! 음주운전에 대한 올바른 인식을 갖고 계시네요."
      : "참여해 주셔서 감사합니다. 오늘 배운 내용을 꼭 기억해 주세요.";

  showScreen("resultScreen");
}

function showPledge() {
  showScreen("pledgeScreen");
}

function submitPledge() {
  const checked = document.getElementById("pledgeCheck").checked;

  if (!checked) {
    alert("서약 동의에 체크해 주세요.");
    return;
  }

  showScreen("completeScreen");
}
