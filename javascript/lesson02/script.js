function first() {
    var x = parseFloat(document.getElementById("first-tb").value);
    var f;
    if ((x >= -2) && (x < 2)) {
        f = x;
    } else {
        f = 4;
    }
    outputElement.innerHTML = f;
}

function second() {
    var x = parseFloat(document.getElementById("first-tb").value);
    var f = x * x + 4 * x + 5;
    if (x > 2) {
        f = 1 / f;
    }
    outputElement.innerHTML = f;
}