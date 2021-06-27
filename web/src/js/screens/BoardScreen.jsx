import React from 'react';
import Board from '../components/Board';

const propTypes = {};

const defaultProps = {};

const BoardScreen = props => {
    const revealCard = async cardId => {
        console.log('revvv', cardId);

        await props.revealCard(cardId);
    };

    return (
        <Board
            cards={Object.values(props.cardsById)}
            onCardClick={revealCard}
        />
    );
};

BoardScreen.propTypes = propTypes;
BoardScreen.defaultProps = defaultProps;

export default BoardScreen;
