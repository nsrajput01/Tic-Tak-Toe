let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let clearBtn = document.querySelector("#clear");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Score elements
let scoreX = document.querySelector("#score-x");
let scoreO = document.querySelector("#score-o");

let turnO = true;
let count = 0;
const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Initialize scores
let scoreXValue = 0;
let scoreOValue = 0;

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBtns();
    msgContainer.classList.add("hide");
};

const resetScores = () => {
    scoreXValue = 0;
    scoreOValue = 0;
    scoreX.innerText = scoreXValue;
    scoreO.innerText = scoreOValue;
};

const updateScore = (winner) => {
    if (winner === "X") {
        scoreXValue++;
        scoreX.innerText = scoreXValue;
    } else if (winner === "O") {
        scoreOValue++;
        scoreO.innerText = scoreOValue;
    }
};

const showWinner = (winner) => {
    msg.innerHTML = `Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBtns();
    updateScore(winner);
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBtns();
};

const disableBtns = () => {
    boxes.forEach((box) => box.disabled = true);
};

const enableBtns = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Clear only the board, not the scores
clearBtn.addEventListener("click", () => {
    enableBtns();
    msgContainer.classList.add("hide");
});

// Reset the game and the scores when the reset button is clicked
resetBtn.addEventListener("click", () => {
    resetGame();
    resetScores();
});

newGameBtn.addEventListener("click", resetGame);


let darkModeToggle = document.querySelector("#dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkModeToggle.innerText = "Light Mode";
    } else {
        darkModeToggle.innerText = "Dark Mode";
    }
});