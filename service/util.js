

const getRandom = (array, count) => {
    const item = array[Math.floor(Math.random() * array.length)]
    // Shuffle array
    const shuffled = array.sort(() => 0.5 - Math.random())
    // Get sub-array of first n elements after shuffled
    const selected = shuffled.slice(0, count)
    return selected
  }

  module.exports ={
      getRandom
  }