export class Puissance4 {

    constructor(lignes = 6, colones = 7, joueur1 = "Joueur 1", joueur2 = "Joueur 2", couleur1 = "red", couleur2 = "yellow") {
        this.lignes = lignes;
        this.colones = colones;
        this.plateau = [];
        this.joueurActif = 1;
        this.joueur1 = joueur1;
        this.joueur2 = joueur2;
        this.couleur1 = couleur1;
        this.couleur2 = couleur2;
        this.scoreJoueur1 = 0;
        this.scoreJoueur2 = 0;
        this.jeuTermine = false;
        this.initPlateau();
        this.mettreAJourJoueurActif();
        this.mettreAJourScore();
    }

    initPlateau() {
        let plateforme = document.querySelector('#plateforme');
        let table = document.createElement("table");

        for (let i = 0; i < this.lignes; i++) {
            let tr = document.createElement("tr");
            this.plateau[i] = [];
            table.appendChild(tr);
            for (let j = 0; j < this.colones; j++) {
                let td = document.createElement("td");
                tr.appendChild(td);
                this.plateau[i][j] = 0;
            }
        }
        plateforme.appendChild(table);
    }

    afficherPlateau() {
        let plateforme = document.querySelector('#plateforme');
        let table = document.createElement("table");

        for (let ligne = 0; ligne < this.lignes; ligne++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < this.colones; j++) {
                let td = document.createElement("td");

                if (this.plateau[ligne][j] === 1) {
                    td.style.backgroundColor = this.couleur1;
                } else if (this.plateau[ligne][j] === 2) {
                    td.style.backgroundColor = this.couleur2
                }

                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        plateforme.innerHTML = '';
        plateforme.appendChild(table);
    }

    jouerUnCoup(colonne) {
        if (this.jeuTermine) {
            alert("Le jeu est déjà terminé !");
            return;
        }
        for (let ligne = this.lignes - 1; ligne >= 0; ligne--) {
            if (this.plateau[ligne][colonne] === 0) {
                this.plateau[ligne][colonne] = this.joueurActif;
                this.afficherPlateau();
                if (this.victoire()) {
                    this.jeuTermine = true;
                    return;
                }

                if (this.matchNull()) {
                    this.jeuTermine = true;
                    alert("match nul");
                    return;
                }

                this.joueurActif = this.joueurActif === 1 ? 2 : 1;
                this.mettreAJourJoueurActif()
                return;
            }
        }
        alert("Tu ne peut pas jouer ici tu doit jouer dans une colone !");
    }

    matchNull() {
        for (let ligne = 0; ligne < this.lignes; ligne++) {
            for (let colone = 0; colone < this.colones; colone++) {
                if (this.plateau[ligne][colone] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    mettreAJourJoueurActif() {
        let texte = this.joueurActif === 1 ? this.joueur1 : this.joueur2;
        document.getElementById("joueur-actif").textContent = "Au tour de : " + texte;
    }

    mettreAJourScore() {
        document.getElementById("score1").textContent = `${this.joueur1} : ${this.scoreJoueur1} victoires`;
        document.getElementById("score2").textContent = `${this.joueur2} : ${this.scoreJoueur2} victoires`;
    }

    victoire() {
        let joueur = this.joueurActif;

        // horizontale
        for (let ligne = 0; ligne < this.lignes; ligne++) {
            let count = 0;
            for (let colone = 0; colone < this.colones; colone++) {
                if (this.plateau[ligne][colone] === joueur) {
                    count++;
                    if (count === 4) {
                        alert(`Le joueur ${joueur === 1 ? this.joueur1 : this.joueur2} a gagné !`);
                        if (joueur === 1) {
                            this.scoreJoueur1++;
                        } else {
                            this.scoreJoueur2++;
                        }
                        this.mettreAJourScore();
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }

        //verticale
        for (let colone = 0; colone < this.colones; colone++) {
            let count = 0;
            for (let ligne = 0; ligne < this.lignes; ligne++) {
                if (this.plateau[ligne][colone] === joueur) {
                    count++;
                    if (count === 4) {
                        alert(`Le joueur ${joueur === 1 ? this.joueur1 : this.joueur2} a gagné !`);
                        if (joueur === 1) {
                            this.scoreJoueur1++;
                        } else {
                            this.scoreJoueur2++;
                        }
                        this.mettreAJourScore();
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }
        // diagonale( gauche -> droite)
        for (let ligne = 0; ligne < this.lignes - 3; ligne++) {
            for (let colone = 0; colone < this.colones - 3; colone++) {
                let count = 0;
                for (let i = 0; i < 4; i++) {
                    if (this.plateau[ligne + i][colone + i] === joueur) {
                        count++;
                        if (count === 4) {
                            alert(`Le joueur ${joueur === 1 ? this.joueur1 : this.joueur2} a gagné !`);
                            if (joueur === 1) {
                                this.scoreJoueur1++;
                            } else {
                                this.scoreJoueur2++;
                            }
                            this.mettreAJourScore();
                            return true;
                        }
                    } else {
                        break;
                    }
                }
            }
        }
        // diagonale(droite -> gauche)
        for (let ligne = 3; ligne < this.lignes; ligne++) {
            for (let colone = 0; colone < this.colones - 3; colone++) {
                let count = 0;
                for (let i = 0; i < 4; i++) {
                    if (this.plateau[ligne - i][colone + i] === joueur) {
                        count++;
                        if (count === 4) {
                            alert(`Le joueur ${joueur === 1 ? this.joueur1 : this.joueur2} a gagné !`);
                            if (joueur === 1) {
                                this.scoreJoueur1++;
                            } else {
                                this.scoreJoueur2++;
                            }
                            this.mettreAJourScore();
                            return true;
                        }
                    } else {
                        break;
                    }
                }
            }
        }
        return false;
    }

}