const conatatore=document.getElementById("contatore_mosse");
const reset=document.getElementById("reset");
const griglia=document.getElementById("game-grid");
const carte=document.querySelectorAll(".card");
let mosse=0;
let carteScoperte=[];
let coppieIndovinate=0;
const icone = ['🍎', '🍌', '🍇', '🍓', '🥑', '🍍', '🍒', '🍉'];
let mazzo = [];
for(let i=0;i<icone.length;i++){
    mazzo.push(icone[i]);
    mazzo.push(icone[i]);
}
function mescola(array){
    return array.sort(() => Math.random()-0.5);
}
function inizializzaGioco(){
    mosse=0;
    carteScoperte=[];
    coppieIndovinate=0;
    conatatore.innerText=mosse;
    let mazzoMescolato=mescola(mazzo);
    for(let i=0;i<mazzoMescolato.length;i++){
        let cartaAttuale=carte[i];
        cartaAttuale.innerText=mazzoMescolato(i);
        carta.classList.remove("scoperta");
        carta.classList.add("nascosta");
        cartaAttuale.onclick=giraCarta;
    }
}
function giraCarta(){
    if(carteScoperte.length === 2 || this.classList.contains("scoperta")){
        return;
    }
    this.classList.remove("nascosta");
    this.classList.add("scoperta");
    carteScoperte.push(this);
    if(carteScoperte.length === 2){
        mosse++;
        conatatore.innerText=mosse;
        const carta1=carteScoperte[0];
        const carta2=carteScoperte[1];
        if(carta1.innerText === carta2.innerText){
            coppieIndovinate++;
            carteScoperte=[];
            if(coppieIndovinate === 8)
                alert("Complimenti! Hai vinto in " + mosse + " mosse!");
        }else{
            carta1.classList.remove("scoperta");
            carta1.classList.add("nascosta");
            carta2.classList.remove("scoperta");
            carta2.classList.add("nascosta");
            carteScoperte=[];
        }
    }
}
reset.onClick=inizializzaGioco;
inizializzaGioco();

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("serviceworker.js")
    .then(() => console.log("Service Worker registrato con successo!"))
    .catch((err) => console.log("Errore Service Worker: ", err));
}