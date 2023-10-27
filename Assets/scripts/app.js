"use strict";
// Home Page
const homePage = $('.homePage');
const takeQuizBtn = $('#takeQuizBtn');
const navigateToScoresBtn = $('#navigateToScoresBtn');
takeQuizBtn.on('click', function () {
    homePage.addClass('hidden');
    quizPage.removeClass('hidden');
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
    quizPage.addClass('hidden');
    homePage.removeClass('hidden');
});
// Quiz Finished Page
const quizFinishedPage = $('.quizFinishedPage');
const initialsBtn = $('#initialsBtn');
const navigateHomeBtnFinish = $('#navigateHomeBtnFinish');
initialsBtn.on('click', function () {
    quizFinishedPage.addClass('hidden');
    homePage.removeClass('hidden');
});
navigateHomeBtnFinish.on('click', function () {
    quizFinishedPage.addClass('hidden');
    homePage.removeClass('hidden');
});
// On load
// homePage.addClass('hidden')
highScorePage.addClass('hidden');
quizPage.addClass('hidden');
quizFinishedPage.addClass('hidden');
