import { readFile } from '../../utils/readFile.ts'

const file = await readFile<string>(3)

export function solve(): number {
  const pattern = /mul\((\d{1,3}),(\d{1,3})\)/g
  let match
  let totalSum = 0

  while ((match = pattern.exec(file)) !== null) {
    const x = parseInt(match[1], 10)
    const y = parseInt(match[2], 10)

    totalSum += x * y
  }

  return totalSum
}
