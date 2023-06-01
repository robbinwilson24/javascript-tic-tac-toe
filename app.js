let heading = document.querySelector("#mainHeading");
let newGameButton = document.querySelector(".newGameButton");
let player1Turn = document.querySelector(".player1Turn");
let player2Turn = document.querySelector(".player2Turn");
let gameCell = document.querySelectorAll(".gameCell");
let editNameSpan = document.querySelectorAll(".editName");
let player2Section = document.querySelector(".playerSection2");
let player1Section = document.querySelector(".playerSection1");




let gameStarted = false;
let gameOver = false;

const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]





let currentTurn;


let player1Array = [];
let player2Array = [];


function newGame() {

    let randomNum = Math.random();

    gameOver = false;
    player1Section.classList.remove("winningPlayer");
    player2Section.classList.remove("winningPlayer");
    player1Section.classList.remove("gameDrawn");
    player2Section.classList.remove("gameDrawn");
    player1Section.classList.remove("currentPlayerTurn");
    player2Section.classList.remove("currentPlayerTurn");



    player1Turn.textContent = "";
    player2Turn.textContent = "";
    player1Array = [];
    player2Array = [];

    for (let cell of gameCell) {
        cell.innerHTML = "";
        cell.classList.remove("winningCell");
    }

    if (randomNum < 0.5) {
        currentTurn = "player1";
        player1Turn.textContent = "Your turn.";
        player1Section.classList.add("currentPlayerTurn");

    } else {
        currentTurn = "player2";
        player2Turn.textContent = "Your turn."
        player2Section.classList.add("currentPlayerTurn");
    }
}

newGameButton.addEventListener("click", newGame);


function checkWin() {
    // Check if any winning combination is present in player1Array
    for (let combination of winningCombinations) {
        let isWinningCombination = combination.every((cell) => player1Array.includes(cell));
        if (isWinningCombination) {

            for (let cellValue of combination) {
                let winningCell = document.querySelector(`[value="${cellValue}"]`);
                winningCell.classList.add("winningCell");
            }
            player2Turn.textContent = "";
            player1Turn.textContent = "";

            // Show that player 1 has won 
            player1Turn.textContent = "YOU WIN!.";
            player2Turn.textContent = "";


            gameOver = true;
            player1Section.classList.remove("currentPlayerTurn");
            player2Section.classList.remove("currentPlayerTurn");
            player1Section.classList.add("winningPlayer");


            return;
        }
    }

    // Check if any winning combination is present in player2Array
    for (let combination of winningCombinations) {
        let isWinningCombination = combination.every((cell) => player2Array.includes(cell));
        if (isWinningCombination) {

            for (let cellValue of combination) {
                let winningCell = document.querySelector(`[value="${cellValue}"]`);
                winningCell.classList.add("winningCell");
            }

            player2Turn.textContent = "";
            player1Turn.textContent = "";

            // Show player 2 has won 
            player2Turn.textContent = "YOU WIN!.";
            player1Turn.textContent = "";

            gameOver = true;
            player1Section.classList.remove("currentPlayerTurn");
            player2Section.classList.remove("currentPlayerTurn");
            player2Section.classList.add("winningPlayer");


            return;
        }
    }

    // If no winning combination is found and all cells are filled, it's a draw
    if (player1Array.length + player2Array.length === 9) {
        player2Turn.textContent = "";
        player1Turn.textContent = "";
        player2Turn.textContent = "It's a draw.";
        player1Turn.textContent = "It's a draw.";
        player1Section.classList.add("gameDrawn");
        player2Section.classList.add("gameDrawn");


        gameOver = true;
        player1Section.classList.remove("currentPlayerTurn");
        player2Section.classList.remove("currentPlayerTurn");

        return;
    }
}



for (let cell of gameCell) {
    cell.addEventListener("click", function () {

        let player1Shape = document.createElement("img");
        player1Shape.src = "./assets/images/circle.png";

        let player2Shape = document.createElement("img");
        player2Shape.src = "./assets/images/cross.png";

        if (gameOver === true) {
            return
        }

        //if the innerHTMl is blank, then have a conditional to check whose turn it curently is 
        else if (gameOver === false) {

            if (cell.innerHTML === "") {
                // If it is currently player1, then append p1 image to clicked cell,
                // switch to other player
                if (currentTurn === "player1") {
                    cell.appendChild(player1Shape);
                    player1Array.push(Number(cell.getAttribute("value")));
                    currentTurn = "player2";
                    player2Section.classList.add("currentPlayerTurn");
                    player1Section.classList.remove("currentPlayerTurn");
                    player2Turn.textContent = "Your turn.";
                    player1Turn.textContent = "";
                    checkWin();


                } else {
                    cell.appendChild(player2Shape);
                    player2Array.push(Number(cell.getAttribute("value")))
                    currentTurn = "player1";
                    player1Section.classList.add("currentPlayerTurn");
                    player2Section.classList.remove("currentPlayerTurn");
                    player1Turn.textContent = "Your turn.";
                    player2Turn.textContent = "";
                    checkWin();


                }
            }
        }
    });
}



function changeName() {
    let nameElement = this.parentNode;
    let currentName = nameElement.innerText;
    let newName = prompt(`Please enter your name, ${currentName}`);

    if (newName === null) {
        nameElement.innerText = currentName;
        return;
    }

    newName = newName.trim().substring(0, 12); // Limit the user input name to 12 characters

    if (newName === "") {
        alert("Name cannot be blank. Please enter a valid name:");
    } else {
        nameElement.innerText = newName;

        // Remove the existing click event listener
        this.removeEventListener("click", changeName);

        // Create a new span with the updated functionality
        const newSpan = document.createElement("span");
        newSpan.className = "editName";
        newSpan.title = "Edit name";
        newSpan.innerHTML = "&#x270E";

        // Attach the click event listener to the new span
        newSpan.addEventListener("click", changeName);

        nameElement.append(newSpan);
    }
}


for (let span of editNameSpan) {
    span.addEventListener("click", changeName);
}
