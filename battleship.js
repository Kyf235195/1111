window.onload = function(){
    var view = {
      displayMessage: function(msg) {
        var messageArea å= document.getElementById("messageArea");
        messageArea.innerHTML = msg;
      },
      displayHit: function(location) {
      },
      displayMiss: function(location) {
      }
    };
    var model = {
      boardSize: 7,
      numShips: 3,
      shipsSunk: 0,
      shipLength: 3,
      ships: [ { locations: ["06", "16", "26"], hits: ["", "", ""] },
      { locations: ["24", "34", "44"], hits: ["", "", ""] },
      { locations: ["10", "11", "12"], hits: ["", "", ""] } ],
      isSunk: function(ship) {
           for (var i = 0; i < this.shipLength; i++)  {
              if (ship.hits[i] !== "hit") {
                  return false;
              }
          }
          return true;
      }
      fire: function(guess) {
        for (var i = 0; i < this.numShips; i++) {
          var ship = this.ships[i];
          var locations = ship.locations;
          var index = locations.indexOf(guess);
          if (index >= 0) {
            ship.hits[index] = "hit";
            view.displayHit(guess);
            view.displayMessage("HIT!");
            if (this.isSunk(ship)) {
                view.displayMessage("You sank my battleship!");
                this.shipsSunk++;
            }
            return true;
          }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.");
        return false;
      },
      isSunk: function(ship) {
        for (var i = 0; i < this.shipLength; i++)  {
            if (ship.hits[i] !== "hit") {
              return false;
            }
        }
        return true;
    }
};
function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
  if (guess === null || guess.length !== 2) {
    alert("Oops, please enter a letter and a number on the board.");
  } else {
    firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);
    if (isNaN(row) || isNaN(column)) {
       alert("Oops, that isn't on the board.");
    } else if (row < 0 || row >= model.boardSize ||
                       column < 0 || column >= model.boardSize) {
       alert("Oops, that's off the board!");
    } else {
      return row + column;
    }
  }
  return null;
}
var controller = {
    guesses: 0,
    processGuess: function(guess) {
      var location = parseGuess(guess);
      if (location) {
        this.guesses++;
        var hit = model.fire(location);
        if (hit && model.shipsSunk === model.numShips) {
               view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses"); 
      }
    }
  }
};
function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;
}
function handleFireButton() {
    var guessInput = document.getElementById("guessInput"); 
    var guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
}
function handleKeyPress(e) {
     var fireButton = document.getElementById("fireButton");
     if (e.keyCode === 13) {
        fireButton.click();
        return false;
     }
}
generateShip: function() {
    var direction = Math.floor(Math.random() * 2);
    var row, col;
    if (direction === 1) {
        row = Math.floor(Math.random() * this.boardSize);
        col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        // 生成水平战舰的起始位置
    } else {
        row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        col = Math.floor(Math.random() * this.boardSize);
        // 生成垂直战舰的起始位置
    }
    var newShipLocations = [];
    for (var i = 0; i < this.shipLength; i++) {
        if (direction === 1) {
          newShipLocations.push(row + "" + (col + i));
            // 在水平战舰的位置数组中添加位置 
          } else {
            newShipLocations.push((row + i) + "" + col);
            // 在垂直战舰的位置数组中添加位置 
          }
    }
    return newShipLocations; 
},
collision: function(locations) {
    for (var i = 0; i < this.numShips; i++) {
        var ship = model.ships[i];
        for (var j = 0; j < locations.length; j++) {
            if (ship.locations.indexOf(locations[j]) >= 0) {
                return true;
            }
        }
    }
    return false;
}
window.onload = init;