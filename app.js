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

//An array of winnign combinations
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

// variable that will be updated with whose turn it is. 
let currentTurn;

//Arrays for the user choices to be sent to, each square in the tictactoe board has a value, these will be used to check for winning combinations 
let player1Array = [];
let player2Array = [];


//A function to reset the game and start a new game. 
function newGame() {

    //generate a random number to determine who starts
    let randomNum = Math.random();

    gameOver = false;
    //reset classlists to default
    player1Section.classList.remove("winningPlayer");
    player2Section.classList.remove("winningPlayer");
    player1Section.classList.remove("gameDrawn");
    player2Section.classList.remove("gameDrawn");
    player1Section.classList.remove("currentPlayerTurn");
    player2Section.classList.remove("currentPlayerTurn");

    //Remove messages from player sections and clear arrays 
    player1Turn.textContent = "";
    player2Turn.textContent = "";
    player1Array = [];
    player2Array = [];

    // clear the game board and any winning cell styling
    for (let cell of gameCell) {
        cell.innerHTML = "";
        cell.classList.remove("winningCell");
    }
//conditional checks the random number, to determine who starts the game , 
//Relevant player has styles updated around name and has message pop up saying "your turn" 
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

//A function to determine if there has been a winner. 
function checkWin() {
    // Checking if any winning combination is present in the player1Array
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
            //remove current turn classes from both players and add a winning player class to the winner (the same on both players)
            player1Section.classList.remove("currentPlayerTurn");
            player2Section.classList.remove("currentPlayerTurn");
            player1Section.classList.add("winningPlayer");


            return;
        }
    }

    // Checking  if any winning combination is present in the player2Array
    for (let combination of winningCombinations) {
        let isWinningCombination = combination.every((cell) => player2Array.includes(cell));
        if (isWinningCombination) {

            for (let cellValue of combination) {
                let winningCell = document.querySelector(`[value="${cellValue}"]`);
                winningCell.classList.add("winningCell");
            }

            player2Turn.textContent = "";
            player1Turn.textContent = "";

            // Show that player 2 has won 
            player2Turn.textContent = "YOU WIN!.";
            player1Turn.textContent = "";

            gameOver = true;
            player1Section.classList.remove("currentPlayerTurn");
            player2Section.classList.remove("currentPlayerTurn");
            player2Section.classList.add("winningPlayer");

            return;
        }
    }

    // If no winning combination is found and all cells are filled, show it's a draw
    if (player1Array.length + player2Array.length === 9) {
        //clear text from the players and add a class to show it is a draw 
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

// Add an event listener to the game board cells that will add the relevant shape to the clicked cell based on whose turn it is. 
for (let cell of gameCell) {
    cell.addEventListener("click", function () {

        let player1Shape = document.createElement("img");
        player1Shape.src = "./assets/images/circle.png";

        let player2Shape = document.createElement("img");
        player2Shape.src = "./assets/images/cross.png";

        //if the game is over, end the function and do nothing.
        if (gameOver === true) {
            return
        }

        //if the innerHTMl is blank, then have a conditional to check whose turn it curently is 
        else if (gameOver === false) {

            if (cell.innerHTML === "") {
                // If it is currently player1, then append p1 image to clicked cell,
                // switch to other player
                // add and remove necessary classes
                if (currentTurn === "player1") {
                    cell.appendChild(player1Shape);
                    player1Array.push(Number(cell.getAttribute("value")));
                    currentTurn = "player2";
                    player2Section.classList.add("currentPlayerTurn");
                    player1Section.classList.remove("currentPlayerTurn");
                    player2Turn.textContent = "Your turn.";
                    player1Turn.textContent = "";
                    //Check for a winner
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


// A function to allow users to change their name on the screen 
function changeName() {
    let nameElement = this.parentNode;
    let currentName = nameElement.innerText;
    let newName = prompt(`Please enter your name, ${currentName}`);

    if (newName === null) {
        nameElement.innerText = currentName;
        return;
    }

    // Limit the user input name to 12 characters and trim blank space
    newName = newName.trim().substring(0, 12); 

    //some defensive programming for if the name is blank 
    if (newName === "") {
        alert("Name cannot be blank. Please enter a valid name:");
    } else {
        nameElement.innerText = newName;

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
