**Rough task list**

Create HTML file

Create CSS page

Create README

Link HTML file to CSS Style sheet

Link HTML file to JQuery URL

Create \<div\> for Jumbotron

Create Jumbotron for Banner " **Quiz Question Generator"**

Create paragraph for \<user advice\>

\<p\> Set your criteria below and click 'Generate questions'. Sit back, relax and get as many technical quiz questions as you need. \</p\>

Create \<div\> for buttons/selectors

Add drop down selector for **Question Category**

Add drop down selector for response **Language**

Add drop down selector for **Number of Questions**

Add button for submit ( **Generate question** (s)

Add behaviour:

Add on-click function for category selector

Add on-click function for category selector

Add on-click function for number of questions selector, (initially keep this at one)

Add on-click function for Generate Question(s) button

Register for an API key for the Question site

Register for an API key for the language site

Create .gitignore file

Save keys in file: keys.js

Save keys.js in.gitignore

This button will raise a JQuery API request **firstly** for a question of the chosen category and when this has returned its response, the JSON string response will need to be stringified - converted to text using : (JSON.stringify) to render into a string

This text output (for both question and answer) will be stored in local storage for convenient access

If the language selected is not English, A second JQuery API request is now made to translate the result of the first search.

Here, text comprising the response, (the question-and-answer pair) will be forwarded (as arguments?) to the language translate API site as a JQuery API request.

The result of this will be a JSON string.

This will need to be stringified, (JSON.stringify) to provide the required output.

This text output will be stored in local storage along with its English language equivalent for convenient access