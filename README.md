
## Get Started with this little project

This is a little project who read a txt file, process it and save the data in a strcutured form in another new file.

The code in charge of this first part is in the file script.js.

The second part is to read this processed file and be able to resume/get some required informations to render it in charts.

The code in charge of this second part is in the file readData.js.

I have a bundle.js who's a browserify of the file readData.js (browserify readData.js > bundle.js) to be able to render it in the browser.

## Steps:

# Intall the dependencies 
 1- Do a npm install for the dependencies.
# Launch a script to read and structure the data
 2 - Launch the script.js by -> node script.js
# Open the html, who would implicitly launch the readData.js to process the data and show it in the diferents charts
 3- Open in a web browser the html file to see the charts.

* If I do the request per minute ( which I did and have the data in an array ), we would have an inmense chart: 24 hour and 60 minutes in each hour would be around 1400 datas, each data for each minute in every hour, and from my side it would haven't to much sense. So I decided to calculate the request per hour. Or maybe I dind't understand the concept.