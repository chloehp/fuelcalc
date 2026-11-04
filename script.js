let distanceMiles = document.getElementById("distanceMiles");
let distanceKM = document.getElementById("distanceKM");
let journeys = document.getElementById("journeys");

let mpg = document.getElementById("mpg");
let kml = document.getElementById("kml");
//let mpl = 0;
let l100 = document.getElementById("l100");

const galsConsumed = document.getElementById("galsConsumed");
const ltrsConsumed = document.getElementById("ltrsConsumed");
const currency = document.getElementById("currency");
const fuelType = document.getElementById("fueltype");
const priceLtr = document.getElementById("priceLtr");
const journeyCost = document.getElementById("journeyCost");
const CO2cost = document.getElementById("co2cost");
const locktravelled = document.getElementById("locktravelled");
const lockconsumption = document.getElementById("lockconsumption");
const lockconsumed = document.getElementById("lockconsumed");

function milesToKM(miles) {return (miles * 1.609344)}
function KMtoMiles(km) {return (km * 0.6213712)}

function ukGalToLtr(gal) {return (gal * 4.54609)}
function ltrToUkGal(ltr) {return (ltr * 0.2199693)}

function fuelConsumed() {
    ltrsConsumed.value = (distanceKM.value / kml.value) * journeys.value;
    galsConsumed.value = ltrToUkGal(ltrsConsumed.value);
    cost();
}

function fuelConsumption() {
    kml.value = distanceKM.value / (ltrsConsumed.value / journeys.value);
    mpg.value = (ukGalToLtr(1) / milesToKM(1)) * kml.value;
    l100.value = 100 / kml.value;
    cost();
}

function distanceTravelled() {
    distanceKM.value = ltrsConsumed.value * kml.value;
    distanceMiles.value = KMtoMiles(distanceKM.value);
}

function cost() {
    const cent = Math.ceil(ltrsConsumed.value * priceLtr.value);                    // rounded up to the nearest cent
    journeyCost.value = cent / 100;
    if (fueltype.value === "petrol") {CO2cost.value = ltrsConsumed.value * 2.31}    // https://www.clidapt.com/en/emission-factors/petrol
    else  {CO2cost.value = ltrsConsumed.value * 2.66}                               // https://www.clidapt.com/en/emission-factors/diesel
    format();
}

function format() {
    const values = [distanceMiles, distanceKM, mpg, kml, l100, galsConsumed, ltrsConsumed, CO2cost];
    for (let i = 0; i < values.length; i++) {
        const a = Math.round(values[i].value * 1000000);
        values[i].value = a / 1000000;
    }
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

journeys.oninput = function(){fuelConsumed()}

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
fueltype.onchange = function(){cost()}
priceLtr.oninput = function(){cost()}

journeyCost.oninput = function(){
    ltrsConsumed.value = journeyCost.value / (priceLtr.value / 100);
    galsConsumed.value = ltrToUkGal(ltrsConsumed.value);

    distanceKM.value = kml.value * ltrsConsumed.value;
    distanceMiles.value = KMtoMiles(distanceKM.value);
    format();
}