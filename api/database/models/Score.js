const connection = require('../db');
const Model = require('./Model');

class Score extends Model {
    constructor() {
        super(connection, 'scores');
    }

    /**
     * Renvoie les meilleurs scores
     */
    listHighests(limit = 10) {
        return this.connection(this.table)
            .orderBy('gameDuration', 'ASC')
            .limit(limit);
    }
}

module.exports = new Score();
