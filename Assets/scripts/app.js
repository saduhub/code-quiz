let headerP = document.querySelector('#headerParagraph')
let spanSec = document.querySelector('#secSpan')
let homeDiv = document.querySelector('#home');
let startBtn = document.querySelector('#start');
let questionDiv = document.querySelector('#question');
let questionH1 = document.querySelector('#questionH1');
let answerChoices = document.querySelectorAll('.answer');
let feedback = document.querySelector('#feedback');
let initialsDiv = document.querySelector("#initials")
questionDiv.style.display = 'none';
initialsDiv.style.display = 'none';

let questions = {
    questionArray: ['2+2?', '3+3', '4+4', '5+5', '6+6', "filler"],
}
let questionCounter = 0;

let answers = [['9','6', '4', '10'],['6','7', '20', '100'], ['10','20','30','8'], ['10','20','30','8'], ['10','12','30','8'], "filler"]

let secondsLeft = 10000000;
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
startBtn.addEventListener('click', function() {
    homeDiv.style.display = 'none';
    questionDiv.style.display = 'block';
    // popuate the question
    questionH1.textContent = questions.questionArray[questionCounter];
    // populate the options using for each since answerChoices is a nodeList(datastructure returned by the window method. Looks like, but is not an array). .length is for arrays and strings
    answerChoices.forEach( function (button, index) {
        button.textContent = answers[questionCounter][index];
    });
    // increase question counter to access new question and answers
    questionCounter++;    
    // start timer
    let timerStart;

    timerStart = setInterval(function() {
        secondsLeft--;
        spanSec.textContent = secondsLeft;
    }, 1000)

})

// WHEN I answer a question
// THEN I am presented with another question
answerChoices.forEach(function(answerChoice) {
    answerChoice.addEventListener('click', function() {
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
            let score = secondsLeft
            headerP.textContent = `Score: ${score}`
        }
    })
})

