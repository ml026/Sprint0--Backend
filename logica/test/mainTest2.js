
// ........................................................
// mainTest1.js
// ........................................................
const Logica = require("../Logica.js")
var assert = require("assert")
// ........................................................
// main ()
// ........................................................

// es donde empieza la prueba del test 

describe("Test 2: mostrar mediciones", function () {
	// ....................................................
	// ....................................................
	var laLogica = null
	// ....................................................
	// ....................................................
	it("conectar a la base de datos", function (hecho) {  // la prueba concreta, el cual tiene su tittulo y un callback con una funcion con cualquier nombre. 
		laLogica = new Logica(  // crear un objeto --> 
			"../bd/datos.db",
			function (err) {
				if (err) {
					throw new Error("No he podido conectar con datos.db")
				}
				hecho()
			})
	}) // it
	// ....................................................
	// ....................................................
	
	
	// it
	// ....................................................
	// ....................................................

	it("puedo mostrar las mediciones",
		async function () {
			try {
			var res = await laLogica.mostrarMediciones()
			assert.equal(res.length, 12, "¿no hay un resultado?")  // -->  (a, b, c) -> if (a!=b) --> return c 
			console.log(res[3]);
			//assert.equal(res[3].ID, "2012", "¿no es 2019?")
			//assert.equal(res[5].medida, 12, "¿no es 12?")  // el assert es un if 

		} catch (error) {
			err=error; 
		}
				
	
	// it
	// ....................................................
	// ....................................................

	
	// ....................................................
	// ....................................................
	it("cerrar conexión a la base de datos",
		async function () {
			try {
				await laLogica.cerrar()
			} catch (err) {
				// assert.equal( 0, 1, "cerrar conexión a BD fallada: " + err)
				throw new Error("cerrar conexión a BD fallada: " + err)
			}
		}) // it
	
	
})

})
