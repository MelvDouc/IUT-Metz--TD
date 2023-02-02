for (let i = 1; i <= 100; i++) {
  if (i % (3 * 5) === 0)
    console.log("FizzBuzz");
  else if (i % 3 === 0)
    console.log("Fizz");
  else if (i % 5 === 0)
    console.log("Buzz");
  else
    console.log(i);
}

function askForANumber() {
  /**
   * @type {string|number}
   */
  let input;

  do {
    input = parseInt(prompt("Please enter a number >= 1"));
    if (isNaN(input) || input < 1)
      alert("Please enter valid a number >= 1");
  } while (isNaN(input) || input < 1);

  return input;
}

function main() {
  const max = askForANumber();

  for (let i = 1; i <= max; i++) {
    if (i % (3 * 5) === 0)
      console.log("FizzBuzz");
    else if (i % 3 === 0)
      console.log("Fizz");
    else if (i % 5 === 0)
      console.log("Buzz");
    else
      console.log(i);
  }
}

function logArray() {
  const max = askForANumber();
  const output = [];

  for (let i = 1; i <= max; i++) {
    if (i % (3 * 5) === 0)
      output.push("FizzBuzz");
    else if (i % 3 === 0)
      output.push("Fizz");
    else if (i % 5 === 0)
      output.push("Buzz");
    else
      output.push(i);
  }

  console.log(output);
}

logArray();