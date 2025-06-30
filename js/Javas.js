"use strict"


let Search = document.querySelector("#search");
let Submit = document.querySelector("#submit");
let today = document.querySelector("#today");
let current = document.querySelector("#current")
let rowForecast = document.querySelector("#rowForecast");




Search.addEventListener("keyup", function (a) {
       getWeather(a.target.value);
})

getWeather("cairo");
async function getWeather(res) {

       let result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f088573d797f4308947165051252706&q=${res}&days=3`);
       if ((result.ok && 400 != result.status)) {
             let res = await result.json();
              
              displayWeather(res.location, res.current);
              nextWeather(res.forecast.forecastday);
              console.log(res.forecast.forecastday)
              console.log(res.current);
              
       }
       

};
       

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayWeather(array, TTime) {
       let cartoona = "";
       let Main = "";
       var date = new Date(TTime.last_updated.replace(" ", "T"));
      
       if(TTime != null){
              cartoona = ` <div class="day">${days[date.getDay()]}</div>
            <div class=" date">${date.getDate() + monthNames[date.getMonth()]}</div>`;

              Main = ` <div class="location">${array.name}</div>
            <div class="degree">
              <div class="num">${TTime.temp_c}<sup>o</sup>C</div>

              <div class="forecast-icon">
                <img src="https:${TTime.condition.icon}" alt="" width="90"
                  class="imageye-selected">
              </div>

            </div>
            <div class="custom">${TTime.condition.text}</div>
            <span><img src="https://routeweather.netlify.app/images/icon-umberella@2x.png" alt="" width="21" height="21"
                class="imageye-selected">20%</span>
            <span><img src="https://routeweather.netlify.app/images/icon-wind@2x.png" alt="" width="23" height="21"
                class="imageye-selected">18km/h</span>
            <span><img src="https://routeweather.netlify.app/images/icon-compass@2x.png" alt="" width="21" height="21"
                class="imageye-selected">East</span>`

                console.log(cartoona);
                console.log(Main);

                today.innerHTML = cartoona
                current.innerHTML = Main
       }
};


function nextWeather(index) {
    let cartoon = "";
    for (let i = 1; i < index.length; i++){
        cartoon += `<div class="forecast col-lg-6 px-0">
            <div class="forecast-header">
           <div class="day">${days[new Date(index[i].date.replace(" ", "T")).getDay()]}</div>
           </div> 
            <div class="forecast-content">
               <div class="forecast-icon">
              <img src="https:${index[i].day.condition.icon}" alt="" width=48>
                   </div>
                   <div class="degree">${index[i].day.maxtemp_c}<sup>o</sup>C</div>
                   <small>${index[i].day.mintemp_c}<sup>o</sup></small>
                   <div class="custom">${index[i].day.condition.text}</div>
                   </div>
                   </div>`;
}
    rowForecast.innerHTML = cartoon;
    console.log(cartoon)

}












