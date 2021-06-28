import React from 'react';
import Board from '../components/Board';
import RemainingTimeIndicator from "../components/RemainingTimeIndicator";

const propTypes = {};

const defaultProps = {};

const BoardScreen = props => {
    const revealCard = async cardId => {
        await props.revealCard(cardId);
    };

    return (
        <>
            <RemainingTimeIndicator duration={props.maxGameDuration} />

            <Board
                disabled={props.boardDisabled}
                cards={props.cards}
                onCardClick={revealCard}
            />
        </>
    );
};

BoardScreen.propTypes = propTypes;
BoardScreen.defaultProps = defaultProps;

export default BoardScreen;
