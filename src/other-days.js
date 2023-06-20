const url2 = 'https://api.openweathermap.org/data/2.5/forecast?lang=fr&units=metric&q='
// const key = '&appid=9eb12fea20f30163d3c454e7bd4e2f4e' ;
let data2;

async function getOtherWeather() {
  var city = document.getElementById('city').value;
  var api = await fetch(url2 + city + key);

  data2 = await api.json();

  console.log(data2)

//   console.log(data2.list[0].weather[0].main)
//   console.log(data2.list[8].weather[0].main)
//   console.log(data2.list[16].weather[0].main)
//   console.log(data2.list[24].weather[0].main)
//   console.log(data2.list[32].weather[0].main)

}

function firstLetterUpper(mot) {

    var premiereLettreMaj = mot.charAt(0).toUpperCase() + mot.slice(1);
    
    return premiereLettreMaj
  }

// --------------------------------------------------

function setWeatherOtherDate(n) {
    var date = new Date()

    date.setDate(date.getDate() + n)

    var optionWeekDay = { weekday: 'long' };
    var optionMonth = { month: 'long' };

    var weekDay = date.toLocaleDateString('fr-FR', optionWeekDay);
    var month = date.toLocaleDateString('fr-FR', optionMonth);

    if (n == 1) {
        weekDay = "Demain"
    }

    document.getElementById(`title-day${n}`).innerHTML = firstLetterUpper(weekDay)
    document.getElementById(`date-day${n}`).innerHTML = date.getDate() + ' ' + firstLetterUpper(month)

}

function getWeatherOtherDate() {
    for (var i = 1; i < 6; i++) {
        setWeatherOtherDate(i)
    }
}

// --------------------------------------------------


function setIconOtherDate(n) {
    document.getElementById(`icon-day${n}`).src = `img/${data2.list[n].weather[0].main}.png`
    
    // console.log("n = "+ n + " | " + n*8 + " - " + data2.list[n*8].weather[0].main)

}

function getIconOtherDate() {
    for (var i = 1; i < 6; i++) {
        setIconOtherDate(i)
    }
}




