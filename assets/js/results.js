// DECLARING VARIABLES & DOM ELEMENTS FOR USE IN THE GLOBAL SCOPE
// ===========================================================================

// fetch stuff from local storage
var QandAString = localStorage.getItem("questionsAndAnswersString");
var chosenOpsString = localStorage.getItem("chosenOptionsString");

// convert the strings gotten from local storage into  arrays
var QandAArray = JSON.parse(QandAString);
var chosenOpsArray = JSON.parse(chosenOpsString);

// determine where filter and results will be built in user's view
var resultsContainer = document.querySelector("#results");
var categoryChosenContainer = document.querySelector("#categoryChosen");
var languageChosenContainer = document.querySelector("#languageChosen");
var quantityChosenContainer = document.querySelector("#quantityChosen");



// MAIN RESULTS PAGE LOGIC (FUNCTIONS & MORE) STARTS HERE
// ===========================================================================

// function to display filter and results is constantly run without any trigger
displayFilters();
displayResults();


// declaring function that displays filters
function displayFilters(){
        categoryChosenContainer.textContent = `✅ Category: ${chosenOpsArray[0][0]}`;
        if (chosenOpsArray[1][0] === "en") {languageToDisplay = "English"}
        else if (chosenOpsArray[1][0] === "fr") {languageToDisplay = "French"}
        else if (chosenOpsArray[1][0] === "es") {languageToDisplay = "Spanish"}
        else if (chosenOpsArray[1][0] === "de") {languageToDisplay = "German"};
        languageChosenContainer.textContent = `✅ Language: ${languageToDisplay}`;
        quantityChosenContainer.textContent = `✅ Quantity: ${chosenOpsArray[2][0]}`;
};


// declaring function that displays results
function displayResults(){

    // if there were no previous results, let the user know, but if there are, build the results into view
    if (QandAArray === null) {

        var resultsListItem = document.createElement("li");
        resultsListItem.textContent = "There are no results to display";
        resultsContainer.appendChild(resultsListItem);

    } else {
        // build the results view by looping through the array of results from local storage
        for (i = 0; i < QandAArray.length; i++) {

            // the outer loop just makes the question text display to the user
            var questionInResults = document.createElement("h4");
            questionInResults.textContent = QandAArray[i][0];
            resultsContainer.appendChild(questionInResults);
            thisQuestion = QandAArray[i];

            //the inner loop runs through the array of answers to display each option to the user
            for (j = 1; j < (thisQuestion.length); j++) {
                var optionInResults = document.createElement("li");
                optionInResults.textContent = thisQuestion[j];
                resultsContainer.appendChild(optionInResults);
            }

        };
    };
};