// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------


// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
const request = require('request')
const assert = require('assert')

const IP_PUERTO = "http://localhost:8080"

// --------------------------------------------------------------------------------
// main ()
// --------------------------------------------------------------------------------
describe("Test 1: pon aquí tu comentario (recuerda arrancar el servidor)", function () {
	// ........................................................................... 
	// // 4. 
	// // ........................................................................... 
	 it( "probar POST /insertarMedicion", function( hecho ) {

 	request.post(
			{ url : IP_PUERTO+"/insertarMedicion",
		  headers : { 'User-Agent' : 'maria', 'Content-Type' : 'application/json' },
			  body : JSON.stringify( {ID:"15", medida: 15, fecha: "Viernes" } )
	 		},
			function( err, respuesta, carga ) {

				assert.equal( err, null, "¿ha habido un error?: " + err )
				assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
	 			hecho()
			} // callback
	 	) // .post
	 }) // it

	// ........................................................................... 
	// 5. 
	// ........................................................................... 
	it("probar GET /medicion", function (hecho) {

		request.get(
			{
				url: IP_PUERTO + "/medicion",
				headers: { 'User-Agent': 'Maria'},

			},
			function (err, respuesta, carga) {

				var resultados = JSON.parse(carga)
				console.log(resultados);

				//assert.equal(err, null, "¿ha habido un error?: " + err)
				assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
				// assert.equal(resultados[0].ID, "1", "¿No es el ID que he buscado?")
				// assert.equal(resultados[0].medida, 25.0, "¿No es la medida que he buscado?")
				//assert.equal( resultados[1].fecha, "29-09-2022", "¿No es la fecha que he buscado?" )

				hecho()
			} // callback
		) // .post
	}) // it

	// //

	// it( "probar POST /f/insertarAsignatura", function( hecho ) {

	// 	request.post(
	// 		{ url : IP_PUERTO+"/f/insertarAsignatura",
	// 		  headers : { 'User-Agent' : 'jordi', 'Content-Type' : 'application/json' },
	// 		  body : JSON.stringify( {codigo: "8907778", asignatura: "OA" } )
	// 		},
	// 		function( err, respuesta, carga ) {

	// 			assert.equal( err, null, "¿ha habido un error?: " + err )
	// 			assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
	// 			hecho()
	// 		} // callback
	// 	) // .post
	// }) // it

	// it( "probar POST /f/buscarAsignatura", function( hecho ) {

	// 	request.post(
	// 		{ url : IP_PUERTO+"/buscarAsignatura",
	// 		  headers : { 'User-Agent' : 'jordi', 'Content-Type' : 'application/json' },
	// 		  body : JSON.stringify( {codigo: "8907778" } )
	// 		},
	// 		function( err, respuesta, carga ) {

	// 			assert.equal( err, null, "¿ha habido un error?: " + err )
	// 			assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )

	// 			// console.log( " carga = " + carga )

	// 			var resultados = JSON.parse( carga )

	// 			assert.equal( resultados.length, 1, "¿No hay un resultado" )
	// 			assert.equal( resultados[0].dni, "1234A", "¿No es el dni que he buscado?" )

	// 			hecho()
	// 		} // callback
	// 	) // .post
	// }) // it

}) // describe

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

