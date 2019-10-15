const random = _ => {
  const max = 1
  const min = -1
  return Math.random() * (max - min) + min
}


class Perceptron {

  constructor(builder) {
    this.weights = builder.weights
    this.activationFn = builder.activationFn
    this.learningRate = builder.learningRate
    this.usedForProbability = builder.usedForProbability
  }


  train(trainingData, results) {
    trainingData.forEach((input, index) => {
      const guess = this.predict(input)
      const error = results[index] - guess

      for (let index = 0; index < this.weights.length; index++) {
        this.weights[index] += error * input[index] * this.learningRate
      }
    })
  }

  predict(input) {
    let sum = 0 

    input.forEach((field, index) => {
      sum += field * this.weights[index]
    })

    const activated = this.activationFn(sum)

    // if we are using probabilities, just round it up
    if (this.usedForProbability) {
      return Number(activated > 0.5)
    }

    return activated
  }


  print() {
    console.log(`Using weights ${this.weights}`)
  }
}


class PerceptronBuilder {

  constructor() {
  }

  withShape(shape) {
    this.shape = shape
    return this
  }

  withLearningRate(lr) {
    this.learningRate = lr
    return this
  }

  usingActivationFunction(activationFn) {
    this.activationFn = activationFn
    return this
  }

  initialWeights(weights) {
    this.weigths = weights
    return this
  }

  asProbability() {
    this.usedForProbability = true
    return this
  }

  build() {
    if (this.weights == null && this.shape == null) {
      throw new Error('We need the shape if weights are not initially set')
    }

    if (this.weights == null) {
      this.weights = [] 

      for (let i = 0; i < this.shape; i++) {
        this.weights.push(random())
      }
    }

    return new Perceptron(this)
  }
}

module.exports = PerceptronBuilder
