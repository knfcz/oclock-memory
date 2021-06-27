import { API_URL } from './config';

const sendRequest = (url, options) => {
    const fullUrl = API_URL + url;

    return fetch(fullUrl, options)
        .then(response => response.json())
        .catch(e => {
            console.log('oh no', e);
        });
};

export default {
    startGame: playerName =>
        sendRequest('/game', {
            method: 'POST',
            body: JSON.stringify({
                playerName,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }),

    revealCard: ({ password, gameId, cardId }) =>
        sendRequest(`/games/${gameId}/cards/${cardId}`, {
            method: 'POST',
            body: JSON.stringify({
                password,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }),

    endGame: ({ password, gameId }) =>
        sendRequest(`/games/${gameId}/end`, {
            method: 'POST',
            body: JSON.stringify({
                password,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }),
};
