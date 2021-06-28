import React from 'react';

const Card = props => (
    <button
        data-value={props.card.value}
        disabled={props.disabled || props.card.guessed || props.card.revealed}
        onClick={() => props.onClick(props.card.id)}
    />
);

export default Card;
