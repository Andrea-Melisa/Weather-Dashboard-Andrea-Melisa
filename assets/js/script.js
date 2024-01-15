
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

    const weatherQueryUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${APIKey}`

        fetch(weatherQueryUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (weatherData) {
            console.log(weatherData); // Show the weather details and add them to the 
            const weatherToday = $("#today");
            const weatherIcon = $("<img>").attr("src",`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`);
            const weatherTemp = $("<p>").text(`Temp: ${weatherData.main.temp} °C`);
            const weatherWind = $("<p>").text(`Wind: ${weatherData.wind.speed} KPH`);
            const weatherHum = $("<p>").text(`Humidity: ${weatherData.main.humidity}%`);
            weatherToday.append(chosenCity, weatherTemp, weatherWind, weatherHum);
            chosenCity.append(weatherIcon);
        })

    })
});
