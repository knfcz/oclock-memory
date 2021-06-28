/**
 * Renvoie vrai si le nom de joueur est valide
 */
module.exports = playerName => {
    const playerNameRegex = new RegExp(/[a-zA-Z0-9]/);

    return (
        playerName.length >= 3 &&
        playerName.length <= 8 &&
        playerNameRegex.test(playerName)
    );
};
