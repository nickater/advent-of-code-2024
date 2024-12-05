import { assertEquals } from 'https://deno.land/std@0.106.0/testing/asserts.ts'
import { canBeTopologicallySorted } from './part1.ts'

Deno.test('canBeTopologicallySorted - valid topological sort', () => {
  const graph = new Map<number, number[]>([
    [1, [2]],
    [2, [3]],
    [3, [4]],
  ])
  const update = [1, 2, 3, 4]
  const result = canBeTopologicallySorted(update, graph)
  assertEquals(result, true)
})

Deno.test('canBeTopologicallySorted - invalid topological sort', () => {
  const graph = new Map<number, number[]>([
    [1, [2]],
    [2, [3]],
    [3, [4]],
  ])
  const update = [4, 3, 2, 1]
  const result = canBeTopologicallySorted(update, graph)
  assertEquals(result, false)
})

Deno.test('canBeTopologicallySorted - missing nodes in update', () => {
  const graph = new Map<number, number[]>([
    [1, [2]],
    [2, [3]],
    [3, [4]],
  ])
  const update = [1, 3, 4]
  const result = canBeTopologicallySorted(update, graph)
  assertEquals(result, true)
})

Deno.test('canBeTopologicallySorted - empty graph', () => {
  const graph = new Map<number, number[]>()
  const update = [1, 2, 3, 4]
  const result = canBeTopologicallySorted(update, graph)
  assertEquals(result, true)
})

Deno.test('canBeTopologicallySorted - empty update', () => {
  const graph = new Map<number, number[]>([
    [1, [2]],
    [2, [3]],
    [3, [4]],
  ])
  const update: number[] = []
  const result = canBeTopologicallySorted(update, graph)
  assertEquals(result, true)
})
