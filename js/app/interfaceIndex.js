import Converter from "../model/Converter.js";

const converter = new Converter();


let lastValue = "";
let lastSelected = "";
let nowSelected = getOption();


function getOption(){
    return document.getElementById("option").options[document.getElementById("option").selectedIndex].text
}

function getValue(){
    return document.getElementById("data").value;
}

document.getElementById("option").addEventListener("change", validateSelect);
document.getElementById("data").addEventListener("keydown", function test(event){
    return validateInput(event);
});
document.getElementById("convert").addEventListener("click", convert);

function validateInput(e) {
    let option = getOption();
    let key = e.keyCode;

    switch(option){
        case "Decimal":
            if (key > 47 && key < 58)
                return true;
            else
                e.preventDefault();
        
        case "Hexadecimal":
            if ((key > 47 && key < 58) || (key > 64 && key < 71) || (key > 96 && key < 103))
                return true;
            else
                e.preventDefault();

        case "Binary":
            if (key> 47 && key < 50)
                return true;
            else
                e.preventDefault();
        default:
            e.preventDefault();
    }
}

function clearAll(){
    document.getElementById("data").value = "";
    document.getElementById("binary").innerHTML = "";
    document.getElementById("decimal").innerHTML = "";
    document.getElementById("hexadecimal").innerHTML = "";
}

function validateSelect(){
    if(lastSelected != nowSelected){
        lastSelected = nowSelected;
        nowSelected = getOption();
        clearAll();
    }
}

function autoResize(tArea) {
    tArea.style.height = "38px";
    tArea.style.height = tArea.scrollHeight + 'px';
}

function convert(){
    let decimal, hexadecimal, binary;
    let decimalT, hexaT, binaryT;
    let value = getValue();

    console.log("lastSelected: "+lastSelected+"\ngetOption: "+getOption()+"\nlastValue: "+lastValue+"\ngetValue: "+getValue());
    if((lastSelected == nowSelected && lastValue != value) || (lastSelected != nowSelected && lastValue == value) || (lastSelected != nowSelected && lastValue != value)){

        switch(getOption()){
            case "Decimal":
                decimal = value;
                binary = converter.decToBin(decimal);
                hexadecimal = converter.binToHex(binary);
                break;

            case "Hexadecimal":
                hexadecimal = value;
                binary = converter.hexToBin(hexadecimal.toUpperCase());
                decimal = converter.binToDec(binary);
                break;

            case "Binary":
                binary = value;
                decimal = converter.binToDec(binary);
                hexadecimal = converter.binToHex(binary);
                break;
        }

        clearAll();
        document.getElementById("data").value = value;

        decimalT = document.getElementById("decimal");
        decimalT.innerHTML = "Decimal    : "+decimal;
        autoResize(decimalT);

        hexaT = document.getElementById("hexadecimal");
        hexaT.innerHTML = "Hexadecimal: "+hexadecimal;   
        autoResize(hexaT);

        binaryT = document.getElementById("binary");
        binaryT.innerHTML = "Binary     : "+binary;
        autoResize(binaryT);


    }
    lastValue = value;
}

