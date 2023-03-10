// DECLARING VARIABLES & DOM ELEMENTS FOR USE IN THE GLOBAL SCOPE
// ===========================================================================

var quizApiURL = "https://quizapi.io/";
var generateQuestionsButton = document.querySelector("#Generate");
var chosenOptions = [];
var categoryChosen = "";
var languageChosen = "";
var quantityChosen = "";
var questionsGotten;
var translatedQuestion;
var questionsAndAnswersArray;
var newQuestionAndAnswersArray;




// MAIN 'QUESTION GENERATOR' LOGIC STARTS HERE
// ===========================================================================

// Trigger for 'Welcome to Quiz Maker' modal to show only when homepage is loaded for the first time
$(document).ready(function() {
  if(sessionStorage.getItem('#Modal')!=='true')
{
  $('#Modal').modal('show');
  sessionStorage.setItem('#Modal',true);
}
});


// When user clicks the 'Generate Questions' button, call the first API
generateQuestionsButton.addEventListener("click", function(event) {

    // Start the page loader
    Loader.open();

    //clear previous results from local storage first
    var questionsToClear = localStorage.getItem("questionsAndAnswersString");
    clearStorage(questionsToClear);
    var optionsToClear = localStorage.getItem("chosenOptionsString");
    clearStorage(optionsToClear);
    
    // Collecting selected items from multiple dropdown lists 
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

    var chosenOptionsString = JSON.stringify(chosenOptions); // produces a JSON holding all the user's chosen options
    
    // write the chosen options to local storage so it's available for the results page
    localStorage.setItem("chosenOptionsString", chosenOptionsString);
    console.log(chosenOptionsString); 
    

    categoryChosen = chosenOptions[0][0];
    languageChosen = chosenOptions[1][0];
    quantityChosen = chosenOptions[2][0];

    getQuizQuestions(categoryChosen, quantityChosen);
    // maybe add a line to clear chosenOptions after the result is sent off

});



// function to fetch quiz questions from the Quiz API
function getQuizQuestions(category, quantity) {
    
    var fetchURL = `${quizApiURL}/api/v1/questions?apiKey=${quizApiKey}&category=${category}&difficulty=Easy&limit=${quantity}`; 
    // we may later also allow user choose difficulty
    fetch(fetchURL)
    .then((response) => response.json())
    .then(function(data){
        questionsGotten = data;
        console.log(questionsGotten);
    })
    .then(function(){
        // For each question gotten, go into the array to find text for questions and answers, then assign them to variables
        for (i = 0; i < questionsGotten.length; i++) {
            var questionArray = [];
            var questionText = questionsGotten[i]['question'];
            var answerAText = questionsGotten[i]['answers']['answer_a'];
            var answerBText = questionsGotten[i]['answers']['answer_b'];
            var answerCText = questionsGotten[i]['answers']['answer_c'];
            var answerDText = questionsGotten[i]['answers']['answer_d'];
            questionArray.push(questionText, answerAText, answerBText, answerCText, answerDText);
            questionArrayStringified = questionArray.toString();
            console.log(questionArrayStringified);

            // Don't bother translating if the user selects english
            if (languageChosen === "en"){
              // if english, just save generated questions to local storage
              saveResults(questionArray);
            } else {
              // if not english, push the questionText and answerText variables to the translator API
              setTimeout(translateQuestions(languageChosen, questionArrayStringified),500);
            }
        }
    })
    .catch(function(error){
        console.error(error);
    });
    //wait 4 seconds for the API calls to complete, then take the user to the results page
    setTimeout(goToResultsPage, 4000);
};


// function that takes the quiz question generated from QuizAPI and passes it to the Translator API
function translateQuestions(language,text){

        // if user selected any language other than english, push langaugaeChosen and questionText as arguments through the API
        const encodedParams = new URLSearchParams();
        encodedParams.append("source_language", "en");
        encodedParams.append("target_language", language);
        encodedParams.append("text", text);

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
            .then((response) => response.json())
            .then(function(data){
                translatedQuestion = data;
                console.log(translatedQuestion);
            })
            // then pick out the part of the result you need and create an array
            .then(function(){
                var newQuestionAndAnswers = translatedQuestion.data.translatedText;
                newQuestionAndAnswersArray = newQuestionAndAnswers.split(",");
                console.log(newQuestionAndAnswersArray);
                // then save generated questions to local storage
                saveResults(newQuestionAndAnswersArray);
            })
            .catch(err => console.error(err));
};




// OTHER FUNCTIONS DECLARED BELOW:
// ===========================================================================

// function that clears old results from local storage
function clearStorage(recordToClear) {
    localStorage.clear(recordToClear);
};

// function that takes user to the results page once it's ready
function goToResultsPage() {
    window.location.href = "./results.html";
};

//function that saves generated questions to local storage
function saveResults(array) {
    // declaring a variable to hold a string of all previous questions
    var oldQuestions = localStorage.getItem("questionsAndAnswersString");

    // if there were no previous questions, create a new array, but if there are, capture them into an array
    if (oldQuestions === null) {
        questionsAndAnswersArray = [];
    } else {
        questionsAndAnswersArray = JSON.parse(oldQuestions);
    };

    // add this new questions and answers set to the existing array from previous questions
    questionsAndAnswersArray.push(array);

    // write the full record to local storage
    localStorage.setItem("questionsAndAnswersString", JSON.stringify(questionsAndAnswersArray));
};




// SCRIPT FOR SPINNING LOADER (CREATED BY MATHEUS2212, SOURCED FROM www.cssscript.com/animated-svg-loading-spinner/)
// ====================================================================================================================

/* Loader script starts*/
var Loader = {

    loader: null,
    body: null,
    html: '<span><svg width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="15"></svg></span>',
    cssClass: "loader",
    check: function () {
      if (this.body == null) {
        this.body = document.body;
      }
    },
    open: function () {
      this.check();
      if (!this.isOpen()) {
        this.loader = document.createElement("div");
        this.loader.setAttribute("id", "loader");
        this.loader.classList.add("loader_website");
        this.loader.innerHTML = this.html;
        this.body.append(this.loader);
        this.body.classList.add(this.cssClass);
      }
      return this;
    },
    close: function () {
      this.check();
      if (this.isOpen()) {
        this.body.classList.remove(this.cssClass);
        this.loader.remove();
      }
      return this;
    },
    isOpen: function () {
      this.check();
      return this.body.classList.contains(this.cssClass);
    },
    ifOpened: function (callback, close) {
      this.check();
      if (this.isOpen()) {
        if (!!close) this.close();
        if (typeof callback === "function") {
          callback();
        }
      }
      return this;
    },
    ifClosed: function (callback, open) {
      this.check();
      if (!this.isOpen()) {
        if (!!open) this.open();
        if (typeof callback === "function") {
          callback();
        }
      }
      return this;
    },
  };
  
  if (typeof module !== "undefined") {
    module.exports = Loader;
  }
  /* Loader script ends*/
