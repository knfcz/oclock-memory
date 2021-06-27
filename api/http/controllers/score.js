const Score = require('../../database/models/Score');

/**
 * Renvoie les meilleurs scores
 */
const list = async (request, response) => {
    const scores = await Score.listHighests();

    response.json({ scores });
};

module.exports = {
    list
};
