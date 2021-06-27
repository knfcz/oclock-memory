// Cette variable n'étant pas exporté,
// elle devra etre lue/modifiée en passant par Storage
const state = {};

/**
 * Permet de stocker des choses en mémoire,
 * dans notre cas, ça sera surtout pour stocker nos instances de jeu entre deux requêtes HTTP
 */
const Storage = {
    get: key => state[key],

    set(key, value) {
        state[key] = value;
    },

    unset(key) {
        delete state[key];
    }
};

module.exports = Storage;
