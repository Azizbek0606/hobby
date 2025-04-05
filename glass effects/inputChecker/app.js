// let colorsArray = ["red", "green", "blue", "black", "yellow", "orange", "brown", "purple", "gray"];
// document.addEventListener("DOMContentLoaded", function () {
//     const editableDiv = document.getElementById("textArea");

//     editableDiv.addEventListener("keyup", function (event) {
//         if (event.key === " ") {
//             const text = editableDiv.innerHTML.trim();
//             const words = text.split(" ");
//             const lastWord = words[words.length - 1];
//             console.log(lastWord);
//             if (colorsArray.includes(lastWord.toLowerCase().replace("&nbsp;", ""))) {
//                 console.log(editableDiv.innerHTML = " ");
//                 words[words.length - 1] = `<span style='color: ${lastWord.toLowerCase().replace("&nbsp;", "")}'>${lastWord}</span>`;
//                 editableDiv.innerHTML = words.join(" ");
//                 document.execCommand("insertHTML", false, `<span style='color: ${lastWord.toLowerCase().replace("&nbsp;", "") }'>${lastWord}</span> `);
//             }
//         }
//     });
// });

let administration = ["MAJOR", "PARSEVAL", "KURO"];
let colorList = ["RED", "GREEN", "BLUE", "PURPLE", "YELLOW", "ORANGE", "GRAY", "BLACK"];
function getColor(text) {
    let splitedText = text.split(" ");
    let colorCounter = 0;
    for (let i = 0; i < splitedText.length; i++) {
        if (colorList.includes(splitedText[i].toUpperCase())) {
            colorCounter += 1;
        }
    }
    return colorCounter;
}
function checkCopyright(text) {
    let splitedText = text.split(" ");
    let copyrightCounter = 0;
    for (let i = 0; i < splitedText.length; i++) {
        if (administration.includes(splitedText[i].toUpperCase())) {
            copyrightCounter += 1;
        }
    }
    return copyrightCounter;
}
async function mainFucntion(text) {
    let colorStatus = await getColor(text);
    let copyrightStatus = await checkCopyright(text);
    console.log(colorStatus);
    console.log(copyrightStatus);
}
document.addEventListener("DOMContentLoaded", () => {
    let textInput = document.querySelector("#textArea");
    document.querySelector("button").addEventListener("click", () => {
        mainFucntion(textInput.value);
    });
});

// example text: "lorem ipsum dolor vertualname: MAJOR used black color friend's color: blue, also his name vartual KURO but sometimes used parseval"