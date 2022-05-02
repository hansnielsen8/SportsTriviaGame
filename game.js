//Utilize document.querySelector to select the html elements that need to be modified on screen

const question = document.querySelector('#question');
const answers = document.querySelectorAll('.answer-text');
const progressionText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');

//Establish the global variables that will affect how the game functions such as the score and points added to the score when answered correctly

let score = 0
let questionCounter = 0
let scorePoints = 10
let maxQuestions = 10

//Array of the questions and answer choices along with the answer num value that will match up with the data number html element in order to be able to correctly select an answer

let questions = [
    {
        question: `Who is the winningest team in NFL history?`,
        choice1: `Chicago Bears`,
        choice2: `Green Bay Packers`,
        choice3: `Atlanta Falcons`,
        choice4: `Kansas City Chiefs`,
        answer: 2,
    },
    {
        question: `Who is the all time passing yards leader in NFL history?`,
        choice1: `Peyton Manning`,
        choice2: `Aaron Rodgers`,
        choice3: `Joe Montana`,
        choice4: `Tom Brady`,
        answer: 4,
    },
    {
        question: `Where did Aaron Rodgers attend college?`,
        choice1: `Alabama`,
        choice2: `Clemson`,
        choice3: `UC Berkley`,
        choice4: `Michigan`,
        answer: 3,
    },
    {
        question: `Who is the all time receiving yards leader in NFL history?`,
        choice1: `Jerry Rice`,
        choice2: `Calvin Johnson`,
        choice3: `Terrell Owens`,
        choice4: `Jordy Nelson`,
        answer: 1,
    },
    {
        question: `Which team won the first ever Super Bowl?`,
        choice1: `New York Giants`,
        choice2: `Cincinnati Bengals`,
        choice3: `Green Bay Packers`,
        choice4: `Buffalo Bills`,
        answer: 3,
    },
    {
        question: `Who is the winningest head coach in NFL history?`,
        choice1: `Bill Belichick`,
        choice2: `Don Shula`,
        choice3: `Vince Lombardi`,
        choice4: `Mike McCarthy`,
        answer: 2,
    },
    {
        question: `Dan Marino played quarterback for which NFL team?`,
        choice1: `Miami Dolphins`,
        choice2: `Minnesota Vikings`,
        choice3: `Detroit Lions`,
        choice4: `New York Jets`,
        answer: 1,
    },
    {
        question: `How many Super Bowls have the Green Bay Packers won?`,
        choice1: `3`,
        choice2: `5`,
        choice3: `4`,
        choice4: `2`,
        answer: 3,
    },
    {
        question: `Who won Super Bowl LVI (2022)?`,
        choice1: `Los Angeles Rams`,
        choice2: `Kansas City Chiefs`,
        choice3: `New York Giants`,
        choice4: `Tampa Bay Buccaneers`,
        answer: 1,
    },
    {
        question: `Which team holds the record for the most Super Bowl appearances?`,
        choice1: `Green Bay Packers`,
        choice2: `Buffalo Bills`,
        choice3: `New Orleans Saints`,
        choice4: `New England Patriots`,
        answer: 4,
    },
]

//Reset score and question counter so that the game can be replayed after pressing the play again button (invoke the newQuestion function in order to pull in questions from the array)

playTrivia = () => {
    questionCounter = 0
    score = 0
    
    //Use the spread operator in order to "unpack" the array elements so that they can be pulled and used
    
    availableQuestions = [...questions]
    newQuestion()
}

newQuestion = () => {
    //If statement that will return the end of game screen displaying highscore once there are no more available questions(game complete)
    if(availableQuestions.length === 0) {
        localStorage.setItem('recentScore',score)
        return window.location.assign('end.html')
    }
    //Increase the question counter after a new question has been displayed and update the question progression html element
    questionCounter++
    progressionText.innerText = `Question ${questionCounter} of ${maxQuestions}`
    
    const randomQuestion = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[randomQuestion]
    question.innerText = currentQuestion.question

    answers.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    //Use the .splice method to remove the question from the array once it has been used so that repeating questions do not occur
    availableQuestions.splice(randomQuestion, 1)

}
//Add an event listener so that you can click the appropriate html element (data-number)
answers.forEach(answer => {
    answer.addEventListener('click', a => {
        const selectedChoice = a.target
        const selectedAnswer = selectedChoice.dataset['number']
 
        //Found on stack overflow to use the ternary operator (?) rather than many if/else statements especially when working with booleans
        let applyClass = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
 
        if(applyClass === 'correct') {
            increaseScore(scorePoints)
        }
 
        //Add a temporary class to the html element so that the css can temporarily be styled, allowing for a green background when correct and red when incorrect
        selectedChoice.parentElement.classList.add(applyClass)
 
        //Async function that removes the class after 1 second so that the color doesn't stick to the box of the html element, then loads a new question and resets 
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(applyClass)
            newQuestion()
 
        }, 1000)
    })
})
 
//Utilize .innertext to alter the scoreText element after a question is answered correctly
increaseScore = num => {
    score +=num
    scoreText.innerText = score
}


playTrivia()

