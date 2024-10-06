const htmlQuizData = [
    {
        question: "Which HTML tag is used to insert a line break?",
        options: ["<break>", "<lb>", "<br>", "<newline>"],
        answer: "option-3"
    },
    {
        question: "Which HTML tag represents a cell in table's header?",
        options: ["<td>", "<th>", "<tr>", "<thead>"],
        answer: "option-2"
    },
    {
        question: "What is the correct HTML tag for an unordered list?",
        options: ["<li>", "<ol>", "<ul>", "<div>"],
        answer: "option-3"
    },
    {
        question: "Which tag is used to create a hyperlink?",
        options: ["<a>", "<link>", "<href>", "<src>"],
        answer: "option-1"
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        options: ["class", "style", "id", "src"],
        answer: "option-2"
    }
];

const cssQuizData = [
    {
        question: "What is the difference between 'visibility: hidden' and 'display: none' in CSS?",
        options: [
            "'visibility: hidden' hides the element but retains space, 'display: none' removes it from the layout",
            "'visibility: hidden' removes the element from the layout, 'display: none' hides it but retains space",
            "'visibility: hidden' hides the element only on mobile devices",
            "There is no difference between the two"
        ],
        answer: "option-1"
    },
    {
        question: "What does the 'z-index' property control?",
        options: [
            "The order of flex items in a container",
            "The stacking order of elements along the z-axis",
            "The vertical alignment of block elements",
            "The priority of animations in a timeline"
        ],
        answer: "option-2"
    },
    {
        question: "Which CSS property is used to create space between the border and the content inside an element?",
        options: ["padding", "margin", "border-spacing", "line-height"],
        answer: "option-1"
    },
    {
        question: "Which CSS property is used to control how elements are positioned in a flex container along the main axis?",
        options: ["align-items", "justify-content", "flex-direction", "align-content"],
        answer: "option-2"
    },
    {
        question: "What is the default value of the position property in CSS?",
        options: ["relative", "absolute", "fixed", "static"],
        answer: "option-4"
    }
];

let answeredCorrect = [];
let answeredWrong = [];

let currentQuestionIndex = 0;
let points = 0;

function getFormElement() {
    return document.getElementById('quiz-form');
}

function updatePoints() {
    points++;
}

function addCorrectAnswer(question) {
    answeredCorrect.push(question);
    console.log(answeredCorrect);
}

function addWrongAnswer(question) {
    answeredWrong.push(question);
    console.log(answeredCorrect);
}

function buildResultStrings() {
    
    let correctAnswersString = "";
    let wrongAnswersString = ""
    const pointsString = "Points " + points + "/5";

    for (let i = 0; i < answeredCorrect.length; i++) {
        correctAnswersString +=  "<li class='text-green-500'>" + answeredCorrect[i];
    }

    for (let i = 0; i < answeredWrong.length; i++) {
        wrongAnswersString += "<li class='text-red-600'>" + answeredWrong[i];
    }
    
    sessionStorage.setItem("points", pointsString);
    sessionStorage.setItem("correctAnswers", correctAnswersString);
    sessionStorage.setItem("wrongAnswers", wrongAnswersString);

    goToPage("quiz_results.html");
}

function displayResultData() {
    const correctQuestionsElement = document.getElementById("correct-questions");
    correctQuestionsElement.innerText(correctAnswersString);
}
function goToPage(page) {
    const handler = getHandler();
    sessionStorage.setItem("quiz", handler.toLowerCase());
    window.location.replace(page);
}

function handleSubmit() {
    const handler = getHandler();
    const quizData = getQuizData(handler);
    const selectedOption = document.querySelector('input[name="option"]:checked');

    if (!selectedOption) {
        return false;
    }

    if (selectedOption.id === quizData[currentQuestionIndex].answer) {
        updatePoints();
        addCorrectAnswer(quizData[currentQuestionIndex].question);
    } else {
        addWrongAnswer(quizData[currentQuestionIndex].question);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex >= quizData.length) {
        buildResultStrings();
    } else {
        const container = document.getElementById("solution-container");
        const content = document.getElementById("solution-content");
        content.classList.add("hidden");
        container.firstChild.textContent = "View Solution";
        loadQuestionData(handler);
    }

    return false; // Prevent form submission
}

function getQuizData(handler) {
    return handler === "HTML" ? htmlQuizData : cssQuizData;
}

function loadQuestionData(handler) {
    const quizData = getQuizData(handler);

    if (currentQuestionIndex >= quizData.length) {
        goToPage("quiz_results.html");
    }

    document.querySelectorAll('input[name="option"]').forEach(option => option.checked = false);

    document.getElementById("question").innerText = quizData[currentQuestionIndex].question;
    updateOptions(quizData[currentQuestionIndex].options);

    document.getElementById("quiz-form").setAttribute('data-answer', quizData[currentQuestionIndex].answer);
}

function updateOptions(options) {
    options.forEach((option, index) => {
        document.getElementById(`option${index + 1}-text`).innerText = option;
    });
}

function getHandler() {
    return document.title.includes("HTML") ? "HTML" : "CSS";
}

function toggleSolution() {
    const container = document.getElementById("solution-container");
    const content = document.getElementById("solution-content");

    if (content.classList.contains("hidden")) {
        content.classList.remove("hidden");
        container.firstChild.textContent = "Hide Solution";
    } else {
        content.classList.add("hidden");
        container.firstChild.textContent = "View Solution";
    }

    const handler = getHandler();
    displaySolution(content, handler);
}

function extractNumberFromAnswer(answerRawString) {
    return parseInt(answerRawString.split("-")[1], 10);
}

function displaySolution(content, handler) {
    const quizData = getQuizData(handler);
    const answerRawString = quizData[currentQuestionIndex].answer;
    const parsedAnswer = extractNumberFromAnswer(answerRawString);
    content.innerText = quizData[currentQuestionIndex].options[parsedAnswer - 1]; // Zero-based indexing        
}

// Wait for the DOM content to load before altering the page HTML
document.addEventListener("DOMContentLoaded", function () {
    const solutionContainer = document.getElementById("solution-container");
    solutionContainer.addEventListener("click", toggleSolution);

    const handler = getHandler();
    loadQuestionData(handler);
});
