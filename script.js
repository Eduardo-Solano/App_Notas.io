// JavaScript
let opcionesVisibles = false;

document
  .getElementById("btn-nueva-nota")
  .addEventListener("click", function () {
    const opcionesColor = document.getElementById("opciones-color");
    const botones = opcionesColor.querySelectorAll(".color-btn");

    if (!opcionesVisibles) {
      // Mostrar opciones con animación
      opcionesColor.style.display = "flex";

      botones.forEach((btn, index) => {
        // Remover clases previas
        btn.classList.remove("hide");

        // Agregar clase show con delay para cada botón
        setTimeout(() => {
          btn.classList.add("show");
        }, index * 30);
      });

      opcionesVisibles = true;
    } else {
      // Ocultar opciones con animación
      botones.forEach((btn) => {
        btn.classList.remove("show");
        btn.classList.add("hide");
      });

      // Ocultar el contenedor después de la animación
      setTimeout(() => {
        opcionesColor.style.display = "none";
        // Reiniciar clases
        botones.forEach((btn) => {
          btn.classList.remove("hide");
        });
      }, 300);

      opcionesVisibles = false;
    }
  });

// Agregar event listeners a cada botón de color
document.querySelectorAll(".color-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const color = this.getAttribute("data-color");
    console.log("Color seleccionado:", color);

    // Crear nueva nota
    const nuevaNota = document.createElement("div");
    nuevaNota.style.backgroundColor = color;
    nuevaNota.style.width = "220px";
    nuevaNota.style.height = "210px";
    nuevaNota.classList.add("nota");

    // Agregar clase para animación
    nuevaNota.classList.add("nueva-nota-animacion");

    let fecha = new Date().toLocaleDateString();

    nuevaNota.innerHTML =
      '<p class="nota-texto" contenteditable="false"></p>' +
      '<span class="fecha">' + fecha + "</span>" +
      '<button class="editar-nota">Editar</button>' +
      '<button class="guardar-nota">Guardar</button>' +
      '<button class="eliminar-nota">Eliminar</button>';

    document.querySelector(".contenido-principal").prepend(nuevaNota);

    // Remover la clase después de la animación
    setTimeout(() => {
      nuevaNota.classList.remove("nueva-nota-animacion");
    }, 400);
  });
});

document.addEventListener("click", function (e) {
  // EDITAR
  if (e.target.classList.contains("editar-nota")) {
    const nota = e.target.closest(".nota");
    const texto = nota.querySelector(".nota-texto");
    const btnEditar = e.target;

    texto.contentEditable = "true";
    texto.focus();

    // Mientras se edita, desactivamos el botón de editar
    btnEditar.disabled = true;
  }

  // GUARDAR
  if (e.target.classList.contains("guardar-nota")) {
    const nota = e.target.closest(".nota");
    const texto = nota.querySelector(".nota-texto");
    const btnEditar = nota.querySelector(".editar-nota");

    // Bloquear edición
    texto.contentEditable = "false";
    texto.blur();

    btnEditar.disabled = true;
    e.target.disabled = true; 
  }

  // ELIMINAR
  if (e.target.classList.contains("eliminar-nota")) {
    const nota = e.target.closest(".nota");
    nota.remove();
  }
});
