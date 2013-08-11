function geolocalizar() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert('Geolocalización no es soportada por su dispositivo.s');
    }
}

var velocidadIntervaloGeolocalizacion = 5000;
function setVelocidadIntervaloGeolocalizacion(valor) {
    menu = document.getElementById("menuFrecuenciaRefresco");
    clearInterval(geolocalizacion);
    switch (valor) {
        case 1000:
            velocidadIntervaloGeolocalizacion = 1000;
            menu.innerHTML =
                    '<li class="active"><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(1000);">1 segundo</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(5000);">5 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(10000);">10 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(15000);">15 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(30000);">30 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(60000);">60 segundos</a></li>';
            break;
        case 5000:
            velocidadIntervaloGeolocalizacion = 5000;
            menu.innerHTML =
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(1000);">1 segundo</a></li>' +
                    '<li class="active"><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(5000);">5 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(10000);">10 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(15000);">15 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(30000);">30 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(60000);">60 segundos</a></li>';
            break;
        case 10000:
            velocidadIntervaloGeolocalizacion = 10000;
            menu.innerHTML =
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(1000);">1 segundo</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(5000);">5 segundos</a></li>' +
                    '<li class="active"><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(10000);">10 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(15000);">15 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(30000);">30 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(60000);">60 segundos</a></li>';
            break;
        case 15000:
            velocidadIntervaloGeolocalizacion = 15000;
            menu.innerHTML =
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(1000);">1 segundo</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(5000);">5 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(10000);">10 segundos</a></li>' +
                    '<li class="active"><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(15000);">15 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(30000);">30 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(60000);">60 segundos</a></li>';
            break;
        case 30000:
            velocidadIntervaloGeolocalizacion = 30000;
            menu.innerHTML =
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(1000);">1 segundo</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(5000);">5 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(10000);">10 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(15000);">15 segundos</a></li>' +
                    '<li class="active"><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(30000);">30 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(60000);">60 segundos</a></li>';
            break;
        case 60000:
            velocidadIntervaloGeolocalizacion = 60000;
            menu.innerHTML =
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(1000);">1 segundo</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(5000);">5 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(10000);">10 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(15000);">15 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(30000);">30 segundos</a></li>' +
                    '<li class="active"><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(60000);">60 segundos</a></li>';
            break;
    }
    geolocalizacion = window.setInterval("geolocalizar()", velocidadIntervaloGeolocalizacion);
}

var geolocalizacion = window.setInterval("geolocalizar()", velocidadIntervaloGeolocalizacion);