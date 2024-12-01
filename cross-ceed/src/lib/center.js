// Expects the maxColumn and maxRow to be zero-based
// For example, a word of length 3 that starts at 0,0 and goes to the right
// will have a maxColumn of 3 and a maxRow of 0.
// You should pass the rightmost column and the bottommost row
//
// The function will return the desplacement needed to center the words
//
function center(maxColumn, maxRow, gridWidth, gridHeight) {
  const despx = Math.floor((gridWidth - (maxColumn + 1)) / 2)
  const despy = Math.floor((gridHeight - (maxRow + 1)) / 2)
  return [despx, despy]
}

export default center
