function distributeInCircle(n, radius, centerX, centerY, initialAngle = Math.PI/2) {
  const positions = []
  const angleIncrement = (2 * Math.PI) / n

  for (let i = 0; i < n; i++) {
    const angle = i * angleIncrement + initialAngle
    const x = centerX + radius * Math.cos(angle)
    const y = centerY - radius * Math.sin(angle)
    positions.push({ x, y })
  }

  return positions
}

function calculateLetterPositions(numLetters) {

  const radius = 30 // We are working in percentages, so the radius is 50% of the wheel's size
  const centerX = 0
  const centerY = 0

  const positions = distributeInCircle(numLetters, radius, centerX, centerY)
  return positions.map( ({x,y}) => {
    return {
      left: `${x+50}%`,
      top: `${y+50}%`
    }
  })
}

export default calculateLetterPositions
