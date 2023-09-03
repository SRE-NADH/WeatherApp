 const cookieValue = document.cookie;
 const lat = document.getElementsByClassName("lat")[0];
const long = document.getElementsByClassName("log")[0];

 const latitude = getLatitude("latitude");
 const longitude = getLongitude("longitud");

console.log(latitude);
console.log(longitude)

function getLatitude(CookieName){
  let cookieArr = cookieValue.split(";")
  let latitudearr = cookieArr[0].split("=");
  return latitudearr[1];
}
function getLongitude(CookieName){
    let cookieArr = cookieValue.split(";")
    let longitudearr = cookieArr[1].split("=");
    return longitudearr[1];
  }

  
  lat.innerHTML =`Lat: ${latitude}`;
  long.innerHTML =`Long: ${longitude}`;

  let frame = document.getElementById("frame");
  console.log(frame.src)
  frame.src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
  
  const key  = "170c2ece549fea3609a4076df2c9fb0a";
  const baseurl = "https://api.openweathermap.org/data/3.0/onecall"
  getWeatherData();

  async function getWeatherData(){
    const url = `${baseurl}?lat=${latitude}&lon=${longitude}&appid=${key}`;
    try{
        let promise = await fetch(url);
        let response = await promise.json();
        addDataToUi(response);
    }
    catch(error){
     alert("couldn't fetch weather data");
    }
  }

  function addDataToUi(data){
    let loc = document.getElementById("loc");
    loc.innerHTML=`Location: ${data.timeZone}`

    let windspeed = document.getElementById("windspeed");
    windspeed.innerHTML = `Wind Speed: ${data.current.wind_speed}`;

    let hum = document.getElementById("hum");
    hum.innerHTML = `Humidity: ${data.current.humidity}`;
   
    let time = document.getElementById("time");
    time.innerHTML = `Time Zone: GMT +${findtmeZone(data.timezone_offset)}`;

    let pres = document.getElementById("pres");
    pres.innerHTML = `Pressure: ${data.current.pressure}`;
   
    let winddir = document.getElementById("winddir");
    winddir.innerHTML = `Wind Direction: ${findDirection(data.current.wind_deg)}`;

    let uvi = document.getElementById("uvi");
    uvi.innerHTML = `UV Index: ${data.current.uvi}`;

    let flike = document.getElementById("flike");
    pres.innerHTML = `Feels like: ${data.current.feels_like}&deg;`;
  }
  
  function findtmeZone(time){
    const utcTimestampInSeconds = time; 
    const utcTime = new Date(utcTimestampInSeconds * 1000); // Convert seconds to milliseconds
    const localTime = utcTime.toLocaleString();
    let arr = localTime.split(",");
     let c = arr[1].split(":");
     return `${c[0]}:${c[1]}`;
  }


  function findDirection(degrees){
    if (degrees >= 337.5 || degrees < 22.5) {
        return "North";
    } else if (degrees >= 22.5 && degrees < 67.5) {
        return "Northeast";
    } else if (degrees >= 67.5 && degrees < 112.5) {
        return "East";
    } else if (degrees >= 112.5 && degrees < 157.5) {
        return "Southeast";
    } else if (degrees >= 157.5 && degrees < 202.5) {
        return "South";
    } else if (degrees >= 202.5 && degrees < 247.5) {
        return "Southwest";
    } else if (degrees >= 247.5 && degrees < 292.5) {
        return "West";
    } else if (degrees >= 292.5 && degrees < 337.5) {
        return "Northwest";
    }
  }
  

  // when I creating the project the weather api is not autorized, there for i fetch data accordance to below json object
  //                

// {
//     "lat":33.44,
//     "lon":-94.04,
//     "timezone":"America/Chicago",
//     "timezone_offset":-18000,
//     "current":{
//        "dt":1684929490,
//        "sunrise":1684926645,
//        "sunset":1684977332,
//        "temp":292.55,
//        "feels_like":292.87,
//        "pressure":1014,
//        "humidity":89,
//        "dew_point":290.69,
//        "uvi":0.16,
//        "clouds":53,
//        "visibility":10000,
//        "wind_speed":3.13,
//        "wind_deg":93,
//        "wind_gust":6.71,
//        "weather":[
//           {
//              "id":803,
//              "main":"Clouds",
//              "description":"broken clouds",
//              "icon":"04d"
//           }
//        ]
//     },
//     "minutely":[
//        {
//           "dt":1684929540,
//           "precipitation":0
//        },
//        ...
//     ],
//     "hourly":[
//        {
//           "dt":1684926000,
//           "temp":292.01,
//           "feels_like":292.33,
//           "pressure":1014,
//           "humidity":91,
//           "dew_point":290.51,
//           "uvi":0,
//           "clouds":54,
//           "visibility":10000,
//           "wind_speed":2.58,
//           "wind_deg":86,
//           "wind_gust":5.88,
//           "weather":[
//              {
//                 "id":803,
//                 "main":"Clouds",
//                 "description":"broken clouds",
//                 "icon":"04n"
//              }
//           ],
//           "pop":0.15
//        },
//        ...
//     ],
//     "daily":[
//        {
//           "dt":1684951200,
//           "sunrise":1684926645,
//           "sunset":1684977332,
//           "moonrise":1684941060,
//           "moonset":1684905480,
//           "moon_phase":0.16,
//           "summary":"Expect a day of partly cloudy with rain",
//           "temp":{
//              "day":299.03,
//              "min":290.69,
//              "max":300.35,
//              "night":291.45,
//              "eve":297.51,
//              "morn":292.55
//           },
//           "feels_like":{
//              "day":299.21,
//              "night":291.37,
//              "eve":297.86,
//              "morn":292.87
//           },
//           "pressure":1016,
//           "humidity":59,
//           "dew_point":290.48,
//           "wind_speed":3.98,
//           "wind_deg":76,
//           "wind_gust":8.92,
//           "weather":[
//              {
//                 "id":500,
//                 "main":"Rain",
//                 "description":"light rain",
//                 "icon":"10d"
//              }
//           ],
//           "clouds":92,
//           "pop":0.47,
//           "rain":0.15,
//           "uvi":9.23
//        },
//        ...
//     ],
//      "alerts": [
//      {
//        "sender_name": "NWS Philadelphia - Mount Holly (New Jersey, Delaware, Southeastern Pennsylvania)",
//        "event": "Small Craft Advisory",
//        "start": 1684952747,
//        "end": 1684988747,
//        "description": "...SMALL CRAFT ADVISORY REMAINS IN EFFECT FROM 5 PM THIS\nAFTERNOON TO 3 AM EST FRIDAY...\n* WHAT...North winds 15 to 20 kt with gusts up to 25 kt and seas\n3 to 5 ft expected.\n* WHERE...Coastal waters from Little Egg Inlet to Great Egg\nInlet NJ out 20 nm, Coastal waters from Great Egg Inlet to\nCape May NJ out 20 nm and Coastal waters from Manasquan Inlet\nto Little Egg Inlet NJ out 20 nm.\n* WHEN...From 5 PM this afternoon to 3 AM EST Friday.\n* IMPACTS...Conditions will be hazardous to small craft.",
//        "tags": [
 
//        ]
//      },
//      ...
//    ]
                 
 
               
  

