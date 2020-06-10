let questions = [
    {
        question: "what color is water?",
        choices: ["red", "blue", "green", "orange"],
        answer: "blue",
    }
]

let secondsLeft = 30;
let currentQuestion = 0;
let score = 0;

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

function displayQuestion(questionArray) {
    for (var i = 0; i < questionArray.length; i++) {
        console.log(questionArray[i].question)
    }
}