const quizData = [
    {
        question: "Which HTML tag represents a cell in table's header?",
        options: ["<td>", "<th>", "<tr>", "<thead>"],
        answer: "option-1"
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
    },
    {
        question: "Which HTML tag is used to insert a line break?",
        options: ["<break>", "<lb>", "<br>", "<newline>"],
        answer: "option-3"
    }
];

let currentQuestionIndex = 0;
let points = 0;


function loadQuestionData(handler) {
    if (currentQuestionIndex >= quizData.length) {
        goToPage("quiz_results.html");
    }

    if (handler === "html") {
        document.getElementById("question").innerText = quizData[currentQuestionIndex].question;
        document.getElementById("option1-text").innerText = quizData[currentQuestionIndex].options[0];
        document.getElementById("option2-text").innerText = quizData[currentQuestionIndex].options[1];
        document.getElementById("option3-text").innerText = quizData[currentQuestionIndex].options[2];
        document.getElementById("option4-text").innerText = quizData[currentQuestionIndex].options[3];
        document.getElementById("quiz-form").setAttribute('data-answer', quizData[currentQuestionIndex].answer);
        document.querySelectorAll('input[name="option"]').forEach(option => option.checked = false);
    }
}

function handleSubmit(event) {
    const form = document.getElementById('quiz-form');
    const selectedOption = document.querySelector('input[name="option"]:checked');

    if (!selectedOption) {
        return false;
    }

    if (selectedOption.id === form.getAttribute("data-answer")) {
        updatePoints();
    }

    currentQuestionIndex++;

    let handler = event.submitter.value;
    console.log(handler);
    loadQuestionData(handler);

    return false; // Prevent form submission
}

function updatePoints() {
    points++;
    document.getElementById("points").innerText = "Points " + points;
}

function goToPage(page) {
    window.location.replace(page);
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

    displaySolution(content);
}

function displaySolution(content) {
    const answerRawText = quizData[currentQuestionIndex].answer;
    const parsedAnswer = parseInt(answerRawText.split("-")[1], 10);
    content.innerText = quizData[currentQuestionIndex].options[parsedAnswer - 1]; // Zero based indexing
}

// Function to wait untill DOM content loads before altering the page HTML
document.addEventListener("DOMContentLoaded", function () {
    const solutionContainer = document.getElementById("solution-container");
    solutionContainer.addEventListener("click", toggleSolution);
});

// Checking which of the two quizez the user opened, because we need that information to decide which questions to load
document.addEventListener("DOMContentLoaded", function () {
    const handler = document.title.includes("HTML") ? "HTML" : "CSS";
    loadQuestionData(handler.toLowerCase());
});