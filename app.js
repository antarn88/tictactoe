const cells = document.querySelectorAll("[id^=cell]");
const cellsArray = Array.from(cells);
let freeCellsArray;
let freeIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];

cellsArray.map((item, index) => {
    item.addEventListener("click", function() {
        if (item.textContent !== "X" && item.textContent !== "0") {
            item.textContent = "X";
            freeIndexes.splice(index, 1);
            cellsArray[index] = null;
            freeCellsArray = cellsArray.filter(item => item);
            const random = Math.floor(Math.random() * freeIndexes.length);
            freeCellsArray[random].textContent = "0";
            freeIndexes.splice(random, 1);
            freeCellsArray[random] = null;
            freeCellsArray.filter(item => item);
        }
    });
});