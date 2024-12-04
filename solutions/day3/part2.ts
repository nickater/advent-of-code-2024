import { readFile } from '../../utils/readFile.ts'

const file = await readFile<string>(3)

export function solve(): number {
  // Regular expressions to find valid instructions
  const mulPattern = /mul\((\d{1,3}),(\d{1,3})\)/g
  const doPattern = /do\(\)/g
  const dontPattern = /don't\(\)/g

  let totalSum = 0
  let mulEnabled = true // Multiplication is enabled by default
  let currentIndex = 0

  // Process the file string using a loop
  while (currentIndex < file.length) {
    // Find the next occurrences of each pattern starting from currentIndex
    mulPattern.lastIndex = currentIndex
    doPattern.lastIndex = currentIndex
    dontPattern.lastIndex = currentIndex

    const nextMulMatch = mulPattern.exec(file)
    const nextDoMatch = doPattern.exec(file)
    const nextDontMatch = dontPattern.exec(file)

    // Determine the closest match
    const nextMulIndex = nextMulMatch ? nextMulMatch.index : Infinity
    const nextDoIndex = nextDoMatch ? nextDoMatch.index : Infinity
    const nextDontIndex = nextDontMatch ? nextDontMatch.index : Infinity

    if (nextMulIndex < nextDoIndex && nextMulIndex < nextDontIndex) {
      // Process mul instruction if it is enabled
      if (mulEnabled) {
        const x = parseInt(nextMulMatch![1], 10)
        const y = parseInt(nextMulMatch![2], 10)
        totalSum += x * y
      }
      currentIndex = mulPattern.lastIndex
    } else if (nextDoIndex < nextMulIndex && nextDoIndex < nextDontIndex) {
      // Process do() instruction
      mulEnabled = true
      currentIndex = doPattern.lastIndex
    } else if (nextDontIndex < nextMulIndex && nextDontIndex < nextDoIndex) {
      // Process don't() instruction
      mulEnabled = false
      currentIndex = dontPattern.lastIndex
    } else {
      // If no more matches are found, break the loop
      break
    }
  }

  return totalSum
}
