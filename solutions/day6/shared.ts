import { readFile } from '../../utils/readFile.ts'

const file = await readFile<string>(6)
export const parsedData = parseData(file)

export type Position = [number, number]
export type Direction = [number, number]

export function parseData(
  input: string,
): [string[], Position] {
const grid = input.trim().split('\n')
let start: Position = [0, 0]

for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const columnIndex = grid[rowIndex].indexOf('^')
    if (columnIndex !== -1) {
        start = [rowIndex, columnIndex]
        break
    }
}

return [grid, start]
}

export function positionCounter(
  lab: string[],
  current: Position,
  obstacle: Position = [-1, -1],
): [number, boolean, Set<string>] {
  let isLoop = false
  const directions: Direction[] = [[-1, 0], [0, 1], [1, 0], [0, -1]]
  let dirIndex = 0
  const visited = new Set<string>()
  visited.add(`${current[0]},${current[1]},${directions[dirIndex]}`)

  while (true) {
    const [dy, dx] = directions[dirIndex]
    const newPos: Position = [current[0] + dy, current[1] + dx]

    if (
      newPos[0] < 0 || newPos[0] >= lab.length || newPos[1] < 0 ||
      newPos[1] >= lab[0].length
    ) {
      break
    } else if (
      lab[newPos[0]][newPos[1]] === '#' ||
      (newPos[0] === obstacle[0] && newPos[1] === obstacle[1])
    ) {
      dirIndex = (dirIndex + 1) % directions.length
    } else {
      current = newPos
    }

    const state = `${current[0]},${current[1]},${directions[dirIndex]}`
    if (visited.has(state)) {
      isLoop = true
      break
    }
    visited.add(state)
  }

  return [
    visited.size,
    isLoop,
    new Set(Array.from(visited).map((v) => v.split(',').slice(0, 2).join(','))),
  ]
}
