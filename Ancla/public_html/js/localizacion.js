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

directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();

/**
 * Inicialización del mapa
 * @returns {void}
 */
function initialize() {
    // Esperamos que cargue PhoneGap. Quitar cuando se esté probando en HTML
    document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap listo. Sacar de la función cuando se esté probando en HTML
    function onDeviceReady() {
    var op1 = {enableHighAccuracy: true, maximumAge: 60000, timeout: 0};
    navigator.geolocation.getCurrentPosition(onSuccess, onError, op1);
    }
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
            msg = "<strong>Oops!</strong> Error desconocido: " + err.message
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
    document.getElementById("map-canvas").innerHTML = msg;
    alert("" + msg);
}

/**
 * Cambia el estado del programa encendiendo/apagando el traking de la posición actual
 * @returns {void}
 */
function switchTraking() {
    var icono = document.getElementById("iconoEstado");
    var boton = document.getElementById("botonEstado");

    if (estadoLocalizacion) {
        //Desactivar
        switchTrakingOff();
    } else {
        //Activar
        switchTrakingOn();
    }
    //initialize();
}

function switchTrakingOn() {
    var icono = document.getElementById("iconoEstado");
    var boton = document.getElementById("botonEstado");
    //Activar
    icono.className = "iconoEstadoOn";
    boton.className = "active";
    mapa.setCenter(posActual.getPosition());
    estadoLocalizacion = true;
}

function switchTrakingOff() {
    var icono = document.getElementById("iconoEstado");
    var boton = document.getElementById("botonEstado");
    //Desactivar
    icono.className = "iconoEstadoOff";
    boton.className = "";
    estadoLocalizacion = false;
}