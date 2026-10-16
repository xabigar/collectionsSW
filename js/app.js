const SECCIONES = ['inicio', 'buscador', 'coleccion', 'gestionColeccion'];

const INICIALIZADORES = {
  buscador: () => {},
  coleccion: () => {},
  gestionColeccion: () => {}
};

async function cargarSeccion(nombre) {
  const contenedor = document.getElementById(`seccion-${nombre}`);

  try {
    const respuesta = await fetch(`templates/${nombre}.html`);
    if (!respuesta.ok) throw new Error(`No se pudo cargar ${nombre}`);

    contenedor.innerHTML = await respuesta.text();

    if (INICIALIZADORES[nombre]) INICIALIZADORES[nombre]();
  } catch (error) {
    contenedor.innerHTML = '<p>Error al cargar esta sección.</p>';
    console.error(error);
  }
}

function mostrarSeccion(nombre) {
  document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('activa'));
  document.getElementById(`seccion-${nombre}`).classList.add('activa');

  document.querySelectorAll('#menu-principal button').forEach(btn => btn.classList.remove('active'));
  const boton = document.querySelector(`#menu-principal button[data-seccion="${nombre}"]`);
  if (boton) boton.classList.add('active');
}

async function iniciarApp() {
  await Promise.all(SECCIONES.map(cargarSeccion));
  mostrarSeccion('inicio');
}

document.getElementById('menu-principal').addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-seccion]');
  if (!boton) return;
  mostrarSeccion(boton.dataset.seccion);
});

iniciarApp();
