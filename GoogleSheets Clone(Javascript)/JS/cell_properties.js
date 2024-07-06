// Storage
let sheetDB = [];

for (let i = 0; i< rows; i++) {
    let sheetRow = [];
    for (let j = 0; j< cols; j++) {
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "14",
            fontColor: "#000000",
            bgColor: "#000000"
        }
        sheetRow.push(cellProp)
    }
    sheetDB.push(sheetRow)
}



// Selectors dor cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let bgColor = document.querySelector(".bg-color-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];


let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";


// Application of two-way binding

// Attach property listener for bold
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address)

    // Modification
    cellProp.bold = !cellProp.bold;  //Data change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";  //UI change(1)
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;  //UI change(2)  
})

// Attach property listener for italic
italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address)

    // Modification
    cellProp.italic = !cellProp.italic;  //Data change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";  //UI change(1)
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;  //UI change(2)   
})

// Attach property listener for underline
underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address)

    // Modification
    cellProp.underline = !cellProp.underline;  //Data change
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";  //UI change(1)
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;  //UI change(2)  
})

// Attach property listener for fontSize
fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address)

    // Modification
    cellProp.fontSize = fontSize.value;  //Data change
    cell.style.fontSize = cellProp.fontSize + "px";  //UI change(1)
    fontSize.value = cellProp.fontSize  //UI change(2)   
})

// Attach property listener for fontFamily
fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address)

    // Modification
    cellProp.fontFamily = fontFamily.value;  //Data change
    cell.style.fontFamily = cellProp.fontFamily  //UI change(1)
    fontFamily.value = cellProp.fontFamily  //UI change(2)   
})

// Attach property listener for fontColor
fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address)

    // Modification
    cellProp.fontColor = fontColor.value;  //Data change
    cell.style.color = cellProp.fontColor;  //UI change(1)
    fontColor.value = cellProp.fontColor;  //UI change(2)   
})

// Attach property listener for bgColor
bgColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address)

    // Modification
    cellProp.bgColor = bgColor.value;  //Data change
    cell.style.backgroundColor = cellProp.bgColor;  //UI change(1)
    bgColor.value = cellProp.bgColor  //UI change(2)   
})

// Attach property listener for alignment
alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e) =>{
        let address = addressBar.value;
        let [cell, cellProp] = activeCell(address)

        // Modification
        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue;  //Data Change
        cell.style.textAlign = cellProp.alignment  //UI change(1)

        switch(alignValue) {    //UI change(2)
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlignAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlignAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlignAlign.style.backgroundColor = activeColorProp
                break;
        }
    })
})






let allCells = document.querySelectorAll(".cell");
for (let i = 0; i< allCells.length; i++) {
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell) {
    // work
    cell.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [rid, cid] = decodeRIDCIDFromAddress(address);
        let cellProp = sheetDB[rid][cid];

        // Apply cell Properties
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.bgColor === "#000000" ? "transparent" : cellProp.bgColor;
        cell.style.textAlign = cellProp.alignment;
        


        // Apply UI properties to properties container
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontColor.value = cellProp.fontColor;
        bgColor.value = cellProp.bgColor;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        switch(cellProp.alignment) {    //UI change(2)
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlignAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlignAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlignAlign.style.backgroundColor = activeColorProp
                break;
        }
    })
}







function activeCell(address) {
    let [rid, cid] = decodeRIDCIDFromAddress(address);
    // Access cell & storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp]
}

function decodeRIDCIDFromAddress(address) {
    // address -> "A1"
    let rid = Number(address.slice(1)-1);    // "1" -> 0
    let cid = Number(address.charCodeAt(0)) - 65;  // "A" -> 65
    return [rid, cid]
}

