import './styles/styles.css';
import './lib/fontawesome.js';
import { Game } from './lib/Game.js';
import './lib/games.js';
import center from './lib/center.js';
import calculateLetterPositions from './lib/letter_positions.js';
import { getElementCenter, lengthAndAngle } from './lib/line_position.js';
window.onload = () => {
  document.body.onmousemove = posicionarRaton;
}

const GAME = new Game();
const WORD_POSITIONS = GAME.wordPositions;
const GRID = document.getElementById('grid');
const GRIDHEIGHT = 10;
const GRIDWIDTH = 10;
const GAMESCREEN = document.getElementById('game');
const WHEEL = document.getElementById('wheel');
const POSITIONS = calculateLetterPositions(GAME.letters.length);
const BLACK = document.getElementById('black');
var ayudaActiva = false;
var lettersShaked;
var maxColumn = 0;
var maxRow = 0;
var wheelLetter;
var palabraSeleccionada = "";
var line = null;
var posicionRaton;
var origen = null;
var letraPulsada = null;
var mouseDown = false;
window.addEventListener("mouseup", upLetra);

/**
 * Centra el grid
 */
WORD_POSITIONS.forEach((palabra) => {
  if (palabra.direction === "horizontal") {
    maxRow = Math.max(maxRow, palabra.origin[1]);
    maxColumn = Math.max(maxColumn, palabra.origin[0] + palabra.length - 1);
  } else if (palabra.direction === "vertical") {
    maxRow = Math.max(maxRow, palabra.origin[1] + palabra.length - 1);
    maxColumn = Math.max(maxColumn, palabra.origin[0]);
  }
});

const [x, y] = center(maxColumn, maxRow, GRIDWIDTH, GRIDHEIGHT);


/**
 * Crear y coloca los divs de las letras
 */
WORD_POSITIONS.forEach((opcionesPalabra) => {
  for (let letra = 0; letra < opcionesPalabra.length; letra++) {
    const boxLetter = document.createElement('div');
    boxLetter.className = 'letter';
    if (opcionesPalabra.direction === 'horizontal') {
      boxLetter.style.gridArea = `${opcionesPalabra.origin[1] + 1 + y} / ${opcionesPalabra.origin[0] + 1 + letra + x}`;
    } else {
      boxLetter.style.gridArea = `${opcionesPalabra.origin[1] + 1 + letra + y} / ${opcionesPalabra.origin[0] + 1 + x}`;
    }
    if (!comprobarGridArea(boxLetter.style.gridArea)) {
      GRID.appendChild(boxLetter);
    }
  }
});

/**
 *  creación de las letras y posicionamiento utilizando la función calculateLetterPositions
 */
for (let letter = 0; letter < GAME.letters.length; letter++) {
  wheelLetter = document.createElement('div');
  wheelLetter.className = 'wheel-letter';

  wheelLetter.addEventListener("mousedown", (event) => {
    mouseDown = true;
    origen = getElementCenter(event.target);
    downLetra(event);
  });

  wheelLetter.addEventListener("mouseover", overLetra);
  wheelLetter = posicionLetra(wheelLetter, letter, GAME.letters);
  WHEEL.appendChild(wheelLetter);
};

/**
 * Evento que recoge los clicks en la pantalla del juego
 */
GAMESCREEN.addEventListener('click', (event) => {
  const elementoSeleccionado = event.target;

  if (ayudaActiva === true) {
    if (elementoSeleccionado.classList[0] === 'letter') {
      revelarLetra(1, elementoSeleccionado);
      finalizarAyuda();
    } else {
      finalizarAyuda();
    };
  } else {
    funcionalidadBotones(elementoSeleccionado);
  }
});

function posicionLetra(wheelLetter, letter, letters) {
  wheelLetter.style.left = POSITIONS[letter].left;
  wheelLetter.style.top = POSITIONS[letter].top;
  wheelLetter.innerHTML = letters[letter];
  return wheelLetter;
}

/**
 * Evento al pulsar una letra y que le asigna la clase 'selected'
 * @param {*} event mouseDown
 */
function downLetra(event) {
  letraPulsada = event.target;

  if (!letraPulsada.className.includes('selected')) {
    letraPulsada.className += ' selected';
    let letraSeleccionada = letraPulsada?.innerText;
    palabraSeleccionada += letraSeleccionada;
  }

  origen = getElementCenter(event.target);
  trazarLinea(origen);
}

/**
 * Coloca la palabra seleccionada en el hueco del grid correspondiente
 * @param {*} opcionesPalabra origin y dirección de la palabra seleccionada
 */
function colocarPalabras(opcionesPalabra) {
  palabraSeleccionada.split('').forEach((letra, index) => {
    const area = calcularArea(opcionesPalabra, index);
    const elementoHTML = comprobarGridArea(area);
    elementoHTML.innerHTML = letra;
  });
}

function calcularArea(opcionesPalabra, index) {
  if (opcionesPalabra.direction === 'horizontal') {
    return `${opcionesPalabra.origin[1] + 1 + y} / ${opcionesPalabra.origin[0] + 2 + palabraSeleccionada.indexOf() + x + index}`;
  } else {
    return `${opcionesPalabra.origin[1] + 2 + palabraSeleccionada.indexOf() + y + index} / ${opcionesPalabra.origin[0] + 1 + x}`;
  }
}

/**
 * Comprueba el valor gridArea de la letra
 * @param {*} area Valor gridArea
 * @returns Elemento HTML que coincide con el valor buscado
 */
function comprobarGridArea(area) {
  let letra = document.querySelectorAll('.letter');

  return Array.from(letra).find(div => div.style.gridArea === area)
}

/**
 * Función que se realiza en el evento mouseUp
 */
function upLetra() {
  if (mouseDown && line) {
    mouseDown = false;
    procesarPalabraSeleccionada();
    limpiarSeleccion();
    limpiarLineas();
    line = null;
  }
}

function procesarPalabraSeleccionada() {
  console.log(palabraSeleccionada);
  try {
    let opcionesPalabra = GAME.findWord(palabraSeleccionada);
    colocarPalabras(opcionesPalabra);
  } catch (notfound) {
    console.log(notfound);
  }
}

function limpiarSeleccion() {
  palabraSeleccionada = "";
  let letrasSeleccionadas = WHEEL.querySelectorAll('.selected');
  letrasSeleccionadas.forEach((child) => child.classList.remove('selected'));
}

function limpiarLineas() {
  let lineasCreadas = GAMESCREEN.querySelectorAll(".line");
  lineasCreadas.forEach((child) => child.remove());
}

/**
 * Traza la linea al enlazar dos letras entre los centros de cada una
 * @param {*} event Evento mouseOver
 */
function overLetra(event) {
  if (mouseDown && line) {
    let destino = getElementCenter(event.target);
    let length_Angle = lengthAndAngle([origen.x, origen.y], [destino.x, destino.y]);
    line.style.width = `${length_Angle.length}px`;
    line.style.transform = `rotate(${length_Angle.angle}deg)`;
    line = null;

    downLetra(event);
  }
}

/**
 * Dibuja la linea que posteriormente enlazará las letras
 * @param {*} origen Punto de partida de la linea
 */
function trazarLinea(origen) {
  line = document.createElement('div');
  line.className = 'line';
  line.style.left = `${origen.x / 2}px`;
  line.style.top = `${origen.y}px`;

  GAMESCREEN.appendChild(line);

  window.addEventListener("mousemove", () => {
    if (mouseDown && line) {
      let length_Angle = lengthAndAngle([origen.x, origen.y], posicionRaton);
      line.style.width = `${length_Angle.length}px`;
      line.style.transform = `rotate(${length_Angle.angle}deg)`;
    }
  });
}

/**
 * Detecta la posición del ratón
 * @param {*} event Evento del ratón
 */
function posicionarRaton(event) {
  posicionRaton = [event.clientX, event.clientY];
}

function letrasRandom() {
  lettersShaked = [...GAME.letters];
  for (let i = GAME.letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [lettersShaked[i], lettersShaked[j]] = [lettersShaked[j], lettersShaked[i]];
  };
}

function funcionalidadBotones(boton) {
  if (esBotonMartillo(boton)) {
    ayudaMartillo();
  }

  if (esBotonLightbulb(boton)) {
    revelarLetra(1);
  }

  if (esBotonExpand(boton)) {
    revelarLetra(5);
  }

  if (esBotonShuffle(boton)) {
    mezclarLetras();
  }
}


function esBotonMartillo(boton) {
  return boton.className === 'tool' && boton.firstChild?.classList[1] == 'fa-hammer' ||
    boton.classList.contains('fa-hammer') ||
    boton.parentElement.classList.contains('fa-hammer');
}

function esBotonLightbulb(boton) {
  return boton.className === 'tool' && boton.firstChild?.classList[1] == 'fa-lightbulb' || boton.classList.contains('fa-lightbulb') ||
    boton.parentElement.classList.contains('fa-lightbulb');
}

function esBotonExpand(boton) {
  return boton.className === 'tool' && boton.firstChild?.classList[1] == 'fa-expand' ||
    boton.classList.contains('fa-expand') ||
    boton.parentElement.classList.contains('fa-expand');
}

function esBotonShuffle(boton) {
  return boton.className === 'tool' && boton.firstChild?.classList[1] == 'fa-shuffle' || boton.classList.contains('fa-shuffle') ||
    boton.parentElement.classList.contains('fa-shuffle');
}

function mezclarLetras() {
  letrasRandom();
  wheelLetter = document.getElementsByClassName('wheel-letter');

  for (let index = 0; index < lettersShaked.length; index++) {
    posicionLetra(wheelLetter[index], index, lettersShaked);
  }
}
const LETRAS_OCULTAS = Array.from(GRID.querySelectorAll('.letter')).filter(letra => !letra.innerHTML);

function revelarLetra(cantidad, letraARevelar) {
  let letrasARevelar = [];

  if (!letraARevelar) {
    letrasARevelar = LETRAS_OCULTAS.sort(() => Math.random()).slice(0, cantidad);
  } else {
    console.log('letraARevelar ', letraARevelar);
    letrasARevelar.push(letraARevelar);
  }

  letrasARevelar.forEach(letraElemento => {
    const letraCorrecta = obtenerLetraCorrecta(letraElemento);
    if (letraCorrecta) {
      letraElemento.innerHTML = letraCorrecta;
    }
  });
}

function obtenerLetraCorrecta(letraElemento) {
  const [row, col] = letraElemento.style.gridArea.split(' / ').map(num => parseInt(num, 10) - 1);
  return GAME.letterAt(col - x, row - y);
}

function ayudaMartillo() {
  ayudaActiva = true;
  BLACK.classList.remove('hidden');
  LETRAS_OCULTAS.forEach(letra => {
    letra.classList.add('on-top');
  });
};

function finalizarAyuda() {
  ayudaActiva = false;
  BLACK.className = 'hidden';
  LETRAS_OCULTAS.forEach(letra => {
    letra.classList.remove('on-top');
  });
}