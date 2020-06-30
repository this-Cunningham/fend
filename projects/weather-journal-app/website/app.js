/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate);

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=874db85ace1bed141c3ff243ec81fa46';


// const countryCode = document.getElementById('country').value || 'us';
const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generate);

/* Function called by event listener */
function generate (e) {
  const zipcode = document.querySelector('#zip').value;
  const feelings = document.querySelector('#feelings').value;
  console.log(zipcode)
  console.log(feelings) //must wait for click event to capture value of text field, otherwise value will be blank
  getWeather(baseURL+zipcode+apiKey, feelings)
  .then(function(data){
    postData(data)
  })
  .then(updateUI)
}
/* Function to GET Web API Data*/
const getWeather = async (url = '', feelings) => {
  const response = await fetch(url);

  try {
    const weatherData = await response.json();
    weatherData['date'] = newDate; //inserting Date into dataObject before POST
    weatherData['feelings'] = feelings; //inserting feelings into dataObject before POST
    console.log(weatherData);
    return weatherData;

  } catch(error){
    console.log('error', error);
  }
}

/* Function to POST data */
const postData = async (journalData = {}) => {
  const response = await fetch('/journalData', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(journalData),
  })

  try {
    const newData = response.json();
    console.log(newData);
    return newData;

  } catch (error){
    console.log('error', error)
  }
}

/* Function to GET Project Data */
//This block returns the stored data from server
const updateUI = async (url = '') => {
  const response = await fetch('/all');//get request for data stored in projectData on server

  try {
    const allData = await response.json(); //turns data into something we can use
    console.log(allData);
    //updates ui
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature}`;
    document.getElementById('content').innerHTML = `Feelings: ${allData.feelings}`;

    return allData;

  } catch (error) {
    console.log('error', error);
  }
}
