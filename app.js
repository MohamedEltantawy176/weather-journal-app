/* Global Variables */
const mainUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=3e1fa9de4e9a2ae175c92efa73f6e75c';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// create an event listener for the element with the id 'generate' with a callback function to excute when it is clicked
document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
    const zipCode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;

    
   getWeatherData(mainUrl, zipCode, apiKey)
    .then(function (data){
        postData('/add', { date: newDate, temp: data.main.temp, content: feeling })
        updateUI();
       
    }); 
    
  };
    
    
const getWeatherData = async(mainUrl, zipCode, apiKey) => {
    const res = await fetch(mainUrl + zipCode + apiKey);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error){
        console.log(`there is an error: ${error}`);
    }
}
// create an async function to retrieve the weather data to the server 

const postData = async (url = '', data = {}) => {
    const response = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-Type': 'application/json',
        }, 
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error){
        console.log(`there is an error: ${error}`);
    }
}

// implement updteUI function 

const updateUI = async () => {
    const request = await fetch ('/all');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('content').innerHTML = allData.content;
    } catch (error){
        onsole.log(`there is an error: ${error}`);

    }

}
