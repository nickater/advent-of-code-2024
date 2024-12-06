import { parsedData, positionCounter } from './shared.ts'

export function solve(): number {
  // Destructure parsedData to get the grid and current position
  const [grid, current] = parsedData

  // Use posCounter to get the position count and return the size of the third element
  const positionCount = positionCounter(grid, current)
  const result = positionCount[2].size

  return result
}
