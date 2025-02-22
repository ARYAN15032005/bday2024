// Puzzle State
let puzzleGrid = document.getElementById("puzzle-grid");
let statusText = document.getElementById("status");
let nextLink = document.getElementById("next-link");

let tiles = [];
let emptyTile = { row: 2, col: 2 }; // Position of the empty tile

// Initialize Puzzle
function initPuzzle() {
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, null]; // 8-puzzle with empty tile
  shuffleArray(numbers); // Shuffle the tiles

  puzzleGrid.innerHTML = ""; // Clear existing tiles
  tiles = []; // Reset tile references

  numbers.forEach((num, index) => {
    let tile = document.createElement("div");
    tile.className = num ? "tile" : "tile empty";
    tile.textContent = num || "";

    let row = Math.floor(index / 3);
    let col = index % 3;

    tile.onclick = () => moveTile(row, col);
    tiles.push({ element: tile, row, col });

    puzzleGrid.appendChild(tile);
  });
}

// Shuffle Array Helper Function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Move Tile Logic
function moveTile(row, col) {
  if (Math.abs(row - emptyTile.row) + Math.abs(col - emptyTile.col) === 1) {
    let emptyElement = tiles.find(t => t.row === emptyTile.row && t.col === emptyTile.col).element;
    let tileElement = tiles.find(t => t.row === row && t.col === col).element;

    emptyElement.textContent = tileElement.textContent;
    tileElement.textContent = "";

    tileElement.classList.add("empty");
    emptyElement.classList.remove("empty");

    [emptyTile.row, emptyTile.col] = [row, col];

    checkWin();
  }
}

// Check Win Condition
function checkWin() {
  let correctOrder = ["1", "2", "3", "4", "5", "6", "7", "8", ""];
  let currentOrder = Array.from(puzzleGrid.children).map(tile => tile.textContent);

  if (JSON.stringify(correctOrder) === JSON.stringify(currentOrder)) {
    statusText.textContent = "Congratulations! Puzzle Solved!";
    nextLink.classList.remove("hidden");
  }
}

// Restart Puzzle
function shuffle() {
  initPuzzle();
  statusText.textContent = "";
  nextLink.classList.add("hidden");
}

// Initialize on Page Load
initPuzzle();
