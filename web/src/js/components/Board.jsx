import React from 'react';

const Board = props => {
    const onCardClick = cardId => {
        props.onCardClick(cardId);
    };

    return (
        <div className={'board'}>
            <ul>
                {props.cards.map(card => {
                    return (
                        <li
                            className={'card'}
                            data-value={card.value}
                            onClick={() => onCardClick(card.id)}
                        >
                            <button disabled={card.guessed || card.revealed}>
                                {card.value}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Board;
