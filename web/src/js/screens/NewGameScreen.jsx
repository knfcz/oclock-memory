import React, {useContext, useState} from 'react';

const propTypes = {};

const defaultProps = {};

const NewGameScreen = props => {
    const [playerName, setPlayerName] = useState('');

    /**
     * Appellée lorsque le joueur écris dans le TextInput
     */
    const onPlayerNameChange = event => setPlayerName(event.target.value);

    const startGame = () => {
        props.startGame(playerName);
    };

    return (
        <>
            <input type="name" onChange={onPlayerNameChange} value={playerName}/>

            <button onClick={startGame}>go</button>
        </>
    );
};

NewGameScreen.propTypes = propTypes;
NewGameScreen.defaultProps = defaultProps;

export default NewGameScreen;
