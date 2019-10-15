// importamos el builder para construir nuestro perceptron
const PerceptronBuilder = require('./refactored.js')
const { sigmoid } = require('./activationFunctions.js')

const training = [ 
  [1, 1, 1], 
  [1, 0, 1], 
  [0, 1, 0], 
  [0, 1, 0], 
  [0, 1, 0], 
  [1, 1, 1], 
  [1, 0, 1], 
  [1, 1, 1], 
  [1, 0, 1], 
  [0, 1, 0], 
  [0, 1, 0], 
  [0, 1, 0], 
  [0, 1, 0], 
  [0, 1, 0], 
  [0, 1, 0], 
  [0, 1, 0]
]

// separar la informacion entre "observaciones" (llamado X)
// y los resultados de dichas observaciones (llamado Y)

// en este caso, obtenemos posiciones 0 y 1
const x = training.map(t => t.slice(0, 2))
// para el resultado, podemos accesar directamente a la posicion 2
const y = training.map(t => t[2])

// creamos el perceptron
const perceptron = new PerceptronBuilder()
    .withLearningRate(0.4)
    .usingActivationFunction(sigmoid)
    .withShape(2)
    .asProbability()
    .build()


// entrenar el modelo
perceptron.train(x, y)

const testingData = [[0, 0], [0, 1], [1, 0], [1, 1]]

testingData.forEach(ev => {
  const prediction = perceptron.predict(ev)

  console.log(`For ${ev}, the prediction is ${prediction}`)
})

console.log(perceptron.print())
