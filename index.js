let button  = document.getElementById("fetch");

button.addEventListener("click",()=>{
    navigator.geolocation.getCurrentPosition(showPosition,errorfunction);

   window.location.href = "http://127.0.0.1:5500/app.html"
})

function showPosition(position){
    document.cookie = `latitude=${position.coords.latitude}; path=http://127.0.0.1:5500/app.html;`
    document.cookie = `longitude=${position.coords.longitude}; path=http://127.0.0.1:5500/app.html;`
    console.log(typeof(position.coords));
}

function errorfunction(error){
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.error("User denied the request for geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.error("An unknown error occurred.");
            break;
    }
}