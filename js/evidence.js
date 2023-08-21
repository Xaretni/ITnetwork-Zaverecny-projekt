class Evidence {

    constructor() {
        const zaznamyZeStorage = localStorage.getItem("zaznamy"); 
        this.zaznamy = zaznamyZeStorage ? JSON.parse(zaznamyZeStorage) : []; 
        this.jmenoInput = document.getElementById("jmeno");
        this.prijmeniInput = document.getElementById("prijmeni");
        this.telefonInput = document.getElementById("telefon");
        this.vekInput = document.getElementById("vek");
        this.vlozButton = document.getElementById("vlozit");
        this.vypisUzivatele = document.getElementById("seznam-uzivatelu");

        this._pridej();
    }


    _pridej() {
        this.vlozButton.onclick = () => {
            if (this.prijmeniInput.value == "" || this.jmenoInput.value == "") {
                alert("Musíte vyplnit jmeno a prijmeni");
            } else if (this.telefonInput.value.length == 0 || this.vekInput.value.length == 0) { 
                alert("Musíte v ciselnem formatu vyplnit vek a telefon");
            } else {
                const zaznam = new Zaznam(this.jmenoInput.value, this.prijmeniInput.value, this.telefonInput.value, this.vekInput.value);
                this.zaznamy.push(zaznam);
                this.ulozZaznam();
                this.vypisZaznamy();
            }
        };
    }


    vypisZaznamy() { 
        this.vypisUzivatele.innerHTML = "";
        for (const zaznam of this.zaznamy) {  
            const seznam = document.createElement("tr"); 

            seznam.insertAdjacentHTML("beforeend", `<td>${zaznam.jmeno} ${zaznam.prijmeni}</td><td>${zaznam.telefon}</td><td>${zaznam.vek}</td>`);
            const smazBtnTd = document.createElement("td"); 
            seznam.appendChild(smazBtnTd);

            const smazBtn = document.createElement("button"); 
            smazBtn.onclick = () => {
                if (confirm("Opravdu chcete tento záznam smazat?")) {
                    this.zaznamy = this.zaznamy.filter(z => z !== zaznam); 
                    this.ulozZaznam();
                    this.vypisZaznamy();
                }
            }
            smazBtn.innerText = "Smazat záznam";
            smazBtn.className = "btn btn-light";
            smazBtnTd.appendChild(smazBtn); 
            seznam.insertAdjacentHTML("beforeend", "</tr>"); 
            this.vypisUzivatele.appendChild(seznam); 
        }
    }

    ulozZaznam() { 

        localStorage.setItem("zaznamy", JSON.stringify(this.zaznamy));  
    }




}