/**
 * Vector de anclas
 * @type Array
 */
var anclasArray = [];

/**
 * Ruta de la carpeta de marcadores
 * @type String
 */
var iconBase = "img/markers/";

/**
 * Planta un ancla en el lugar donde está centrado el mapa
 * @param {string} colorAncla Color del ancla (ver colores válidos)
 * @returns {void} Planta el ancla del color seleccionado en el centro del mapa, crea un listener para mostrar el menú del ancla y actualiza el vector de anclas
 */
function placeMarker(colorAncla) {
    var nombre = prompt("Nombre del ancla");
    if (nombre != "" && nombre != null) {

        //Selector del color
        var imagen = iconBase + "ancla_" + colorAncla + ".png";

        //Plantar ancla en el mapa
        var marcador = new google.maps.Marker({
            position: mapa.getCenter(),
            map: mapa,
            title: nombre,
            description: "",
            animation: google.maps.Animation.DROP,
            icon: imagen,
            color: colorAncla
        });

        //Guardar ancla en el array
        anclasArray.push(marcador);
        var indice = anclasArray.length - 1;
        marcador = anclasArray[indice];

        //Actualizar el menú de anclas y los listeners
        actualizarMenuAnclas();
    }
}

/**
 * Genera el select para que quede predeterminado un color del ancla
 * @param {type} colorAncla Color predeterminado
 * @returns {String} Select con el color del ancla
 */
function generarSelectColorAncla(colorAncla) {
    var selectColor;
    switch (colorAncla) {
        default:
        case 'roja':
            imagen = 'ancla_roja.png';
            selectColor =
                    '<option value="roja" selected>Roja</option>' +
                    '<option value="amarilla">Amarilla</option>' +
                    '<option value="verde">Verde</option>' +
                    '<option value="azul">Azul</option>' +
                    '<option value="naranja">Naranja</option>' +
                    '<option value="morada">Morada</option>' +
                    '<option value="marron">Marrón</option>' +
                    '<option value="blanca">Blanca</option>' +
                    '<option value="negra">Negra</option>';
            imagen = 'ancla_roja.png';
            selectColor =
                    '<option value="roja" selected>Roja</option>' +
                    '<option value="amarilla">Amarilla</option>' +
                    '<option value="verde">Verde</option>' +
                    '<option value="azul">Azul</option>' +
                    '<option value="naranja">Naranja</option>' +
                    '<option value="morada">Morada</option>' +
                    '<option value="marron">Marrón</option>' +
                    '<option value="blanca">Blanca</option>' +
                    '<option value="negra">Negra</option>';
            break;
        case 'amarilla':
            imagen = 'ancla_amarilla.png';
            selectColor =
                    '<option value="roja">Roja</option>' +
                    '<option value="amarilla" selected>Amarilla</option>' +
                    '<option value="verde">Verde</option>' +
                    '<option value="azul">Azul</option>' +
                    '<option value="naranja">Naranja</option>' +
                    '<option value="morada">Morada</option>' +
                    '<option value="marron">Marrón</option>' +
                    '<option value="blanca">Blanca</option>' +
                    '<option value="negra">Negra</option>';
            break;
        case 'verde':
            imagen = 'ancla_verde.png';
            selectColor =
                    '<option value="roja">Roja</option>' +
                    '<option value="amarilla">Amarilla</option>' +
                    '<option value="verde" selected>Verde</option>' +
                    '<option value="azul">Azul</option>' +
                    '<option value="naranja">Naranja</option>' +
                    '<option value="morada">Morada</option>' +
                    '<option value="marron">Marrón</option>' +
                    '<option value="blanca">Blanca</option>' +
                    '<option value="negra">Negra</option>';
            break;
        case 'azul':
            imagen = 'ancla_azul.png';
            selectColor =
                    '<option value="roja">Roja</option>' +
                    '<option value="amarilla">Amarilla</option>' +
                    '<option value="verde">Verde</option>' +
                    '<option value="azul" selected>Azul</option>' +
                    '<option value="naranja">Naranja</option>' +
                    '<option value="morada">Morada</option>' +
                    '<option value="marron">Marrón</option>' +
                    '<option value="blanca">Blanca</option>' +
                    '<option value="negra">Negra</option>';
            break;
        case 'naranja':
            imagen = 'ancla_naranja.png';
            selectColor =
                    '<option value="roja">Roja</option>' +
                    '<option value="amarilla">Amarilla</option>' +
                    '<option value="verde">Verde</option>' +
                    '<option value="azul">Azul</option>' +
                    '<option value="naranja" selected>Naranja</option>' +
                    '<option value="morada">Morada</option>' +
                    '<option value="marron">Marrón</option>' +
                    '<option value="blanca">Blanca</option>' +
                    '<option value="negra">Negra</option>';
            break;
        case 'morada':
            imagen = 'ancla_morada.png';
            selectColor =
                    '<option value="roja">Roja</option>' +
                    '<option value="amarilla">Amarilla</option>' +
                    '<option value="verde">Verde</option>' +
                    '<option value="azul">Azul</option>' +
                    '<option value="naranja">Naranja</option>' +
                    '<option value="morada" selected>Morada</option>' +
                    '<option value="marron">Marrón</option>' +
                    '<option value="blanca">Blanca</option>' +
                    '<option value="negra">Negra</option>';
            break;
        case 'marron':
            imagen = 'ancla_marron.png';
            selectColor =
                    '<option value="roja">Roja</option>' +
                    '<option value="amarilla">Amarilla</option>' +
                    '<option value="verde">Verde</option>' +
                    '<option value="azul">Azul</option>' +
                    '<option value="naranja">Naranja</option>' +
                    '<option value="morada">Morada</option>' +
                    '<option value="marron" selected>Marrón</option>' +
                    '<option value="blanca">Blanca</option>' +
                    '<option value="negra">Negra</option>';
            break;
        case 'blanca':
            imagen = 'ancla_blanca.png';
            selectColor =
                    '<option value="roja">Roja</option>' +
                    '<option value="amarilla">Amarilla</option>' +
                    '<option value="verde">Verde</option>' +
                    '<option value="azul">Azul</option>' +
                    '<option value="naranja">Naranja</option>' +
                    '<option value="morada">Morada</option>' +
                    '<option value="marron">Marrón</option>' +
                    '<option value="blanca" selected>Blanca</option>' +
                    '<option value="negra">Negra</option>';
            break;
        case 'negra':
            imagen = 'ancla_negra.png';
            selectColor =
                    '<option value="roja">Roja</option>' +
                    '<option value="amarilla">Amarilla</option>' +
                    '<option value="verde">Verde</option>' +
                    '<option value="azul">Azul</option>' +
                    '<option value="naranja">Naranja</option>' +
                    '<option value="morada">Morada</option>' +
                    '<option value="marron">Marrón</option>' +
                    '<option value="blanca">Blanca</option>' +
                    '<option value="negra" selected>Negra</option>';
            break;
    }
    return selectColor;
}

/**
 * Crea el listener para el marcador
 * @param {google.maps.Marker} marcador Marcador
 * @param {string} colorAncla Color del ancla
 * @param {int} indice Índice del ancla
 * @returns {void}
 */
function crearListenerMarcador(marcador, colorAncla, indice) {
    var selectColor = generarSelectColorAncla(colorAncla);

    google.maps.event.addListener(marcador, 'click', function() {
        //Cerrar el menú desplegable
        collapseNav();
        //Centrar al ancla
        switchTrakingOff();
        mapa.setCenter(marcador.position);
        //Contenido del menú
        document.getElementById("menuAnclaTitulo").innerHTML = '<img src="' + marcador.icon + '"/>' + marcador.title;
        document.getElementById("inputNombre").value = marcador.title;
        document.getElementById("selectMarcador").innerHTML = selectColor;
        document.getElementById("textareaDescripcion").value = marcador.description;
        document.getElementById("btnRutaCoche").onclick = function() {
            calcularRuta(posActual.position, marcador.position, 'driving');
            //Quitar modal
            $("#menuAncla").modal("hide");
        };
        document.getElementById("btnRutaPie").onclick = function() {
            calcularRuta(posActual.position, marcador.position, 'walking');
            //Quitar modal
            $("#menuAncla").modal("hide");
        };
        //Botones
        document.getElementById("menuAnclaBtnEliminar").onclick = function() {
            eliminarAncla(indice);
        };
        document.getElementById("menuAnclaBtnGuardar").onclick = function() {
            guardarAncla(indice);
        };
        //Mostrar modal
        document.location = "#menuAncla";
        $('#menuAncla').modal('show');
    });
}

/**
 * Actualiza el menú de anclas según el contenido del vector de anclas para centrar la posición al selecionar una cualquiera.
 * También actualiza los listeners de las anclas
 * @returns {void}
 */
function actualizarMenuAnclas() {
    var menuAnclas = document.getElementById("menuAnclas");
    var contenidoMenuAnclas = "";
    for (var i = 0; i < anclasArray.length; i++) {
        contenidoMenuAnclas += '<li><a href="#" onclick="centrarAncla(' + i + ');"><img src="' + anclasArray[i].icon + '"/>' + anclasArray[i].title + '</a></li>';
        crearListenerMarcador(anclasArray[i], anclasArray[i].color, i);
    }
    if (contenidoMenuAnclas == "") {
        menuAnclas.innerHTML = '<li class="disabled"><a href="#">No tienes ningún ancla</a></li>';
    } else {
        menuAnclas.innerHTML = contenidoMenuAnclas;
    }
}

/**
 * Pinta las anclas en el mapa
 * @returns {void}
 */
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
    switchTrakingOff();
    irPosicion(ancla.position.lat(), ancla.position.lng());
}

/**
 * Elimina un ancla del vector de anclas
 * @param {int} i Índice del ancla en el vector de anclas
 * @returns {void} Elimina la posición del vector de anclas
 */
function eliminarAncla(i) {
    if (confirm("¿Eliminar el ancla \"" + anclasArray[i].title + "\"?")) {
        //Falta confirmar
        anclasArray[i].setMap(null);
        anclasArray.splice(i, 1);
        actualizarMenuAnclas();
        $('#menuAncla').modal('hide');
    }
}

/**
 * Gaurda los nuevos deatos de un ancla en el vector de anclas
 * @param {int} i Índice del ancla en el vector de anclas
 * @returns {void} Guarda los datos en la posición del vector de anclas indicado
 */
function guardarAncla(i) {
    anclasArray[i].title = document.getElementById("inputNombre").value;
    anclasArray[i].description = document.getElementById("textareaDescripcion").value;

    var selectMarcador = document.getElementById("selectMarcador");
    var colorMarcado = selectMarcador.options[selectMarcador.selectedIndex].value;

    var icono = iconBase + "ancla_" + document.getElementById("selectMarcador").value + ".png";
    if (icono !== anclasArray[i].icon) {
        anclasArray[i].icon = icono;
    }
    crearListenerMarcador(anclasArray[i], colorMarcado, i);
    anclasArray[i].setMap(mapa);
    //Cerrar
    $('#menuAncla').modal('hide');
}

