const questions =[
    {
        question: " If 'Descartes' said 'I think, therefore I am,' then answer how much is 2-6x2",
        answers:[
            {text:"-8", correct:false},
            {text:"-10", correct:true},
            {text:"6", correct:false},
            {text:"-12", correct:false},
        ]
    },
    {
        question: "If Maria, according to economic theory, offers her products daily, then answer: what is the technical term for the total quantity of goods and services that producers are willing to sell in a given period",
        answers:[
            {text:"To offer", correct:false},
            {text:"Supply", correct:true},
            {text:"Offered", correct:false},
            {text:"Offering", correct:false},
        ]
    },
    {
        question: "According to the periodic table, the chemical element oxygen has an atomic number of 8, so answer: If a body is in uniform motion with a velocity of 20 meters per second, then answer: what is the total distance covered by the body in 40 seconds?",
        answers:[
            {text:"400", correct:false},
            {text:"1200", correct:false},
            {text:"800", correct:true},
            {text:"200", correct:false},
        ]
    },
    {
        question: "If, according to genetics, a gene is a hereditary unit that encodes a specific characteristic of an organism, then answer: what is the term used in programming for a unit of code that performs a specific function in a computer program?",
        answers:[
            {text:"Gene", correct:false},
            {text:"Variant", correct:false},
            {text:"Function", correct:true},
            {text:"Variable", correct:false},
        ]
    },
    {
        question: "If, in astrology, the sign of Aries is associated with the head region and the nervous system, then answer: in terms of biomedicine, which system in the human body is responsible for the processing and interpretation of sensory stimuli, including those related to pain and touch?",
        answers:[
            {text:"Nervous System", correct:true},
            {text:"Endocrine System", correct:false},
            {text:"Circulatory System", correct:false},
            {text:"Respiratory System", correct:false},
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons= document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function starQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML =answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function  resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        starQuiz();
    }
});

starQuiz();