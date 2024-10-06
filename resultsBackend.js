document.addEventListener("DOMContentLoaded", function () {
    if (document.title.includes("Results")) {
        const points = sessionStorage.getItem("points");
        const correctAnswers = sessionStorage.getItem("correctAnswers");
        const wrongAnswers = sessionStorage.getItem("wrongAnswers");

        const pointsElement = document.getElementById("points");
        const correctQuestionsElement = document.getElementById("correct-questions");
        const wrongQuestionsElement = document.getElementById("wrong-questions");

        pointsElement.innerText = points;
        correctQuestionsElement.innerHTML = correctAnswers;
        wrongQuestionsElement.innerHTML = wrongAnswers;

        if (!correctAnswers || correctAnswers.trim() === "") {
            correctQuestionsContainer = document.getElementById("correct-questions-container")
            correctQuestionsContainer.style.display = "none";
        }

        if (!wrongAnswers || wrongAnswers.trim() === "") {
            wrongQuestionsContainer = document.getElementById("wrong-questions-container")
            wrongQuestionsContainer.style.display = "none";
        }
    }
});

function getQuiz() {
    return sessionStorage.getItem("quiz");
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("play-again-button").addEventListener("click", function () {
        const handler = getQuiz();
        window.location.href = handler + "_quiz.html";
    });

    document.getElementById("return-to-frontpage-button").addEventListener("click", function () {
        window.location.href = "index.html";
    });

});
