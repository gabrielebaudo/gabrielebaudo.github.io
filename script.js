/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

//HANDLER PER IL CLICK, CONTROLLA AD OGNI SELEZIONE SE IL TEST E COMPLETATO O NO
function onClick(event){
    const check_elem = event.currentTarget;
    const div_elem = check_elem.parentNode;

    div_elem.classList.add("selected");
    check_elem.src = "/images/checked.png"

    let elementList = document.querySelectorAll(".checkbox");
    for(const elem of elementList){
        if(elem.parentNode.dataset.questionId === div_elem.dataset.questionId){
            if(elem !== check_elem){
                elem.parentNode.classList.remove("selected");
                elem.parentNode.classList.add("unselected"); 
                elem.src = "/images/unchecked.png";
            }
        }
    }

    if(isComplete()){
        endTest();
    }
}

//RESTITUISCE LA PERSONALITA CORRETTA
function personalityfinder(){
    let checkedList = document.querySelectorAll(".selected");
    const personality = {blep: 0, happy: 0, sleeping: 0, dopey: 0, burger: 0, cart: 0, nerd: 0, shy: 0, sleepy: 0}
    for(const elem of checkedList){
        for(const person in personality){
            if(elem.dataset.choiceId === person){
                personality[person]++;
            }   
        } 
    }
    let max = checkedList[0].dataset.choiceId;

    for(const person in personality){
        if(personality[person] > personality[max])
            max = person;
    }
    return max;
}

//STAMPA TUTTI GLI ELEMENTI NECESSARI ALLA FINE DELLA PAGINA
function display(personality){
    console.log(RESULTS_MAP[personality].title);
    const container = document.querySelector('#results');
    const title = document.createElement("h1");
    const description = document.createElement("p");
    const button = document.createElement("div");

    title.textContent = RESULTS_MAP[personality].title;
    container.appendChild(title);
    description.textContent = RESULTS_MAP[personality].contents;
    container.appendChild(description);
    button.textContent = "Ricomincia il quiz";
    button.classList.add("button");
    container.appendChild(button);
}

//CONTROLLA SE TUTTE LE DOMANDE HANNO AVUTO UNA RISPOSTA
function isComplete(){
    let checkedList = document.querySelectorAll(".selected");
    if(checkedList.length === 3)
        return 1;
    return 0;
}

//HANDLER PER IL BOTTONE DI RESET, PULISCE LA PAGINA E RICHIAMA GLI ONCLICK HANDLER
function buttonPress(event){
    const button = event.currentTarget;

    let elementList = document.querySelectorAll(".checkbox");
    for(const elem of elementList){
        elem.parentNode.classList.remove("selected");
        elem.parentNode.classList.remove("unselected"); 
        elem.src = "/images/unchecked.png"
    }

    let result = document.querySelector("#results");
    result.innerHTML = '';
    setListen();
}

//IMPOSTA GLI HANDLER PER TUTTE LE POSSIBILI RISPOSTE
function setListen(){
    let elementList = document.querySelectorAll(".checkbox");
    for(const elem of elementList){
        elem.addEventListener('click', onClick);
    }
}

//BLOCCA GLI HANDLER PER RENDERE LE RISPOSTE IMMODIFICABILI
function blockListen(){
    let elementList = document.querySelectorAll(".checkbox");
    for(const elem of elementList){
        elem.removeEventListener('click', onClick);
    }
}

//GESTISCE TUTTE LE FUNZIONI PER LA CONCLUSIONE DEL TEST
function endTest(){
    
    blockListen();

    const personality = personalityfinder();
    display(personality);

    let button = document.querySelector(".button");
    button.addEventListener("click", buttonPress);
}

//MAIN
setListen();















