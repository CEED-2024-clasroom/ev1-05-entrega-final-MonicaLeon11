[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/PjCTuN0y)
# Proyecto de Desarrollo Web en Entorno Cliente 2024-2025

[Ejemplo del resultado final del proyecto](https://ceed-cross.netlify.app)

## Entrega en GitHub Classroom

Debes entregar el proyecto en GitHub Classroom. Para ello, incluye los ficheros de tu proyecto
en la carpeta raíz de este repositorio y haz un push de los cambios cuando lo tengas listo.


## Fase I

En esta fase tendrás que hacer que se muestren las casillas del juego. La aplicación deberá ser un proyecto
Vite con al menos los scripts por defecto (dev, build y preview) aunque es recomendable añadir uno más para
pasar el linter.

No se admitirán para las entregas evaluables proyectos que no pasen el linter.

### HTML

El HTML de tu aplicación debe ser como el proporcionado en el ejemplo. No puedes crear elementos distintos
de los proporcionados, lo único que variará son las letras generadas dentro de `#grid`.

Debe utilizar las mismas clases en los elementos, y no puedes añadir estilos o clases adicionales.
Se puede añadir un id a los elementos si lo necesitas.

Puedes añadir un script en la página para incluir tu código.

### Fondo

El fondo de la aplicación está en la carpeta resources. Debes incluirlo en tu proyecto en la carpeta adecuada.

### Iconos

Para que los iconos se muestren debes añadir las dependencias al proyecto:

- `@fortawesome/fontawesome-svg-core`
- `@fortawesome/free-solid-svg-icons`

E importar el modulo `./lib/fontawesome.js` para que funcionen.

### Datos de las casillas

Los datos de las casillas del juego los puedes obtener de la siguiente manera:

```js
const game = new Game(id);
const wordPositions = game.worPositions;
```
Le puedes pasar un `id` a `Game` para obtener una partida específica, o bien no pasarle nada
y obtener una aleatoria. El `id` va de cero al número de juegos definidos en `./lib/game.js` menos uno.

La clase `Game` la puedes importar de `./lib/Game.js`. La estructura de `wordPositions` es:
```js
[
  {
    origin: [x,y],          // La casilla superior izquierda es 0,0. La inferior derecha es 9,9
    direction: 'horizontal' // Puede ser <"vertical" u "horizontal">,
    length: n               // Longitud de la palabra
  },
  ...
]
```

### Centrado de las casillas del juego

La estructura devuelta siempre colocará el juego lo más izquierda y lo más arriba posible. Tienes que centrarla
en grid de la aplicación. Para ello, tienes que utilizar la función center de `./lib/center.js`. La función recibe cuatro parámetros:

- `maxColumn`: Máxima columna que ocupan las casillas. Por ejemplo, si el juego tiene cinco columnas la máxima
columna será la 4 (la primera columna es la 0)
- `maxRow`: Máxima fila que ocupan las casillas. Por ejemplo, si el juego ocupa tres filas la máxima fila será la 2
(la primera fila es la 0)
- `gridWidth`, `gridHeight`: tamaño del grid. Será 10x10

Devolverá un array `[despX, despY]` que indicará cuánto hay que desplazar las casillas para que queden centradas.

### Creación de juegos para pruebas

Puedes crear nuevos juegos modificando el contenido de `./lib/game.js`. Ten en cuenta que la aplicación debe
funcionar con cualquier conjunto de casillas —no sólo con las que hay de ejemplo— siempre y cuando quepan en la
rejilla.

En la web https://crosswordlabs.com/ puedes generar nuevos puzzles si lo necesitas.





## Fase II

En esta fase debes hacer que funcione la rueda para seleccionar las palabras. Para ello deberás crear las letras dentro
de la rueda y programar el funcionamiento de las líneas que unen las letras

### Creación de las letras

Las letras del juego se deben obtener del objeto game, con la propiedad `letters`.

- Se crearán las letras dentro del elemento `#wheel`
- Las letras serán un elemento `div` con la clase `.wheel-letter`
- Tendrán como contenido la letra correspondiente

#### Posicionamiento de las letras

Para colocar las letras en su posición debes cambiar el `left` y `top` de cada una. Para obtener la posición a asignar
utiliza la función calculateLetterPositions de la libreria `./lib/letter_positions.js`. Dicha función
requiere el número de letras a situar en el círculo y devolverá un array de objetos con las propiedades `left` y `top`
que indicarán la posición de cada letra. Por ejemplo:

```js
console.log(calculateLetterPositions(2))

[
  { left: '50%', top: '20%' },
  { left: '49.99999999999999%', top: '80%' }
]
```

Debes asignar estas posiciones a cada una de las letras.

### Programación de las líneas

Consulta el [ejemplo de funcionamiento](https://ceed-cross.netlify.app) para entender mejor cómo tienen que funcionar
las líneas.


- Al pulsar el botón izquierdo del ratón sobre una letra:
  - Se aplicará la clase `selected` a la letra
  - Se creará un `div` con la clase `line` que tendrá como origen el centro de la letra y terminará en la posición del ratón
- Cuando se mueva el ratón la línea se actualizará para que termine en la posición actual del ratón
- Si el ratón pasa por encima de otra letra por la que no hubiera pasado antes:
  - Se fijará la línea para que una el centro de la letra actual con el centro de la nueva letra
  - Se creará una nueva línea que una el centro de la nueva letra con la posición actual del ratón
  - Se creará aplicará la clase `selected` a la nueva letra
- Cuando se suelte el botón izquierdo se borrarán todas las líneas y se eliminará la clase `selected` de las letras seleccionadas

Para calcular el centro de una letra puedes utilizar la función `getElementCenter` de `./lib/line_position.js`. La función
toma un elemento HTML y devuelve un objeto con las propiedades `x` e `y` que indican el centro del elemento.

Para posicionar la línea debes asignarle la `x` e `y` del centro de la letra de origen (en pixels) a las propiedades `left` y `top`.
Además, debes calcular la longitud y el ángulo de la línea. Para ello puedes utilizar la función `lengthAndAngle` de `./lib/line_position.js`.
Dicha función toma dos arrays con las posiciones x e y como primer y segundo elemento y devuelve un objeto con las propiedades `length` y `angle`.
Debes asignar la longitud a la propiedad `width` y a la propiedad `transform` de la línea el valor `rotate(${angle}deg)`.

Por ejemplo:

```js
const origin = [10,20]
const end = [30,40]

const { length, angle } = lengthAndAngle(origin, end)
// Asignar el valor de length a la propiedad width de la línea y el valor de angle a la propiedad transform
```


## Fase III

Se han modificado los siguientes ficheros respecto a la fase anterior, descárgalos antes de empezar a trabajar:
- `/lib/Game.js`
- `/styles/styles.css`
- Ha cambiado también el HTML, hay un nuevo `div` con el id `#black`

En esta fase vas a hacer que las palabras seleccionadas se marquen en el tablero. Para ello debes utilizar la función
`findWord` de la clase `Game`.

La función `findWord` toma un string como parámetro y devuelve un `wordPosition` donde se encuentra la palabra. Ten en cuenta que la posición es de antes de haberlas centrado en el tablero. Debes modificar el contenido de los elementos letter correspondientes para mostrar la palabra seleccionada.

Si la palabra no está en el juego lanzará una excepción de la clase `WordNotFound`. En el caso de que la palabra no esté, simplemente no hagas nada.


## Fase IV

En esta fase tienes que implementar tres de las ayudas. Para ello debes programar el funcionamiento de los botones de mezcla, bombilla y diana.

- **Ayuda mezcla**: Al pulsar en el botón de mezcla se cambiarán de posición las letras de la rueda. ***Debes cambiar la posición, no crear nuevas letras***, para que se vea el efecto de mezcla definido en el CSS.
- **Ayuda bombilla**: Al pulsar en la bombilla, se revelará una letra al azar en el tablero. Si todas las letras están reveladas no hará nada.
- **Ayuda diana**: Al pulsar en la diana (el icono de abajo de la mezcla) se revelarán cinco letras al azar en el tablero. Si hay
menos de cinco letras por revelar, se revelarán todas las que queden.

Para revelar letras debes utilizar la función `game.letterAt(x, y)` para obtener la letra en la posición x, y del tablero, donde x e y son las coordenadas de la letra <ins>antes de centrar</ins>.


## Fase V

El objetivo de esta fase es finalizar el juego programando la ayuda del martillo. Debe funcionar de la siguiente forma:

- Al pulsar el martillo:
  1) Quitar la clase `hidden` al div `#black`
  2) Añadir la clase `.on-top` a todas las letras

A partir de ese momento:

- Si se pulsa en una letra:
  1) Si la letra está vacía, se rellenará con la letra correcta y se finalizará la ayuda
  2) Si la letra está ya rellenada no se hará nada, y se continuará con la selección

- Si se pulsa en cualquier otro lugar:
  1) Se finalizará la ayuda

- Al finalizar la ayuda:
  1) Quitar la clase `.on-top` a todas las letras
  2) Añadir la clase hidden al `div` `#black`
