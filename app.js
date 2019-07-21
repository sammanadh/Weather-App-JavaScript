window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector('.degree-section');
    let temperatureUnit = document.querySelector(".unit");


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/ab43ada2c2a7944e7a22f75dc7e1644e/${lat},${long}`;

            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {temperature, summary, icon} = data.currently;
                    //Set dom elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureUnit.textContent = "F";
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    
                    //set icon
                    setIcons(icon, document.querySelector(".icon"));

                    //Change the unit of temperature
                    temperatureSection.addEventListener('click', ()=>{
                        if(temperatureUnit .textContent === "F"){
                            temperatureDegree.textContent=((temperature-32)*5/9.).toFixed(2);
                            temperatureUnit.textContent = "C";
                        }else{
                            temperatureDegree.textContent = temperature;
                            temperatureUnit.textContent = "F";
                        }
                    })

                });
        });
    }else{
        h1.textContent = "Fatal Error!"
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});