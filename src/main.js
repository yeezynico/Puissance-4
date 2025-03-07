import { Puissance4 } from './script.js ';

let jeu;
let lignes, colonnes, joueur1, joueur2, couleur1, couleur2;

document.getElementById("generer").addEventListener("click", () => {
    lignes = parseInt(document.getElementById("lignes").value);
    colonnes = parseInt(document.getElementById("colonnes").value);
    joueur1 = document.getElementById("joueur1").value || "Joueur 1";
    joueur2 = document.getElementById("joueur2").value || "Joueur 2";
    couleur1 = document.getElementById("couleur-joueur1").value;
    couleur2 = document.getElementById("couleur-joueur2").value;

    if (isNaN(lignes) || isNaN(colonnes)) {
        alert("Entrez une taille valide (minimum 6x7)");
        return;
    }

    if (couleur1 === couleur2) {
        alert("Les couleurs doivent être différentes !");
        return;
    }

    document.getElementById("plateforme").innerHTML = "";
    jeu = new Puissance4(lignes, colonnes, joueur1, joueur2, couleur1, couleur2);
    jeu.afficherPlateau();
});

document.getElementById("plateforme").addEventListener("click", (e) => {
    let td = e.target;
    let colonne = td.cellIndex;
    jeu.jouerUnCoup(colonne);
    jeu.afficherPlateau();
    // if (jeu.victoire()) {
    //     alert(`Le joueur ${jeu.joueurActif === 1 ? jeu.joueur1 : jeu.joueur2} a gagné !`);
    //     jeu.jeuTermine = true;
    // }
});

document.getElementById("restart").addEventListener("click", () => {
    document.getElementById("plateforme").innerHTML = "";

    let score1 = jeu.scoreJoueur1;
    let score2 = jeu.scoreJoueur2;

    jeu = new Puissance4(lignes, colonnes, joueur1, joueur2, couleur1, couleur2);
    jeu.scoreJoueur1 = score1;
    jeu.scoreJoueur2 = score2;
    jeu.mettreAJourScore();
    jeu.afficherPlateau();
});
