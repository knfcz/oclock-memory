import React, { useState } from 'react';
import {
    GAME_STATE_OVER,
    GAME_STATE_PLAYING,
    GAME_STATE_READY,
} from '../consts';
import NewGameScreen from '../screens/NewGameScreen';
import BoardScreen from '../screens/BoardScreen';
import GameOverScreen from '../screens/GameOverScreen';
import requests from '../requests';

// On définis le state initial de notre jeu
const initialState = {
    gameState: GAME_STATE_READY,
    gameId: 0,
    gamePassword: 0,
    playerName: '',
    cardsById: {},
    scores: [],
};

const getUnguessedCardsCount = cards =>
    cards.reduce((count, card) => {
        if (!card.guessed) {
            return count + 1;
        }

        return count;
    }, 0);

const GameContainer = () => {
    const [state, setState] = useState(initialState);

    /*-- Callbacks ----------------------*/

    // Ces fonctions seront appelées par les écrans pour modifier l'état de la partie

    /**
     * Démarre une nouvelle partie avec le nom d'utilisateur donné
     */
    const startGame = async playerName => {
        let { password, gameId, cards } = await requests.startGame(playerName);

        setState({
            gamePassword: password,
            gameId,
            playerName,
            cardsById: cards,
            gameState: GAME_STATE_PLAYING,
        });
    };

    /**
     * Récupère la valeur de la carte demandée
     */
    const revealCard = async cardId => {
        const { cards } = await requests.revealCard({
            gameId: state.gameId,
            password: state.gamePassword,
            cardId,
        });

        console.log('nioucard', cards);

        if(getUnguessedCardsCount(cards) === 0) {
            setTimeout(endGame, 2000);
        }

        setState({
            ...state,
            cardsById: cards,
        });

        // si tout est bon, on termine la partie
    };

    const endGame = () => {

    }


    /*-- Render ----------------------*/

    // Ici, on va afficher l'écran associé à l'état de jeu actuel

    if (state.gameState === GAME_STATE_READY) {
        return <NewGameScreen startGame={startGame} />;
    }

    if (state.gameState === GAME_STATE_PLAYING) {
        return (
            <BoardScreen cardsById={state.cardsById} revealCard={revealCard} />
        );
    }

    if (state.gameState === GAME_STATE_OVER) {
        return <GameOverScreen />;
    }

    return null;
};

export default GameContainer;
