
const sigmoid = (value) => {
  return 1 / (1 + Math.pow(Math.E, -value))
}


module.exports = { sigmoid }

