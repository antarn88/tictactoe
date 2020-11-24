const cells = document.querySelectorAll("[id^=cell]");
const cellsArray = Array.from(cells);
const freeIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let freeIndexesFiltered = [];

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
            this.filteredChoices = this.choices.filter(item => item);
        } else {
            let randomNumber = this.getRandomNumber();
            this.choices[randomNumber] = null;
            this.filteredChoices = this.choices.filter(item => item);
            freeIndexes[randomNumber] = null;
            freeIndexesFiltered = freeIndexes.filter(item => item);
            return randomNumber;
        }
    }
}

cellsArray.map((item, index) => {
    item.addEventListener("click", function () {
        if (item.textContent !== "X" && item.textContent !== "0") {
            item.textContent = "X";
            freeIndexes[index] = null;
            freeIndexesFiltered = freeIndexes.filter(item => item);
            randomChoice.choice(index);
            let freePosition = randomChoice.choice(null, cellsArray);
            if (freeIndexesFiltered.length >= 1) {
                cellsArray[freePosition].textContent = "0";
                console.log("Gépi lépés cellaszáma: " + freePosition);
            }
        }
    });
});