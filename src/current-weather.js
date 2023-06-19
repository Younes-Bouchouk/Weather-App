const url = 'https://api.openweathermap.org/data/2.5/weather?lang=fr&units=metric&q=' ;
const key = '&appid=9eb12fea20f30163d3c454e7bd4e2f4e' ;

async function getCurrentWeather() {
  var city = document.getElementById('city').value;
  var api = await fetch(url + city + key);

  if( api.status == 404) {
    document.getElementById('error').style.display = 'block'
    document.getElementById('weather').style.display = 'none';
  } else {

    var data = await api.json();

    document.getElementById('temp').innerHTML = Math.round(data.main.temp);
    document.getElementById('name').innerHTML = data.name;

    document.getElementById('humidity').innerHTML = data.main.humidity + ' %';
    document.getElementById('wind').innerHTML = Math.round(data.wind.speed) + ' km/h';
  
    document.getElementById('weather-icon').src = `img/${data.weather[0].main}.png`


    var date = new Date()

    var optionWeekDay = { weekday: 'long' };
    var optionMonth = { month: 'long' };

    var weekDay = date.toLocaleDateString('fr-FR', optionWeekDay);
    var month = date.toLocaleDateString('fr-FR', optionMonth);

    document.getElementById('current-date').innerHTML = firstLetterUpper(weekDay) + ' ' + date.getDate() + ' ' + firstLetterUpper(month)

    document.getElementById('weather').style.display = 'block';
    document.getElementById('error').style.display = 'none'
    
    getOtherWeather()
    .then(function(){
      getWeatherOtherDate()
      getIconOtherDate()
    })
  }

}










