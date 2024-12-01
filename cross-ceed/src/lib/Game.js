import GAMES from './games.js'

class WordNotFound extends Error {
  constructor(message) {
    super(message)
    this.name = 'WordNotFound'
  }
}

class Game {
  #gameId
  #game
  #board

  constructor(gameId = null) {
    this.#gameId = gameId !== null ? gameId : Game.randomGameId()
    this.#game = GAMES[this.#gameId]
    this.#board = this.#generateBoard()
  }

  #generateBoard() {
    const words = this.#game.words.entries()
    const board = []
    for(const [word, position] of words) {
      const positions = this.#positionsOfWord(word, position)
      for(const letter of word) {
        const [x, y] = positions.shift()
        if (!board[x]) {
          board[x] = []
        }
        board[x][y] = letter
      }
    }

    return board
  }

  // DEBUG, so you can see the board
  get board() {
    return this.#board
  }

  static randomGameId() {
    return Math.floor(Math.random() * GAMES.length)
  }

  get letters() {
    return this.#game.letters
  }

  get wordPositions() {
    const words = this.#game.words.entries()
    return Array.from(words).map(
      ([word, position]) => ({ ...position, length: word.length }))
  }

  findWord(word) {
    const wordPosition = this.#game.words.get(word.toLowerCase())
    if (!wordPosition) {
      throw new WordNotFound(`La palabra ${word} no está en el juego ${this.#gameId}`)
    }
    return wordPosition
  }

  #positionsOfWord(word, position) {
    const incX = position.direction === 'horizontal' ? 1 : 0
    const incY = position.direction === 'vertical' ? 1 : 0

    const [x, y] = position.origin
    const positions = []
    for (let i = 0; i < word.length; i++) {
      positions.push([x + i * incX, y + i * incY])
    }

    return positions
  }

  // zero-based column and row
  letterAt(column, row) {
    return this.#board[column]?.[row]
  }

  letterPositions(letter) {
    const positions = []
    for (const [x, row] of this.#board.entries()) {
      for (const [y, l] of row.entries()) {
        if (l.toLowerCase() === letter.toLowerCase()) {
          positions.push([x, y])
        }
      }
    }

    return positions
  }
}

export { Game, WordNotFound }
