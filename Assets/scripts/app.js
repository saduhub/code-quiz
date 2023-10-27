"use strict";
// Global Variables
let timer = 4;
let timerP = $('.timer');
timerP.text(`Time: ${timer}`);
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
    timer = 4;
    timerP.text(`Time: ${timer}`);
}
// Home Page
const homePage = $('.homePage');
const takeQuizBtn = $('#takeQuizBtn');
const navigateToScoresBtn = $('#navigateToScoresBtn');
takeQuizBtn.on('click', function () {
    homePage.addClass('hidden');
    quizPage.removeClass('hidden');
    startTimer();
});
navigateToScoresBtn.on('click', function () {
    homePage.addClass('hidden');
    highScorePage.removeClass('hidden');
});
// High Score Page
const highScorePage = $('.highScorePage');
const resetScoreBtn = $('#resetScoreBtn');
const navigateHomeBtn = $('#navigateHomeBtnScores');
navigateHomeBtn.on('click', function () {
    highScorePage.addClass('hidden');
    homePage.removeClass('hidden');
});
// Quiz Page
const quizPage = $('.quizPage');
const navigateHomeBtnQuiz = $('#navigateHomeBtnQuiz');
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
    const initials = initialsInput.val();
    const score = timer;
    const highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
    highScores.push({ initials: initials, score: score });
    localStorage.setItem('highScores', JSON.stringify(highScores));
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
