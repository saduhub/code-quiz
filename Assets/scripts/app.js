// Header
let headerDiv = document.querySelector('#header-div');
let highScoreLink = document.querySelector('#highscore-link');
let headerP = document.querySelector('#header-paragraph');
let spanSec = document.querySelector('#sec-span');
// Home
let homeDiv = document.querySelector('#home');
let startBtn = document.querySelector('#start');
// Question Div
let questionDiv = document.querySelector('#question');
let questionH1 = document.querySelector('#question-h1');
let answerChoices = document.querySelectorAll('.answer');
// Score submission section
let initialsDiv = document.querySelector('#initials');
let initialsInput = document.querySelector('#initials-input');
let submitBtn = document.querySelector('#submit');
// Feedback 
let feedback = document.querySelector('#feedback');
// Game Over
let gameOver = document.querySelector('#game-over');
let retry = document.querySelector('#retry');
// High Scores list
let highScoreDiv = document.querySelector('#highscore-div');
let scoreList = document.querySelector('#score-list');
let goBack = document.querySelector('#go-back');
let clear = document.querySelector('#clear');
// Starting styles 
questionDiv.style.display = 'none';
initialsDiv.style.display = 'none';
highScoreDiv.style.display = 'none';
gameOver.style.display = 'none';
// Questions, answers, and correct answers(user for validation that will be used in quiz. (filler is to prevent length error)
let questions = {
    questionArray: ['What is the JavaScript function used to add an element to the end of an array?', 'What is the correct HTML tag for creating a hyperlink?', 'Which property is used to set the background color of an element in CSS?', 'What is the DOM method used to create a new HTML element in JavaScript?', 'What method is used to add an item to the local storage in JavaScript?', 'filler'],
}
let answers = [['push()','pop()', 'shift()', 'unshift()'],['<h1>','<p>', '<a>', '<div>'], ['color','background-color','border-color','text-color'], ['createTextNode()','appendChild()','removeChild()','createElement()'], ['getItem()','removeItem()','setItem()','clear()'], 'filler']
let correctAnswers = ['filler','push()', '<a>', 'background-color', 'createElement()', 'setItem()'] 
// keeps track od question number to populate div correctly
let questionCounter = 0;
// For starting the Quiz timer and setting timer length. Declared timerstart outside so that it can be stopped from anywhere
let timerStart;
let secondsLeft = 100;
// Used to detrmine final score. Declared timerstart outside so that it can be stopped from anywhere
let score;
// startBtn starts timer and presents first question by setting styles, updating counter, and populating question div.
startBtn.addEventListener('click', function() {
    homeDiv.style.display = 'none';
    questionDiv.style.display = 'block';
    highScoreLink.style.display = 'none';
    // popuate the question
    questionH1.textContent = questions.questionArray[questionCounter];
    // populate the options using foreach since answerChoices is a nodeList(datastructure returned by the window method and does not have a .length method. 
    answerChoices.forEach( function (button, index) {
        button.textContent = answers[questionCounter][index];
    });
    questionCounter++;    
    timerStart = setInterval(function() {
        secondsLeft--;
        spanSec.textContent = secondsLeft;
        // handles user running out of time
        if (secondsLeft == 0) {
            clearInterval(timerStart);
            questionDiv.style.display = 'none';
            gameOver.firstElementChild.textContent = 'Game Over! You ran out of time!'
            gameOver.style.display = 'block';
            initialsDiv.style.display = 'none';
            headerDiv.style.display = 'none';
            let score = secondsLeft
            headerP.textContent = `Score: ${score}`
        }
    }, 1000)

})
// each answer choice gets an event listener, provides feedback, updates counter, and links to next question/submission page
answerChoices.forEach(function(answerChoice) {
    answerChoice.addEventListener('click', function() {
        if (answerChoice.textContent == correctAnswers[questionCounter]) {
            feedback.textContent = 'Correct!';
        } else {
            feedback.textContent = 'Wrong!';
            secondsLeft = secondsLeft - 20;
        }
        // accessing internally
        setTimeout(function() {
            feedback.textContent = '';
        }, 1000);
        // re-popuate the question
        questionH1.textContent = questions.questionArray[questionCounter];
        answerChoices.forEach( function (button, index) {
            button.textContent = answers[questionCounter][index];
        });
        questionCounter++;
        // after five questions, display initialsDiv, update score with slight delay, handle user score going below 0.
        if (questionCounter == 6) {
            initialsDiv.style.display = 'block';
            questionDiv.style.display = 'none';
            // score needs to be updated until AFTER last question is sumitted.
            let updateFinal;
            score = secondsLeft
            headerP.textContent = `Score: ${score}`
            clearInterval(timerStart);
            updateFinal = setInterval( function () {
                score = secondsLeft
                headerP.textContent = `Score: ${score}`
                clearInterval(timerStart); 
            }, 1000)
            clearInterval(updateFinal);
        }
        // if user score goes below 0
        if (secondsLeft <= 0) {
            clearInterval(timerStart);
            gameOver.style.display = 'block';
            initialsDiv.style.display = 'none';
            headerDiv.style.display = 'none';
            questionDiv.style.display = 'none';
        }
    })
})
// function used to populate highscore
let updateScores = function() {
    let scoreObjectArray = [];
    // for every key in localStorage, retrieve, parse, and push object tp updateScores
    for (let i = 0; i < localStorage.length; i++ ) {
        let keyNumber= localStorage.key(i)
        let scoreObject = JSON.parse(localStorage.getItem(keyNumber));
        scoreObjectArray.push(scoreObject);
    }
    // sort the array in descending order based on each object's score property
    scoreObjectArray.sort((a, b) => {
        return b.score - a.score;
    })
    // push the info in each object of the array into a list item to display a table of high scores
    for (let i = 0; i < scoreObjectArray.length; i++) {
        let scoreInitials = scoreObjectArray[i].initials;
        let score = scoreObjectArray[i].score;
        let li = document.createElement('li');
        li.textContent = `${scoreInitials}: ${score}`;
        scoreList.appendChild(li);
    }
}
// store user information, do not allow blank submissions.
submitBtn.addEventListener('click', function(event) {
    let storedInitials = initialsInput.value;
    if (storedInitials.length === 0) {
        event.preventDefault();
        alert('Please enter inititals');
    } else {
        // each sudmission will be differentiated, even if it is the same user(key). Needs to be string to store.
        let timeStamp = Date.now().toString();
        // timeStamp is key and user score object is value that need to be made into string to be stored 
        localStorage.setItem(timeStamp, JSON.stringify({initials: storedInitials, score: score}));
        // Set styles and populate high score list
        highScoreDiv.style.display = 'block';
        initialsDiv.style.display = 'none';
        headerDiv.style.display = 'none';
        updateScores();
    }
})
// needed for resetting timer
retry.addEventListener('click', function() {
    location.reload();
})
// link and populates high score page 
highScoreLink.addEventListener('click', function() {
    highScoreDiv.style.display = 'block';
    homeDiv.style.display = 'none';
    headerDiv.style.display = 'none';
    updateScores();
})
// returns home
goBack.addEventListener('click', function() {
    location.reload();
})
// clears all high scores by clearing local storage and removing all li's
clear.addEventListener('click', function() {
    localStorage.clear();
    while (scoreList.firstChild) {
        scoreList.removeChild(scoreList.firstChild)
    }
})


