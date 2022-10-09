// --------------------------------------------------------------------------------
// mainServidorREST.js
// --------------------------------------------------------------------------------

const express = require('express')
const bodyParser = require('body-parser')

const fs = require('fs')
var cors  = require('cors')


const Logica = require("../logica/logica.js")


// --------------------------------------------------------------------------------
// En vez de tener que instalar una regla para cada función de la lógica
// adopto el convenio (usando solamente GET) que la llamadas son
// 
//  ---------------------------
//  GET /nombreFuncionLogica
// 
//  datos en JSON en el cuerpo
//  ---------------------------
// 
//  de forma que con una regla sobra. Aunque esto "rompe" la filosofía REST.
// 
// --------------------------------------------------------------------------------
function cargarReglasUniversales(servidorExpress, laLogica) {

	// .......................................................
	// Reglas del API REST
	// .......................................................

	// .......................................................
	// GET /prueba
	// .......................................................
	servidorExpress.get('/prueba', function (peticion, respuesta) {
		console.log(" * GET /prueba ")
		respuesta.send("¡Funciona!")
	}) // get /prueba

	// .......................................................
	// GET /mediciones
	// .......................................................
	servidorExpress.get("/mediciones", async function (peticion, respuesta) {
		var error = null; 
		try {
			console.log(" * GET /mediciones ")
		// llamo a la función adecuada de la lógica
		var res = await laLogica.mostrarMediciones()
		console.log(res);

		// si el array de resultados no tiene una casilla ...
		// todo ok
		respuesta.send(JSON.stringify(res))
			
		} catch (error) {
			err = error;  
		}
		
	}) // get /persona

	// .......................................................
	// POST /insertarMedicion
	// .......................................................

	servidorExpress.post("/insertarMedicion", async function (peticion, respuesta) {
		var error = null; 
		try {
		console.log(" * POST /insertarMedicion ")
		var datos = JSON.parse(peticion.body)
		console.log(datos.ID)
		console.log(datos.medida)
		console.log(datos.fecha)
		
		await laLogica.insertarMedicion(datos)
		respuesta.send("OK")
		} catch (error) {
			console.log(error);
		}
		
	}) 
	

} // ()

// --------------------------------------------------------------------------------
// main()
// --------------------------------------------------------------------------------
async function main() {

	var laLogica = null


	//  
	//  cargo logica abriendo conexión
	//  

	laLogica = new Logica("../bd/datos.db", function (err) {
		if (err) {
			throw new Error("No he podido conectar con datos.db")
		}
	})

	//  
	// creo el servidor
	//  

	
	var servidorExpress = express()

	servidorExpress.use(cors())

	//  
	// para poder acceder a la carga de la petición http
	// (asumiendo que es JSON) hay que hacer esto:
	//  
	// OK: original:
	servidorExpress.use(bodyParser.text({ type: 'application/json' }))

	// Me ha dado problemas: servidorExpress.use( express.json() )

	// no creo que necesite esto: servidorExpress.use(express.urlencoded({ extended: true }));

	//  
	// cargo las reglas REST
	//  
	cargarReglasUniversales(servidorExpress, laLogica)

	//  
	// configuradión automática para que sirva ficheros de ../ux
	//  
	servidorExpress.use(express.static("../ux"))

	//  
	// arranco el servidor
	//  
	var servicio = servidorExpress.listen(8080, function () {
		console.log("servidor REST escuchando en el puerto 8080: http://localhost:8080/Aplicacion.html ")
	})

	//  
	// capturo control-c para cerrar el servicio ordenadamente
	//  
	process.on('SIGINT', function () {
		console.log(" terminando ")
		servicio.close()
	})
} // ()

// --------------------------------------------------------------------------------
// main()
// --------------------------------------------------------------------------------
main()

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
