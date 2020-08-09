
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML ="<center>" +"Question " + currentQuestionNumber + " of " + quiz.questions.length+"</center>";
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new Question("How do you create a function in JavaScript?", ["function myfunction()","funtion:myfunction()","function=myfunction()","function==myfunction()"] ,"function myfunction()"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("How do you round the number 7.25, to the nearest integer?",["Math.round(7.25)","Math.rnd(7.25)","round(7.25)","rnd(7.25)"],"Math.round(7.25)"),
    new Question("Hyper Text Markup Language Stand For?", ["JavaScript", "XHTML","CSS", "HTML"], "HTML"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("How can you add a single line comment in a JavaScript?", ["'This is a comment" ,"//This is a comment", "/?This is a comment ","?This is a comment"], "//This is a comment"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("How do you call a function named 'myFunction'?",["call function myFunction()","call myFunction()","myFunction()","call:myFunction()"],"myFunction()"),
    new Question("How to write an IF statement in JavaScript?",["if i = 5 then","if (i == 5)","if i = 5","if i == 5 then"],"if (i == 5)"),
    new Question("What is the correct way to write a JavaScript array?",['var colors = "red", "green", "blue"','var colors = ["red", "green", "blue"] ',' var colors = (1:"red", 2:"green", 3:"blue")','var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue") '],'var colors = ["red", "green", "blue"] ')
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();