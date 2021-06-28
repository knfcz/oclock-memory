import React, { useState } from 'react';
import ScoreList from '../components/ScoreList';
import isPlayerNameValid from '../utils/isPlayerNameValid';

const propTypes = {};

const defaultProps = {};

const NewGameScreen = props => {
    const [playerName, setPlayerName] = useState('');

    // On initialise à true pour éviter d'afficher l'erreur de validation
    // lorsqu'on vient d'arriver sur la page
    const [playerNameValid, setPlayerNameValid] = useState(true);

    /**
     * Appelée lorsque le joueur écrit dans le champ
     */
    const onPlayerNameChange = event => {
        setPlayerName(event.target.value);
    };

    const startGame = () => {
        if (!isPlayerNameValid(playerName)) {
            setPlayerNameValid(false);

            return;
        }

        setPlayerNameValid(true);

        props.startGame(playerName);
    };

    return (
        <>
            <h2>Nouvelle partie:</h2>

            <input
                placeholder={'Nom du joueur'}
                type="name"
                onChange={onPlayerNameChange}
                value={playerName}
            />

            {/* Si le nom du joueur est invalide, le message d'erreur sera affiché */}
            {!playerNameValid && (
                <span className="color-red">
                    Le nom doit faire entre 3 et 8 caractères, et ne peux
                    contenir que des chiffres ou des lettres
                </span>
            )}

            <div className="buttons-row">
                <button onClick={startGame}>Commencer</button>
            </div>

            <ScoreList />
        </>
    );
};

NewGameScreen.propTypes = propTypes;
NewGameScreen.defaultProps = defaultProps;

export default NewGameScreen;
