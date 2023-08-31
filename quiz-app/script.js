const questions = [
    {
        question: "Which of these is not strictly a programming language?",
        answers: [
            {text: "C++", correct: false},
            {text: "Java", correct: false},
            {text: "HTML", correct: true},
            {text: "JavaScript", correct: false}
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            {text: "Computer Style Sheets", correct: false},
            {text: "Cascading Style Sheets", correct: true},
            {text: "Creative Style System", correct: false},
            {text: "Colorful Style Sheets", correct: false}
        ]
    },
    {
        question: "Which programming language is known as the 'mother of all languages'?",
        answers: [
            {text: "Python", correct: false},
            {text: "C", correct: true},
            {text: "Java", correct: false},
            {text: "Ruby", correct: false}
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            {text: "Hyperlink and Text Markup Language", correct: false},
            {text: "Hyper Text Makeup Language", correct: false},
            {text: "Hyper Text Markup Language", correct: true},
            {text: "High Tech Modern Language", correct: false}
        ]
    },
    {
        question: "What is the process of finding errors and bugs in software?",
        answers: [
            {text: "Debugging", correct: true},
            {text: "Compiling", correct: false},
            {text: "Testing", correct: false},
            {text: "Optimization", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");

let currQuestionIndex = 0
let score = 0

function startQuiz(){
    questionElement.classList.add("hide");
    answerButtons.classList.add("hide");
    resetState();
    startButton.classList.remove("hide");
    startButton.addEventListener("click", startBtn);
}   

function startBtn() {
    startButton.classList.add("hide");
    prepQuestions();
}

function prepQuestions() {
    currQuestionIndex = 0;
    score = 0;
    questionElement.classList.remove("hide");
    answerButtons.classList.remove("hide");
    nextButton.classList.remove("hide");
    showQuestion();
}
function showQuestion(){
  resetState()
  let currQuestion = questions[currQuestionIndex]
  let questionNo = currQuestionIndex + 1
  questionElement.innerHTML = questionNo + ". " + currQuestion.question

  currQuestion.answers.forEach(answer => {
    const button = document.createElement("button")
    button.innerHTML = answer.text
    button.classList.add("btn")
    answerButtons.appendChild(button)
	if(answer.correct){
		button.dataset.correct = answer.correct
	}
	button.addEventListener("click", selectAnswer)
  })
}

function resetState(){
    nextButton.innerHTML = "Next";
	nextButton.style.display = "none";
	while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function selectAnswer(e){
	const selectedButton = e.target
	const isCorrect = selectedButton.dataset.correct === "true"
	if(isCorrect){
		selectedButton.classList.add("correct")
        score++
	}else{
		selectedButton.classList.add("incorrect")
	}
	Array.from(answerButtons.children).forEach(button =>{
		if(button.dataset.correct === "true"){
			button.classList.add("correct")
		}
		button.disabled = true
	});
	nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if(currQuestionIndex < questions.length){
        handleNextButton()
    }else{
        startQuiz()
    }
})
function handleNextButton(){
    currQuestionIndex++
    if(currQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}
function showScore(){
    resetState()
    questionElement.innerHTML = `Your Score: ${score}/${questions.length}`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

startQuiz()