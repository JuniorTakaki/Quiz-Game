const questions =[
    {
        question: "Você percebe ques está enfrentando dificuldades para se concentrar, sente-se constantemente cansado e tem dificuldade em manter o foco no trabalho. O que  você faria para cuidar da  sua  saúde  mental nessa  situação ",
        answers:[
            {text:"Buscar felicidade momentânea e gastaria dinheiro com roupa", correct:false},
            {text:"Trabalhar horas extras de forma excessiva sem tirar tempo para descanso e  recuperação ", correct:false},
            {text:"Consideraria procurar aconselhamento ou terapia para desenvolver estratégias de enfrentamento e lidar melhor com o estresse no trabalho", correct:true},
        ]
    },
    {
        question: "Sabe aquelas realizações que podem ser consideradas pequenas, mas que para você foram muito gratificantes? Seja conseguir fazer uma receita nova ou bater uma meta pessoal, toda conquista merece ser celebrada! Você tem o costume de celebrar suas conquistas?",
        answers:[
            {text:"Celebro tudo que conquisto", correct:true},
            {text:"Tô nem aí pra nada ", correct:false},
            {text:"Ah, não sei", correct:false},
        ]
    },
    {
        question: "Como você lidaria se seus pais insistissem que você fizesse a faculdade da escolha deles?",
        answers:[
            {text:"Seguiria o seu sonho, ignorando a opinião deles?", correct:false},
            {text:"Optaria por seguir a escolha deles?", correct:false},
            {text:"Exploraria uma terceira opção, buscando algo completamente novo?", correct:true},
        ]
    },
    {
        question: "Em momentos de ansiedade, você prefere",
        answers:[
            {text:"Refletir sobre a situação", correct:true},
            {text:"Distrair-se com atividades", correct:true},
            {text:"Procurar apoio social", correct:true},
            {text:"Outra estratégia que funcione para você", correct:true},
        ]
    },
    {
        question: "Numa determinada situação, Rodrigo estava passando por problemas psicológicos e lembrou-se do Centro de Valorização da Vida (CVV). Qual é o número que ele deve discar?",
        answers:[
            {text:"194", correct:false},
            {text:"190", correct:false},
            {text:"188", correct:true},

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