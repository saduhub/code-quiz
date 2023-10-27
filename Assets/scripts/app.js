"use strict";
// Global Variables
let timer = 400;
let timerP = $('.timer');
timerP.text(`Time: ${timer}`);
let questionNumber = 0;
const questions = [
    {
        question: 'knock knock',
        correct: 'who is there?',
        choice1: 'what?',
        choice2: '****',
        choice3: 'Come back later',
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
}
function resetTimer() {
    timer = 400;
    timerP.text(`Time: ${timer}`);
}
function saveScores() {
    const initials = initialsInput.val();
    const score = timer;
    const highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
    highScores.push({ initials: initials, score: score });
    localStorage.setItem('highScores', JSON.stringify(highScores));
}
function displayHighScores() {
    scoresUl.empty();
    const highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
    highScores.sort((a, b) => b.score - a.score);
    highScores.forEach(score => {
        scoresUl.append(`<li class="scoresLi">${score.initials} - ${score.score}</li>`);
    });
}
function generateQuestions() {
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
const wrong1 = $('#wrong1');
const wrong2 = $('#wrong2');
const wrong3 = $('#wrong3');
const right = $('#right');
navigateHomeBtnQuiz.on('click', function () {
    location.reload();
});
// Quiz Finished Page
const quizFinishedPage = $('.quizFinishedPage');
const initialsInput = $('.initialsInput');
const initialsBtn = $('#initialsBtn');
const navigateHomeBtnFinish = $('#navigateHomeBtnFinish');
initialsBtn.on('click', function () {
    quizFinishedPage.addClass('hidden');
    homePage.removeClass('hidden');
    saveScores();
    resetTimer();
});
navigateHomeBtnFinish.on('click', function () {
    quizFinishedPage.addClass('hidden');
    homePage.removeClass('hidden');
    resetTimer();
});
// On load
// homePage.addClass('hidden')
highScorePage.addClass('hidden');
quizPage.addClass('hidden');
quizFinishedPage.addClass('hidden');
