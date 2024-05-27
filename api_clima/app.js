//1. EVENTO LOAD para obtener datos de la api 
window.addEventListener('load', ()=> {

    //5. variables para obtener valores de lat y lon
    let lon
    let lat 

    //8. una vez que obtengamos nuestros datos de la api los asignaremos a variables para 
    //mostrarlos en html
    let temperaturaValor = document.getElementById('temperatura-valor')  
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')  
    
    let ubicacion = document.getElementById('ubicacion')  
    //let icono = document.getElementById('icono') 
    let iconoAnimado = document.getElementById('icono') 

    let vientoVelocidad = document.getElementById('viento-velocidad') 


    //2. propiedades de geolocali y mostrar ejemplo de pagina
    if(navigator.geolocation){
        //3. obtener la posicion con funcion flecha 
        navigator.geolocation.getCurrentPosition( posicion => {
            //4. MOSTRAR EN CONSOLA LOS DATOS PARA PODER USARLOS 
            //console.log(posicion)
            lat = posicion.coords.latitude
            lon = posicion.coords.longitude

            //6. creamos constante para obtener datos de la api en formato json
            //explicar lo de unidades y lenguaje
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5881a612ac64302eb3074b4800915f4f&units=metric&lang=es`

            //con nombre de ciudad etc

            //7. mostrar url en consola que nos mostrara el link con la informacion obtenida de la api
            //console.log(url)



            //fetch para obtener la informacion y realizar peticiones 
            //a nuestra api mediante peticiones 
            //que van a convertir o pasar los datos de json a js y podamos utilizarlos
            
            //9. ----------Se obtienen los datos 
            /*fetch(url)
            .then( response => { return response.json()})
            .then( data => {
                console.log(data)
                console.log(data.main.temp)
                console.log(data.weather[0].description)
            })
            .catch( error => {
                console.log(error)
            })
            ----------------*/

            fetch(url)
            .then( response => { return response.json()})
            .then( data => {
                let temp = Math.round(data.main.temp)
                temperaturaValor.textContent = `${temp} ° C`

                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()

                ubicacion.textContent = data.name
                
                vientoVelocidad.textContent = `${data.wind.speed} m/s`
                console.log(data)
                //mostrar iconos predeterminados
                //console.log(data.weather[0].icon)
                let iconCode = data.weather[0].icon
                const urlIcon = `https://openweathermap.org/img/wn/${iconCode}.png`                     
                //console.log(urlIcon)
                //icono.src = urlIcon


                //en caso de querer usar iconosAnimados
                switch (data.weather[0].main) {
                    case 'Rain':
                      iconoAnimado.src='animated/rainy-7.svg'
                      console.log('LLUVIA');
                      break;                    
                    case 'Clear':
                        iconoAnimado.src='animated/day.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Clouds':
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                      iconoAnimado.src='animated/cloudy-day-1.svg'
                      console.log('por defecto');
                  }
                
                
            })
            .catch( error => {
                console.log(error)
            })




        })
    }
})