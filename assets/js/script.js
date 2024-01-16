
//listening the click event and run the callback fuction
$("#search-button").on("click", function (e) {
    e.preventDefault();
      //save my search input value to a variable
    const searchInput = $(".weather-search").val().trim();

// Here we are building the URL we need to query the database
const APIKey = "83b63f4667133ba418e4c4dff4868cf3";
const queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&appid=${APIKey}`;


// We then created an Fetch call

fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        const chosenCity = $("<h4>").text(`${data[0].name} ${dayjs().format("(DD/MM/YYYY)")}`); //Show the name of the city and the date with dayjs

    // Fetch call for the current day weather data
    const weatherQueryUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${APIKey}`

        fetch(weatherQueryUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (weatherData) {
            console.log(weatherData); // Show the weather details and add them to the div
            const weatherToday = $("#today");
            weatherToday.css('border', 'black 2px solid');  // Adding some style to the section
            const weatherIcon = $("<img>").attr("src",`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`);
            const weatherTemp = $("<p>").text(`Temp: ${weatherData.main.temp} °C`);
            const weatherWind = $("<p>").text(`Wind: ${weatherData.wind.speed} KPH`);
            const weatherHum = $("<p>").text(`Humidity: ${weatherData.main.humidity}%`);
            weatherToday.append(chosenCity, weatherTemp, weatherWind, weatherHum);
            chosenCity.append(weatherIcon);
        })

    // Fetch call for the forecast weather data    
    const forecastQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${lon=data[0].lon}&appid=${APIKey}&units=metric`;

    fetch(forecastQueryUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (forecastData) {
            console.log(forecastData); 

            for (let i = 8; i < forecastData.list.length; i+=7) {
                console.log(forecastData[i]);
                const element = forecastData.list[i];

                const forecast = $("#forecast");
                const createCardForecast = $("<div>");
                createCardForecast.css({"border": "black 1.5px solid",
                'background-color': 'lightblue',
                'width': '180px',
                'margin': '10px',
                'align-content': 'center' });
                const forecastDate = $("<p>").text(`${element.dt_txt}`);
                const forecastIcon = $("<img>").attr("src",`http://openweathermap.org/img/w/${forecastData.list[i].weather[0].icon}.png`);
                const forecastTemp = $("<p>").text(`Temp: ${element.main.temp} °C`);
                const forecastWind = $("<p>").text(`Wind: ${element.wind.speed} KPH`);
                const forecastHum = $("<p>").text(`Humidity: ${element.main.humidity}%`);

                createCardForecast.append(forecastDate,forecastIcon,forecastTemp,forecastWind,forecastHum);
                forecast.append(createCardForecast);
            }
    })

})
});

