import { readFile } from '../../utils/readFile.ts'

const file = await readFile<string>(4)
const grid = file.split('\n')
const word = 'XMAS'

type Direction = [number, number]

const directions: Direction[] = [
  [0, 1], // Right
  [0, -1], // Left
  [1, 0], // Down
  [-1, 0], // Up
  [1, 1], // Down-Right
  [-1, -1], // Up-Left
  [1, -1], // Down-Left
  [-1, 1], // Up-Right
]

export const solve = (): number => {
  const rows = grid.length
  const cols = grid[0].length
  const wordLength = word.length
  let count = 0

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === word[0]) {
        for (const [dx, dy] of directions) {
          let found = true
          for (let k = 0; k < wordLength; k++) {
            const newRow = row + k * dx
            const newCol = col + k * dy
            if (
              !isValidPosition(newRow, newCol, rows, cols) ||
              grid[newRow][newCol] !== word[k]
            ) {
              found = false
              break
            }
          }
          if (found) {
            count++
          }
        }
      }
    }
  }
  return count
}

function isValidPosition(
  x: number,
  y: number,
  rows: number,
  cols: number,
): boolean {
  return x >= 0 && x < rows && y >= 0 && y < cols
}
