var APIkey = "36373ba886379f34bb87629143936058"
var url = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`

$("#btn").on("click",function(event){
    event.preventDefault()
    var usersearch = $("#cityinput").val()
    console.log(usersearch);
getForcast(usersearch);
})

function getForcast(cityName) {

    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}&units=imperial`
    $.ajax({
        type:"GET",
        url:url
    }).then(function(apiData){
        console.log(apiData)
        $("#currentWeather").html(`
        <article class="bg-primary">
        <h3>City: ${cityName}<span><img src="https://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png" /></h3>
        <p>Temperature: ${apiData.main.temp}</p>
        <p>Wind Speed: ${apiData.wind.speed}</p>
        <p>Forcast: ${apiData.weather[0].main}</p>
        <p>Humidity: ${apiData.main.humidity}</p>

        </article>
        `)
    })

}