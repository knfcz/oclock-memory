/**
 * Renvoie un entier aléatoire entre min et max
 * (Ouais ça vient de stackoverflow :) )
 *
 * @param {number} min valeur minimale
 * @param {number} max valeur maximale
 *
 * @return {number} Entier aléatoire
 */
module.exports = (min, max) => {
    const amplitude = max - min;
    const randomFloat = Math.random() * (amplitude + 1) + min;

    return Math.floor(randomFloat);
};
