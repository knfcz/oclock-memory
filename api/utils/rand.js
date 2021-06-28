/**
 * Renvoie un entier aléatoire entre min et max
 * (Ouais ça vient de stackoverflow :) )
 */
module.exports = (min, max) => {
    const amplitude = max - min;
    const randomFloat = Math.random() * (amplitude + 1) + min;

    return Math.floor(randomFloat);
};
