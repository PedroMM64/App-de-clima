const contenedor = document.querySelector('.contenedor');
const cajaBuscar = document.querySelector('.caja-buscar button');
const cajaClima = document.querySelector('.caja-clima');
const climaDetalles = document.querySelector('.clima-detalles');

cajaBuscar.addEventListener('click', () => {
    const APIKey = '98740f4ebc0d63bc0f8ba70090e5a091';
    const city = document.querySelector('.caja-buscar input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang={sp,es}`).then(response => response.json()).then(json => {
        const image = document.querySelector('.caja-clima img');
        const temperatura = document.querySelector('.caja-clima .temperatura');
        const descripcion = document.querySelector('.caja-clima .descripcion');
        const humedad = document.querySelector('.clima-detalles .info-humedad span');
        const viento = document.querySelector('.clima-detalles .info-viento span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'Imagenes/clear.png';
                break;
            case 'Rain':
                image.src = 'Imagenes/rain.png';
                break;
            case 'Mist':
                image.src = 'Imagenes/mist.png';
                break;
            case 'Snow':
                image.src = 'Imagenes/snow.png';
                break;
            case 'Clouds':
                image.src = 'Imagenes/cloud.png';
                break;
            case 'Haze':
                image.src = 'Imagenes/mist.png';
                break;
            default:
                image.src = 'Imagenes/cloud.png';
        }
        
        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        descripcion.innerHTML = `${json.weather[0].description}`;
        humedad.innerHTML = `${json.main.humidity}%`;
        viento.innerHTML = `${parseInt(json.wind.speed)}Km/hr`;
    });
});