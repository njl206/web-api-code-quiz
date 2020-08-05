let questions = [
    {
        title: "what color is water?",
        choices: ["red", "blue", "green", "orange"],
        answer: "blue",
    },

    {
        title: "What color is an orange?",
        choices: ["orange", "red", "blue", "green"],
        answer: "orange",
    },

    {
        title: "is Pluto a planet?",
        choices: ["yes", "no"],
        answer: "no",
    }

]


var timer = document.querySelector("#timer");
var startQuizButton = document.querySelector("#startQuiz");
var quiz = document.querySelector("#quiz");
var scoreButton = document.querySelector("#highScores");
var clearScoreButton = document.querySelector("#clearScores");
var retry = document.querySelector("#retry");
var initials = document.querySelector("#initials"); 
var lastScore = document.querySelector("#lastScore");


let secondsLeft = 30;
let currentQuestion = 0;
let score = 0;
let scoreItems = 0;
let scoresOpen = false;
let newScores = [];
let highScoreArray = [];
localStorage.setItem("highScores", JSON.stringify([]));

startQuizButton.addEventListener("click", startQuiz);
scoreButton.addEventListener("click", toggleScoreDisplay);
clearScoreButton.addEventListener("click", clearScores);


function toggleScoreDisplay() {
if (scoresOpen) {
    highScores.classList.remove("open");
    let scoreItems = highScores.querySelectorAll(".scoreItem");
    scoreItems.forEach((scoreItem) => {
        highScores.removeChild(scoreItem);
    });
}
else {
    highScores.classList.add("open");
    let scoreList = JSON.parse(localStorage.getItem("highScores"));
    scoreList.forEach((score) => {
        let listItem = document.createElement("ul");
        listItem.classList.add("scoreItem");
        listItem.innerHTML = `<span> ${score.initial} - ${score.score} /${questions.length} </span>`;
        highScores.appendChild(listItem);
    });
}
scoresOpen = !scoresOpen;
};


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
    var questionList = questions[currentQuestion].choices.map((question) => {
        return `<button class="answerbutton" onclick="answerQuestion('${question}')"> ${question}</button>`;

    });
    quiz.innerHTML = `${questions[currentQuestion].title}<br>${questionList.join("")}`;

};

function answerQuestion(selection) {
    if (questions[currentQuestion].answer === selection) {
        score++;
    } else {
        secondsLeft -= 10;
    }
    currentQuestion++;
    if (currentQuestion === questions.length) {
        return endGame()
    }
    displayQuestion();
};

function handleScoreSave(event) {
    event.preventDefault();
    let highScores = localStorage.getItem("highScores");
    console.log (highScores)
    if (highScores){
        let newScores = JSON.parse(highScores);
        console.log (event)
        newScores.push({initial: event.target[0].value, score: score});
        console.log (newScores)
        localStorage.setItem("highScores", JSON.stringify(newScores));
    }
else {
    let newScores = [];
    newScores.push({initial: event.target[0].value, score: score});
    console.log (newScores)
    localStorage.setItem("highScores", JSON.stringify(newScores));
}
    // var inputVal = document.getElementById("myInput").value;
    // var personScore = {name: inputVal, score: score}
    // highScoreArray.push(personScore);
    // console.log(highScoreArray);
    // localStorage.setItem ("highScoreList", JSON.stringify (highScoreArray))

};

function endGame() {
    quiz.innerHTML = `
    <p>You got ${score} of ${questions.length}</p>
   
    <input type="text" placeholder="enter initials" id="myInput"></input>
    <button type="submit" id="scores">save score</button> 
   
    `;

    secondsLeft = 0;
    timer.innerHTML = `
    <button id="retry" onclick="restartGame()"> retry? </button> 
    `;

    var saveScore = document.querySelector("#scores");
    
    saveScore.addEventListener("click", handleScoreSave);
    // getScores()
    
};

function restartGame() {
    secondsLeft = 30;
    currentQuestion = 0;
    score = 0;
    startQuiz();
};

// function getScores() {
//     var highScores = JSON.parse (localStorage.getItem("highScoreList"));
//     console.log(highScores) 
//     initials.innerHTML = "hello"
// }