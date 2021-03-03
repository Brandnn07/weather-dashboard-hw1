// 71ccf26b825a85ca4d2c9d672461dd2f
var appKey = '71ccf26b825a85ca4d2c9d672461dd2f';
var city = document.querySelector("#city");
var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
var uvURL = 'https://api.openweathermap.org/data/2.5/uvi?lat=';
var weekApi = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var searchBtn = document.querySelector("#searchBtn");
var weekBtn = document.querySelector("#weekBtn");
var cityName = document.querySelector('#cityName');
var todayTemp = document.querySelector('#todayTemp');
var todayHumidity = document.querySelector('#todayHumidity');
var todayWS = document.querySelector('#todayWS');
var todayUV = document.querySelector('#todayUV');
var array = [];
var list = document.getElementById('historyList');

function saveLastSearch() {
    array.unshift(city.value)
    localStorage.setItem('lastSearched', JSON.stringify(array))
}
function renderButtons () {
    var lastSearched = JSON.parse(localStorage.getItem('lastSearched'));
    if (lastSearched !== null) {
        array = lastSearched
        for (let i = 0; i < 4; i++) {
        const button = document.createElement('button');
        button.className = 'historyList btn btn-primary'
        button.textContent = array[i]
        list.append(button)
        button.addEventListener('click', function(event){
        event.preventDefault();
        city.value = button.textContent
})
    }
    } else {
        return;
    }
}

renderButtons();


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
        for (let i = 0; i <= 4; i++) {
            var elTemp = document.getElementById('temp' + [i]);
            var elHum = document.getElementById('humidity' + [i]);
            var weatherIcon = data.list[i].weather[0].icon;
            var iconURL = ' https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png'
            elTemp.textContent = 'Temperature of ' + parseInt(data.list[i].main.temp) + ' Fahrenheit';
            elHum.textContent = 'Humidity of ' + parseInt(data.list[i].main.humidity) + '%';
            document.getElementById('icon' + i).setAttribute('src', iconURL)
        }
    });
        
        

    })
// 
