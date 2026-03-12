const conatatore = document.getElementById("contatore_mosse");
const reset = document.getElementById("reset");
const griglia = document.getElementById("game-grid");
const carte = document.querySelectorAll(".card");

let mosse = 0;
let carteScoperte = [];
let coppieIndovinate = 0;
const icone = ['🍎', '🍌', '🍇', '🍓', '🥑', '🍍', '🍒', '🍉'];
let mazzo = [];

for(let i = 0; i < icone.length; i++){
    mazzo.push(icone[i]);
    mazzo.push(icone[i]);
}

function mescola(array){
    return array.sort(() => Math.random() - 0.5);
}

function inizializzaGioco(){
    mosse = 0;
    carteScoperte = [];
    coppieIndovinate = 0;
    conatatore.innerText = mosse;
    
    // Usiamo una copia del mazzo per sicurezza
    let mazzoMescolato = mescola([...mazzo]); 
    
    for(let i = 0; i < mazzoMescolato.length; i++){
        let cartaAttuale = carte[i];
        
        // Assegnazione array con parentesi quadre
        cartaAttuale.innerText = mazzoMescolato[i]; 
        
        cartaAttuale.classList.remove("scoperta");
        cartaAttuale.classList.add("nascosta");
        cartaAttuale.onclick = giraCarta;
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
        conatatore.innerText = mosse;
        
        const carta1 = carteScoperte[0];
        const carta2 = carteScoperte[1];
        
        if(carta1.innerText === carta2.innerText){
            // Match corretto
            coppieIndovinate++;
            carteScoperte = [];
            
            if(coppieIndovinate === 8) {
                setTimeout(() => {
                    alert("Complimenti! Hai vinto in " + mosse + " mosse!");
                }, 300);
            }
        } else {
            // Match sbagliato: pausa di 1 secondo prima di rigirarle
            setTimeout(() => {
                carta1.classList.remove("scoperta");
                carta1.classList.add("nascosta");
                carta2.classList.remove("scoperta");
                carta2.classList.add("nascosta");
                carteScoperte = [];
            }, 1000);
        }
    }
}

// Reset corretto in minuscolo
reset.onclick = inizializzaGioco;
inizializzaGioco();

// Registrazione del Service Worker (il file deve chiamarsi "serviceworker.js" tutto minuscolo)
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("serviceworker.js")
    .then(() => console.log("Service Worker registrato con successo!"))
    .catch((err) => console.log("Errore Service Worker: ", err));
}
