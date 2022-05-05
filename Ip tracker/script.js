const IP = document.getElementById('ip');
const city = document.getElementById('location');
const timezone = document.getElementById('timezone');
const ZIP = document.getElementById('zipcode');
const input = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
let userIP;

fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        IP.innerText = data.ip;
        city.innerHTML = `<p>${data.city}, ${data.country_name}</p>
        `; 
        timezone.innerText = data.timezone;
        ZIP.innerText = data.postal;

        localStorage.setItem('latitude', JSON.stringify(data.latitude))
        localStorage.setItem('longitude', JSON.stringify(data.longitude))
    });
    
searchBtn.addEventListener('click', (e) => {
    userIP = input.value;
    fetch(`http://ip-api.com/json/${userIP}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        IP.innerText = data.query ? data.query : 'No data';
        city.innerHTML = `<div class="text__location">${data.city ? data.city : 'No data'}, ${data.country ? data.country : 'No data'}</div>
        `; 
        timezone.innerText = data.timezone ? data.timezone : 'No data';
        ZIP.innerText = data.zip ? data.zip : 'No data';

        localStorage.setItem('latitude1', JSON.stringify(data.lat))
        localStorage.setItem('longitude1', JSON.stringify(data.lon))
    });
})

L.mapbox.accessToken = 'pk.eyJ1Ijoia2xpbWVudHlrayIsImEiOiJjbDJkZnlrZTEwMGFvM2JsZXBicmlkaGthIn0.Ft1RNODYR88JCgrFrPhXVw';

let lat = localStorage.getItem('latitude');
let lon = localStorage.getItem('longitude');

let lat1 = localStorage.getItem('latitude1');
let lon1 = localStorage.getItem('longitude1');

const loca = {
    latitude: JSON.parse(lat),
    longitude: JSON.parse(lon)
}

const loca1 = {
    latitude: JSON.parse(lat1),
    longitude: JSON.parse(lon1)
}

const map = L.mapbox.map('map')
.setView([loca.latitude,loca.longitude], 14)
.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));



