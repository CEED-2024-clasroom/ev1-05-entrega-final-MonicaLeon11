function getElementCenter(element) {
  const { left, top, width, height } = element.getBoundingClientRect()
  return {
      x: left + width / 2,
      y: top + height / 2
  }
}

function lengthAndAngle([x_origin,y_origin], [x_end,y_end]) {
  const deltaX = x_end - x_origin
  const deltaY = y_end - y_origin

  const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

  return {
    length,
    angle
  }
}

export {
  getElementCenter,
  lengthAndAngle
}
