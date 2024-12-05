#!/bin/bash

# Get the highest existing day number
highest_day=$(ls solutions | grep -Eo 'day[0-9]+' | grep -Eo '[0-9]+' | sort -n | tail -1)

# Calculate the next day number
if [ -z "$highest_day" ]; then
	next_day=1
else
	next_day=$((highest_day + 1))
fi

# Create the new directory
new_directory="solutions/day$next_day"
mkdir -p "$new_directory"

# Create the required files
touch "$new_directory/part1.ts"
touch "$new_directory/part2.ts"
touch "inputs/day$next_day.txt"
touch "$new_directory/index.ts"

echo "Setup complete for $new_directory"

# Add the solve function to part1.ts and part2.ts
cat <<EOL > "$new_directory/part1.ts"
import { readFile } from '../../utils/readFile.ts'

const file = await readFile<string>($next_day)

export function solve(): number {
	return 0;
}
EOL

cat <<EOL > "$new_directory/part2.ts"
import { readFile } from '../../utils/readFile.ts'

const file = await readFile<string>($next_day)

export function solve(): number {
	return 0;
}
EOL

# Add imports and function calls to index.ts
cat <<EOL > "$new_directory/index.ts"
import { solve as solvePart1 } from './part1.ts';
import { solve as solvePart2 } from './part2.ts';

console.log('Day $next_day');
console.log('Part 1:', solvePart1());
console.log('Part 2:', solvePart2());
EOL