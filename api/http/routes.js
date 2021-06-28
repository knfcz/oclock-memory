const authenticate = require('./middlewares/authenticate');
const GameController = require('./controllers/game');
const ScoreController = require('./controllers/score');

const registerRoutes = app => {
    app.post('/game', GameController.createGame);
    app.get('/scores', ScoreController.list);
    // Cette route nécessite de vérifier un mot de passe,
    // plutôt que de placer la logique d'authentification dans l'action du controller,
    // on la place dans un "middleware", que l'on passe en deuxième argument à app.post()
    //
    // https://expressjs.com/en/guide/using-middleware.html
    //
    // Ce middleware sera exécutée par Express avant notre action, si l'authentification échoue
    // le client recevra un message d'erreur et notre action ne sera pas exécutée
    app.post(
        '/games/:gameId/cards/:cardId',
        authenticate,
        GameController.revealCard,
    );
};

module.exports = registerRoutes;
