
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

    const newQueryUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${APIKey}`

        fetch(newQueryUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
        })
    
    })
});
