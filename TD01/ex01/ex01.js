"use strict";

/**
 * Approche primitive et malhabile.
 */
function getMax_amateur(num1, num2) {
  if (num1 >= num2) {
    return num1;
  } else { // Ce `else` est inutile car, si la condition précédente était vraie, la fonction se serait arrêtée avant d'arriver à cette ligne.
    return num2;
  }
}

/**
 * Approche légèrement plus raffinée qui fait usage des propriétés de `return`.
 */
function getMax_intermediate(num1, num2) {
  if (num1 >= num2) {
    return num1;
  }
  return num2;
}

/**
 * Utilisation de l'opérateur ternaire qui réduit la fonction à une seule ligne.
 */
function getMax_semiPro(num1, num2) {
  return (num1 >= num2) ? num1 : num2;
}

/**
 * Utilisation d'une API native, optimisée et compréhensible au premier regard.
 */
function getMax_pro(num1, num2) {
  // `Math` est une classe statique comportant des propriétés et des méthodes utiles à la manipulation des nombres.
  return Math.max(num1, num2);
}

/**
 * Prompt the user to enter a number. Keep going until they have entered a proper numeric value.
 * @param {string} message The message that will appear in the pop-up prompt.
 * @returns The numeric cast of the user's input.
 */
function askForANumber(message = "Please enter a number") {
  /**
   * @type {number | string} The user's input (string) as well as this function' return value (number).
   */
  let num;

  do {
    num = parseInt(prompt(message));
    if (isNaN(num)) {
      alert("Please enter a valid number");
    }
  } while (isNaN(num));

  return num;
}

console.log(
  "Result",
  getMax_pro(
    askForANumber("Please enter the first number"),
    askForANumber("Please enter the second number")
  )
);
