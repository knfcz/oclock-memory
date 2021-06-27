// Envoyé lorsqu'il manque des paramètres à une requête HTTP
const ERROR_CODE_INVALID_PARAMETERS = 'invalidParameters';
// Envoyé lorsque une carte demande n'existe pas, ou a un état invalide
const ERROR_CODE_CARD_INVALID = 'invalidCard';
// Envoyé lorsque une partie n'existe pas, ou a un état invalide
const ERROR_CODE_GAME_INVALID = 'invalidGame';
// Envoyé lorsque un utilisateur n'a pas le droit d'accéder à une partie
const ERROR_CODE_GAME_UNAUTHORIZED = 'unauthorizedGame';
// Envoyé lorsque la création d'une resource échoue
const ERROR_CODE_CANNOT_CREATE_RESOURCE = 'cannotCreateResource';

module.exports = {
    ERROR_CODE_INVALID_PARAMETERS,
    ERROR_CODE_CARD_INVALID,
    ERROR_CODE_GAME_INVALID,
    ERROR_CODE_GAME_UNAUTHORIZED,
    ERROR_CODE_CANNOT_CREATE_RESOURCE,
};
