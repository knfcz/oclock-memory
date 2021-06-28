import React from 'react';
import Card from './Card';

const Board = props => (
    <ul className={'board'}>
        {/* On transforme notre liste de cartes en une liste de composants à afficher */}
        {props.cards.map(card => (
            <li key={card.id} className={'card'}>
                <Card
                    card={card}
                    disabled={props.disabled}
                    onClick={props.onCardClick}
                />
            </li>
        ))}
    </ul>
);

export default Board;
