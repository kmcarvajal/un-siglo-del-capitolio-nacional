// 1. Puntos interactivos del Capitolio
const capitolio = document.querySelector(".capitolio-interactivo");
const puntos = document.querySelectorAll(".punto");
const detalles = document.querySelectorAll(".detalle");
const linea = document.createElementNS("http://www.w3.org/2000/svg", "svg");
linea.classList.add("linea-detalle");
linea.setAttribute("aria-hidden", "true");
capitolio.append(linea);

function dibujarLinea() {
  linea.replaceChildren();
  const punto = document.querySelector('.punto[aria-expanded="true"]');
  if (!punto || window.innerWidth <= 640) return;
  const detalle = document.getElementById(punto.getAttribute("aria-controls"));
  const area = capitolio.getBoundingClientRect();
  const origen = punto.getBoundingClientRect();
  const destino = detalle.getBoundingClientRect();
  const x = origen.left + origen.width / 2 - area.left;
  const y = origen.top + origen.height / 2 - area.top;
  const finX = destino.left + destino.width / 2 - area.left;
  const finY = destino.top + destino.height / 2 - area.top;
  const mitadX = (x + finX) / 2;
  const trazo = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polyline",
  );
  trazo.setAttribute("points", `${x},${y} ${mitadX},${finY} ${finX},${finY}`);
  trazo.setAttribute("fill", "none");
  trazo.setAttribute("stroke", "#4388b9");
  trazo.setAttribute("stroke-width", "2");
  linea.append(trazo);
}

puntos.forEach(function (punto) {
  punto.addEventListener("click", function () {
    const abierto = punto.getAttribute("aria-expanded") === "true";
    puntos.forEach((boton) => boton.setAttribute("aria-expanded", "false"));
    detalles.forEach((detalle) => (detalle.hidden = true));
    if (!abierto) {
      punto.setAttribute("aria-expanded", "true");
      const detalle = document.getElementById(
        punto.getAttribute("aria-controls"),
      );
      detalle.hidden = false;
    }
    dibujarLinea();
  });
});
window.addEventListener("resize", dibujarLinea);
window.addEventListener("load", dibujarLinea);

// Cerrar el detalle al pulsar sobre la imagen en mobile
detalles.forEach(function (detalle) {
  detalle.addEventListener("click", function () {
    if (window.innerWidth <= 640) {
      detalle.hidden = true;

      puntos.forEach(function (punto) {
        punto.setAttribute("aria-expanded", "false");
      });

      dibujarLinea();
    }
  });
});

// 2. Línea de tiempo: flechas y barra sincronizadas
const historia = document.querySelector(".historia-scroll");
const barra = document.querySelector(".historia-barra");
const barraContenido = document.querySelector(".historia-barra-contenido");
let posicionBarra = 0;
const anterior = document.querySelector(".anterior");
const siguiente = document.querySelector(".siguiente");
function actualizarHistoria() {
  const maximo = historia.scrollWidth - historia.clientWidth;
  const maximoBarra = barra.scrollWidth - barra.clientWidth;
  barra.scrollLeft =
    maximo > 0 ? (historia.scrollLeft / maximo) * maximoBarra : 0;
  posicionBarra = barra.scrollLeft;
  anterior.disabled = historia.scrollLeft <= 1;
  siguiente.disabled = historia.scrollLeft >= maximo - 1;
}
anterior.addEventListener("click", () =>
  historia.scrollBy({
    left: -150,
    behavior: "smooth",
  }),
);

siguiente.addEventListener("click", () =>
  historia.scrollBy({
    left: 150,
    behavior: "smooth",
  }),
);
// La longitud del segmento azul representa la parte visible de la historia.
function ajustarBarra() {
  const proporcion = historia.scrollWidth / historia.clientWidth || 1;
  barraContenido.style.width = `${barra.clientWidth * proporcion}px`;
  actualizarHistoria();
}

barra.addEventListener("scroll", () => {
  // Evita repetir el desplazamiento cuando la barra se mueve desde las flechas.
  if (barra.scrollLeft === posicionBarra) return;
  const maximoBarra = barra.scrollWidth - barra.clientWidth;
  if (maximoBarra > 0) {
    historia.scrollLeft =
      (barra.scrollLeft / maximoBarra) *
      (historia.scrollWidth - historia.clientWidth);
  }
  posicionBarra = barra.scrollLeft;
});
historia.addEventListener("scroll", actualizarHistoria);
window.addEventListener("resize", ajustarBarra);
window.addEventListener("load", ajustarBarra);
ajustarBarra();

// 3. Alternar entre Senado y Cámara
const senado = document.querySelector(".button-senado");
const camara = document.querySelector(".button-camara");
const imgSenado = document.querySelector(".img-senado");
const imgCamara = document.querySelector(".img-camara");
function mostrarCongreso(esSenado) {
  imgSenado.hidden = !esSenado;
  imgCamara.hidden = esSenado;
  senado.setAttribute("aria-pressed", String(esSenado));
  camara.setAttribute("aria-pressed", String(!esSenado));
}
senado.addEventListener("click", () => mostrarCongreso(true));
camara.addEventListener("click", () => mostrarCongreso(false));

// 4. Degradado inferior de la página
function actualizarDegradadoPagina() {
  const alFinal =
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 2;

  document.body.classList.toggle("fin-pagina", alFinal);
}

window.addEventListener("scroll", actualizarDegradadoPagina);
window.addEventListener("resize", actualizarDegradadoPagina);
window.addEventListener("load", actualizarDegradadoPagina);

actualizarDegradadoPagina();
