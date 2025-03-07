function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
export var Puissance4 = /*#__PURE__*/function () {
  function Puissance4() {
    var lignes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
    var colones = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 7;
    var joueur1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Joueur 1";
    var joueur2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Joueur 2";
    var couleur1 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "red";
    var couleur2 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "yellow";
    _classCallCheck(this, Puissance4);
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
  return _createClass(Puissance4, [{
    key: "initPlateau",
    value: function initPlateau() {
      var plateforme = document.querySelector('#plateforme');
      var table = document.createElement("table");
      for (var i = 0; i < this.lignes; i++) {
        var tr = document.createElement("tr");
        this.plateau[i] = [];
        table.appendChild(tr);
        for (var j = 0; j < this.colones; j++) {
          var td = document.createElement("td");
          tr.appendChild(td);
          this.plateau[i][j] = 0;
        }
      }
      plateforme.appendChild(table);
    }
  }, {
    key: "afficherPlateau",
    value: function afficherPlateau() {
      var plateforme = document.querySelector('#plateforme');
      var table = document.createElement("table");
      for (var ligne = 0; ligne < this.lignes; ligne++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < this.colones; j++) {
          var td = document.createElement("td");
          if (this.plateau[ligne][j] === 1) {
            td.style.backgroundColor = this.couleur1;
          } else if (this.plateau[ligne][j] === 2) {
            td.style.backgroundColor = this.couleur2;
          }
          tr.appendChild(td);
        }
        table.appendChild(tr);
      }
      plateforme.innerHTML = '';
      plateforme.appendChild(table);
    }
  }, {
    key: "jouerUnCoup",
    value: function jouerUnCoup(colonne) {
      if (this.jeuTermine) {
        alert("Le jeu est déjà terminé !");
        return;
      }
      for (var ligne = this.lignes - 1; ligne >= 0; ligne--) {
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
          this.mettreAJourJoueurActif();
          return;
        }
      }
      alert("Tu ne peut pas jouer ici tu doit jouer dans une colone !");
    }
  }, {
    key: "matchNull",
    value: function matchNull() {
      for (var ligne = 0; ligne < this.lignes; ligne++) {
        for (var colone = 0; colone < this.colones; colone++) {
          if (this.plateau[ligne][colone] === 0) {
            return false;
          }
        }
      }
      return true;
    }
  }, {
    key: "mettreAJourJoueurActif",
    value: function mettreAJourJoueurActif() {
      var texte = this.joueurActif === 1 ? this.joueur1 : this.joueur2;
      document.getElementById("joueur-actif").textContent = "Au tour de : " + texte;
    }
  }, {
    key: "mettreAJourScore",
    value: function mettreAJourScore() {
      document.getElementById("score1").textContent = "".concat(this.joueur1, " : ").concat(this.scoreJoueur1, " victoires");
      document.getElementById("score2").textContent = "".concat(this.joueur2, " : ").concat(this.scoreJoueur2, " victoires");
    }
  }, {
    key: "victoire",
    value: function victoire() {
      var joueur = this.joueurActif;

      // horizontale
      for (var ligne = 0; ligne < this.lignes; ligne++) {
        var count = 0;
        for (var colone = 0; colone < this.colones; colone++) {
          if (this.plateau[ligne][colone] === joueur) {
            count++;
            if (count === 4) {
              alert("Le joueur ".concat(joueur === 1 ? this.joueur1 : this.joueur2, " a gagn\xE9 !"));
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
      for (var _colone = 0; _colone < this.colones; _colone++) {
        var _count = 0;
        for (var _ligne = 0; _ligne < this.lignes; _ligne++) {
          if (this.plateau[_ligne][_colone] === joueur) {
            _count++;
            if (_count === 4) {
              alert("Le joueur ".concat(joueur === 1 ? this.joueur1 : this.joueur2, " a gagn\xE9 !"));
              if (joueur === 1) {
                this.scoreJoueur1++;
              } else {
                this.scoreJoueur2++;
              }
              this.mettreAJourScore();
              return true;
            }
          } else {
            _count = 0;
          }
        }
      }
      // diagonale( gauche -> droite)
      for (var _ligne2 = 0; _ligne2 < this.lignes - 3; _ligne2++) {
        for (var _colone2 = 0; _colone2 < this.colones - 3; _colone2++) {
          var _count2 = 0;
          for (var i = 0; i < 4; i++) {
            if (this.plateau[_ligne2 + i][_colone2 + i] === joueur) {
              _count2++;
              if (_count2 === 4) {
                alert("Le joueur ".concat(joueur === 1 ? this.joueur1 : this.joueur2, " a gagn\xE9 !"));
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
      for (var _ligne3 = 3; _ligne3 < this.lignes; _ligne3++) {
        for (var _colone3 = 0; _colone3 < this.colones - 3; _colone3++) {
          var _count3 = 0;
          for (var _i = 0; _i < 4; _i++) {
            if (this.plateau[_ligne3 - _i][_colone3 + _i] === joueur) {
              _count3++;
              if (_count3 === 4) {
                alert("Le joueur ".concat(joueur === 1 ? this.joueur1 : this.joueur2, " a gagn\xE9 !"));
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
  }]);
}();