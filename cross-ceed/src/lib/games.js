// Puedes generar más juegos en:
// https://crosswordlabs.com/

const GAME_SIMPLE_1 = {
  letters: 'abc',
  words: new Map([
    ['abc', { origin: [0, 0], direction: 'horizontal' }]
  ])
}

const GAME_SIMPLE_2 = {
  letters: 'abc',
  words: new Map([
    ['abc', { origin: [0, 0], direction: 'vertical' }]
  ])
}

// 2024-10-11-146
const GAME_1 = {
  letters: 'abcde',
  words: new Map([
    ['acre',  { origin: [0, 0], direction: 'vertical'} ],
    ['cebar', { origin: [2, 0], direction: 'vertical' }],
    ['brea',  { origin: [4, 1], direction: 'vertical' } ],
    ['cae',   { origin: [0, 1], direction: 'horizontal' } ],
    ['bar',   { origin: [2, 2], direction: 'horizontal' } ]
  ])
}

const GAME_2 = {
  letters: 'abria',
  words: new Map([
    ['bar',    { origin: [1, 4], direction: 'vertical' } ],
    ['abria', { origin: [0, 0], direction: 'vertical' } ],
    ['iba',    { origin: [3, 4], direction: 'vertical' } ],
    ['abri',   { origin: [0, 4], direction: 'horizontal' } ],
    ['ria',    { origin: [1, 6], direction: 'horizontal' } ]
  ])
}

const GAME_3 = {
  letters: 'foobartee',
  words: new Map([
    ['foo',    { origin: [0, 0], direction: 'horizontal' } ],
    ['bar', { origin: [7, 0], direction: 'horizontal' } ],
    ['tee',    { origin: [0,9], direction: 'horizontal' } ],
    ['bee',   { origin: [7, 9], direction: 'horizontal' } ],
  ])
}

const GAME_4 = {
  letters: 'foobartee',
  words: new Map([
    ['foo',    { origin: [0, 0], direction: 'vertical' } ],
    ['bar', { origin: [9, 0], direction: 'vertical' } ],
    ['tee',    { origin: [0,7], direction: 'vertical' } ],
    ['bee',   { origin: [9, 7], direction: 'vertical' } ],
  ])
}

const GAMES = [
  GAME_SIMPLE_1,
  GAME_SIMPLE_2,
  GAME_1,
  GAME_2,
  GAME_3,
  GAME_4,
]

export default GAMES
