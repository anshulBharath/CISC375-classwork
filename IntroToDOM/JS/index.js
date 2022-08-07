
var my_list = [
    {text: "pizza", color: "#FC6A20"},
    {text: "purple", color: "#A734FD"},
    {text: "tree", color: "#26903A"},
    {text: "JavaScript", color: "#6C6C10"},
];

function populateList() {
    var ol = document.getElementById("list");
    clearChildren(ol);
    for(var i=0; i<my_list.length; i++) {
        var li = document.createElement("li");
        li.textContent = my_list[i].text;
        li.style.color = my_list[i].color;
        //Can also use innerHTML -> This wil interpet as actual HTML
        ol.appendChild(li);
        
    }
}

function clearChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function testFunction() {
    console.log("Hello world");
}
