import { readFile } from '../../utils/readFile.ts'

const file = await readFile<string>(1)
const lines = file.split('\n')

const left = lines.map((line) => line.split(' ')[0])
const right = lines.map((line) => line.split(' ')[1])

const sortedLeft = left.map(Number).sort()
const sortedRight = right.map(Number).sort()

function calculateSimilarityScore(num: number, list: number[]) {
  const count = list.filter((val) => val === num).length

  return num * count
}

export function solve(): number {
  let similarityScore = 0

  sortedLeft.forEach((num) => {
    similarityScore += calculateSimilarityScore(num, sortedRight)
  })

  return similarityScore
}
