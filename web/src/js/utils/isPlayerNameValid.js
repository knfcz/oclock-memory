/**
 * Renvoie vrai si le nom du joueur respecte le format attendu
 */
const isPlayerNameValid = playerName => {
    // Cette regex sera respectée si le nom ne contient
    // que des lettres (minuscules ou majuscules), ou des chiffres
    const playerNameRegex = new RegExp(/[a-zA-Z0-9]/);

    return (
        playerName.length >= 3 &&
        playerName.length <= 8 &&
        playerNameRegex.test(playerName)
    );
};

export default isPlayerNameValid;
