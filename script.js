//data Container for the Questions
const questions = [
    {
        question: "What is the name of capital of Pakistan",
        answer: [
            { text: "Islamabad", correct: true },
            { text: "Lahore", correct: false },
            { text: "Quetta", correct: false },
            { text: "Karachi", correct: false },
        ]
    },
    {
        question: "Who is the city of colleges",
        answer: [
            { text: "Islamabad", correct: false },
            { text: "Lahore", correct: true },
            { text: "Quetta", correct: false },
            { text: "Karachi", correct: false },
        ]
    },
    {
        question: "the number 1 rank university of pakistan",
        answer: [
            { text: "QAU,Islamabad", correct: true },
            { text: "PU<Lahore", correct: false },
            { text: "uknown,Quetta", correct: false },
            { text: "KMU,Karachi", correct: false },
        ]
    },
    {
        question: "Who is the ancient capital of Pakistan",
        answer: [
            { text: "Islamabad", correct: false },
            { text: "Lahore", correct: true },
            { text: "Quetta", correct: false },
            { text: "Karachi", correct: false },
        ]
    }
]

//data Container for Question, Answers and the next button
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const nextButton = document.getElementById("next");

//data containers for question number and score
let currentQuestionIndex = 0;
let score = 0;

//startQuiz Function

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}

//defining the showQuestion Function
function showQuestion() {
    nextButton.style.display = "none";
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;
    answerButtons.innerHTML = "";//clears the previous question
    //creating the answer for question
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        answerButtons.appendChild(button);
        //adding Click to buttons
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", (e) => {
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true";
            if (isCorrect) {
                selectedBtn.classList.add("correct");
                selectedBtn.style.color = "green";
                score++;
            } else {
                selectedBtn.classList.add("incorrect");
                selectedBtn.style.color = "red";
            }
            // Disable all buttons after selection and show correct answer
            Array.from(answerButtons.children).forEach(btn => {
                btn.disabled = true;
                if (btn.dataset.correct === "true") {
                    btn.classList.add("correct");
                }
            });
            nextButton.style.display = "block";
        });
    });
}

// Add event listener for the next button
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

// Show the final score
function showScore() {
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    answerButtons.innerHTML = "";
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    nextButton.onclick = () => {
        startQuiz();
        nextButton.onclick = null; // Remove this handler after restart
    };
}

startQuiz();

