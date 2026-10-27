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

let locktravelled = document.getElementById("locktravelled");
let lockconsumption = document.getElementById("lockconsumption");
let lockconsumed = document.getElementById("lockconsumed");

function milesToKM(miles) {return (miles * 1.609344)}
function KMtoMiles(km) {return (km * 0.6213712)}

function ukGalToLtr(gal) {return (gal * 4.54609)}
function ltrToUkGal(ltr) {return (ltr * 0.2199693)}

function fuelConsumed() {
    ltrsConsumed.value = distanceKM.value / kml.value;
    galsConsumed.value = ltrToUkGal(ltrsConsumed.value);
    cost();
}

function fuelConsumption() {
    kml.value = distanceKM.value / ltrsConsumed.value;
    mpg.value = (ukGalToLtr(1) / milesToKM(1)) * kml.value;
    l100.value = 100 / kml.value;
    cost();
}

function distanceTravelled() {
    distanceKM.value = ltrsConsumed.value * kml.value;
    distanceMiles.value = KMtoMiles(distanceKM.value);
}

function cost() {
    const cent = Math.ceil(ltrsConsumed.value * priceLtr.value);        // rounded up
    journeyCost.value = cent / 100;
}

// Inputs

distanceMiles.oninput = function(){
    distanceKM.value = milesToKM(distanceMiles.value);
    fuelConsumed();
}

distanceKM.oninput = function(){
    distanceMiles.value = KMtoMiles(distanceKM.value);
    fuelConsumed();
}

mpg.oninput = function(){
    kml.value = (milesToKM(1) / ukGalToLtr(1)) * mpg.value;
    l100.value = 100 / kml.value;
    fuelConsumed();
}

kml.oninput = function(){
    mpg.value = (ukGalToLtr(1) / milesToKM(1)) * kml.value;
    l100.value = 100 / kml.value;
    fuelConsumed();
}

l100.oninput = function(){
    kml.value = 100 / l100.value;
    mpg.value = (ukGalToLtr(1) / milesToKM(1)) * kml.value;
    fuelConsumed();
}

galsConsumed.oninput = function(){
    ltrsConsumed.value = ukGalToLtr(galsConsumed.value);
    fuelConsumption();
}
ltrsConsumed.oninput = function(){
    galsConsumed.value = ltrToUkGal(ltrsConsumed.value);
    fuelConsumption();
}

currency.onchange = function(){
    document.getElementById("currencyLabel").innerText = currency.value;
}

priceLtr.oninput = function(){cost()}

journeyCost.oninput = function(){
    ltrsConsumed.value = journeyCost.value * (priceLtr.value / 100);
    galsConsumed.value = ltrToUkGal(ltrsConsumed.value);
    distanceTravelled();
}
