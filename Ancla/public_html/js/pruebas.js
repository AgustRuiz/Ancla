var anclasArray = [];


function placeMarker(colorAncla) {
    var descripcion = prompt("Descripción del ancla");
    if (descripcion != "" && descripcion != null) {

        //Selector del color
        iconBase = "img/markers/";
        var imagen;
        switch (colorAncla) {
            case 'roja':
                imagen = 'ancla_roja.png';
                break;
            case 'amarilla':
                imagen = 'ancla_amarilla.png';
                break;
            case 'verde':
                imagen = 'ancla_verde.png';
                break;
            case 'azul':
                imagen = 'ancla_azul.png';
                break;
            case 'naranja':
                imagen = 'ancla_naranja.png';
                break;
            case 'morada':
                imagen = 'ancla_morada.png';
                break;
            case 'marron':
                imagen = 'ancla_marron.png';
                break;
            case 'blanca':
                imagen = 'ancla_blanca.png';
                break;
            case 'negra':
                imagen = 'ancla_negra.png';
                break;
            default:
                imagen = 'ancla_roja.png';
        }

        //Plantar ancla en el mapa
        var marcador = new google.maps.Marker({
            position: mapa.getCenter(),
            map: mapa,
            title: descripcion,
            animation: google.maps.Animation.DROP,
            icon: iconBase + imagen,
            shadow: iconBase + 'ancla_sombra.png'
        });

        //Listener al hacer clic en el ancla
        google.maps.event.addListener(marcador, 'click', function() {
            //Centrar al ancla
            mapa.setCenter(new google.maps.LatLng(marcador.position.lat(), marcador.position.lng()));
            //Desplegar menú
            document.getElementById("menuAnclaTitulo").innerHTML = '<img src="'+marcador.icon+'"/>'+marcador.title;
            $('#menuAncla').modal('show');
        });

        //Guardar ancla en el array
        anclasArray.push(marcador);

        //Actualizar el menú de anclas
        actualizarMenuAnclas()
    }
}

function actualizarMenuAnclas() {
    var menuAnclas = document.getElementById("menuAnclas");
    var contenidoMenuAnclas = "";
    for (var i = 0; i < anclasArray.length; i++) {
        contenidoMenuAnclas += '<li><a href="#" onclick="seleccionarAncla(' + i + ');"><img src="' + anclasArray[i].icon + '"/>' + anclasArray[i].title + '</a></li>';
    }
    menuAnclas.innerHTML = contenidoMenuAnclas;
}

function pintarAnclas() {
    for (var i = 0; i < anclasArray.length; i++)
        anclasArray[i].setMap(mapa); //Asignar el ancla al mapa lo dibuja sin animación
}

function irPosicion(lat, long) {
    var posicion = new google.maps.LatLng(lat, long);
    mapa.setCenter(posicion);
}

function seleccionarAncla(i) {
    ancla = anclasArray[i];

    //Centrar posición
    irPosicion(ancla.position.lat(), ancla.position.lng());

    /*
     * Falta el menú del ancla
     */
}