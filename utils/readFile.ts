export const readFile = async <T>(day: number): Promise<T> => {
  const result = await Deno.readFile(`./inputs/day${day}.txt`)

  return new TextDecoder().decode(result) as unknown as T
}
