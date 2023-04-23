let headerDiv = document.querySelector('#headerDiv');
let highScoreLink = document.querySelector('#highScoreLink');
let headerP = document.querySelector('#headerParagraph');
let spanSec = document.querySelector('#secSpan');
let homeDiv = document.querySelector('#home');
let startBtn = document.querySelector('#start');
let questionDiv = document.querySelector('#question');
let questionH1 = document.querySelector('#questionH1');
let answerChoices = document.querySelectorAll('.answer');
let feedback = document.querySelector('#feedback');
let initialsDiv = document.querySelector("#initials");
let initialsInput = document.querySelector("#initialsInput");
let submitBtn = document.querySelector('#submit');
let gameOver = document.querySelector('#gameOver');
let retry = document.querySelector('#retry');
let highScoreDiv = document.querySelector('#highScoreDiv');
let scoreList = document.querySelector('#scoreList');
let goBack = document.querySelector('#goBack');
let clear = document.querySelector('#clear');
questionDiv.style.display = 'none';
initialsDiv.style.display = 'none';
highScoreDiv.style.display = 'none';
gameOver.style.display = 'none';

let questions = {
    questionArray: ['2+2?', '3+3', '4+4', '5+5', '6+6', "filler"],
}
let questionCounter = 0;
// declare timerstart outside so that it can be sopped from anywhere
let timerStart;
let score;
let answers = [['9','6', '4', '10'],['6','7', '20', '100'], ['10','20','30','8'], ['10','20','30','8'], ['10','12','30','8'], "filler"]

let correctAnswers = ['filler','4', '6', '8', '10', '12'] 

let secondsLeft = 50;
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
startBtn.addEventListener('click', function() {
    homeDiv.style.display = 'none';
    questionDiv.style.display = 'block';
    highScoreLink.style.display = 'none'
    // popuate the question
    questionH1.textContent = questions.questionArray[questionCounter];
    // populate the options using for each since answerChoices is a nodeList(datastructure returned by the window method. Looks like, but is not an array). .length is for arrays and strings
    answerChoices.forEach( function (button, index) {
        button.textContent = answers[questionCounter][index];
    });
    // increase question counter to access new question and answers
    questionCounter++;    
    // start timer
    timerStart = setInterval(function() {
        secondsLeft--;
        spanSec.textContent = secondsLeft;
        if (secondsLeft == 0) {
            clearInterval(timerStart);
            questionDiv.style.display = 'none';
            gameOver.firstElementChild.textContent = "Game Over! You ran out of time!"
            gameOver.style.display = 'block';
            initialsDiv.style.display = 'none';
            headerDiv.style.display = 'none';
            let score = secondsLeft
            headerP.textContent = `Score: ${score}`
        }
    }, 1000)

})

// WHEN I answer a question
// THEN I am presented with another question
answerChoices.forEach(function(answerChoice) {
    answerChoice.addEventListener('click', function() {
        if (answerChoice.textContent == correctAnswers[questionCounter]) {
            feedback.textContent = 'Correct!';
        } else {
            feedback.textContent = 'Wrong!';
            secondsLeft = secondsLeft - 20;
        }


        // re-popuate the question
        questionH1.textContent = questions.questionArray[questionCounter];
        // populate the options using for each since answerChoices is a nodeList(datastructure returned by the window method. Looks like, but is not an array). .length is for arrays and strings
        answerChoices.forEach( function (button, index) {
            button.textContent = answers[questionCounter][index];
        });
        // increase question counter to access new question and answers
        questionCounter++;
        // after five questions, display test completcard
        if (questionCounter == 6) {
            initialsDiv.style.display = 'block';
            questionDiv.style.display = 'none';

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
        if (secondsLeft <= 0) {
            clearInterval(timerStart);
            gameOver.style.display = 'block';
            initialsDiv.style.display = 'none';
            headerDiv.style.display = 'none';
            questionDiv.style.display = 'none';
        }
    })
})

let updateScores = function() {
    let scoreObjectArray = [];
    for (let i = 0; i < localStorage.length; i++ ) {
        let keyNumber= localStorage.key(i)
        let scoreObject = JSON.parse(localStorage.getItem(keyNumber));
        scoreObjectArray.push(scoreObject);
    }

    scoreObjectArray.sort((a, b) => {
        return b.score - a.score;
    })

    for (let i = 0; i < scoreObjectArray.length; i++) {
        // let scoreObject = JSON.parse(localStorage.getItem(key));
        let scoreInitials = scoreObjectArray[i].initials;
        let score = scoreObjectArray[i].score;
        let li = document.createElement('li');
        li.textContent = `${scoreInitials}: ${score}`;
        scoreList.appendChild(li);
    }
}

submitBtn.addEventListener('click', function(event) {
    let storedInitials = initialsInput.value;
    if (storedInitials.length === 0) {
        event.preventDefault();
        alert("Please enter inititals");
    } else {
        let timeStamp = Date.now().toString();
        localStorage.setItem(timeStamp, JSON.stringify({initials: storedInitials, score: score}));
        highScoreDiv.style.display = 'block';
        initialsDiv.style.display = 'none';
        headerDiv.style.display = 'none';
        updateScores();
    }
})

retry.addEventListener('click', function() {
    location.reload();
})

highScoreLink.addEventListener('click', function() {
    highScoreDiv.style.display = 'block';
    homeDiv.style.display = 'none';
    headerDiv.style.display = 'none';
    updateScores();
})
goBack.addEventListener('click', function() {
    location.reload();
})
clear.addEventListener('click', function() {
    localStorage.clear();
    while (scoreList.firstChild) {
        scoreList.removeChild(scoreList.firstChild)
    }
})


