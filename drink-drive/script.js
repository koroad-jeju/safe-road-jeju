const quizData = [
  {
    question: "음주운전은 자동차뿐만 아니라 자전거와 전동킥보드도 해당될 수 있다.",
    options: ["맞다", "아니다"],
    answer: 0,
    explanation: "맞습니다. 자전거와 전동킥보드 같은 개인형 이동장치도 음주 상태로 운전하면 단속 또는 처벌 대상이 될 수 있습니다."
  },
  {
    question: "음주운전 사고를 냈더라도 보험처리를 하지 않으면 보험료는 할증되지 않는다.",
    options: ["맞다", "아니다"],
    answer: 1,
    explanation: "아닙니다. 음주운전 사고는 보험처리 여부와 관계없이 법적 책임과 행정처분이 따를 수 있으며, 보험료 할증이 이뤄집니다."
  },
  {
    question: "아파트 주차장에서 차량을 운전하는 것도 음주운전에 해당될 수 있다.",
    options: ["맞다", "아니다"],
    answer: 0,
    explanation: "맞습니다. 아파트 주차장처럼 도로 외 장소라도 실제로 차량을 운전했다면 음주운전 형사처벌 대상이 됩니다."
  }
];

let currentQuestion = 0;
let selectedAnswer = null;
let userAnswers = [];
let score = 0;
let answered = false;

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
const nextBtn = document.getElementById("nextBtn");

const explainBox = document.getElementById("explainBox");
const explainResult = document.getElementById("explainResult");
const explainText = document.getElementById("explainText");

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
  answered = false;

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
  answered = false;

  explainBox.classList.add("hidden");
  explainResult.textContent = "";
  explainText.textContent = "";

  nextBtn.disabled = true;

  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.textContent = option;

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    optionsBox.appendChild(button);
  });
}

function selectAnswer(index) {
  if (answered) return;

  const item = quizData[currentQuestion];
  const buttons = document.querySelectorAll(".option-btn");
  const isCorrect = index === item.answer;

  selectedAnswer = index;
  answered = true;

  buttons.forEach((btn, btnIndex) => {
    btn.disabled = true;

    if (btnIndex === item.answer) {
      btn.classList.add("correct");
    }

    if (btnIndex === index && !isCorrect) {
      btn.classList.add("wrong");
    }
  });

  explainBox.classList.remove("hidden");
  explainResult.textContent = isCorrect ? "정답입니다!" : "아쉽지만 오답입니다.";
  explainResult.className = "explain-result " + (isCorrect ? "correct-text" : "wrong-text");
  explainText.textContent = item.explanation;

  nextBtn.disabled = false;
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
  const pledgeName = document.getElementById("pledgeName");
  const pledgeDate = document.getElementById("pledgeDate");

  pledgeCheck.checked = false;
  pledgeName.value = "";
  pledgeDate.value = "";

  showScreen(pledgeScreen);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function submitPledge() {
  const pledgeCheck = document.getElementById("pledgeCheck");
  const pledgeName = document.getElementById("pledgeName");
  const pledgeDate = document.getElementById("pledgeDate");

  const completeName = document.getElementById("completeName");
  const completeDate = document.getElementById("completeDate");

  const name = pledgeName.value.trim();
  const date = pledgeDate.value;

  if (!date) {
    alert("작성일을 선택해 주세요.");
    pledgeDate.focus();
    return;
  }

  if (!name) {
    alert("서약인 이름을 입력해 주세요.");
    pledgeName.focus();
    return;
  }

  if (!pledgeCheck.checked) {
    alert("서약 내용에 동의해 주세요.");
    return;
  }

  completeName.textContent = name;
  completeDate.textContent = formatKoreanDate(date);

  showScreen(completeScreen);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function formatKoreanDate(dateValue) {
  const [year, month, day] = dateValue.split("-");

  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}

document.getElementById("pledgeName").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    const pledgeCheck = document.getElementById("pledgeCheck");

    if (!pledgeCheck.checked) {
      pledgeCheck.focus();
      return;
    }

    submitPledge();
  }
});
