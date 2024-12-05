import { assertEquals } from 'https://deno.land/std@0.106.0/testing/asserts.ts'
import { topologicalSort } from './part2.ts'

Deno.test('topologicalSort - simple graph', () => {
  const graph = new Map<number, number[]>([
    [1, [2]],
    [2, [3]],
    [3, [4]],
  ])
  const update = [1, 2, 3, 4]
  const result = topologicalSort(update, graph)
  assertEquals(result, [1, 2, 3, 4])
})

Deno.test('topologicalSort - graph with multiple edges', () => {
  const graph = new Map<number, number[]>([
    [1, [2, 3]],
    [2, [4]],
    [3, [4]],
  ])
  const update = [1, 2, 3, 4]
  const result = topologicalSort(update, graph)
  assertEquals(result, [1, 2, 3, 4])
})

Deno.test('topologicalSort - graph with cycle', () => {
  const graph = new Map<number, number[]>([
    [1, [2]],
    [2, [3]],
    [3, [1]],
  ])
  const update = [1, 2, 3]
  const result = topologicalSort(update, graph)
  assertEquals(result, [])
})

Deno.test('topologicalSort - disconnected graph', () => {
  const graph = new Map<number, number[]>([
    [1, [2]],
    [3, [4]],
  ])
  const update = [1, 2, 3, 4]
  const result = topologicalSort(update, graph)
  assertEquals(result, [1, 3, 2, 4])
})

Deno.test('topologicalSort - empty graph', () => {
  const graph = new Map<number, number[]>()
  const update = [1, 2, 3, 4]
  const result = topologicalSort(update, graph)
  assertEquals(result, [1, 2, 3, 4])
})
