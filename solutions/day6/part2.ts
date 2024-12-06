import { parsedData, Position, positionCounter } from './shared.ts'

export function solve(): number {
  const [grid, currentPosition] = parsedData

  const obstaclePositions = positionCounter(grid, currentPosition)[2]
  let loopCount = 0

  for (const obstacle of obstaclePositions) {
    const [obstacleY, obstacleX] = obstacle.split(',').map(Number) as Position

    // Skip if the obstacle is at the current position
    if (obstacleY === currentPosition[0] && obstacleX === currentPosition[1]) {
      continue
    }

    const [, isLoop] = positionCounter(grid, currentPosition, [obstacleY, obstacleX])

    // Increment loop count if it's a loop
    if (isLoop) {
      loopCount += 1
    }
  }

  return loopCount
}
