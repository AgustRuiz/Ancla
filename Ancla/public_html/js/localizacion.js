function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);

}
function errores(err) {
    if (err.code === 0)
        alert("Oops! Error desconocido: " + err.message);
    if (err.code === 1)
        alert("Oops! Se le ha negado el permiso para recuperar una posición.");
    if (err.code === 2)
        alert("Oops! El navegador no ha podido determinar una posición: " + err.message);
    if (err.code === 3)
        alert("Oops! Hemos superado el tiempo de espera");
}
