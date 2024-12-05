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
    if (!graph.has(x)) {
      graph.set(x, [])
    }
    const successors = graph.get(x)
    if (successors) {
      successors.push(y)
    }
  }
  return graph
}

export function canBeTopologicallySorted(
  update: number[],
  graph: Map<number, number[]>,
): boolean {
  const position = new Map<number, number>()
  update.forEach((page, index) => position.set(page, index))

  for (const [x, successors] of graph.entries()) {
    for (const y of successors) {
      if (!position.has(x) || !position.has(y)) continue
      if (position.get(x)! >= position.get(y)!) {
        return false
      }
    }
  }
  return true
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
    if (canBeTopologicallySorted(update, graph)) {
      sumOfMiddlePages += findMiddlePage(update)
    }
  }

  return sumOfMiddlePages
}
