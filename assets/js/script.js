// Declaring variables for use in the global scope
var quizApiURL = "https://quizapi.io/";
var categoryChosen = "";
var languageChosen = "";
var quantityChosen = "";
var questionGenerated = [];


// When user clicks the 'Generate Questions' button, call the first API
generateQuestionsButton.addEventListener("click", function() {
    
    event.preventDefault(); // why is event crossed off? Does it matter?
    categoryChosen = document.querySelector("#???????").value; // whatever is selected on category dropdown 
    languageChosen = document.querySelector("#???????").value; // whatever is selected on language dropdown
    quantityChosen = document.querySelector("#???????").value; // whatever is selected on number of questions dropdown
    getQuizQuestion(categoryChosen, quantityChosen);

});



// function to fetch quiz questions from the Quiz API
function getQuizQuestion(category, quantity) {
    
    var fetchURL = `${quizApiURL}/api/v1/questions?apiKey=${quizApiKey}&category=${category}&difficulty=Easy&limit=${quantity}`; // we may later also allow user choose difficulty
    fetch(fetchURL)
    .then(function(response){
        return response.json();
    })
    .then(function(questionGotten){
        if (!questionGotten[0]){
            // alert incase the APi fails
            alert("The API returned nothing bro"); // change this later to be more user friendly or take it out
        } else {
            // break apart the json and assign to variables
            // populate the questionGenerated array
            // push the questionText and answerText variables to the translator API
        
        };
    })
    // .then translateQuestion(languageChosen, questionText, answerText)
    .catch(function(error){
        console.error(error);
    })

}



// function that takes the quiz question generated from QuizAPI and passes it to the Translator API
function translateQuestion(language, questionText, answerText){
    // var fetchURL = ????
    // fetch(fetchURL)
    // .then(function(response){
    //     translatedQuestion = ????
    //     translatedAnswers = ????
    // })
    // Then take what was outputted and populate the questionGenerated array, replacing existing elements of the object
    // Then run the displayResult function
};


// function that takes the questionGenerated (after it's been populated by previous functions) and displays it to the user
function displayResult(){
    // use HTML dom manipulation to display results by picking different elements from the questionGenerated array 
};
