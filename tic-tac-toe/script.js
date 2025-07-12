const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let currentPlayer = 'X';
let board = Array(9).fill("");

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      status.innerText = `🎉 Player ${board[a]} Wins!`;
      cells.forEach(cell => cell.removeEventListener('click', handleClick));
      return true;
    }
  }
  if (!board.includes("")) {
    status.innerText = "It's a draw!";
    return true;
  }
  return false;
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "") return;

  board[index] = currentPlayer;
  e.target.innerText = currentPlayer;

  if (!checkWinner()) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.innerText = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  board = Array(9).fill("");
  cells.forEach(cell => {
    cell.innerText = "";
    cell.addEventListener('click', handleClick);
  });
  currentPlayer = 'X';
  status.innerText = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);

let scoreX = 0;
let scoreO = 0;
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      status.innerText = `🎉 Player ${board[a]} Wins!`;

      if (board[a] === 'X') scoreX++;
      else scoreO++;

      scoreXEl.innerText = scoreX;
      scoreOEl.innerText = scoreO;

      cells.forEach(cell => cell.removeEventListener('click', handleClick));
      return true;
    }
  }
  if (!board.includes("")) {
    status.innerText = "It's a draw!";
    return true;
  }
  return false;
}
