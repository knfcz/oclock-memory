/**
 * Formatte une durée en millisecondes en une chaine de caractères plus simple à lire
 */
const formatGameDuration = durationInMs => {
    const durationInSeconds = durationInMs / 1000;

    return `${durationInSeconds.toFixed(2)}s`;
};

export default formatGameDuration;
