/**
 * 
 * @type Array Vector de anclas
 */
var anclasArray = [];

/**
 * Planta un ancla en el lugar donde está centrado el mapa
 * @param {string} colorAncla Color del ancla (ver colores válidos)
 * @returns {void} Planta el ancla del color seleccionado en el centro del mapa, crea un listener para mostrar el menú del ancla y actualiza el vector de anclas
 */
function placeMarker(colorAncla) {
    var nombre = prompt("Nombre del ancla");
    if (nombre != "" && nombre != null) {

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
            title: nombre,
            animation: google.maps.Animation.DROP,
            icon: iconBase + imagen,
            shadow: iconBase + 'ancla_sombra.png'
        });

        //Listener al hacer clic en el ancla
        google.maps.event.addListener(marcador, 'click', function() {
            //Centrar al ancla
            mapa.setCenter(new google.maps.LatLng(marcador.position.lat(), marcador.position.lng()));
            //Contenido del menú
            document.getElementById("menuAnclaTitulo").innerHTML = '<img src="'+marcador.icon+'"/>'+marcador.title;
            document.getElementById("menuAnclaBtnEliminar").onclick = function(){eliminarAncla(0);};
            document.getElementById("menuAnclaBtnGuardar").onclick = function(){guardarAncla(0);};
            //Mostrar modal
            document.location="#menuAncla";
            $('#menuAncla').modal('show');
        });

        //Guardar ancla en el array
        anclasArray.push(marcador);

        //Actualizar el menú de anclas
        actualizarMenuAnclas();
    }
}

/**
 * Actualiza el menú de anclas según el contenido del vector de anclas para centrar la posición al selecionar una cualquiera
 * @returns {void}
 */
function actualizarMenuAnclas() {
    var menuAnclas = document.getElementById("menuAnclas");
    var contenidoMenuAnclas = "";
    for (var i = 0; i < anclasArray.length; i++) {
        contenidoMenuAnclas += '<li><a href="#" onclick="centrarAncla(' + i + ');"><img src="' + anclasArray[i].icon + '"/>' + anclasArray[i].title + '</a></li>';
    }
    menuAnclas.innerHTML = contenidoMenuAnclas;
}

function pintarAnclas() {
    for (var i = 0; i < anclasArray.length; i++)
        anclasArray[i].setMap(mapa); //Asignar el ancla al mapa lo dibuja sin animación
}

/**
 * Centra el mapa a una posición dada
 * @param {float} lat Latitud
 * @param {float} long Longitud
 * @returns {void} Centra el mapa a la posición (lat, long)
 */
function irPosicion(lat, long) {
    var posicion = new google.maps.LatLng(lat, long);
    mapa.setCenter(posicion);
}

/**
 * Centra la posición del ancla
 * @param {int} i Índice del ancla en el vector de anclas
 * @returns {void} Centra el mapa a la posición del ancla i
 */
function centrarAncla(i) {
    ancla = anclasArray[i];
    irPosicion(ancla.position.lat(), ancla.position.lng());
}

function eliminarAncla(i){
    alert("Aún no elimino");
}
function guardarAncla(i){
    alert("Aún no guardo");
}