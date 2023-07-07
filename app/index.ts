import * as readline from "readline";

type Resistor = {
  resistance: number;
};

function calculateTotalResistanceSeries(resistors: Resistor[]): number {
  let totalResistance = 0;
  for (const resistor of resistors) {
    totalResistance += resistor.resistance;
  }
  return totalResistance;
}

function calculateTotalResistanceParallel(resistors: Resistor[]): number {
  let totalResistance = 0;
  for (const resistor of resistors) {
    totalResistance += 1 / resistor.resistance;
  }
  return 1 / totalResistance;
}

function printSeriesCircuit(resistors: Resistor[]): void {
  let circuit = "";
  for (let i = 0; i < resistors.length; i++) {
    const resistor = resistors[i];
    circuit += `--[${resistor.resistance} Ω]--`;
    if (i < resistors.length - 1) {
      circuit += "---";
    }
  }
  console.log(circuit);
}

function printParallelCircuit(resistors: Resistor[]): void {
  let circuit = "";
  for (let i = 0; i < resistors.length; i++) {
    const resistor = resistors[i];
    circuit += `--[${resistor.resistance} Ω]--`;
    if (i < resistors.length - 1) {
      circuit += "-||-";
    }
  }
  console.log(circuit);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askCircuitType(): void {
  rl.question(
    'Enter "series" for series circuit, "parallel" for parallel circuit, or "exit" to quit: ',
    (circuitType) => {
      if (circuitType === "series") {
        rl.question(
          "Enter the resistances for the series circuit (separated by spaces): ",
          (seriesInput) => {
            const seriesResistances = seriesInput.split(" ").map(Number);
            const seriesResistors: Resistor[] = seriesResistances.map(
              (resistance) => ({
                resistance,
              })
            );

            console.log("Series Circuit:");
            console.log("Resistor Array:", seriesResistors);
            printSeriesCircuit(seriesResistors);
            console.log(
              "Total resistance in series circuit:",
              calculateTotalResistanceSeries(seriesResistors)
            );

            console.log("");
            askCircuitType();
          }
        );
      } else if (circuitType === "parallel") {
        rl.question(
          "Enter the resistances for the parallel circuit (separated by spaces): ",
          (parallelInput) => {
            const parallelResistances = parallelInput.split(" ").map(Number);
            const parallelResistors: Resistor[] = parallelResistances.map(
              (resistance) => ({
                resistance,
              })
            );

            console.log("Parallel Circuit:");
            console.log("Resistor Array:", parallelResistors);
            printParallelCircuit(parallelResistors);
            console.log(
              "Total resistance in parallel circuit:",
              calculateTotalResistanceParallel(parallelResistors)
            );

            console.log("");
            askCircuitType();
          }
        );
      } else if (circuitType === "exit") {
        rl.close();
      } else {
        console.log("Invalid input. Please try again.");
        console.log("");
        askCircuitType();
      }
    }
  );
}

askCircuitType();
