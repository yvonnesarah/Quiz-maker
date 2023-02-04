// Declaring variables and HTML DOM elements for use in the global scope
var quizApiURL = "https://quizapi.io/";
var generateQuestionsButton = document.querySelector("#Generate");
var chosenOptions = [];
// var categoryChosen = document.getElementById('Category'); 
// var languageChosen = "";
// var quantityChosen = "";
var questionGenerated = [];


// When user clicks the 'Generate Questions' button, call the first API
generateQuestionsButton.addEventListener("click", function(event) {
    
    // categoryChosen = document.querySelector("#Category").value; 
    // languageChosen = document.querySelector("#Language").value; 
    // quantityChosen = document.querySelector("#Number_of_Questions").value;
    var allDropdowns = document.getElementsByTagName('SELECT');
    for(i = 0; i < allDropdowns.length; i++) {
        var dropdownList = allDropdowns[i];
        var temporaryHolder = [];
        for(j = 0; j < dropdownList.length; j++) {
          if(dropdownList[j].selected){
            temporaryHolder.push(dropdownList[j].value);
        };  
        }
        chosenOptions.push(temporaryHolder);
    }
    console.log(JSON.stringify(chosenOptions));
    // produces a JSON holding all the user's chosen options

    // maybe add a line to clear chosenOptions after the result is sent off
    // getQuizQuestion(categoryChosen, quantityChosen);

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

// write if statments to convert language to code

    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", "en");
    encodedParams.append("target_language", "id");
    encodedParams.append("text", "What is your name?");

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': translatorApiKey,
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: encodedParams
};

    fetch('https://text-translator2.p.rapidapi.com/translate', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    // Then take what was outputted and populate the questionGenerated array, replacing existing elements of the object
    // Then save the result to local storage
};


// function that reads the questionGenerated from local storage (after it's been populated by previous functions) and displays it to the user
function displayResult(){
    // use HTML dom manipulation to display results by picking different elements from the questionGenerated array 
};
