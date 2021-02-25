// 71ccf26b825a85ca4d2c9d672461dd2f
var appKey = '71ccf26b825a85ca4d2c9d672461dd2f';
var city = document.querySelector("#city");
var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
var uvURL = 'http://api.openweathermap.org/data/2.5/uvi?lat=';
var weekApi = 'http://api.openweathermap.org/data/2.5/forecast?q=';
var searchBtn = document.querySelector("#searchBtn");
var weekBtn = document.querySelector("#weekBtn");
var cityName = document.querySelector('#cityName');
var todayTemp = document.querySelector('#todayTemp');
var todayHumidity = document.querySelector('#todayHumidity');
var todayWS = document.querySelector('#todayWS');
var todayUV = document.querySelector('#todayUV');
var firstRendered = localStorage.getItem("lastSearched");
var lastSearched = JSON.parse(localStorage.getItem("lastSearched"));

function saveLastSearch() {
    var history = {
        city: city.value.trim()
    };
    localStorage.setItem("lastSearched", JSON.stringify(history));
}
function renderLastSearched () {
    var lastSearched = JSON.parse(localStorage.getItem("lastSearched"));
    if (lastSearched !== null) {
        document.getElementById("firstRender").innerHTML = lastSearched.city;
    } else {
        return;
    }
}

renderLastSearched();

firstRender.addEventListener('click', function(event){
    event.preventDefault();
    console.log(lastSearched.city);
    fetch(apiURL + lastSearched.city + '&appid=' + appKey + '&units=imperial')
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function(data) {
        cityName.textContent = (data.name);
        todayTemp.textContent = "Temperature of " + parseInt(data.main.temp) + " Fahrenheit";
        todayHumidity.textContent = "Humidity of " + parseInt(data.main.humidity) + "%";
        todayWS.textContent = "Wind Speed of " + parseInt(data.wind.speed) + "MPH";
        console.log(data);
        fetch(uvURL + data.coord.lat + '&lon=' + data.coord.lon + '&appid=' + appKey) 
            .then(function (response) {
                if (response.ok) {
                return response.json();
        }
    })
        .then(function (data) {
            todayUV.textContent = 'UV index of '+ data.value;
    })
    })
})
searchBtn.addEventListener('click', function (event){
    event.preventDefault();
    saveLastSearch();
    fetch(apiURL + city.value + '&appid=' + appKey + '&units=imperial')
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function(data) {
        cityName.textContent = (data.name);
        todayTemp.textContent = "Temperature of " + parseInt(data.main.temp) + " Fahrenheit";
        todayHumidity.textContent = "Humidity of " + parseInt(data.main.humidity) + "%";
        todayWS.textContent = "Wind Speed of " + parseInt(data.wind.speed) + "MPH";
        console.log(data);
        fetch(uvURL + data.coord.lat + '&lon=' + data.coord.lon + '&appid=' + appKey) 
            .then(function (response) {
                if (response.ok) {
                return response.json();
        }
    })
        .then(function (data) {
            todayUV.textContent = 'UV index of '+ data.value;
    })
    })
    
})
weekBtn.addEventListener('click', function(event) {
    event.preventDefault();
    fetch(weekApi + city.value + '&appid=' + appKey + '&units=imperial')
    .then(function(response) {
    if (response.ok) {
            return response.json();
        }
    })
    
    .then(function(data) {
        console.log(data)
        var container1 = document.getElementById("Monday");
        var container2 = document.getElementById("Tuesday");
        var container3 = document.getElementById("Wednesday");
        var container4 = document.getElementById("Thursday");
        var container5 = document.getElementById("Friday");
	    var el = document.createElement("header");
        var elDate1 = document.createElement("h2");
        var elDate2 = document.createElement("h3");
        var elDate3 = document.createElement("h4");
        var elDate4 = document.createElement("h5");
        var elDate5 = document.createElement("h6");
        var elTemp1 = document.createElement("p");
        var elTemp2 = document.createElement("p");
        var elTemp3 = document.createElement("p");
        var elTemp4 = document.createElement("p");
        var elTemp5 = document.createElement("p");
        var elHum1 = document.createElement("p");
        var elHum2 = document.createElement("p");
        var elHum3 = document.createElement("p");
        var elHum4 = document.createElement("p");
        var elHum5 = document.createElement("p");
        
        el.id = "test";
        elDate1.id = "testDate";
        elDate2.id = "testDate";
        elDate3.id = "testDate";
        elDate4.id = "testDate";
        elDate5.id = "testDate";
        elHum1.id = "testHum";
        elHum2.id = "testHum";
        elHum3.id = "testHum";
        elHum4.id = "testHum";
        elHum5.id = "testHum";
        elTemp1.id = "testTemp";
        elTemp2.id = "testTemp";
        elTemp3.id = "testTemp";
        elTemp4.id = "testTemp";
        elTemp5.id = "testTemp";
        el.textContent = (data.city.name);
        elDate1.textContent = "Monday";
        elHum1.textContent = "Humidity: " + parseInt(data.list[0].main.humidity);
        elTemp1.textContent = "Temperature: " + parseInt(data.list[0].main.temp);
        elDate2.textContent = "Tuesday";
        elHum2.textContent = "Humidity: " + parseInt(data.list[8].main.humidity);
        elTemp2.textContent = "Temperature: " + parseInt(data.list[8].main.temp);
        elDate3.textContent = "Wednesday";
        elHum3.textContent = "Humidity: " + parseInt(data.list[16].main.humidity);
        elTemp3.textContent = "Temperature: " + parseInt(data.list[16].main.temp);
        elDate4.textContent = "Thursday";
        elHum4.textContent = "Humidity: " + parseInt(data.list[24].main.humidity);
        elTemp4.textContent = "Temperature: " + parseInt(data.list[24].main.temp);
        elDate5.textContent = "Friday";
        elHum5.textContent = "Humidity: " + parseInt(data.list[39].main.humidity);
        elTemp5.textContent = "Temperature: " + parseInt(data.list[39].main.temp);
        container1.append(elDate1, elTemp1, elHum1);
        container2.append(elDate2, elTemp2, elHum2);
        container3.append(elDate3, elTemp3, elHum3);
        container4.append(elDate4, elTemp4, elHum4);
        container5.append(elDate5, elTemp5, elHum5);
        
        
        
        

    })
})

