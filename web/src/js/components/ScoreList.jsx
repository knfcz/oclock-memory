import React, { useEffect, useState } from 'react';
import requests from '../requests';
import formatGameDuration from '../utils/formatGameDuration';

const ScoreList = () => {
    const [scores, setScores] = useState([]);

    // Lors du premier affichage de ce composant,
    // on ira récupérer les scores auprès de l'api
    useEffect(() => {
        requests.listScores().then(response => {
            setScores(response.scores);
        });
    }, []);

    return (
        <div className={'scores-list'}>
            <h2>Meilleurs scores:</h2>
            <ul>
                {/* On transforme notre liste de scores
                    en une liste de composants react à afficher */}
                {scores.map(score => (
                    <li key={score.id}>
                        <span className={'player-name'}>
                            {score.playerName}
                        </span>
                        <span className={'duration'}>
                            {formatGameDuration(score.gameDuration)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ScoreList;
