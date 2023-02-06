// fetch scores from local storage
var questionsAndAnswersString = localStorage.getItem("questionsAndAnswersString");

// convert the string of scores gotten from local storage into an array
var questionsAndAnswersArray = JSON.parse(questionsAndAnswersString);

// determine where results will be built in user's view
var resultsContainer = document.querySelector("#results");


// function that updates the users view with results constantly
displayResults();



function displayResults(){

    // if there were no previous results, let the user know, but if there are, build the results into view
    if (questionsAndAnswersArray === null) {

        var resultsListItem = document.createElement("li");
        resultsListItem.textContent = "There are no results to display";
        resultsContainer.appendChild(resultsListItem);

    } else {
        // build the results view by looping through the array of results from local storage
        for (i = 0; i < questionsAndAnswersArray.length; i++) {

            var questionInResults = document.createElement("h4");
            questionInResults.textContent = questionsAndAnswersArray[i][0];
            resultsContainer.appendChild(questionInResults);
            var thisQuestion = questionsAndAnswersArray[i];

            for (j = 1; j < (thisQuestion[j].length - 1); j++) {
                var optionInResults = document.createElement("li");
                optionInResults.textContent = thisQuestion[j];
                resultsContainer.appendChild(optionInResults);
            }

            // var option1InResults = document.createElement("li");
            // var option2InResults = document.createElement("li");
            // var option3InResults = document.createElement("li");
            // var option4InResults = document.createElement("li");
            // option1InResults.textContent = questionsAndAnswersArray[i][1];
            // option2InResults.textContent = questionsAndAnswersArray[i][2];
            // option3InResults.textContent = questionsAndAnswersArray[i][3];
            // option4InResults.textContent = questionsAndAnswersArray[i][4];
            // resultsContainer.appendChild(questionInResults);
            // resultsContainer.appendChild(option1InResults);

        };
    };

    // read from local storage (after it's been populated by previous functions) 
    // change result from a string to an array
    // displays it to the user
    // go into the array, pick out the elements and append them to an unordered list
    // use HTML dom manipulation to display results by picking different elements from the questionGenerated array 
};