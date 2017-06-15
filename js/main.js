
/*variables globales*/
var api = {
 url:'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};
 var $almacenTemas = $("#nuevos-temas");

/*inician funciones*/	
var cargarPagina = function () {
 cargamosTemas();
 $("#formulario").submit(agregarTema);
 $("#barrita").submit(filtrarTemas);
 $('.modal').modal();
};

var cargamosTemas = function (){
 $.getJSON(api.url, function(temas) {
   temas.forEach(temaNuevo);
 });
};

var temaNuevo = function (tema){
 var $autor = tema.author_name;
 var $contenido = tema.content;
/*creamos de forma dinamica*/
/*fila*/
var $fila = $("<tr/>");
/*celdas con contenido*/
var $celdaAutor = $("<td/>");
$celdaAutor.text($autor);
	
var $celdaContenido = $("<td/>");
$celdaContenido.text($contenido);

/*agregamos a fila*/
$fila.append($celdaContenido);
$fila.append($celdaAutor);
/*agregamos fila a tabla*/
$almacenTemas.append($fila);
};

var agregarTema = function (e){
	e.preventDefault();
	var autorTema = $("#autor").val();
	var temita = $("#tema").val();
	
	$.post(api.url,{
		author_name: autorTema,
		content: temita }, function (tema) {
		temaNuevo(tema);
	});
	
};
/*buscar elementos:*/
/*arreglo  vacio donde guardaremos info que nos brinda la api*/
var temaAbuscar = [];
/*volvemos a obtener datos de api*/
$.getJSON(api.url, function(temas) {
   temaAbuscar = temas;
 });
	var filtrarTemas = function(e){
	e.preventDefault();
	/*almacenamos el valor del input y lo pasamos a minusculas*/
	var temaBuscado = $("#search").val().toLowerCase();
	/*almacenamos a un arreglo nuevo*/
	var buscado = temaAbuscar.filter(function(tema){
		return tema.author_name.toLocaleLowerCase().indexOf(temaBuscado)>= 0;
		
	});
		console.log(buscado);
		 agregarTema(buscado);
	};

/*cargamos documento*/
$(document).ready(cargarPagina);



