var estadoLocalizacion = true;
var posActual;
var mapa;

function initialize() {

    // Esperamos que cargue PhoneGap. Quitar cuando se esté probando en HTML
    //document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap listo. Sacar de la función cuando se esté probando en HTML
    //function onDeviceReady() {
    var op1 = {enableHighAccuracy: true, maximumAge: 60000, timeout: 45000};
    navigator.geolocation.getCurrentPosition(onSuccess, onError, op1);
    //}

/*
    google.maps.event.addListener(map, 'center_changed', function() {
        // 3 seconds after the center of the map has changed, pan back to the
        // marker.
        window.setTimeout(function() {
            map.panTo(marker.getPosition());
        }, 3000);
    });//*/
}

function onSuccess(position) {

    //Obtener la posición
    var latitude = position.coords.latitude; // Latitud
    var longitude = position.coords.longitude; // Longitud
    var location = new google.maps.LatLng(latitude, longitude);

    //var location = new google.maps.LatLng(38.115277777778, -3.0872222222222);

    //Opciones de mapa
    var mapOptions = {
        center: location,
        zoom: 19,
        disableDefaultUI: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //Creamos el mapa
    mapa = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    //Marcador en el mapa
    if (estadoLocalizacion) {
        var posActual = new google.maps.Marker({
            position: mapa.getCenter(),
            map: mapa,
            title: "Estás aquí",
            animation: google.maps.Animation.DROP
        });
    }
    
    //Pintar anclas
    pintarAnclas();

}
function onError(err) {
    var msg = "";
    switch (err) {
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
    alert(msg);
}

function switchTraking() {
    var icono = document.getElementById("iconoEstado");
    var boton = document.getElementById("botonEstado");

    if (estadoLocalizacion) {
        //Desactivar
        icono.className = "iconoEstadoOff";
        boton.className = "";
        estadoLocalizacion = false;
    } else {
        //Activar
        icono.className = "iconoEstadoOn";
        boton.className = "active";
        estadoLocalizacion = true;
    }
    initialize();
}