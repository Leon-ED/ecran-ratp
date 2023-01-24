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
    const listeTemps = document.getElementsByClassName("temps");
    for (let i = 0; i < listeTemps.length; i++) {
        var tps = listeTemps[i].getAttribute("data-temps");
        tps = parseInt(tps) - 1;
        listeTemps[i].setAttribute("data-temps", tps);

        if (tps === 1) {
            setApproche(listeTemps[i], 1);
        }
        else if (tps === 0) {
            setApproche(listeTemps[i], 0);
        }
        else if (tps === -1) {
            setApproche(listeTemps[i], -1);

        } else if (tps <= -2) {
            deleteTrain(listeTemps[i]);
        }
        else {
            listeTemps[i].getElementsByClassName("duree")[0].innerHTML = tps;

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
        temps.classList.remove("clignotant");
    }
    temps.appendChild(span);
    temps.classList.add("temps-texte");


}

setInterval(updateTemps, 2000);
setInterval(updateHeure, 1000);
