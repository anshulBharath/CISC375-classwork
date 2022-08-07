

function changeRed(){
    var red = document.getElementById("red");
    var blue = document.getElementById("blue");
    var green = document.getElementById("green");

    var redValue = document.getElementById("red_value");
    redValue.textContent = red.value;

    updateColorBox(red.value, blue.value, green.value);
}

function changeGreen() {
    var red = document.getElementById("red");
    var blue = document.getElementById("blue");
    var green = document.getElementById("green");

    var greenValue = document.getElementById("green_value");
    greenValue.textContent = green.value;

    updateColorBox(red.value, blue.value, green.value);
}

function changeBlue(){
    var red = document.getElementById("red");
    var blue = document.getElementById("blue");
    var green = document.getElementById("green");

    var blueValue = document.getElementById("blue_value");
    blueValue.textContent = blue.value;

    updateColorBox(red.value, blue.value, green.value);

}

function changeBlock() {
    var redValue = document.getElementById("blue");
    var greenValue = document.getElementById("green");
    var blueValue = document.getElementById("blue");

    var block = document.getElementById("color");

    var redNum = redValue.value;
    var greenNum = greenValue.value;
    var blueNum = blueValue.value;

    console.log('rgb(' +redNum+ ',' +greenNum+ ',' +blueNum+ ')');

    block.style.backgroundColor = 'rgb(' +redNum+ ',' +greenNum+ ',' +blueNum+ ')';
}

function updateColorBox(red, green, blue) {
    var block = document.getElementById("main");

    block.style.backgroundColor = 'rgb(' +red+ ',' +green+ ',' +blue+ ')';
    var hex = convertToHex(red, green, blue);
    //block.style.backgroundColor = hex;
}

function convertToHex(a, b, c) {
    var aHex = a.toString(32);
    var bHex = b.toString(32);
    var cHex = c.toString(32);

    //window.alert(aHex);
    return "#" + aHex + bHex + cHex;
}
 
function test(){  
   console.log("A");

   function printB(){
       console.log("B");
   }
   console.log("C");

   setTimeout(() => {
       console.log("D");
   }, 0);

   console.log("E");
   printB();
}