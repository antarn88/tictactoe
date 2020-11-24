const cellContainer = document.querySelector(".cell-container");
const newGameBtn = document.querySelector(".new-game-btn");
const cells = document.querySelectorAll("[id^=cell]");
const cellsArray = Array.from(cells);
const gameOverPanel = document.querySelector(".game-over");
const gameOverPanelText = document.querySelector(".game-over h1");
const lines = Array.from(document.querySelectorAll("[class^=line]"));
const column0 = Array.from(document.querySelectorAll(".column0"));
const column1 = Array.from(document.querySelectorAll(".column1"));
const column2 = Array.from(document.querySelectorAll(".column2"));


let freeIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let freeIndexesFiltered = [];

newGameBtn.addEventListener("click", () => {
    cellsArray.forEach((item) => {
        item.textContent = "";
    });
    freeIndexesFiltered = [];
    freeIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    gameOverPanel.style.display = "none";
    cellContainer.style.pointerEvents = "unset";
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


const linesAction = (item, index) => {
    let numersOfX = Array.from(item.textContent).filter(item => item === "X");
        let numersOf0 = Array.from(item.textContent).filter(item => item === "0");
        if (numersOfX.length === 3) {
            gameOverPanel.style.display = "block";
            gameOverPanelText.textContent = "Győztél! :)";
            cellContainer.style.pointerEvents = "none";
        }
        if (numersOf0.length === 3) {
            gameOverPanel.style.display = "block";
            gameOverPanelText.textContent = "Vesztettél! :(";
            cellContainer.style.pointerEvents = "none";
        }
};


const winCheck = () => {
    lines.forEach((item, index) => {
        linesAction(item, index);
    });
};


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

            winCheck();
        }
        if (cellsArray.every(item => item.textContent == "X" || item.textContent == "0")) {
            gameOverPanel.style.display = "block";
            gameOverPanelText.textContent = "Vége a játéknak!";
            cellContainer.style.pointerEvents = "none";
        }
    });
});