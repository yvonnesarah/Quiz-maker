// DECLARING VARIABLES & DOM ELEMENTS FOR USE IN THE GLOBAL SCOPE
// ===========================================================================

// fetch scores from local storage
var QandAString = localStorage.getItem("questionsAndAnswersString");

// convert the string of scores gotten from local storage into an array
var QandAArray = JSON.parse(QandAString);

// determine where results will be built in user's view
var resultsContainer = document.querySelector("#results");



// MAIN RESULTS PAGE LOGIC (FUNCTIONS & MORE) STARTS HERE
// ===========================================================================

// function to display results is constantly run without any trigger
displayResults();


// declaring function that updates the users view with results constantly
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