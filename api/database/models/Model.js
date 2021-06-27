class Model {
    constructor(connection, table) {
        this.connection = connection;
        this.table = table;
    }

    /**
     * Insère une entrée dans la table du Model enfant
     */
    create(data) {
        return this.connection(this.table).insert(data);
    }
}

module.exports = Model;
