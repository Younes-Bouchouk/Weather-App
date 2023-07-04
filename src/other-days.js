const url2 = 'https://api.openweathermap.org/data/2.5/forecast?lang=fr&units=metric&q='
// const key = '&appid=9eb12fea20f30163d3c454e7bd4e2f4e' ;
let data2;

async function getOtherWeather() {
  var city = document.getElementById('city').value;
  var api = await fetch(url2 + city + key);

  var data = await api.json();

  data2 = data
  console.log(data2)
  return data2

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

    document.getElementById('title-day' + n).innerHTML = firstLetterUpper(weekDay)
    document.getElementById('date-day' + n).innerHTML = date.getDate() + ' ' + firstLetterUpper(month)

}

function getWeatherOtherDate() {
    for (var i = 1; i < 5; i++) {
        setWeatherOtherDate(i)
    }
}

// --------------------------------------------------


function setIconOtherDate(n) {
    document.getElementById('icon-day' + n).src = 'img/' + data2.list[n*8].weather[0].main + '.png'
    // console.log(n + ' = ' + data2.list[n*8].weather[0].main)
    // console.log(data2.list[n*8])
    
    // console.log("n = "+ n + " | " + n*8 + " - " + data2.list[n*8].weather[0].main)

}

function getIconOtherDate() {
    for (var i = 1; i < 5; i++) {
        setIconOtherDate(i)
    }
}

// ----------------------------------------------------

// Fonction pour trouver la liste qui contient les données de la journée suivante à 15h
// let day1 = 

function setDateTomorrow() {
    var date = new Date();
    date.setDate(date.getDate() + 1)

    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);

    date = `${year}-${month}-${day} 00:00:00`;

    // console.log(date);
    // console.log(data2.list[1].dt_txt)

    return date

    // var i = 1
    // while (date != data2.list[i].dt_txt) {
    //     console.log(date + ' / ' + data2.list[i].dt_txt)
    //     i++
    // }
    // console.log(i)

}

let temp = {
    day1 : [],
    day2 : [],
    day3 : [],
    day4 : []
}


function setListTemp() {
    var n = 1
    while (setDateTomorrow() != data2.list[n].dt_txt) {
        console.log(setDateTomorrow() + ' / ' + data2.list[n].dt_txt)
        n++
    }
    console.log(n)

    for (var i = 1; i < 5; i++ ) {
        for (var u = 0; u < 8; u++){
            temp['day'+i].push(Math.round(data2.list[n].main.temp))
            n++
        }
        console.log(i)
        console.log(temp)
    }
    var min = Math.max(...temp[`day${1}`])
    console.log(min)
}

function TempMinMax() {
    for (var i = 1; i < 5; i++) {
        document.getElementById(`max-temp${i}`).innerHTML = Math.max(...temp[`day${i}`])+ '°'
        document.getElementById(`min-temp${i}`).innerHTML = Math.min(...temp[`day${i}`])+ '°'
    }

}




