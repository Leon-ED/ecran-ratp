const PROBA_STATIONNE = 5;
const PROBA_RETARDE = 15;



function updateHeure() {
    const d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    if (m < 10) m = "0" + m;
    if (h < 10) h = "0" + h;
    document.getElementById("heures").innerHTML = h;
    document.getElementById("minutes").innerHTML = m;
}





function updateTemps() {
    if(document.getElementsByClassName("train").length === 0) {
        ecranIndisponible();
    }
    const listeTemps = document.getElementsByClassName("temps");
    for (let i = 0; i < listeTemps.length; i++) {
        var tps = listeTemps[i].getAttribute("data-temps");
        tps = parseInt(tps) - 1;
        listeTemps[i].setAttribute("data-temps", tps);

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

        } else if (tps <= -6) {
            deleteTrain(listeTemps[i]);
        }
        else {
            listeTemps[i].getElementsByClassName("duree")[0].innerHTML = tps;
            var random = Math.floor(Math.random() * 100);
            if (random < PROBA_RETARDE) {
                setDetails(listeTemps[i].parentElement.parentElement, "retardé");
                listeTemps[i].getElementsByClassName("duree")[0].innerHTML = " . . .";
                listeTemps[i].getElementsByClassName("duree")[0].classList.add("clignotant");
            }
        }
        //print typeof tps 
        console.log(typeof tps);
        console.log(tps);

    }

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
    console.log(element);
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
    } else if (clignotant === -1) {
        temps.innerHTML = "";
        span.innerHTML = "à quai";
        // 100 % chance
        var random = Math.floor(Math.random() * 100);
        if (random < PROBA_STATIONNE) {
            setDetails(element, "stationne");
        }

        temps.classList.remove("clignotant");
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