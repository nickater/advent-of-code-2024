import { readFile } from '../../utils/readFile.ts'

const file = await readFile<string>(4)
const search = file.trim().split('\n')

const PATTERNS = [
  [
    ['M', 'M'],
    ['S', 'S'],
  ],
  [
    ['S', 'S'],
    ['M', 'M'],
  ],
  [
    ['S', 'M'],
    ['S', 'M'],
  ],
  [
    ['M', 'S'],
    ['M', 'S'],
  ],
]

export const solve = (): number => {
  let count = 0

  for (let r = 0; r < search.length; r++) {
    for (let c = 0; c < search[r].length; c++) {
      if (search[r][c] === 'A') {
        for (const pattern of PATTERNS) {
          if (matchesPattern(search, r, c, pattern)) {
            count++
          }
        }
      }
    }
  }

  return count
}

const matchesPattern = (
  grid: string[],
  row: number,
  col: number,
  pattern: string[][],
) => {
  return (
    getSafeGrid(grid, row - 1, col - 1) === pattern[0][0] &&
    getSafeGrid(grid, row - 1, col + 1) === pattern[0][1] &&
    getSafeGrid(grid, row + 1, col - 1) === pattern[1][0] &&
    getSafeGrid(grid, row + 1, col + 1) === pattern[1][1]
  )
}

const getSafeGrid = (grid: string[], row: number, col: number) =>
  grid[row]?.[col]
