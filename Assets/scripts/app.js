"use strict";
// Global Variables
let quizDuration = 100;
let timer = quizDuration;
let timerP = $('.timer');
timerP.text(`Time: ${timer}`);
let questionNumber = 0;
let savedScore;
const questions = [
    {
        question: 'Which of the following is not a primitive data type in JavaScript?',
        correct: 'Array',
        choice1: 'String',
        choice2: 'Boolean',
        choice3: 'Number',
    },
    {
        question: 'Which method can be used to add an item to the end of an array?',
        correct: 'push()',
        choice1: 'concat()',
        choice2: 'join()',
        choice3: 'pop()',
    },
    {
        question: 'How can you log messages to the console in JavaScript?',
        correct: 'console.log()',
        choice1: 'System.out.print()',
        choice2: 'print()',
        choice3: 'log.console()',
    },
    {
        question: 'Which of the following is a way to declare a variable that cannot be reassigned in JavaScript?',
        correct: 'const',
        choice1: 'var',
        choice2: 'let',
        choice3: 'function',
    },
    {
        question: 'What does the `this` keyword refer to inside an object method in JavaScript?',
        correct: 'The object itself',
        choice1: 'The method itself',
        choice2: 'The global window object',
        choice3: 'The parent object',
    }
];
// Global Functions
function startTimer() {
    const countdown = setInterval(() => {
        timer--;
        timerP.text(`Time: ${timer}`);
        if (timer <= 0) {
            clearInterval(countdown);
            endQuiz();
        }
    }, 1000);
}
function endQuiz() {
    quizPage.addClass('hidden');
    quizFinishedPage.removeClass('hidden');
    question.text('Input your initials and submit your score!');
}
function resetTimer() {
    timer = quizDuration;
    timerP.text(`Time: ${timer}`);
}
function resetQuestionNumber() {
    questionNumber = 0;
}
function saveScores() {
    const initials = initialsInput.val();
    const score = savedScore;
    const highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
    highScores.push({ initials: initials, score: score });
    localStorage.setItem('highScores', JSON.stringify(highScores));
}
function displayHighScores() {
    scoresUl.empty();
    const highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
    highScores.sort((a, b) => {
        if (typeof a.score !== 'number' && typeof b.score !== 'number') {
            return 0; // No change
        }
        else if (typeof a.score !== 'number') {
            return 1; // A under B
        }
        else if (typeof b.score !== 'number') {
            return -1; // B under A
        }
        else {
            return b.score - a.score; // Sort descending since both are numbers. 
        }
    });
    highScores.forEach(score => {
        if (typeof score.score !== 'number') {
            scoresUl.append(`<li class="scoresLi">${score.initials} - DNF! </li>`);
        }
        else {
            scoresUl.append(`<li class="scoresLi">${score.initials} - ${score.score}</li>`);
        }
    });
}
function generateQuestions() {
    if (questionNumber < questions.length) {
        const questionValue = questions[questionNumber].question;
        const choice1Value = questions[questionNumber].choice1;
        const choice2Value = questions[questionNumber].choice2;
        const choice3Value = questions[questionNumber].choice3;
        const correctValue = questions[questionNumber].correct;
        questionCounter.text(`Question ${questionNumber + 1}`);
        question.text(questionValue);
        wrong1.text(choice1Value);
        wrong2.text(choice2Value);
        wrong3.text(choice3Value);
        right.text(correctValue);
    }
    else {
        return;
    }
}
function displayFeedback(isCorrect) {
    if (isCorrect) {
        feedBack.css('color', 'green');
        feedBack.text('Correct!');
    }
    else {
        feedBack.css('color', 'red');
        feedBack.text('Wrong!');
    }
    setTimeout(() => {
        feedBack.css('color', 'rgb(28 25 23)');
    }, 2000);
}
// Home Page
const homePage = $('.homePage');
const takeQuizBtn = $('#takeQuizBtn');
const navigateToScoresBtn = $('#navigateToScoresBtn');
takeQuizBtn.on('click', function () {
    homePage.addClass('hidden');
    quizPage.removeClass('hidden');
    startTimer();
    generateQuestions();
});
navigateToScoresBtn.on('click', function () {
    homePage.addClass('hidden');
    highScorePage.removeClass('hidden');
    displayHighScores();
});
// High Score Page
const highScorePage = $('.highScorePage');
const scoresUl = $('.scoresUl');
const resetScoreBtn = $('#resetScoreBtn');
const navigateHomeBtn = $('#navigateHomeBtnScores');
resetScoreBtn.on('click', function () {
    scoresUl.empty();
    localStorage.removeItem('highScores');
});
navigateHomeBtn.on('click', function () {
    highScorePage.addClass('hidden');
    homePage.removeClass('hidden');
});
// Quiz Page
const quizPage = $('.quizPage');
const questionCounter = $('.quizH2');
const question = $('.quizP');
const navigateHomeBtnQuiz = $('#navigateHomeBtnQuiz');
const feedBack = $('#feedBack');
const optionBtn = $('.optionBtn');
const wrong1 = $('#wrong1');
const wrong2 = $('#wrong2');
const wrong3 = $('#wrong3');
const right = $('#right');
navigateHomeBtnQuiz.on('click', function () {
    location.reload();
});
optionBtn.on('click', function () {
    const isAnswerCorrect = $(this).text() === questions[questionNumber].correct;
    displayFeedback(isAnswerCorrect);
    if (!isAnswerCorrect) {
        timer -= 5;
    }
    questionNumber++;
    generateQuestions();
    if (questionNumber >= questions.length) {
        savedScore = timer;
        timer = 0;
        finalScore.text(`Score: ${savedScore}`);
    }
});
// Quiz Finished Page
const quizFinishedPage = $('.quizFinishedPage');
const finalScore = $('#finalScore');
const initialsInput = $('.initialsInput');
const initialsBtn = $('#initialsBtn');
const navigateHomeBtnFinish = $('#navigateHomeBtnFinish');
initialsBtn.on('click', function () {
    quizFinishedPage.addClass('hidden');
    homePage.removeClass('hidden');
    saveScores();
    resetTimer();
    resetQuestionNumber();
});
navigateHomeBtnFinish.on('click', function () {
    quizFinishedPage.addClass('hidden');
    homePage.removeClass('hidden');
    resetTimer();
    resetQuestionNumber();
});
// On load
// homePage.addClass('hidden')
highScorePage.addClass('hidden');
quizPage.addClass('hidden');
quizFinishedPage.addClass('hidden');
