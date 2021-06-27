const Board = require('./Board');

let currentGameId = 1;

class Game {
    constructor({ playerName, maxDuration }) {
        // Id de la partie en cours
        this.id = currentGameId;
        // Instance de Board, représentant l'état du plateau
        this.Board = new Board();
        // Timestamp représentant la date de début de partie
        this.startedAt = Date.now();
        // Timestamp représentant la date de fin de partie
        this.endedAt = 0;
        // Durée maximale de la partie, en secondes
        this.maxDuration = maxDuration;
        // Mot de passe à fournir pour jouer
        this.password = this.generatePassword();
        // Nom du joueur
        this.playerName = playerName;
        // Liste de cartes temporairement révélées à l'utilisateur
        this.temporaryRevealedCards = [];

        // Et on incrémente l'id, pour que chaque instance de Game en aie un unique
        currentGameId++;
    }

    /**
     * Renvoie la liste des cartes visibles
     */
    getCards() {
        return this.Board.getVisibleCards();
    }

    /**
     * Révèle une carte, si elle a la même valeur que la dernière carte révélée,
     * les marque comme "devinées"
     */
    revealCard(cardId) {
        // Si la partie est terminée, on ne fait rien
        if (this.endedAt) {
            return false;
        }

        // Si deux cartes sont déjà révélées,
        // on les cache avant de révéler la nouvelle carte
        if (this.temporaryRevealedCards.length >= 2) {
            this.hideTemporaryRevealedCards();
        }

        const revealedCard = this.Board.revealCard(cardId);

        if (!revealedCard) {
            return false;
        }

        this.temporaryRevealedCards.push(revealedCard);

        // Si deux cartes on été révélées, et qu'elles ont la même valeur,
        // on les marque comme devinées
        if (this.areTemporaryRevealedCardsEqual()) {
            this.Board.setCardsAsGuessed(this.temporaryRevealedCards);
            this.hideTemporaryRevealedCards();
        }

        if(this.Board.getUnguessedCardsCount() === 0) {
            this.end();
        }

        return revealedCard;
    }

    /**
     * Termine la partie et renvoie les informations de fin de partie
     */
    end() {
        this.endedAt = Date.now();
        let playerWon = false;

        // Les deux dates étant représentées par des timestamps,
        // on peut facilement déduire le nombre de millisecondes
        // écoulées entre le début et la fin de la partie
        const gameDuration = this.endedAt - this.startedAt;

        if (
            this.Board.areAllCardsGuessed() &&
            gameDuration <= this.maxDuration * 1000
        ) {
            playerWon = true;
        }

        return {
            gameDuration,
            playerWon,
        };
    }

    /**
     * Cache toutes les cartes révélées
     */
    hideTemporaryRevealedCards() {
        this.Board.hideRevealedCards();
        this.temporaryRevealedCards = [];
    }

    /**
     * Renvoie vrai si les deux cartes révélées ont la même valeur
     */
    areTemporaryRevealedCardsEqual() {
        return (
            this.temporaryRevealedCards.length === 2 &&
            this.temporaryRevealedCards[0].value ===
                this.temporaryRevealedCards[1].value
        );
    }

    /**
     * Génère un mot de passe à fournir pour réveler les cartes et terminer la partie
     */
    generatePassword() {
        // On génère un nombre à virgule du genre "0.123456"
        const randomFloat = Math.random();

        // On ne veut pas que le mot de passe commence par "0.",
        // alors on génère une nouvelle chaine de caractères sans
        return randomFloat.toString().substr(2, 5);
    }
}

module.exports = Game;
