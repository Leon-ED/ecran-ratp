const PROBA_STATIONNE = 0;
const PROBA_RETARDE = 0;



function updateHeure() {
    const d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    if (m < 10) m = "0" + m;
    if (h < 10) h = "0" + h;
    document.getElementById("heures").innerHTML = h;
    document.getElementById("minutes").innerHTML = m;
}


function getTimeHTML(duree, unite) {
    if (duree === 0) {
        return "à l'approche";
    }
    return "<span class='duree' data-temps='" + duree + "'>" + duree + "</span> <span class='unite'>" + unite + "</span>";
}


function updateTemps() {
    if (document.getElementsByClassName("train").length === 0) {
        ecranIndisponible();
    }
    const listeTemps = document.getElementsByClassName("temps");
    for (let i = 0; i < listeTemps.length; i++) {
        var tps = listeTemps[i].getAttribute("data-temps");
        tps = parseInt(tps) - 1;
        listeTemps[i].setAttribute("data-temps", tps);

        // Si le train est retardé ou stationné
        if (listeTemps[i].parentElement.parentElement.hasAttribute("data-special")) {
            const attribut = listeTemps[i].parentElement.parentElement.getAttribute("data-special");
            // Si le train est retardé et à -2 on lui met un temps à 2 min
            if (attribut === "retarde" && tps === -2) {
                const html = getTimeHTML(2, "min");
                listeTemps[i].setAttribute("data-temps", 2);
                listeTemps[i].innerHTML = html;
                listeTemps[i].parentElement.parentElement.removeAttribute("data-special");
                listeTemps[i].parentElement.parentElement.setAttribute("data-noSpecial", "true");
                setDetails(listeTemps[i].parentElement.parentElement, "");
            }

            if (attribut === "stationne" && tps === -12) {
                setDetails(listeTemps[i].parentElement.parentElement, "train terminus");
                listeTemps[i].parentElement.parentElement.removeAttribute("data-special");
                listeTemps[i].parentElement.parentElement.setAttribute("data-noSpecial", "true");
            }
            continue;

        }

        if (tps <= -7) {
            // Si on est à -6, on supprime le train
            deleteTrain(listeTemps[i]);
        }


        if (tps === 0) {
            // A l'approche
            setApproche(listeTemps[i], 1);
        }
        else if (tps === -2) {
            // A l'approche clignotant
            setApproche(listeTemps[i], 0);
        }
        else if (tps === -4) {
            // A quai
            setApproche(listeTemps[i], -1);

        }
        else {
            listeTemps[i].getElementsByClassName("duree")[0].innerHTML = tps;
            var random = Math.floor(Math.random() * 100);
            if (random < PROBA_RETARDE && listeTemps[i].parentElement.parentElement.hasAttribute("data-noSpecial") === false) {
                setDetails(listeTemps[i].parentElement.parentElement, "retardé");
                listeTemps[i].getElementsByClassName("duree")[0].innerHTML = " . . .";
                listeTemps[i].getElementsByClassName("duree")[0].classList.add("clignotant");
                listeTemps[i].parentElement.parentElement.setAttribute("data-special", "retarde");

            }
        }
        //print typeof tps 
        console.log(typeof tps);
        console.log(tps);

    }
}


function canTrainStop(train) {
    var listeTrain = document.getElementsByClassName("train");

    const quai = train.getElementsByClassName("voie-nom")[0];


    for (let i = 0; i < listeTrain.length; i++) {
        const currTrain = listeTrain[i];
        if(currTrain === train) continue;

        const currQuai = currTrain.getElementsByClassName("voie-nom")[0];
        const currStatut = currTrain.getElementsByClassName("temps")[0];
        console.log(currQuai.innerHTML);
        console.log(quai.innerHTML);
        console.log(currStatut.innerHTML);

        if (currQuai.innerHTML == quai.innerHTML && currStatut.innerHTML == "à quai") {
            return false;
        }

    }

    return true;
}




function deleteTrain(element) {
    element.innerHTML = "à quai";
    element = element.parentElement;
    element = element.parentElement;

    // make an animation here 
    element.classList.add("delete");
    const trains = document.getElementsByClassName("train");
    // play animation on all trains
    for (let i = 0; i < trains.length; i++) {
        trains[i].classList.add("moveup");
    }
    // remove the element after the animation
    setTimeout(function () { element.remove(); }, 500);

    // remove the animation class
    setTimeout(function () {
        for (let i = 0; i < trains.length; i++) {
            trains[i].classList.remove("moveup");
        }
    }
        , 1000);







}

function setApproche(element, clignotant) {
    element = element.parentElement;
    element = element.parentElement;
    const temps = element.getElementsByClassName("temps")[0];
    const span = document.createElement("span");
    if (clignotant === 0) {
        temps.innerHTML = "";
        span.classList.add("clignotant");
        span.innerHTML = "à l'approche";
    } else if (clignotant === 1) {
        temps.innerHTML = "";
        span.innerHTML = "à l'approche";
        
    } else if (clignotant === -1 && canTrainStop(element)) {
        temps.innerHTML = "";
        span.innerHTML = "à quai";

        var random = Math.floor(Math.random() * 100);
        if (random < PROBA_STATIONNE) {
            setDetails(element, "stationne");
            element.setAttribute("data-special", "stationne");
        }
    }
    temps.appendChild(span);
    temps.classList.add("temps-texte");


}

function setDetails(elem, texte) {
    const details = elem.getElementsByClassName("details-texte")[0];
    details.innerHTML = texte;


}

function ecranIndisponible() {
    return;
    const ecran = document.getElementById("ecran-erreur");
    ecran.style.display = "block";
}


setInterval(updateTemps, 2000);
setInterval(updateHeure, 2000);