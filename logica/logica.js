// // --------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------

// const sqlite3 = require( "sqlite3" )

// const cargador = require( "./cargador.js" )

// // --------------------------------------------------------------------------------
// //
// // nombreBD: Texto -> logica() -> Logica
// //
// // Donde:
// //
// // Logica = { 
// //   f: ( Texto TArg -> () -> TRes ), // para llamar a una función de la lógica por
// //                                     // su nombre en texto
// //   funciones: [ { conexion: TDep, f: TArg -> () -> TRes } ]_Texto // array asociativo
// //                                                             // con las funciones de logica
// // }
// //
// // (ver cargador.js)
// //
// // --------------------------------------------------------------------------------
// module.exports = function ( nombreBD ) {
// 	return new Promise( function( resolver, rechazar ) {

// 		var conexion = new sqlite3.Database( nombreBD , function( err ) {
// 			if ( err ) {
// 				rechazar( "Error en conexión a base de datos: " + err )
// 			}

// 			// console.log(" logica(): conexión abierta con: " + nombreBD )

// 			// conexión establecida con la BD
// 			// activo foreing_keys para sqlite3
// 			conexion.run( "PRAGMA foreign_keys = ON" )

// 			var logica = cargador( __dirname + "/funciones", conexion )

// 			// console.log(" logica(): funciones cargadas " )

// 			resolver( logica )

// 		}) // sqlite3.Database
// 	}) // new Promise
// } // module.exports

// IMPORTANTE 

// // --------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------

// .....................................................................
// Logica.js
// .....................................................................
const sqlite3 = require("sqlite3")
// .....................................................................
// .....................................................................
module.exports = class Logica {
	// .................................................................
	// nombreBD: Texto
	// -->
	// constructor () -->
	// .................................................................
	constructor(nombreBD, cb) {
		this.laConexion = new sqlite3.Database(
			nombreBD,
			(err) => {
				if (!err) {
					this.laConexion.run("PRAGMA foreign_keys = ON")
				}
				cb(err)
			})
	} // ()
	// .................................................................
	// nombreTabla:Texto
	// -->
	// borrarFilasDe() -->
	// .................................................................
	borrarFilasDe(tabla) {
		return new Promise((resolver, rechazar) => {
			this.laConexion.run(
				"delete from " + tabla + ";",
				(err) => (err ? rechazar(err) : resolver())
			)
		})
	} // ()
	// .................................................................
	// borrarFilasDeTodasLasTablas() -->
	// .................................................................
	async borrarFilasDeTodasLasTablas() {
		await this.borrarFilasDe("Medida")
		
	} // ()

	// .................................................................
	// nombreTabla:Texto
	// -->
	// borrarFilasDe() -->
	// .................................................................
	borrarMedicion(ID) {
		var textoSQL=
			"delete from Medicion where ID=$ID ;"
			var valoresParaSQL = {
				$ID:ID
			}
		return new Promise((resolver, rechazar) => {
			
			this.laConexion.run (textoSQL,valoresParaSQL,function(err){
				
				(err ? rechazar(err) : resolver())
			})
		})
	}
	// .................................................................
	// datos:{dni:Texto, nombre:Texto: apellidos:Texto}
	// -->
	// insertarPersona() -->
	// .................................................................
	insertarMedicion(datos) {
		var textoSQL =
			"insert into Medicion values( $ID, $medida, $fecha );"
		var valoresParaSQL = {
			$ID: datos.ID, 
			$medida: datos.medida,
			$fecha: datos.fecha
		}
		console.log(datos);
		
		// <//> <//> <//> <>/
		return new Promise((resolver, rechazar) => {
			this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
				(err ? rechazar(err) : resolver())
			})
		})
	} // ()

	mostrarMediciones() {
		var textoSQL = "select * from Medicion";  //$dni es un parámetro 
		var valoresParaSQL = { } // objeto 
		return new Promise((resolver, rechazar) => {
			this.laConexion.all(textoSQL, valoresParaSQL,
				(err, res) => {
					(err ? rechazar(err) : resolver(res))
				})
		})
	}
	
	// .................................................................
	// cerrar() -->
	// .................................................................

	cerrar() {
		return new Promise((resolver, rechazar) => {
			this.laConexion.close((err) => {
				(err ? rechazar(err) : resolver())
			})
		})
	} // ()
} 
// class
// .....................................................................
// .....................................................................
