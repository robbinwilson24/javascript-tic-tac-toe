let heading = document.querySelector("#mainHeading");
let newGameButton = document.querySelector(".newGameButton");
let player1Turn = document.querySelector(".player1Turn");
let player2Turn = document.querySelector(".player2Turn");
let player2Section = document.querySelector(".playerSection2");
let player1Section = document.querySelector(".playerSection1");
let twoPlayerSelector = document.querySelector(".twoPlayerSelector");
let CPUSelector = document.querySelector(".CPUSelector");
let cpuName = document.querySelector(".cpuName");
let CPUEdit = document.querySelector(".CPUEdit");
let p1Edit = document.querySelector(".p1Edit");
let player1Name = document.querySelector(".player1Name")

let gameCell = document.querySelectorAll(".gameCell");
let editNameSpan = document.querySelectorAll(".editName");

let gameStarted = false;
let gameOver = false;

// variable that will be updated with whose turn it is. 
let currentTurn;
//variable for what type of game it is
let gameType = "twoPlayer";

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

//Arrays for the user choices to be sent to, each square in the tictactoe board has a value, these will be used to check for winning combinations 
let player1Array = [];
let player2Array = [];


twoPlayerSelector.addEventListener("click", function () {

    for (let cell of gameCell) {
        cell.innerHTML = "";
        cell.classList.remove("winningCell");
    }


    twoPlayerSelector.classList.add("twoPlayerSelected");
    twoPlayerSelector.classList.remove("twoPlayerNotSelected");
    CPUSelector.classList.remove("vsCPUSelected");
    CPUSelector.classList.add("vsCPUNotSelected");
    gameType = "twoPlayer";
    cpuName.textContent = "Player 2";
    player1Name.innerText = "Player 1";

    // Check if the edit span already exists to add it back when the player switches back to 2 player mode 
    const editSpan = document.querySelector(".editName");
    if (!editSpan) {
        const playerName = document.querySelector(".displayedName.cpuName");
        const newSpan = document.createElement("span");
        newSpan.className = "editName CPUEdit";
        newSpan.title = "Edit name";
        newSpan.innerHTML = "&#x270E";
        playerName.appendChild(newSpan);
        newSpan.addEventListener("click", changeName);
    }

       // Check if the player 1 edit span already exists to add it back when the player switches to 2 player mode
       const p1EditSpan = document.querySelector(".editName.p1Edit");
       if (!p1EditSpan) {
           const p1PlayerName = document.querySelector(".displayedName");
           const newP1Span = document.createElement("span");
           newP1Span.className = "editName p1Edit";
           newP1Span.title = "Edit name";
           newP1Span.innerHTML = "&#x270E";
           p1PlayerName.appendChild(newP1Span);
           newP1Span.addEventListener("click", changeName);
       }
});

CPUSelector.addEventListener("click", function () {

    //Clear board
    for (let cell of gameCell) {
        cell.innerHTML = "";
        cell.classList.remove("winningCell");
    }


    CPUSelector.classList.add("vsCPUSelected");
    CPUSelector.classList.remove("vsCPUNotSelected");
    twoPlayerSelector.classList.remove("twoPlayerSelected");
    twoPlayerSelector.classList.add("twoPlayerNotSelected");
    gameType = "vsCPU";
    cpuName.textContent = "CPU";
    player1Name.innerText = "YOU";

    // Remove the edit span if it exists - as CPU will not have its display name edited 
    const editSpan = document.querySelector(".editName");
    if (editSpan) {
        editSpan.remove();
    }
});

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
    if (gameType === "twoPlayer") {

        if (randomNum < 0.5) {
            currentTurn = "player1";
            player1Turn.textContent = "Your turn.";
            player1Section.classList.add("currentPlayerTurn");

        } else {
            currentTurn = "player2";
            player2Turn.textContent = "Your turn."
            player2Section.classList.add("currentPlayerTurn");
        }
        //Check game type and determine who starts between user and CPU
    } else if (gameType === "vsCPU") {
        if (randomNum < 0.5) {
            currentTurn = "player1";
            player1Turn.textContent = "Your turn.";
            player1Section.classList.add("currentPlayerTurn");

        } else {
            currentTurn = "CPUTurn";
            player2Turn.textContent = "CPU turn."
            player2Section.classList.add("currentPlayerTurn");
            //delay set and cpu pay function called if the CPU has first turn 
            setTimeout(CPUPlay, 1000);;
        }
    }
}
newGameButton.addEventListener("click", newGame);


//A function to determine if there has been a winner. 
function checkWin() {
    for (let combination of winningCombinations) {  // Checking if any winning combination is present in the player1Array
        let isWinningCombination = combination.every((cell) => player1Array.includes(cell));
        if (isWinningCombination) {
            for (let cellValue of combination) {
                let winningCell = document.querySelector(`[value="${cellValue}"]`);
                winningCell.classList.add("winningCell");
            }
            player2Turn.textContent = "";
            player1Turn.textContent = "";
            player1Turn.textContent = "YOU WIN!";      // Show that player 1 has won 
            player2Turn.textContent = "";
            gameOver = true;
            //remove current turn classes from both players and add a winning player class to the winner (the same on both players)
            player1Section.classList.remove("currentPlayerTurn");
            player2Section.classList.remove("currentPlayerTurn");
            player1Section.classList.add("winningPlayer");
            return;
        }
    }

    for (let combination of winningCombinations) {      // Checking  if any winning combination is present in the player2Array
        let isWinningCombination = combination.every((cell) => player2Array.includes(cell));
        if (isWinningCombination) {

            for (let cellValue of combination) {
                let winningCell = document.querySelector(`[value="${cellValue}"]`);
                winningCell.classList.add("winningCell");
            }
            player2Turn.textContent = "";
            player1Turn.textContent = "";
            player2Turn.textContent = "YOU WIN!";      // Show that player 2 has won 
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

// a function that allows the cpu to play a move on its own. 

function CPUPlay() {
    // Check the number of moves made by player 1
    if (player1Array.length < 2) {
      // Player 1 has made less than 2 moves, so CPU plays a random move
      let randomNum = Math.floor(Math.random() * 9);
  
      // If the game cell is blank, then add CPU shape to cell
      if (gameCell[randomNum].innerHTML === "") {
        let player2Shape = document.createElement("img");
        player2Shape.src = "./assets/images/cross.png";
        gameCell[randomNum].appendChild(player2Shape);
        player2Array.push(Number(gameCell[randomNum].getAttribute("value")));
        currentTurn = "player1";
        player1Section.classList.add("currentPlayerTurn");
        player2Section.classList.remove("currentPlayerTurn");
        player1Turn.textContent = "Your turn.";
        player2Turn.textContent = "";
        checkWin();
      } else {
        // If the random cell is not blank, call the function again
        CPUPlay();
      }
    } else {
      // Player 1 has made 2 or more moves
      //array for moves made by player
      let availableCells = [];
      for (let cell of gameCell) {
        if (cell.innerHTML === "") {
          availableCells.push(cell);
        }
      }
  
      let selectedCell = null;
  
      if (Math.random() < 0.20) {
        // if the random number is less than .2 then cpu plays a move without logic
        // 80% chance of the game making the best possible move 
        let randomIndex = Math.floor(Math.random() * availableCells.length);
        selectedCell = availableCells[randomIndex];
      } else {
        // Else CPU will check if any move by CPU can block player 1 from winning
        for (let cell of availableCells) {
          let cellValue = Number(cell.getAttribute("value"));
          //temporarily add a winning value to the player1array
          player1Array.push(cellValue);
  
          // CPU will check if player 1 has a winning combination by comparing the made moves to the moves in the winnign combinations array 
          let canBlockWin = winningCombinations.some((combination) => {
            return combination.every((cell) => player1Array.includes(cell));
          });
          
          //remove the temporary value from the player1array
          player1Array.pop();
  
          if (canBlockWin) {
            selectedCell = cell;
            break;
          }
        }
  
        // If no move can block the player, then the cpu will select a cell that leads to a winning combination for CPU
        if (!selectedCell) {
          for (let cell of availableCells) {
            let cellValue = Number(cell.getAttribute("value"));
            // add a temporary value to the player2array for a winning combination
            player2Array.push(cellValue);
  
            // The CPU will check if it has a winning combination
            let canWin = winningCombinations.some((combination) => {
              return combination.every((cell) => player2Array.includes(cell));
            });
            //remove the temporary value from the player 2 array 
            player2Array.pop();
  
            if (canWin) {
              selectedCell = cell;
              break;
            }
          }
        }
      }
  
      // If no winning move is possible the CPU selects a random cell to play 
      if (!selectedCell) {
        let randomIndex = Math.floor(Math.random() * availableCells.length);
        selectedCell = availableCells[randomIndex];
      }
  
      // Add the CPU shape to the relevant cell
      let player2Shape = document.createElement("img");
      player2Shape.src = "./assets/images/cross.png";
      selectedCell.appendChild(player2Shape);
      player2Array.push(Number(selectedCell.getAttribute("value")));
      currentTurn = "player1";
      player1Section.classList.add("currentPlayerTurn");
      player2Section.classList.remove("currentPlayerTurn");
      player1Turn.textContent = "Your turn.";
      player2Turn.textContent = "";
      checkWin();
    }
  }
  


// Add an event listener to the game board cells that will add the relevant shape to the clicked cell based on whose turn it is.
for (let cell of gameCell) {
    cell.addEventListener("click", function () {
        let player1Shape = document.createElement("img");
        player1Shape.src = "./assets/images/circle.png";

        let player2Shape = document.createElement("img");
        player2Shape.src = "./assets/images/cross.png";

        // If the game is over, end the function and do nothing.
        if (gameOver === true) {
            return;
        }

        // If the game is not over, check innerHTML is blank, 
        // then have a conditional to check what type of game it is and whose turn it currently is
        else if (gameOver === false) {
            if (cell.innerHTML === "") {

                // if it is a two player game;
                if (gameType === "twoPlayer") {
                    // If it is currently player1, then append p1 image to clicked cell,
                    if (currentTurn === "player1") {
                        cell.appendChild(player1Shape);
                        player1Array.push(Number(cell.getAttribute("value")));
                        currentTurn = "player2";
                        player2Section.classList.add("currentPlayerTurn");
                        player1Section.classList.remove("currentPlayerTurn");
                        player2Turn.textContent = "Your turn.";
                        player1Turn.textContent = "";
                        checkWin(); //Check for a win
                    } else {
                        // else if it is a two player game and not players ones turn:
                        cell.appendChild(player2Shape);
                        player2Array.push(Number(cell.getAttribute("value")));
                        currentTurn = "player1";
                        player1Section.classList.add("currentPlayerTurn");
                        player2Section.classList.remove("currentPlayerTurn");
                        player1Turn.textContent = "Your turn.";
                        player2Turn.textContent = "";
                        checkWin();
                    }
                    //then else if it is a game vs the CPU
                } else if (gameType === "vsCPU") {
                    //Start with player 1 as in the 2 player game and make the necessary logic changes. 
                    if (currentTurn === "player1") {
                        cell.appendChild(player1Shape);
                        player1Array.push(Number(cell.getAttribute("value")));
                        currentTurn = "CPUTurn";
                        player2Section.classList.add("currentPlayerTurn");
                        player1Section.classList.remove("currentPlayerTurn");
                        player2Turn.textContent = "CPU Turn.";
                        player1Turn.textContent = "";
                        checkWin();

                        // Check if the game is over after user's turn, if not, call the CPUPlay function
                        // added delay for appearance of the game thinking about it's move 
                        if (!gameOver) {
                            setTimeout(CPUPlay, 1000);
                        }
                    }
                }
            }
        }
    })
};


// A function to allow users to change their name on the screen 

function changeName() {
    let nameElement = this.parentNode;
    let currentName = nameElement.innerText;
    let newName = prompt(`Please enter your name, ${currentName}`);

    if (newName === null) {
        return; // Exit the function without making any changes
    }

    // Limit the user input name to 12 characters and trim blank space
    newName = newName.trim().substring(0, 12);

    // Some defensive programming for if the name is blank 
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

        // Remove the existing edit span before appending the new one
        const existingEditSpan = nameElement.querySelector(".editName");
        if (existingEditSpan) {
            existingEditSpan.remove();
        }

        nameElement.append(newSpan);
    }
}

for (let span of editNameSpan) {
    span.addEventListener("click", changeName);
}
