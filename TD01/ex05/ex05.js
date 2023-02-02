// ===== ===== ===== ===== =====
// BINDINGS
// ===== ===== ===== ===== =====

const PLAYERS = {
  FIRST: "X",
  SECOND: "O"
};
let currentPlayer,
  lines,
  numberOfCells,
  filledCellCount;

const ticTacToeGrid = document.getElementById("tic-tac-toe-grid");
const newGameButton = document.getElementById("new-game-btn");

// ===== ===== ===== ===== =====
// INIT
// ===== ===== ===== ===== =====

newGameButton.addEventListener("click", playNewGame);
playNewGame();

function playNewGame() {
  const size = promptUserForSize("How many cells per row should there be?");

  if (size === null)
    return alert("Bye");

  currentPlayer = PLAYERS.FIRST;
  filledCellCount = 0;
  createGridAndSetLines(size);
  ticTacToeGrid.addEventListener("click", playMove);
}

// ===== ===== ===== ===== =====
// GRID FUNCTIONS
// ===== ===== ===== ===== =====

function createGridAndSetLines(size = 3) {
  ticTacToeGrid.innerHTML = "";
  const rows = [];

  for (let x = 0; x < size; x++) {
    const row = [];
    const tr = document.createElement("tr");
    for (let y = 0; y < size; y++) {
      const td = document.createElement("td");
      row.push(td);
      tr.append(td);
    }
    rows.push(row);
    ticTacToeGrid.append(tr);
  }

  const columns = Array.from({ length: size }, (_, x) => {
    return Array.from({ length: size }, (_, y) => rows[y][x]);
  });
  const leftDiagonal = Array.from({ length: size }, (_, x) => rows[x][x]);
  const rightDiagonal = Array.from({ length: size }, (_, x) => rows[x][size - x - 1]);

  lines = [
    ...rows,
    ...columns,
    leftDiagonal,
    rightDiagonal
  ];
  numberOfCells = size ** 2;
}

function playMove(event) {
  const element = event.target;

  if (!isEmptyCell(element))
    return;

  element.innerText = currentPlayer;
  filledCellCount++;
  const winningLine = findWinningLine();

  if (winningLine !== null) {
    setWin(winningLine);
    return;
  }

  if (filledCellCount === numberOfCells) {
    setDraw();
    return;
  }

  currentPlayer = getOppositePlayer();
}

function getOppositePlayer() {
  return (currentPlayer === PLAYERS.FIRST)
    ? PLAYERS.SECOND
    : PLAYERS.FIRST;
}

function isEmptyCell(element) {
  return element instanceof HTMLElement
    && element.matches("td")
    && element.innerText === "";
}

// ===== ===== ===== ===== =====
// STATE
// ===== ===== ===== ===== =====

function findWinningLine() {
  for (const line of lines) {
    if (line.every(cell => cell.innerText === currentPlayer))
      return line;
  }

  return null;
}

function setWin(winningLine) {
  winningLine.forEach((cell) => cell.classList.add("win"));
  ticTacToeGrid.removeEventListener("click", playMove);
  alert(`${currentPlayer} wins`);
}

function setDraw() {
  ticTacToeGrid
    .querySelectorAll("td")
    .forEach(cell => cell.classList.add("draw"));
  alert("Draw");
}

// ===== ===== ===== ===== =====
// PROMPT
// ===== ===== ===== ===== =====

function promptUserForSize(message) {
  const answer = prompt(message);

  if (!answer)
    return null;

  const size = parseInt(answer);

  if (size >= 2)
    return size;

  return promptUserForSize("Enter a number greater than 1.");
}