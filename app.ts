// Global Variables
let timer: number = 40;
let timerP: JQuery<HTMLElement> = $('.timer');
timerP.text(`Time: ${timer}`);
let questionNumber: number = 0; 
let savedScore: number;

const questions: Question[] = [
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

// Types
type HighScore = {
    initials: string;
    score: number;
};

type Question = {
    question: string;
    correct: string;
    choice1: string;
    choice2: string;
    choice3: string;
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
    timer = 40;
    timerP.text(`Time: ${timer}`);
}

function resetQuestionNumber(): void {
    questionNumber = 0;
}

function saveScores(): void {
    const initials: string  = initialsInput.val() as string;
    const score: number = savedScore;
    const highScores: HighScore[] = JSON.parse(localStorage.getItem('highScores') || '[]');

    highScores.push({ initials: initials, score: score });
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function displayHighScores(): void {
    scoresUl.empty();

    const highScores: HighScore[] = JSON.parse(localStorage.getItem('highScores') || '[]');

    highScores.sort((a, b) => b.score - a.score);

    highScores.forEach(score => {
        if (typeof score.score !== 'number') {
            scoresUl.append(`<li class="scoresLi">${score.initials} - DNF! </li>`);
        } else {
            scoresUl.append(`<li class="scoresLi">${score.initials} - ${score.score}</li>`);
        }
    });
}

function generateQuestions(): void {
    if (questionNumber < questions.length) {
        const questionValue: string = questions[questionNumber].question;
        const choice1Value: string = questions[questionNumber].choice1;
        const choice2Value: string = questions[questionNumber].choice2;
        const choice3Value: string = questions[questionNumber].choice3;
        const correctValue: string = questions[questionNumber].correct;
        questionCounter.text(`Question ${questionNumber + 1}`);
        question.text(questionValue);
        wrong1.text(choice1Value);
        wrong2.text(choice2Value);
        wrong3.text(choice3Value);
        right.text(correctValue);
    } else {
        return;
    }
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
const optionBtn: JQuery<HTMLButtonElement> = $('.optionBtn');
const wrong1: JQuery<HTMLElement> = $('#wrong1');
const wrong2: JQuery<HTMLElement> = $('#wrong2');
const wrong3: JQuery<HTMLElement> = $('#wrong3');
const right: JQuery<HTMLElement> = $('#right');

navigateHomeBtnQuiz.on('click', function(): void {
    location.reload();
});

optionBtn.on('click', function(): void {
    questionNumber++;
    generateQuestions();

    if (questionNumber >= questions.length) {
        savedScore = timer;
        timer = 0;  
    }
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
    resetQuestionNumber();
});

navigateHomeBtnFinish.on('click', function(): void {
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
