// Api qui permet d'obtenir la latitude et longitude d'une ville
// const url3 = 'https://nominatim.openstreetmap.org/search/?format=json&addressdetails=11&limit=1&q='

// Api qui permet d'obtenir l'heure locale d'un ville à partir de sa latitude et longitude 
const url3 = 'http://api.timezonedb.com/v2.1/get-time-zone?key=K0L4SPMS4I0I&format=json&by=position&'
let data3

async function getNextHours() {

    var lat = 'lat=' + data2.city.coord.lat
    console.log(lat)

    var lon = 'lng=' + data2.city.coord.lon
    console.log(lon)

    console.log(url3 + lat + '&' + lon)

    var api = await fetch(url3 + lat + '&' + lon);
  
    data3 = await api.json();

    console.log(data3)
    console.log(data3.zoneName)

}

function convertTime() {

    var dateString = data2.list[0].dt_txt;
    console.log(dateString);

    var dateObject = new Date(dateString);
    console.log(dateObject);

    var unixTime = Math.floor(dateObject.getTime() / 1000)
    console.log(unixTime)
    return unixTime
}


async function setNextTime() {

    var zoneName = data3.zoneName

    var zoneTime = convertTime()

    var api = await fetch(`https://api.timezonedb.com/v2.1/convert-time-zone?key=K0L4SPMS4I0I&format=json&from=Europe/Paris&to=${zoneName}&time=${zoneTime}`);
    
    var data4 = await api.json();

    console.log(data4.toTimestamp)

    var date = new Date(data4.toTimestamp * 1000);

    var hours = date.getHours();

    console.log(hours)

    // document.getElementById('hour0').innerHTML = hours + 'h'

    return hours

}

function getNextTime() {

    var hour = setNextTime()

    hour.then((valeur) => {
        for (var i = 0; i < 10; i ++) {
            if (valeur > 21){
                valeur = 0
            }
                
            document.getElementById(`hour${i}`).innerHTML = valeur + 'h'
            document.getElementById(`img${i}`).src = 'img/' + data2.list[i].weather[0].main + '.png'
            console.log(data2.list[i].weather[0].main)
            valeur += 3 // Intervalle de 3h
            
        }
    })

    
    
}

