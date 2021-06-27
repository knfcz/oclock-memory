const authenticate = require('./middlewares/authenticate');
const GameController = require('./controllers/game');
const CardController = require('./controllers/card');
const ScoreController = require('./controllers/score');

const registerRoutes = app => {
    app.post('/game', GameController.start);
    app.get('/scores', ScoreController.list)
    // Ces deux routes nécessitent de vérifier un mot de passe,
    // plutôt que de copier la logique d'authentification dans les deux actions
    // on la place dans un "middleware", que l'on passe en deuxième argument à app.post()
    //
    // https://expressjs.com/en/guide/using-middleware.html
    //
    // Ce middleware sera exécutée par Express avant nos actions, si l'authentification échoue,
    // il répondra au client et nos actions ne seront pas exécutées,
    app.post('/games/:gameId/cards/:cardId', authenticate, CardController.find);
    app.post('/games/:gameId/end', authenticate, GameController.end);
};

module.exports = registerRoutes;
