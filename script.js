let distanceMiles = document.getElementById("distanceMiles");
let distanceKM = document.getElementById("distanceKM");

let mpg = document.getElementById("mpg");
let kml = document.getElementById("kml");
//let mpl = 0;
let l100 = document.getElementById("l100");

let galsConsumed = document.getElementById("galsConsumed");
let ltrsConsumed = document.getElementById("ltrsConsumed");

let currency = document.getElementById("currency");
let priceLtr = document.getElementById("priceLtr");
let journeyCost = document.getElementById("journeyCost");

function milesToKM(miles) {return (miles * 1.609344)}
function KMtoMiles(km) {return (km * 0.6213712)}

function ukGalToLtr(gal) {return (gal * 4.54609)}
function ltrToUkGal(ltr) {return (ltr * 0.2199693)}

function journeyCostCal() {journeyCost = ltrsConsumed * priceLtr}

// Inputs

distanceMiles.oninput = function(){
    distanceKM.value = milesToKM(distanceMiles.value);
}

distanceKM.oninput = function(){
    distanceMiles.value = KMtoMiles(distanceKM.value);
}

mpg.oninput = function(){
    
}
kml.oninput = function(){}
l100.oninput = function(){}
galsConsumed.oninput = function(){}
ltrsConsumed.oninput = function(){}

currency.onchange = function(){
    document.getElementById("currencyLabel").innerText = currency.value;
}

priceLtr.oninput = function(){}
journeyCost.oninput = function(){}