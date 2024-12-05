import { readFile } from '../../utils/readFile.ts'

const file = await readFile<string>(5)
const [rulesInputDirty, updatesInputDirty] = file.split('&\n')
const rulesInput = rulesInputDirty.split('\n')
const updatesInput = updatesInputDirty.split('\n')

type Rule = [number, number]

function parseRules(rules: string[]): Rule[] {
  return rules.map((rule) => {
    const [x, y] = rule.split('|').map(Number)
    return [x, y]
  })
}

function parseUpdates(updates: string[]): number[][] {
  return updates.map((update) => update.split(',').map(Number))
}

function buildGraph(rules: Rule[]): Map<number, number[]> {
  const graph = new Map<number, number[]>()
  for (const [x, y] of rules) {
    if (!graph.has(x)) graph.set(x, [])
    graph.get(x)!.push(y)
  }
  return graph
}

function canBeTopologicallySorted(
  update: number[],
  graph: Map<number, number[]>,
): boolean {
  const position = new Map<number, number>()
  update.forEach((page, index) => position.set(page, index))

  for (const [x, successors] of graph.entries()) {
    for (const y of successors) {
      if (position.has(x) && position.has(y)) {
        if (position.get(x)! >= position.get(y)!) {
          return false
        }
      }
    }
  }
  return true
}

export function topologicalSort(
  update: number[],
  graph: Map<number, number[]>,
): number[] {
  const inDegree = new Map<number, number>()
  const adjList = new Map<number, number[]>()

  for (const page of update) {
    inDegree.set(page, 0)
    adjList.set(page, [])
  }

  for (const [x, successors] of graph.entries()) {
    for (const y of successors) {
      if (adjList.has(x) && adjList.has(y)) {
        adjList.get(x)!.push(y)
        inDegree.set(y, inDegree.get(y)! + 1)
      }
    }
  }

  const queue: number[] = []
  for (const [page, degree] of inDegree.entries()) {
    if (degree === 0) {
      queue.push(page)
    }
  }

  const sortedOrder: number[] = []
  while (queue.length > 0) {
    const current = queue.shift()!
    sortedOrder.push(current)

    for (const neighbor of adjList.get(current)!) {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1)
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor)
      }
    }
  }

  return sortedOrder
}

function findMiddlePage(update: number[]): number {
  const middleIndex = Math.floor(update.length / 2)
  return update[middleIndex]
}

export function solve(): number {
  const rules = parseRules(rulesInput)
  const updates = parseUpdates(updatesInput)
  const graph = buildGraph(rules)

  let sumOfMiddlePages = 0

  for (const update of updates) {
    if (!canBeTopologicallySorted(update, graph)) {
      const sortedUpdate = topologicalSort(update, graph)
      sumOfMiddlePages += findMiddlePage(sortedUpdate)
    }
  }

  return sumOfMiddlePages
}
