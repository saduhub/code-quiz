// Global Variables
let timer: number = 4;
let timerP: JQuery<HTMLElement> = $('.timer');
timerP.text(`Time: ${timer}`);

// Global Functions
function startTimer(): void {

    const countdown = setInterval(() => {
        timer--;
        timerP.text(`Time: ${timer}`);

        if (timer <= 0) {
            clearInterval(countdown);  
            endQuiz();
            timer = 4;
            timerP.text(`Time: ${timer}`);
        }
    }, 1000); 
}

function endQuiz(): void {
    quizPage.addClass('hidden');
    quizFinishedPage.removeClass('hidden');
}
// Home Page
const homePage: JQuery<HTMLElement> = $('.homePage');
const takeQuizBtn: JQuery<HTMLElement> = $('#takeQuizBtn')
const navigateToScoresBtn: JQuery<HTMLElement> = $('#navigateToScoresBtn')

takeQuizBtn.on('click', function(): void {
    homePage.addClass('hidden')
    quizPage.removeClass('hidden')
    startTimer();
});

navigateToScoresBtn.on('click', function(): void {
    homePage.addClass('hidden')
    highScorePage.removeClass('hidden')
});

// High Score Page
const highScorePage: JQuery<HTMLElement> = $('.highScorePage');
const resetScoreBtn: JQuery<HTMLElement> = $('#resetScoreBtn')
const navigateHomeBtn: JQuery<HTMLElement> = $('#navigateHomeBtnScores')

navigateHomeBtn.on('click', function(): void {
    highScorePage.addClass('hidden')
    homePage.removeClass('hidden')
});
// Quiz Page
const quizPage: JQuery<HTMLElement> = $('.quizPage');
const navigateHomeBtnQuiz: JQuery<HTMLElement> = $('#navigateHomeBtnQuiz')

navigateHomeBtnQuiz.on('click', function(): void {
    location.reload();
});
// Quiz Finished Page
const quizFinishedPage: JQuery<HTMLElement> = $('.quizFinishedPage');
const initialsBtn: JQuery<HTMLElement> = $('#initialsBtn')
const navigateHomeBtnFinish: JQuery<HTMLElement> = $('#navigateHomeBtnFinish')

initialsBtn.on('click', function(): void {
    quizFinishedPage.addClass('hidden')
    homePage.removeClass('hidden')
});

navigateHomeBtnFinish.on('click', function(): void {
    quizFinishedPage.addClass('hidden')
    homePage.removeClass('hidden')
});
// On load
// homePage.addClass('hidden')
highScorePage.addClass('hidden')
quizPage.addClass('hidden')
quizFinishedPage.addClass('hidden')
