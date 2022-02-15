

let topRow = document.getElementsByClassName("tSlot");
console.log(topRow)
console.log(topRow.length)


for (var i = 0; i < topRow.length; i++) {
    // topRow[i].addEventListener('mouseup', myF);
    console.log(i);
}

function myF(e) {
    console.log(e.target);
}