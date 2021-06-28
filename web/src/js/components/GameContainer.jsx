import React, { useRef, useState } from 'react';
import {
    GAME_STATE_OVER,
    GAME_STATE_PLAYING,
    GAME_STATE_READY,
} from '../consts';
import NewGameScreen from '../screens/NewGameScreen';
import BoardScreen from '../screens/BoardScreen';
import GameOverScreen from '../screens/GameOverScreen';
import requests from '../requests';

// On définit le state initial de notre jeu
const initialState = {
    cards: [], // Tableau d'objets représentant les cartes en jeu
    gameDuration: 0, // Durée de la partie en cours, en ms
    gameId: 0, // Id de la partie en cours
    gamePassword: 0, // Mot de passe de la partie
    gameState: GAME_STATE_READY, // État du jeu (pret/en cours/terminé)
    loading: false, // État de chargement
    maxGameDuration: 0, // Durée maximale de la partie, en ms
    playerName: '', // Nom du joueur (ouais j'vous jure)
    playerWon: false, // Vrai si le joueur a gagné la partie
    temporaryRevealedCardIds: [], // Ids des cartes temporairement révélées
};

const GameContainer = () => {
    const [state, setState] = useState(initialState);

    // Nous utilisons les refs pour enregistrer les différents timeouts,
    // ça nous permettra de les annuler si besoin (même si GameContainer est re-render entre temps)
    const noTimeLeftTimeoutRef = useRef(); // <- Celui la permettra de terminer la partie quand le temps est écoulé
    const endTurnTimeoutRef = useRef(); // <- et celui la permettra d'attendre un peu avant de finir chaque tour

    /*-- Callbacks ----------------------*/

    /**
     * Démarre une nouvelle partie avec le nom d'utilisateur donné
     * et lance le timeout de fin de partie
     */
    const startGame = async playerName => {
        const response = await requests.startGame(playerName);

        setState({
            cards: response.cards,
            gameId: response.gameId,
            gamePassword: response.password,
            gameState: GAME_STATE_PLAYING,
            maxGameDuration: response.maxGameDuration,
            playerName,
        });

        // Comme c'est une ref, on enregistre notre timeout
        // sur l'attribut "current", il sera conservé entre deux renders
        noTimeLeftTimeoutRef.current = setTimeout(() => {
            endGame(response.maxGameDuration, false);
        }, response.maxGameDuration);
    };

    /**
     * Révèle la carte donnée, et termine la partie si toutes les cartes sont devinées
     */
    const revealCard = async cardId => {
        const response = await requests.revealCard({
            cardId,
            gameId: state.gameId,
            password: state.gamePassword,
        });

        const nextGameState = {
            ...state,
            cards: response.cards,
            loading: true,
        };

        // On met à jour le plateau avec la nouvelle révélée
        setState(nextGameState);

        // On attends un peu avant de recacher les cartes ou de terminer la partie
        endTurnTimeoutRef.current = setTimeout(() => {
            // Si il ne reste plus de carte à deviner, on termine la partie
            if (response.remainingCardsCount === 0) {
                // Vu que le joueur a gagné, on peut virer le timeout
                // qui nous sert à terminer la partie lorsque le temps est dépassé
                clearTimeout(noTimeLeftTimeoutRef.current);

                endGame(response.endGameData.gameDuration, true);
            }

            // Sinon, si le nombre max de carte a été révélé au joueur,
            // on les cache et on retire l'état loading
            else if (response.temporaryRevealedCardIds.length === 2) {
                hideCards(response.temporaryRevealedCardIds);
            }

            // Sinon, on retire juste l'état loading
            else {
                setState({ ...nextGameState, loading: false });
            }
        }, 1000);
    };

    /**
     * Enregistre la durée de la partie, et passe à l'écran d'affichage
     * des scores
     */
    const endGame = (gameDuration, playerWon) => {
        // Si un tour était en cours, on l'annule, la partie étant finie,
        // on ne veut pas que son état soit modifié
        clearTimeout(endTurnTimeoutRef.current);

        setState({
            ...state,
            gameDuration,
            gameState: GAME_STATE_OVER,
            playerWon,
        });
    };

    /**
     * Marque les cartes dont les ids sont données comme "non révélées"
     */
    const hideCards = idsToHide => {
        const updatedCards = state.cards.map(card => {
            let isCardRevealed = card.revealed;

            if (idsToHide.includes(card.id)) {
                isCardRevealed = false;
            }

            return {
                ...card,
                revealed: isCardRevealed,
                value: isCardRevealed ? card.value : 0,
            };
        });

        setState({
            ...state,
            cards: updatedCards,
            loading: false,
        });
    };

    /**
     * Réinitialise l'état du jeu
     */
    const reset = () => {
        setState(initialState);
    };

    /*-- Render ----------------------*/

    let CurrentScreen = null;

    // Ici, on va afficher l'écran associé à l'état de jeu actuel

    if (state.gameState === GAME_STATE_READY) {
        CurrentScreen = <NewGameScreen startGame={startGame} />;
    }

    if (state.gameState === GAME_STATE_PLAYING) {
        CurrentScreen = (
            <BoardScreen
                boardDisabled={state.loading}
                cards={state.cards}
                revealCard={revealCard}
                maxGameDuration={state.maxGameDuration}
            />
        );
    }

    if (state.gameState === GAME_STATE_OVER) {
        CurrentScreen = (
            <GameOverScreen
                playerWon={state.playerWon}
                gameDuration={state.gameDuration}
                reset={reset}
            />
        );
    }

    return <div className={'game-container'}>{CurrentScreen}</div>;
};

export default GameContainer;
