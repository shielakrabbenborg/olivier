const celebration = document.getElementById("celebration");
const gameBoard = document.getElementById("game-board");
const gridSize = 5; // Changed from 4 to 5
const pieceCount = gridSize * 4; // Changed from gridSize * gridSize to gridSize * 4

// Generate puzzle pieces
const pieces = [];
for (let i = 0; i < pieceCount; i++) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.backgroundPosition = `-${(i % gridSize) * 100}px -${Math.floor(i / gridSize) * 100}px`;
    piece.setAttribute("data-index", i);
    pieces.push(piece);
}

// Shuffle pieces and add them to the game board
const shuffledPieces = shuffleArray(pieces);
shuffledPieces.forEach((piece, index) => {
    piece.style.order = index;
    gameBoard.appendChild(piece);
});


// Add click event listener for swapping pieces
gameBoard.addEventListener("click", (event) => {
    if (event.target.classList.contains("piece")) {
        const clickedPiece = event.target;
        const firstPiece = document.querySelector(".piece.selected");
        if (firstPiece) {
            swapPieces(firstPiece, clickedPiece);
            firstPiece.classList.remove("selected");
            if (checkSolution()) {
                setTimeout(() => {
                    gameBoard.classList.add("completed");
                    const birthdayVideo = document.getElementById("birthday-video");
                    birthdayVideo.classList.remove("hidden");
                    celebration.classList.remove("hidden");
                    birthdayVideo.play();
                }, 100);
            }
        } else {
            clickedPiece.classList.add("selected");
        }
    }
});

// Shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Swap pieces on the game board
function swapPieces(piece1, piece2) {
    const tempOrder = piece1.style.order;
    piece1.style.order = piece2.style.order;
    piece2.style.order = tempOrder;
}

// Check if the puzzle is solved
function checkSolution() {
    return Array.from(gameBoard.children).every((piece, index) => {
        return parseInt(piece.getAttribute("data-index"), 10) === parseInt(piece.style.order, 10);
    });
}

if (checkSolution()) {
    setTimeout(() => {
        gameBoard.classList.add("completed");
        const birthdayVideo = document.getElementById("birthday-video");
        birthdayVideo.classList.remove("hidden");
        celebration.classList.remove("hidden");
    }, 100);
}
