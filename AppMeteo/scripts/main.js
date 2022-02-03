import tabJourEnOrdre from "../Utilitaire/gestionTemps.js";

const CLEFAPI = '1581971648a9e41fce9cf2eb55a14323';
let resultatsAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        //console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long, lat);
    }, () => {
        alert(`Vous avez refusé la géolocalition, l'application ne peut pas
         fonctionner, veuillez l'activer.!`)
    })
}


function AppelAPI(long, lat) {
    // Appel à la longitude & lattitude
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
        // On passe la réponse à l'appel au format json
        .then((reponse) => {
            return reponse.json();
        })
        .then((data) => {
            //console.log(data);

            resultatsAPI = data;

            temps.innerText = resultatsAPI.current.weather[0].description;
            temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`
            localisation.innerText = resultatsAPI.timezone;

            // les heures, par tranches trois, avec leur temperature.

            //permet d'obtenir la date et l'heure actuelle
            let heureActuelle = new Date().getHours();

            for (let i = 0; i < heure.length; i++) {

                let heureIncr = heureActuelle + i * 3;

                if (heureIncr > 24) {
                    heure[i].innerText = `${heureIncr - 24} h`;
                } else if (heureIncr === 24) {
                    heure[i].innerText = "00h"
                } else {
                    heure[i].innerText = `${heureIncr} h`;
                }

            }

            // temp pour 3h
            for (let j = 0; j < tempPourH.length; j++) {
                tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`
            }



            // trois premieres lettres des jours 

            for (let k = 0; k < tabJourEnOrdre.length; k++) {
                joursDiv[k].innerText = tabJourEnOrdre[k].slice(0, 3);
            }


            // Temp par jour 

            for (let m = 0; m < 7; m++) {
                tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)}`
            }

            // Icone dynamique

            if (heureActuelle >= 6 && heureActuelle < 21) {
                imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
            } else {
                imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
            }


            chargementContainer.classList.add('disparition');
        })
}