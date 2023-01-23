function updateHeure() {
    const d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    if(m < 10) m = "0" + m;
    if(h < 10) h = "0" + h;
    document.getElementById("heures").innerHTML = h;
    document.getElementById("minutes").innerHTML = m;



}


function updateTemps(){
    const listeTemps = document.getElementsByClassName("duree");
    for (let i = 0; i < listeTemps.length; i++) {
        var attr = listeTemps[i].getAttribute("data-temps");
        

        listeTemps[i].innerHTML = listeTemps[i].innerHTML - 1;
        if (listeTemps[i].innerHTML === "1") {
            setApproche(listeTemps[i],1);
        }
        if (listeTemps[i].innerHTML === "0") {
            setApproche(listeTemps[i],0);
        }
        if (listeTemps[i].innerHTML === "-1") {
            setApproche(listeTemps[i],-1);

        }else if (listeTemps[i].innerHTML === "-2") {
            deleteTrain(listeTemps[i]);
        }

        
    }

}
function deleteTrain(element){
    element = element.parentElement;
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
    setTimeout(function(){element.remove();}, 500);

    // remove the animation class
    setTimeout(function(){ 
        for (let i = 0; i < trains.length; i++) {
            trains[i].classList.remove("moveup");
        }
    }
    , 1000);



    



    
}

function setApproche(element,clignotant){
    console.log(element);
    element = element.parentElement;
    element = element.parentElement;
    const temps = element.getElementsByClassName("temps")[0];
    temps.innerHTML = "";
    const span = document.createElement("span");
    if (clignotant === 1){ 
        span.classList.add("clignotant");
        span.innerHTML = "à l'approche";
        temps.classList.add("temps-texte");
        console.log(temps);
        console.log(temps);
        console.log(temps);
        
        
        
    }else if (clignotant === 2){
        span.innerHTML = "à l'approche";
        temps.classList.add("clignotant");
    }else if(clignotant === 0){
        span.innerHTML = "à quai";
        temps.classList.remove("clignotant");
    }
    temps.appendChild(span);


}

// setInterval(updateTemps, 2000);
setInterval(updateHeure, 1000);
