let ticTacToeGame = (function () {
  // Private info about board
  let theCurrentBoardArray = [];

  // Cache DOM
  let $elModule = document.querySelector("#ticTacToeModule");

  // Create elements

  let player1Input = document.createElement("input");
  player1Input.classList.add("playerNameInput");
  player1Input.setAttribute("type", "text");
  player1Input.setAttribute("placeholder", "Player: X");

  let player2Input = document.createElement("input");
  player2Input.classList.add("playerNameInput");
  player2Input.setAttribute("type", "text");
  player2Input.setAttribute("placeholder", "Player: O");

  let twoPlayerBtn = document.createElement("button");
  twoPlayerBtn.classList.add("twoPlayerBtn", "restartBtn");
  twoPlayerBtn.textContent = "2 player";
  twoPlayerBtn.addEventListener("click", function () {
    $elModule.appendChild(player1Input);
    $elModule.appendChild(player2Input);
    $elModule.appendChild(submitNameInput);
    $elModule.removeChild(twoPlayerBtn);
  });

  $elModule.appendChild(twoPlayerBtn);

  let $restartBtn = document.createElement("button");
  $restartBtn.classList.add("restartBtn");
  $restartBtn.textContent = "Restart";

  let $gameboard = document.createElement("ul");
  $gameboard.classList.add("gameboard");

  let player1NameTag = document.createElement("div");
  player1NameTag.classList.add("playerTag");

  let player2NameTag = document.createElement("div");
  player2NameTag.classList.add("playerTag");

  let buttomBar = document.createElement("div");
  buttomBar.classList.add("buttomBar");

  let submitNameInput = document.createElement("button");
  submitNameInput.textContent = "Play!";
  submitNameInput.classList.add("restartBtn", "submitBtn");
  submitNameInput.addEventListener("click", function () {
    removeAllChildren($elModule);
    $elModule.appendChild($gameboard);
    $elModule.appendChild(buttomBar);
    buttomBar.appendChild(player1NameTag);
    buttomBar.appendChild($restartBtn);
    buttomBar.appendChild(player2NameTag);
    setPlayers();
  });

  let winDisplay = document.createElement("div");
  winDisplay.classList.add("winDisplay");
  winDisplay.addEventListener("click", function () {
    winDisplay.style.visibility = "hidden";
    resetGameStats();
  });

  let body = document.querySelector("#body");
  body.appendChild(winDisplay);

  // Declare players
  let player1;
  let player2;

  // Create player factory function
  let CreatePlayer = function (name) {
    let selcetedSpots = [];
    let wins = 0;
    return { name, selcetedSpots, wins };
  };

  // Sets playervalues
  let setPlayers = function () {
    player1 = CreatePlayer(player1Input.value);
    player1NameTag.textContent = player1.name + ": " + player1.wins;
    player2 = CreatePlayer(player2Input.value);
    player2NameTag.textContent = player2.name + ": " + player2.wins;
  };

  // Resets theCurrentBoardArray and loads board
  $restartBtn.addEventListener("click", function () {
    resetGameStats();
  });

  // Creates the boardArray
  let createBoardArray = (function () {
    for (i = 1; i <= 9; i++) {
      theCurrentBoardArray.push(
        (function () {
          fill = "";
          return { fill };
        })()
      );
    }
  })();

  let evencheckNum = 2;

  renderBoard();

  // Render the board
  function renderBoard() {
    removeAllChildren($gameboard);
    for (i = 0; i < 9; i++) {
      if (theCurrentBoardArray[i].fill === "") {
        let blankSpotEl = document.createElement("li");
        blankSpotEl.textContent = "";
        let that = i;
        blankSpotEl.addEventListener("click", function () {
          AddToCurrentBoardArray(that);
        });
        $gameboard.appendChild(blankSpotEl);
      } else if (theCurrentBoardArray[i].fill === "x") {
        let xSpotEl = document.createElement("li");
        xSpotEl.textContent = "X";
        let that = i;
        xSpotEl.addEventListener("click", function () {
          AddToCurrentBoardArray(that);
        });
        $gameboard.appendChild(xSpotEl);
      } else {
        let oSpotEl = document.createElement("li");
        oSpotEl.textContent = "O";
        let that = i;
        oSpotEl.addEventListener("click", function () {
          AddToCurrentBoardArray(that);
        });
        $gameboard.appendChild(oSpotEl);
      }
    }
  }

  // Adds the right symbol on click
  function AddToCurrentBoardArray(Num) {
    if (
      evencheckNum % 2 === 0 &&
      theCurrentBoardArray[Num].fill !== "x" &&
      theCurrentBoardArray[Num].fill !== "o"
    ) {
      theCurrentBoardArray[Num].fill = "x";
      player1.selcetedSpots.push(Num);
      evencheckNum += 1;
      renderBoard();
      if (winChecker(player1.selcetedSpots)) {
        playerWins(player1);
      }
    } else if (
      evencheckNum % 2 === 1 &&
      theCurrentBoardArray[Num].fill !== "x" &&
      theCurrentBoardArray[Num].fill !== "o"
    ) {
      theCurrentBoardArray[Num].fill = "o";
      player2.selcetedSpots.push(Num);
      if (winChecker(player2.selcetedSpots)) {
        playerWins(player2);
      }
      evencheckNum += 1;
      renderBoard();
    }
  }

  // Remove all children function
  function removeAllChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.lastChild);
    }
  }

  // Checks an array for a win combo
  function winChecker(array) {
    let num1;
    let num2;
    let num3;
    for (i = 0; i < winComboes.length; i++) {
      num1 = winComboes[i][0];
      num2 = winComboes[i][1];
      num3 = winComboes[i][2];
      let value = 0;
      for (l = 0; l <= array.length; l++) {
        if (array[l] === num1 || array[l] === num2 || array[l] === num3) {
          value += 1;
        }
      }
      if (value === 3) {
        return true;
      }
    }
  }

  let winComboes = [
    [0, 1, 2],
    [2, 5, 8],
    [8, 7, 6],
    [6, 3, 0],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
    [3, 4, 5],
  ];

  function playerWins(player) {
    winDisplay.style.visibility = "visible";
    player.wins += 1;
    winDisplay.textContent = player.name + " is the winner!";
    player1NameTag.textContent = player1.name + ": " + player1.wins;
    player2NameTag.textContent = player2.name + ": " + player2.wins;
  }

  // Resets all arrays
  function resetGameStats() {
    for (i = 0; i < 9; i++) {
      theCurrentBoardArray[i].fill = "";
    }
    player1.selcetedSpots = [];
    player2.selcetedSpots = [];
    renderBoard();
    evencheckNum = 2;
  }
})();
