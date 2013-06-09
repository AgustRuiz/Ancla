function localize()
		{
			/* Si se puede obtener la localización */
		 	if (navigator.geolocation)
			{
                navigator.geolocation.getCurrentPosition(mapa,error);
            }
            /* Si el navegador no soporta la recuperación de la geolocalización */
            else
            {
                alert('¡Oops! Tu navegador no soporta geolocalización.');
            }
		}

		function mapa(pos)
		{
			/* Obtenemos los parámetros de la API de geolocalización HTML*/
			var latitud = pos.coords.latitude;
			var longitud = pos.coords.longitude;
			var precision = pos.coords.accuracy;

			/* A través del DOM obtenemos el div que va a contener el mapa */
			var contenedor = document.getElementById("map")

			/* Posicionamos un punto en el mapa con las coordenadas que nos ha proporcionado la API*/
			var centro = new google.maps.LatLng(latitud,longitud);

			/* Definimos las propiedades del mapa */
			var propiedades =
			{
                zoom: 15,
                center: centro,
                mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			/* Creamos el mapa pasandole el div que lo va a contener y las diferentes propiedades*/
			var map = new google.maps.Map(contenedor, propiedades);

			/* Un servicio que proporciona la API de GM es colocar marcadores sobre el mapa */
			var marcador = new google.maps.Marker({
                position: centro,
                map: map,
                title: "Tu localizacion"
            });
		}

		/* Gestion de errores */
		function error(errorCode)
		{
			if(errorCode.code == 1)
				alert("No has permitido buscar tu localizacion")
			else if (errorCode.code==2)
				alert("Posicion no disponible: "+errorCode.message)
			else
				alert("Ha ocurrido un error")
		}
 