class Tarea {
	constructor(nombre, descripcion) {
		this.nombre = nombre;
		this.descripcion = descripcion;
	}
}


let formulario = document.getElementById("formularioTareas");
formulario.addEventListener("submit", guardarTarea);

// ANIMACION //
$(()=>{
	$("#btn").css({"background-color": "rgb(167, 167, 167"})
	$("#btn").mouseenter (function() {
		$("#btn").css({"background-color": "#c7c7c7"})
	})
	$("#btn").mouseleave (function() {
		$("#btn").css({"background-color": "rgb(167, 167, 167"})
	})

});

function guardarTarea(e) {
	e.preventDefault();

	let nombre = $('#nombre').val();
	let descripcion = $('#descripcion').val();

	if (nombre !== '') {
		let listaDeTareas = cargarListaDeTareas();

		listaDeTareas.push(new Tarea(nombre, descripcion));

		guardarListaDeTareas(listaDeTareas);

		document.getElementById("formularioTareas").reset();
	}
}


function cargarListaDeTareas() {

	let listaDeTareas = JSON.parse(localStorage.getItem("listaDeTareas"));
	if (listaDeTareas == null) {
		return [];
	}
	return listaDeTareas;
}


function guardarListaDeTareas(listaDeTareas) {
	localStorage.setItem("listaDeTareas", JSON.stringify(listaDeTareas));
	mostrarListaDeTareas(listaDeTareas);
}


function mostrarListaDeTareas(listaDeTareas) {
	let lista = document.getElementById("lista");
	lista.textContent = "";
	listaDeTareas.forEach((tarea) => {
		lista.appendChild(armarTarjeta(tarea));
	});
}


function deleteTask(tarea) {
    let listaDeTareas = JSON.parse(localStorage.getItem("listaDeTareas"));
    const index = listaDeTareas.findIndex(element => element === tarea);
    listaDeTareas.splice(index, 1);
    localStorage.setItem("listaDeTareas", JSON.stringify(listaDeTareas));
    mostrarListaDeTareas(listaDeTareas);

}



function armarTarjeta(elemento) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    const nombreTarea = document.createElement("h3");
    nombreTarea.textContent = `${elemento.nombre}`;
    tarjeta.appendChild(nombreTarea);

    const descripcion = document.createElement("p");
    descripcion.textContent = `Descripción: ${elemento.descripcion}`;
    tarjeta.appendChild(descripcion);

    const deleteBtn = document.createElement('button');
	deleteBtn.id = elemento.nombre;
    deleteBtn.textContent = "X";
    deleteBtn.className = "borrarTarea";
	deleteBtn.addEventListener("click", function(elemento) {
		deleteTask(elemento);
	});
	tarjeta.appendChild(deleteBtn);
	

    return tarjeta;
}




mostrarListaDeTareas(cargarListaDeTareas());



