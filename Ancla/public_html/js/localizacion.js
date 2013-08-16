/**
 * Estado de localización (on/off)
 * @type Boolean|Boolean|Boolean
 */
var estadoLocalizacion = true;
/**
 * Posición actual de la geolocalización
 * @type @exp;google@pro;maps@call;Marker
 */
var posActual;

/**
 * Mapa
 * @type @exp;google@pro;maps@call;Map
 */
var mapa = null;

/**
 * Directions Render
 * @type @exp;google@pro;maps@call;DirectionsRenderer
 */
var directionsDisplay = new google.maps.DirectionsRenderer();

/**
 * Directions Service
 * @type @exp;google@pro;maps@call;DirectionsService
 */
var directionsService = new google.maps.DirectionsService();

/**
 * Inicialización del mapa
 * @returns {void}
 */
function initialize() {
    // Esperamos que cargue PhoneGap. Quitar cuando se esté probando en HTML
    //document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap listo. Sacar de la función cuando se esté probando en HTML
    //function onDeviceReady() {
    var op1 = {enableHighAccuracy: true, maximumAge: 60000, timeout: 60000};
    navigator.geolocation.getCurrentPosition(onSuccess, onError, op1);
    //}
}

/**
 * Función para trabajar con la posición actual obtenida en la geolocalización
 * @param {Position} position Posición en el mapa (objeto de la API)
 * @returns {void}
 */
function onSuccess(position) {

    //Obtener la posición
    var latitude = position.coords.latitude; // Latitud
    var longitude = position.coords.longitude; // Longitud
    var location = new google.maps.LatLng(latitude, longitude);

    //var location = new google.maps.LatLng(38.115277777778, -3.0872222222222);

    if (mapa == null) {
        //Opciones de mapa
        var mapOptions = {
            center: location,
            zoom: 19,
            draggable: true,
            disableDefaultUI: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        //Creamos el mapa
        mapa = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        directionsDisplay.setMap(mapa);
        directionsDisplay.setPanel(document.getElementById("indicacionesPanel"));

        //Pintar anclas
        pintarAnclas();
    }

    //Marcador en el mapa
    if (posActual == null) {
        posActual = new google.maps.Marker({
            position: location,
            map: mapa,
            title: "(" + latitude + "," + longitude + ")",
        });
    } else {
        posActual.setPosition(location);
    }

    if (estadoLocalizacion)
        mapa.setCenter(location);

}

/**
 * Gestión de errores al obtener la posición actual en la geolocalización
 * @param {int} err Código del error
 * @returns {void}
 */
function onError(err) {
    var msg = "";
    switch (err) {
        default:
        case 0:
            msg = "<strong>Oops!</strong> Error desconocido: " + err.message;
            break;
        case 1:
            msg = "<strong>Oops!</strong> Se le ha negado el permiso para recuperar una posición.";
            break;
        case 2:
            msg = "<strong>Oops!</strong> El navegador no ha podido determinar una posición: " + err.message;
            break;
        case 3:
            msg = "<strong>Oops!</strong> Hemos superado el tiempo de espera";
            break;

    }
    document.getElementById("map-canvas").innerHTML = "<br/><br/><br/><br/><br/><br/><div class=\"error\"" + msg + "</div>";
}

/**
 * Activa/desactiva el centrado de la posición actual al realizar la geolocalización
 * @returns {void}
 */
function switchTraking() {
    if (estadoLocalizacion) {
        //Desactivar
        switchTrakingOff();
    } else {
        //Activar
        switchTrakingOn();
    }
}

/**
 * Activa el centrado de la posición actual al realizar la geolocalización
 * @returns {void}
 */
function switchTrakingOn() {
    var icono = document.getElementById("iconoEstado");
    var boton = document.getElementById("botonEstado");
    //Activar
    icono.className = "iconoEstadoOn";
    boton.className = "active";
    mapa.setCenter(posActual.getPosition());
    estadoLocalizacion = true;
}

/**
 * Desactiva el centrado de la posición actual al realizar la geolocalización
 * @returns {undefined}
 */
function switchTrakingOff() {
    var icono = document.getElementById("iconoEstado");
    var boton = document.getElementById("botonEstado");
    //Desactivar
    icono.className = "iconoEstadoOff";
    boton.className = "";
    estadoLocalizacion = false;
}

/**
 * Colapsa (cierra) el menú principal
 * @returns {void}
 */
function collapseNav() {
    //Cerrar el menú desplegable
    $(".nav-collapse").collapse("hide");
}

/**
 * Función para geolocalizar la posición actual
 * @returns {void} Da el control a la funcion onSuccess en caso positivo o a la funcion onError en caso de error
 */
function geolocalizar() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert('Geolocalización no es soportada por su dispositivo.');
    }
}

var velocidadIntervaloGeolocalizacion = 5000;
/**
 * Cambia la velocidad de geolocalización
 * @param {int} valor Velocidad en milisegundos
 * @returns {void}
 */
function setVelocidadIntervaloGeolocalizacion(valor) {
    menu = document.getElementById("menuFrecuenciaRefresco");
    clearInterval(geolocalizacion);
    switch (valor) {
        case 1000:
            velocidadIntervaloGeolocalizacion = 1000;
            menu.innerHTML =
                    '<li class="active"><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(1000);" data-toggle="collapse" data-target=".nav-collapse">1 segundo</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(5000);" data-toggle="collapse" data-target=".nav-collapse">5 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(10000);" data-toggle="collapse" data-target=".nav-collapse">10 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(15000);" data-toggle="collapse" data-target=".nav-collapse">15 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(30000);" data-toggle="collapse" data-target=".nav-collapse">30 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(60000);" data-toggle="collapse" data-target=".nav-collapse">60 segundos</a></li>';
            break;
        case 5000:
            velocidadIntervaloGeolocalizacion = 5000;
            menu.innerHTML =
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(1000);" data-toggle="collapse" data-target=".nav-collapse">1 segundo</a></li>' +
                    '<li class="active"><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(5000);" data-toggle="collapse" data-target=".nav-collapse">5 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(10000);" data-toggle="collapse" data-target=".nav-collapse">10 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(15000);" data-toggle="collapse" data-target=".nav-collapse">15 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(30000);" data-toggle="collapse" data-target=".nav-collapse">30 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(60000);" data-toggle="collapse" data-target=".nav-collapse">60 segundos</a></li>';
            break;
        case 10000:
            velocidadIntervaloGeolocalizacion = 10000;
            menu.innerHTML =
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(1000);" data-toggle="collapse" data-target=".nav-collapse">1 segundo</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(5000);" data-toggle="collapse" data-target=".nav-collapse">5 segundos</a></li>' +
                    '<li class="active"><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(10000);" data-toggle="collapse" data-target=".nav-collapse">10 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(15000);" data-toggle="collapse" data-target=".nav-collapse">15 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(30000);" data-toggle="collapse" data-target=".nav-collapse">30 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(60000);" data-toggle="collapse" data-target=".nav-collapse">60 segundos</a></li>';
            break;
        case 15000:
            velocidadIntervaloGeolocalizacion = 15000;
            menu.innerHTML =
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(1000);" data-toggle="collapse" data-target=".nav-collapse">1 segundo</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(5000);" data-toggle="collapse" data-target=".nav-collapse">5 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(10000);" data-toggle="collapse" data-target=".nav-collapse">10 segundos</a></li>' +
                    '<li class="active"><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(15000);" data-toggle="collapse" data-target=".nav-collapse">15 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(30000);" data-toggle="collapse" data-target=".nav-collapse">30 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(60000);" data-toggle="collapse" data-target=".nav-collapse">60 segundos</a></li>';
            break;
        case 30000:
            velocidadIntervaloGeolocalizacion = 30000;
            menu.innerHTML =
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(1000);" data-toggle="collapse" data-target=".nav-collapse">1 segundo</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(5000);" data-toggle="collapse" data-target=".nav-collapse">5 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(10000);" data-toggle="collapse" data-target=".nav-collapse">10 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(15000);" data-toggle="collapse" data-target=".nav-collapse">15 segundos</a></li>' +
                    '<li class="active"><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(30000);" data-toggle="collapse" data-target=".nav-collapse">30 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(60000);" data-toggle="collapse" data-target=".nav-collapse">60 segundos</a></li>';
            break;
        case 60000:
            velocidadIntervaloGeolocalizacion = 60000;
            menu.innerHTML =
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(1000);" data-toggle="collapse" data-target=".nav-collapse">1 segundo</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(5000);" data-toggle="collapse" data-target=".nav-collapse">5 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(10000); data-toggle="collapse" data-target=".nav-collapse"">10 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(15000);" data-toggle="collapse" data-target=".nav-collapse">15 segundos</a></li>' +
                    '<li><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(30000);" data-toggle="collapse" data-target=".nav-collapse">30 segundos</a></li>' +
                    '<li class="active"><a href="#" onclick="setVelocidadIntervaloGeolocalizacion(60000);" data-toggle="collapse" data-target=".nav-collapse">60 segundos</a></li>';
            break;
    }
    geolocalizacion = window.setInterval("geolocalizar()", velocidadIntervaloGeolocalizacion);
}
var geolocalizacion = window.setInterval("geolocalizar()", velocidadIntervaloGeolocalizacion);

/**
 * Calcula la ruta entre dos puntos y enumera las indicaciones en un div
 * @param {google.maps.LatLng()} inicio Posición de partida
 * @param {google.maps.LatLng()} fin Posición de destino
 * @param {google.maps.DirectionsTravelMode} modo Modo de viaje
 * @returns {void}
 */
function calcularRuta(inicio, fin, modo) {
    var modoViaje;
    switch (modo) {
        default:
        case 'driving':
            modoViaje = google.maps.DirectionsTravelMode.DRIVING;
            break;
        case 'walking':
            modoViaje = google.maps.DirectionsTravelMode.WALKING;
            break;
    }
    var request = {
        origin: inicio,
        destination: fin,
        travelMode: modoViaje
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

/**
 * Limpia la ruta del mapa, así como las indicaciones
 * @returns {void}
 */
function limpiarRuta() {
    directionsDisplay.setDirections({routes: []});
}