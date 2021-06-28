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
            // Comme il y a deux cartes pour chaque valeurs,
            // on ajoute la valeur deux fois au tableau
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
            // cela nous permet de stocker, en plus de la valeur, l'état de la carte (devinée, révélée, etc...)
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

        // Si la carte n'existe pas ou est déjà visible, on ne fait rien
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
     * si une carte n'est pas visible, on considère que sa valeur est 0
     */
    getVisibleCards() {
        const cardsList = Object.values(this.cardsById);

        // Ici, map() va générer un nouveau tableau en appelant notre callback sur toutes
        // les cartes de notre liste et en stockant la valeurs renvoyées
        return cardsList.map(card => {
            let cardValue = 0;

            if (card.revealed || card.guessed) {
                cardValue = card.value;
            }

            return {
                // Cette syntaxe nous permet de recopier les propriétés de l'objet card
                // dans ce nouvel objet
                ...card,
                // la propriétée value sera re-écrite
                value: cardValue,
            };
        });
    }

    /**
     * Renvoie vrai si toutes les cartes ont été devinées
     */
    areAllCardsGuessed() {
        const cardsList = Object.values(this.cardsById);

        // every() renverra vrai si toutes les cartes de notre liste respectent ce prédicat
        // (en gros, si notre callback renvoie vrai pour chaque carte)
        return cardsList.every(card => card.guessed === true);
    }

    /**
     * Renvoie le nombre de cartes restantes à deviner
     */
    getUnguessedCardsCount() {
        const cardsList = Object.values(this.cardsById);

        // Ici, le callback sera appelé pour chaque élément de notre liste, et recevra:
        // - count: valeur renvoyée par le callback lors de l'itération précédente
        //          (pour la première itération, ça sera 0)
        // - card: une carte de notre plateau de jeu
        //
        // reduce() retournera la valeur renvoyée par le callback lors de la dernière itération
        return cardsList.reduce((count, card) => {
            if (!card.guessed) {
                count += 1;
            }

            return count;
        }, 0);
    }
}

module.exports = Board;
