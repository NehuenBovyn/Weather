const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (nameCity.value === '' || nameCountry === '') {
        showError('Ambos campos son obligatorios');
        return;
    }

    callAPI(nameCity.value, nameCountry.value);
    //console.log(nameCity.value);
    //console.log(nameCountry.value);
})

function callAPI(city, country) {
    const apiId = 'ea4efadb5635c902ddbc15b3b99484bb';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;

    fetch(url)
    .then(data => {
        return data.json();
    })
    .then(dataJSON => {
        if (dataJSON.cod === '404') {
            showError('Ciudad no encontrada')
        }else{
            clearHTML();
            showWeather(dataJSON);
        }
        //console.log(dataJSON); //(muestra toda la info del json)
    })
    .catch(error => {
        console.log(error);
    })
}

function showWeather(data) {
    const {name,main:{temp,temp_min,temp_max}}= data;

    const degress = kelvinToCentrigrade(temp);
    const max = kelvinToCentrigrade(temp_max);
    const min = kelvinToCentrigrade(temp_min);

    const content = document.createElement('div');
    content.innerHTML = `
    <h5>Clima en ${name} </h5>        
    <h2>${degress}°C</h2>
    <p>Max: ${max}°C</p>
    <p>Min: ${min}°C</p>`;

    result.appendChild(content);

    // console.log(name);
    // console.log(temp);
    // console.log(temp_max);
    // console.log(temp_min);
}

function showError(message) {
    console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(()=>{
        alert.remove();
    }, 3000);
}

function kelvinToCentrigrade(temp) {
    return parseInt(temp - 273.15);
}

function clearHTML() {
    result.innerHTML = '';
}