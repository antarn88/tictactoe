const newGameBtn = document.querySelector(".new-game-btn");
const cells = document.querySelectorAll("[id^=cell]");
const cellsArray = Array.from(cells);
const gameOverPanel = document.querySelector(".game-over");
let freeIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let freeIndexesFiltered = [];

newGameBtn.addEventListener("click", () => {
    cellsArray.forEach((item) => {
        item.textContent = "";
    });
    freeIndexesFiltered = [];
    freeIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    gameOverPanel.style.display = "none";
});

const randomChoice = {
    choices: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    filteredChoices: [],
    getRandomNumber: function () {
        if (freeIndexesFiltered.length !== 0) {
            return freeIndexesFiltered[Math.floor(Math.random() * freeIndexesFiltered.length)];
        } else {
            return freeIndexes[Math.floor(Math.random() * freeIndexes.length)];
        }
    },
    choice: function (choice = null, cellsArray = null) {
        if (choice !== null && cellsArray === null) {
            this.choices[choice] = null;
            this.filteredChoices = this.choices.filter(item => typeof item === "number");
        } else {
            let randomNumber = this.getRandomNumber();
            this.choices[randomNumber] = null;
            this.filteredChoices = this.choices.filter(item => typeof item === "number");
            freeIndexes[randomNumber] = null;
            freeIndexesFiltered = freeIndexes.filter(item => typeof item === "number");
            return randomNumber;
        }
    }
}

cellsArray.map((item, index) => {
    item.addEventListener("click", function () {
        if (item.textContent !== "X" && item.textContent !== "0") {
            item.textContent = "X";
            freeIndexes[index] = null;
            freeIndexesFiltered = freeIndexes.filter(item => typeof item === "number");
            randomChoice.choice(index);
            let freePosition = randomChoice.choice(null, cellsArray);
            if (freeIndexesFiltered.length >= 1) {
                cellsArray[freePosition].textContent = "0";
            }
        }
        if (cellsArray.every(item => item.textContent == "X" || item.textContent == "0")) {
            gameOverPanel.style.display = "block";
        }
    });
});