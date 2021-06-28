import React from 'react';
import ScoreList from '../components/ScoreList';
import formatGameDuration from '../utils/formatGameDuration';

const propTypes = {};

const defaultProps = {};

const GameOverScreen = props => {
    const label = props.playerWon ? 'Gagné' : 'Perdu';

    return (
        <>
            <h2>{label}</h2>

            <p>
                Durée de la partie: {formatGameDuration(props.gameDuration)}
            </p>

            <ScoreList />

            <div className="buttons-row">
                <button onClick={props.reset}>Ok</button>
            </div>
        </>
    );
};

GameOverScreen.propTypes = propTypes;
GameOverScreen.defaultProps = defaultProps;

export default GameOverScreen;
