const rand = require('../utils/rand');
const { GAME_PAIRS_COUNT } = require('../config');

class Board {
    constructor() {
        this.generate();
    }

    /**
     * Génère un plateau de jeu en fonction du nombre de paires voulu
     */
    generate() {
        this.cardsById = {};

        let remainingValues = [];
        let valueIterator = 1;

        // Pour générer notre plateau, nous allons commencer par remplir un tableau
        // avec les valeurs de chaque cartes, les valeurs étant des entiers de 1 à n,
        // on peut utiliser une boucle for pour générer les valeurs
        for (
            valueIterator;
            valueIterator <= GAME_PAIRS_COUNT;
            valueIterator++
        ) {
            // Comme il y a deux cartes par valeur,
            // on ajoute deux entrées à notre tableau
            remainingValues.push(valueIterator);
            remainingValues.push(valueIterator);
        }

        // On crée un identifiant, qui sera différent pour chaque cartes
        // Ça permettra de facilement identifier les cartes de notre plateau coté client et serveur
        let currentCardId = 1;

        // Ensuite, tant qu'il nous reste des valeurs dans notre tableau de valeurs,
        // nous allons piocher dedans au hasard pour générer notre plateau de jeu
        while (remainingValues.length > 0) {
            // On récupère la position d'une valeur au hasard dans notre tableau
            const randomValueIndex = rand(0, remainingValues.length - 1);

            // Puis, nous ajoutons à notre plateau de jeu une carte qui aura cette valeur
            // Nous représentons chaque carte par un objet,
            // cela nous permet de stocker, en plus de la valeur, l'état de la carte(devinée, révélée, etc...)
            this.cardsById[currentCardId] = {
                id: currentCardId,
                guessed: false,
                revealed: false,
                value: remainingValues[randomValueIndex],
            };

            // Enfin, on retire la valeur en question de notre tableau de valeurs
            // Si on le fait pas, la boucle while ne se terminera jamais (et node aime pas trop ça)
            remainingValues.splice(randomValueIndex, 1);

            // Et on incrémente notre compteur
            // pour avoir un nouvel id unique lors de la prochaine itération
            currentCardId++;
        }
    }

    /**
     * Marque une carte comme révélée, et la renvoie
     */
    revealCard(cardId) {
        const card = this.cardsById[cardId];

        if (!card || card.revealed || card.guessed) {
            return false;
        }

        this.cardsById[cardId].revealed = true;

        return card;
    }

    /**
     * Cache toute les cartes révélées
     */
    hideRevealedCards() {
        const cardIds = Object.keys(this.cardsById);

        for (const cardId of cardIds) {
            if (!this.cardsById[cardId].guessed) {
                this.cardsById[cardId].revealed = false;
            }
        }
    }

    /**
     * Marque plusieurs cartes comme "devinées"
     */
    setCardsAsGuessed(cards) {
        for (const card of cards) {
            this.cardsById[card.id].guessed = true;
        }
    }

    /**
     * Renvoie les cartes visibles, indexées par id
     * si une carte n'est pas visible, on considère que sa valeur est  0
     */
    getVisibleCards() {
        const cardsList = Object.values(this.cardsById);

        return cardsList.reduce((visibleCards, card) => {
            let cardValue = 0;

            if (card.revealed || card.guessed) {
                cardValue = card.value;
            }

            visibleCards[card.id] = {
                // Cette syntaxe nous permet de recopier les propriétés de l'objet card
                // dans ce nouvel objet
                ...card,
                // la propriétée value sera re-écrite
                value: cardValue,
            };

            return visibleCards;
        }, {});
    }

    /**
     * Renvoie vrai si toutes les cartes ont été devinées
     */
    areAllCardsGuessed() {
        const cardsList = Object.values(this.cardsById);

        return cardsList.reduce(
            (areAllCardsGuessed, card) => areAllCardsGuessed && card.guessed,
            true,
        );
    }

    /**
     * Renvoie le nombre de cartes restantes à deviner
     */
    getUnguessedCardsCount() {
        const cardsList = Object.values(this.cardsById);

        return cardsList.reduce((count, card) => {
            if (!card.guessed) {
                return count + 1;
            }

            return count;
        }, 0);
    }
}

module.exports = Board;
