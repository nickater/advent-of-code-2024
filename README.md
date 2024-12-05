# Advent of Code 2024

This repository contains solutions for the Advent of Code 2024 challenges. Each
day's challenge is implemented in TypeScript using Deno.

## Prerequisites

Make sure you have Deno installed. You can install Deno by following the
instructions on the [official Deno website](https://deno.land/#installation).

## Project Structure

- `inputs/`: Contains input files for each day's challenge.
- `solutions/`: Contains solution files for each day's challenge.
  - `dayX/`: Contains the solution for day X.
    - `part1.ts`: Solution for part 1 of the day's challenge.
    - `part2.ts`: Solution for part 2 of the day's challenge.
    - `index.ts`: Entry point to run both parts of the day's challenge.
- `utils/`: Contains utility functions used across the project.

## Running the Solutions

To run the solutions for a specific day, navigate to the day's directory and run
the `index.ts` file using Deno. For example, to run the solutions for day 1:

```sh
deno run solutions/day1/index.ts
```

## Running Tests

To run all tests, use the following command:

```sh
deno test
```

This will execute all test files located in the `solutions/` directory.

## Setting Up a New Day

To set up a new day, you can use the `setupNewDay.sh` script. This script will
create the necessary files and directories for the new day.

```sh
./setupNewDay.sh
```

This will create a new directory in `solutions/` for the next day and set up the
required files.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file
for details.
