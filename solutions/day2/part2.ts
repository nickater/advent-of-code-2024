import { readFile } from '../../utils/readFile.ts'

const file = await readFile<string>(2)
const lines = file.split('\n')

function isAscending(line: number[]): boolean {
  return line.every((value, index) => {
    if (index === 0) return true

    return line[index - 1] < value
  })
}

function isDescending(line: number[]): boolean {
  return line.every((value, index) => {
    if (index === 0) return true

    return line[index - 1] > value
  })
}

function hasValidJumps(line: number[], ascending: boolean = true): boolean {
  return line.every((_, index) => {
    if (index === 0) return true

    const diff = line[index] - line[index - 1]
    return ascending ? (diff > 0 && diff <= 3) : (diff < 0 && diff >= -3)
  })
}

function isAlmostValid(numbers: number[]): boolean {
  for (let i = 0; i < numbers.length; i++) {
    const withoutCurrentNumber = numbers.slice(0, i).concat(
      numbers.slice(i + 1),
    )

    const isAscendingWithoutCurrent = isAscending(withoutCurrentNumber) &&
      hasValidJumps(withoutCurrentNumber, true)
    const isDescendingWithoutCurrent = isDescending(withoutCurrentNumber) &&
      hasValidJumps(withoutCurrentNumber, false)

    if (isAscendingWithoutCurrent || isDescendingWithoutCurrent) {
      return true
    }
  }
  return false
}

export function solve(): number {
  let validCount = 0

  for (const line of lines) {
    const numbers = line.split(' ').map(Number)

    const isValidAscending = isAscending(numbers) &&
      hasValidJumps(numbers, true)
    const isValidDescending = isDescending(numbers) &&
      hasValidJumps(numbers, false)
    const isValidAlmost = isAlmostValid(numbers)

    if (isValidAscending || isValidDescending || isValidAlmost) {
      validCount++
    }
  }

  return validCount
}
