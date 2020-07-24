let questions = [
    {
        title: "what color is water?",
        choices: ["red", "blue", "green", "orange"],
        answer: "blue",
    }
]

var timer = document.querySelector("#timer");
var startQuizButton = document.querySelector("#startQuiz");
var quiz = document.querySelector("#quiz");
var scoreButton = document.querySelector("highScores");
var clearScoreButton = document.querySelector("#clearScores");
var retry = document.querySelector("#retry");


let secondsLeft = 30;
let currentQuestion = 0;
let score = 0;

startQuizButton.addEventListener("click", startQuiz);
scoreButton.addEventListener("click", toggleScoreDisplay);
clearScoreButton.addEventListener("click", clearScores);


function toggleScoreDisplay(){
    
}

function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.innerHTML = `
       <div>Time Remaining: ${secondsLeft} seconds
       <br>
       ${score} of ${questions.length} </div> `;
        console.log(timerInterval)

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            return endGame();
        }
    }, 1000);
}

function startQuiz() {
    displayQuestion();
    setTime();
}

function displayQuestion() {
   var questionList = questions[currentQuestion].choices.map((question)=> {
       return `<button class="answerbutton" onclick="answerQuestion('${question}')"> ${question}</button>`;

   });
   quiz.innerHTML = `${questions[currentQuestion].title}<br>${questionList.join("")}`;
    
};

function answerQuestion (selection){
    if (questions[currentQuestion].answer === selection) {
        score++;
    } else {
        secondsLeft -=10;
    }
    currentQuestion++;
    if (currentQuestion === questions.length) {
        return endGame()
    }
    displayQuestion();
};

function endGame (){
    quiz.innerHTML = `
    <p>You got ${score} of ${questions.length}</p>
    <form onsubmit="handleScoreSave(event)">
    <input type="text" placeholder="enter initials"></input> 
    <input type="submit" value="save score"></input> 
    </form>
    `;

    secondsLeft=0;
    timer.innerHTML = `
    <button id="retry" onclick="restartGame()"> retry? </button> 
    `;
};

function restartGame (){
    secondsLeft=30;
    currentQuestion=0;
    score=0;
    startQuiz();
};