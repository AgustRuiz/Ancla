numAnclas = 0;
function placeMarker() {
    numAnclas++;
    iconbase="img/";
    var marcador = new google.maps.Marker({
        position: mapa.getCenter(),
        map: mapa,
        title: "Ancla " + numAnclas,
        animation: google.maps.Animation.DROP,
        icon: iconbase + 'ancla_roja.png'
        /*shadow: iconBase + 'schools_maps.shadow.png'*/
        /* https://developers.google.com/maps/tutorials/customizing/custom-markers#customize_a_map_marker */
    });
}