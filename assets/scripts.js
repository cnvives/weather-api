var APIkey = "36373ba886379f34bb87629143936058"
var url = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`
var previousSearch=  JSON.parse(localStorage.getItem("weatherAPI")) || []

$("#btn").on("click",function(event){
    event.preventDefault()
    var usersearch = $("#cityinput").val()
    console.log(usersearch);
    if(previousSearch.indexOf(usersearch) === -1){
        previousSearch.push(usersearch)
        localStorage.setItem("weatherAPI",JSON.stringify(previousSearch))
        displayPreviousSearch()
    }
getForcast(usersearch);
})

function displayPreviousSearch(){
    var previousSearch=  JSON.parse(localStorage.getItem("weatherAPI")) || []

}
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
        var lat=apiData.coord.lat
        var lon=apiData.coord.lon
        var uvUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`

        $.ajax({
            type:"GET",
            url:uvUrl
        }).then(function(uvapiData){
            console.log(uvapiData,"UV")

            var uvValue= parseFloat(uvapiData.current.uvi);
            if (uvValue >= 8){
                $("#uv").html(`<h5 class="bg-danger">${uvValue}</h5>`)
            }else if(uvValue >= 6){
                $("#uv").html(`<h5 class="bg-warning">${uvValue}</h5>`)

            }else if(uvValue >= 3){
                $("#uv").html(`<h5 class="moderate">${uvValue}</h5>`)

            }else{
                $("#uv").html(`<h5 class="bg-success">${uvValue}</h5>`)

            }


        })

    })
        var url2=`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}&units=imperial`
        $.ajax({
            type:"GET",
            url:url2
        }).then(function(apiResponse){
            console.log(apiResponse)
            var apiList = apiResponse.list
            var htmlCode = ""
            for (let index = 0; index < apiList.length; index+=8) {
                const apiData = apiList[index];
                htmlCode += `<article class="bg-primary">
                <p>${apiData.dt_txt}<span><img src="https://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png" /></p>
                <p>Temperature: ${apiData.main.temp}</p>
                <p>Wind Speed: ${apiData.wind.speed}</p>
                <p>Forcast: ${apiData.weather[0].main}</p>
                <p>Humidity: ${apiData.main.humidity}</p>
        
                </article>
                `
            }
            $("#fiveDayForecast").html(htmlCode)

        })
    

}

