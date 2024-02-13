const contenedor = document.querySelector('.contenedor');
const cajaBuscar = document.querySelector('.caja-buscar button');
const cajaClima = document.querySelector('.caja-clima');
const climaDetalles = document.querySelector('.clima-detalles');
const error404 = document.querySelector('.no-encontrado');
const ciudadHide = document.querySelector('.ciudad-hide');

cajaBuscar.addEventListener('click', () => {
    const APIKey = '98740f4ebc0d63bc0f8ba70090e5a091';
    const city = document.querySelector('.caja-buscar input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang={sp,es}`).then(response => response.json()).then(json => {
        if (json.cod == '404') {
            ciudadHide.textContent = city;
            contenedor.style.height = '400px';
            cajaClima.classList.remove('active');
            climaDetalles.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        const image = document.querySelector('.caja-clima img');
        const temperatura = document.querySelector('.caja-clima .temperatura');
        const descripcion = document.querySelector('.caja-clima .descripcion');
        const humedad = document.querySelector('.clima-detalles .info-humedad span');
        const viento = document.querySelector('.clima-detalles .info-viento span');

        if (ciudadHide.textContent == city) {
            return;
        }
        else {
            ciudadHide.textContent = city;

            contenedor.style.height = '555px';
            contenedor.classList.add('active');
            cajaClima.classList.add('active');
            climaDetalles.classList.add('active');
            error404.classList.remove('active');

            setTimeout(() => {
                contenedor.classList.remove('active');
            }, 2500);

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

            const infoClima = document.querySelector('.info-clima');
            const infoHumedad = document.querySelector('.info-humedad');
            const infoViento = document.querySelector('.info-viento');

            const elClonInfoClima = infoClima.cloneNode(true);
            const elClonInfoHumedad = infoHumedad.cloneNode(true);
            const elClonInfoViento = infoViento.cloneNode(true);

            elClonInfoClima.id = 'clone-info-clima';
            elClonInfoClima.classList.add('active-clone');

            elClonInfoHumedad.id = 'clone-info-humedad';
            elClonInfoHumedad.classList.add('active-clone');

            elClonInfoViento.id = 'clone-info-viento';
            elClonInfoViento.classList.add('active-clone');

            setTimeout(() => {
                infoClima.insertAdjacentElement("afterend", elClonInfoClima);
                infoHumedad.insertAdjacentElement("afterend", elClonInfoHumedad);
                infoViento.insertAdjacentElement("afterend", elClonInfoViento);
            }, 2500);

            const cloneInfoClima = document.querySelectorAll('info-clima.active-clone');
            const totalCloneInfoClima = cloneInfoClima.length;
            const cloneInfoClimaFirst = cloneInfoClima[0];

            const cloneInfoHumedad = document.querySelectorAll('info-humedad.active-clone');
            const cloneInfoHumedadFirst = cloneInfoHumedad[0];

            const cloneInfoViento = document.querySelectorAll('info-viento.active-clone');
            const cloneInfoVientoFirst = cloneInfoViento[0];

            if(totalCloneInfoClima > 0){
                cloneInfoClimaFirst.classList.remove('active-clone');
                cloneInfoHumedadFirst.classList.remove('active-clone');
                cloneInfoVientoFirst.classList.remove('active-clone');

                setTimeout(() => {
                    cloneInfoClimaFirst.remove();
                    cloneInfoHumedadFirst.remove();
                    cloneInfoVientoFirst.remove();
                }, 2200);
            }
        }
    });
});