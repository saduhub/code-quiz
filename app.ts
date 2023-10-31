// Global Variables
let quizDuration: number = 100
let timer: number = quizDuration;
let timerP: JQuery<HTMLParagraphElement> = $('.timer');
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
    question.text('Input your initials and submit your score!');
}

function resetTimer(): void {
    timer = quizDuration;
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

    highScores.sort((a, b) => {
        if (typeof a.score !== 'number' && typeof b.score !== 'number') {
            return 0; // No change
        } else if (typeof a.score !== 'number') {
            return 1; // A under B
        } else if (typeof b.score !== 'number') {
            return -1; // B under A
        } else {
            return b.score - a.score; // Sort descending since both are numbers. 
        }
    });

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

function displayFeedback(isCorrect: boolean): void {
    if (isCorrect) {
        feedBack.css('color', 'green');
        feedBack.text('Correct!');
    } else {
        feedBack.css('color', 'red');
        feedBack.text('Wrong!');
    }

    setTimeout(() => {
        feedBack.css('color', 'rgb(28 25 23)');
    }, 2000);
}
// Home Page
const homePage: JQuery<HTMLDivElement> = $('.homePage');
const takeQuizBtn: JQuery<HTMLButtonElement> = $('#takeQuizBtn');
const navigateToScoresBtn: JQuery<HTMLButtonElement> = $('#navigateToScoresBtn');

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
const highScorePage: JQuery<HTMLDivElement> = $('.highScorePage');
const scoresUl: JQuery<HTMLUListElement> = $('.scoresUl');
const resetScoreBtn: JQuery<HTMLButtonElement> = $('#resetScoreBtn');
const navigateHomeBtn: JQuery<HTMLButtonElement> = $('#navigateHomeBtnScores');

resetScoreBtn.on('click', function(): void {
    scoresUl.empty();
    localStorage.removeItem('highScores');
});

navigateHomeBtn.on('click', function(): void {
    highScorePage.addClass('hidden');
    homePage.removeClass('hidden');
});
// Quiz Page
const quizPage: JQuery<HTMLDivElement> = $('.quizPage');
const questionCounter: JQuery<HTMLHeadingElement> = $('.quizH2');
const question: JQuery<HTMLParagraphElement> = $('.quizP');
const navigateHomeBtnQuiz: JQuery<HTMLButtonElement> = $('#navigateHomeBtnQuiz');
const feedBack: JQuery<HTMLParagraphElement> = $('#feedBack');
const optionBtn: JQuery<HTMLButtonElement> = $('.optionBtn');
const wrong1: JQuery<HTMLButtonElement> = $('#wrong1');
const wrong2: JQuery<HTMLButtonElement> = $('#wrong2');
const wrong3: JQuery<HTMLButtonElement> = $('#wrong3');
const right: JQuery<HTMLButtonElement> = $('#right');

navigateHomeBtnQuiz.on('click', function(): void {
    location.reload();
});

optionBtn.on('click', function(this: HTMLButtonElement): void {
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
const quizFinishedPage: JQuery<HTMLDivElement> = $('.quizFinishedPage');
const finalScore: JQuery<HTMLHeadingElement> = $('#finalScore');
const initialsInput: JQuery<HTMLInputElement> = $('.initialsInput');
const initialsBtn: JQuery<HTMLButtonElement> = $('#initialsBtn');
const navigateHomeBtnFinish: JQuery<HTMLButtonElement> = $('#navigateHomeBtnFinish');

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
