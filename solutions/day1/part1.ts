import { readFile } from '../../utils/readFile.ts'

const file = await readFile<string>(1)
const lines = file.split('\n')

const left = lines.map((line) => line.split(' ')[0])
const right = lines.map((line) => line.split(' ')[1])

const sortedLeft = left.map(Number).sort()
const sortedRight = right.map(Number).sort()

export function solve(): number {
  let count = 0

  for (let i = 0; i < sortedLeft.length; i++) {
    const result = sortedLeft[i] - sortedRight[i]

    count += Math.abs(result)
  }

  return count
}
