"use strict";

// ===== ===== ===== ===== =====
// BINDINGS
// ===== ===== ===== ===== =====

const bingoTable = document.querySelector("#bingo-table");
// Group rows into a two-dimension array of cells
const rows = [...bingoTable.querySelectorAll("tbody tr")].map((row) => {
  return [...row.querySelectorAll(".cell")];
});

const TABLE_HEIGHT = rows.length;
const TABLE_WIDTH = rows[0].length;

// Group column into a two-dimension array of cells
const columns = Array.from({ length: TABLE_WIDTH }, (_, y) => {
  return Array.from({ length: TABLE_HEIGHT }, (_, x) => rows[y][x]);
});
const leftDiagonal = Array.from({ length: TABLE_WIDTH }, (_, x) => {
  return rows[x][x];
});
const rightDiagonal = Array.from({ length: TABLE_WIDTH }, (_, x) => {
  return rows[x][TABLE_WIDTH - x - 1];
});
const lines = [
  ...rows,
  ...columns,
  leftDiagonal,
  rightDiagonal
];

const BINGO_MIN_VALUE = 1;
const BINGO_MAX_VALUE = 90;

const CSS_CLASSES = {
  ACTIVE: "active",
  MATCH: "match"
};

const freeCell = document.querySelector("#cell-free");
const rollerResult = document.querySelector("#roller-result");
const generateBtn = document.querySelector("#generate-btn");
const playNumberBtn = document.querySelector("#play-number");
let numbers = [];

// ===== ===== ===== ===== =====
// INIT
// ===== ===== ===== ===== =====

generateBtn.addEventListener("click", initBingoTable);
playNumberBtn.addEventListener("click", rollNumber);

initBingoTable();

// ===== ===== ===== ===== =====
// FUNCTIONS
// ===== ===== ===== ===== =====

/**
 * @param {number} min
 * @param {number} max
 */
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNumbers() {
  const numberSet = new Set();

  while (numberSet.size < 24) {
    const randomNumber = getRandomInteger(BINGO_MIN_VALUE, BINGO_MAX_VALUE);
    numberSet.add(randomNumber);
  }

  return [...numberSet];
}

function initBingoTable() {
  numbers = getRandomNumbers();

  for (const row of rows) {
    for (const cell of row) {
      if (cell !== freeCell) {
        cell.classList.remove(CSS_CLASSES.ACTIVE, CSS_CLASSES.MATCH);
        cell.innerText = numbers.pop();
      }
    }
  }

  rollerResult.innerText = "";
}

function rollNumber() {
  let randomCell;
  do {
    const randomRow = rows[getRandomInteger(0, TABLE_HEIGHT - 1)];
    randomCell = randomRow[getRandomInteger(0, TABLE_WIDTH - 1)];
  } while (randomCell === freeCell || randomCell.classList.contains(CSS_CLASSES.ACTIVE));

  randomCell.classList.add(CSS_CLASSES.ACTIVE);
  rollerResult.innerText = randomCell.innerText;

  const winningLine = findWinningLine();
  if (winningLine) {
    for (const cell of winningLine)
      cell.classList.add(CSS_CLASSES.MATCH);
    alert("BINGO!");
  }
}

// Find the row, col or diagonal wherein all cells are active.
function findWinningLine() {
  for (const line of lines) {
    let isWinningLine = true;

    for (const cell of line) {
      if (cell === freeCell) continue;
      if (!cell.classList.contains(CSS_CLASSES.ACTIVE)) {
        isWinningLine = false;
        break;
      }
    }

    if (isWinningLine)
      return line;
  }

  return null;
}