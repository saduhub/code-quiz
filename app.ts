// Global Variables
let timer: number = 400;
let timerP: JQuery<HTMLElement> = $('.timer');
timerP.text(`Time: ${timer}`);
let questionNumber: number = 0; 

const questions = [
    {
        question: 'knock knock',
        correct: 'who is there?',
        choice1: 'what?',
        choice2: '****',
        choice3: 'Come back later',
    }
]

// Types
type HighScore = {
    initials: string;
    score: number;
};
// Global Functions
function startTimer(): void {

    const countdown = setInterval(() => {
        timer--;
        timerP.text(`Time: ${timer}`);

        if (timer <= 0) {
            clearInterval(countdown);  
            endQuiz();
        }
    }, 1000); 
}

function endQuiz(): void {
    quizPage.addClass('hidden');
    quizFinishedPage.removeClass('hidden');
}

function resetTimer(): void {
    timer = 400;
    timerP.text(`Time: ${timer}`);
}

function saveScores(): void {
    const initials: string  = initialsInput.val() as string;
    const score: number = timer;
    const highScores: HighScore[] = JSON.parse(localStorage.getItem('highScores') || '[]');

    highScores.push({ initials: initials, score: score });
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function displayHighScores(): void {
    scoresUl.empty();

    const highScores: HighScore[] = JSON.parse(localStorage.getItem('highScores') || '[]');

    highScores.sort((a, b) => b.score - a.score);

    highScores.forEach(score => {
        scoresUl.append(`<li class="scoresLi">${score.initials} - ${score.score}</li>`);
    });
}

function generateQuestions(): void {
    const questionValue: string = questions[questionNumber].question;
    const choice1Value: string = questions[questionNumber].choice1;
    const choice2Value: string = questions[questionNumber].choice2;
    const choice3Value: string = questions[questionNumber].choice3;
    const correctValue: string = questions[questionNumber].correct;
    questionCounter.text(`Question ${questionNumber + 1}`)
    question.text(questionValue);
    wrong1.text(choice1Value);
    wrong2.text(choice2Value);
    wrong3.text(choice3Value);
    right.text(correctValue);
}
// Home Page
const homePage: JQuery<HTMLElement> = $('.homePage');
const takeQuizBtn: JQuery<HTMLElement> = $('#takeQuizBtn');
const navigateToScoresBtn: JQuery<HTMLElement> = $('#navigateToScoresBtn');

takeQuizBtn.on('click', function(): void {
    homePage.addClass('hidden');
    quizPage.removeClass('hidden');
    startTimer();
    generateQuestions();
});

navigateToScoresBtn.on('click', function(): void {
    homePage.addClass('hidden');
    highScorePage.removeClass('hidden');
    displayHighScores();
});

// High Score Page
const highScorePage: JQuery<HTMLElement> = $('.highScorePage');
const scoresUl: JQuery<HTMLElement> = $('.scoresUl');
const resetScoreBtn: JQuery<HTMLElement> = $('#resetScoreBtn');
const navigateHomeBtn: JQuery<HTMLElement> = $('#navigateHomeBtnScores');

resetScoreBtn.on('click', function(): void {
    scoresUl.empty();
    localStorage.removeItem('highScores');
});

navigateHomeBtn.on('click', function(): void {
    highScorePage.addClass('hidden');
    homePage.removeClass('hidden');
});
// Quiz Page
const quizPage: JQuery<HTMLElement> = $('.quizPage');
const questionCounter: JQuery<HTMLElement> = $('.quizH2');
const question: JQuery<HTMLParagraphElement> = $('.quizP');
const navigateHomeBtnQuiz: JQuery<HTMLElement> = $('#navigateHomeBtnQuiz');
const wrong1: JQuery<HTMLElement> = $('#wrong1');
const wrong2: JQuery<HTMLElement> = $('#wrong2');
const wrong3: JQuery<HTMLElement> = $('#wrong3');
const right: JQuery<HTMLElement> = $('#right');

navigateHomeBtnQuiz.on('click', function(): void {
    location.reload();
});
// Quiz Finished Page
const quizFinishedPage: JQuery<HTMLElement> = $('.quizFinishedPage');
const initialsInput: JQuery<HTMLElement> = $('.initialsInput');
const initialsBtn: JQuery<HTMLElement> = $('#initialsBtn');
const navigateHomeBtnFinish: JQuery<HTMLElement> = $('#navigateHomeBtnFinish');

initialsBtn.on('click', function(): void {
    quizFinishedPage.addClass('hidden');
    homePage.removeClass('hidden');
    saveScores();
    resetTimer();
});

navigateHomeBtnFinish.on('click', function(): void {
    quizFinishedPage.addClass('hidden');
    homePage.removeClass('hidden');
    resetTimer();
});
// On load
// homePage.addClass('hidden')
highScorePage.addClass('hidden');
quizPage.addClass('hidden');
quizFinishedPage.addClass('hidden');
