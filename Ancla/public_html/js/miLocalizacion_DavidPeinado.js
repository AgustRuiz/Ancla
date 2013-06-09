function localizacionPrincipal() {
    var op1 = { enableHighAccuracy: true, maximumAge: 60000, timeout: 45000 };

    if (window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(propiedades, errores, op1);
    } else {
        alert("Su navegador no soporta geolocalización");
        return;
    }

    var map;
    var miPosicion;

    var lantlong = { lat: "", lon: "" };

    var otrasPropiedades = { alt: "", acc: "", altAcc: "", hea: "", spe: "", tim: "" };

    function propiedades(coordenadas) {
        lantlong.lat = coordenadas.coords.latitude;
        lantlong.lon = coordenadas.coords.longitude;

        if (coordenadas.coords.altitude === null) otrasPropiedades.alt = "No se ha podido determinar";
        else otrasPropiedades.alt = coordenadas.coords.altitude;

        otrasPropiedades.acc = coordenadas.coords.accuracy;

        if (coordenadas.coords.altitudeAccuracy === null) otrasPropiedades.altAcc = "No se ha podido determinar";
        else otrasPropiedades.altAcc = coordenadas.coords.altitudeAccuracy;

        if (coordenadas.coords.heading === null) otrasPropiedades.hea = "No se ha podido determinar";
        else otrasPropiedades.hea = coordenadas.coords.heading;

        if (coordenadas.coords.speed === null) otrasPropiedades.spe = "No se ha podido determinar";
        else otrasPropiedades.spe = coordenadas.coords.speed;

        var data = new Date();
        data.setTime(coordenadas.timestamp);
        var minuto;
        var mes = Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 
                        'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
        (data.getMinutes() < 10) ? minuto = '0' + data.getMinutes() : minuto = data.getMinutes();

        otrasPropiedades.tim = data.getDate() + " de " + mes[data.getMonth()] + " de " 
                               + data.getFullYear() + " a las " + data.getHours() + ":" + minuto;

        mapa();
    }

    function errores(err) { 
        if (err.code === 0) alert("Oops! Error desconocido: " + err.message);
        if (err.code === 1) alert("Oops! Se le ha negado el permiso para recuperar una posición.");
        if (err.code === 2) alert("Oops! El navegador no ha podido determinar una posición: " + err.message);
        if (err.code === 3) alert("Oops! Hemos superado el tiempo de espera");
    }

    function mapa() {
        var tmp = document.getElementById("geolocalizacion");
        tmp.innerHTML = "</br>Propiedades de mis coordenadas" + "<br/><br/>"
        + "Latitud: " + lantlong.lat + "<br/>" + "Longitud: " + lantlong.lon + "<br/>"
        + "Altitud: " + otrasPropiedades.alt + "<br/>" + "Precisión: " + otrasPropiedades.acc + "<br/>"
        + "Precisión de la altitud: " + otrasPropiedades.altAcc + "<br/>"
        + "Sentido del dispositivo: " + otrasPropiedades.hea + "<br/>"
        + "Velocidad (metros/seg): " + otrasPropiedades.spe + "<br/>"
        + "Fecha y hora de la posición obtenida: " + otrasPropiedades.tim;

        var mapDiv = document.getElementById("mapa");

        miPosicion = new google.maps.LatLng(lantlong.lat, lantlong.lon);

        var op2 = { center: miPosicion, zoom: 17, mapTypeId: google.maps.MapTypeId.ROADMAP };

        map = new google.maps.Map(mapDiv, op2);

        var marcador = new google.maps.Marker({ 
            position: miPosicion, map: map, title: "Estoy aquí", animation: google.maps.Animation.DROP
        });
    }
}
 