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

export function solve(): number {
  let validCount = 0

  for (const line of lines) {
    const numbers = line.split(' ').map(Number)
    const ascending = isAscending(numbers)
    const descending = isDescending(numbers)
    const validJumpsAscending = hasValidJumps(numbers, true)
    const validJumpsDescending = hasValidJumps(numbers, false)

    const validJumps = validJumpsAscending || validJumpsDescending
    const validOrder = ascending || descending

    if (validOrder && validJumps) {
      validCount++
    }
  }

  return validCount
}
