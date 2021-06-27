const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { SERVER_PORT } = require('./config');
const registerRoutes = require('./http/routes');

const app = express();

// Permet de parser les données envoyées en JSON par le client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

// On démarre notre serveur Express, avant d'enregistrer nos actions
app.listen(SERVER_PORT, () => {
    registerRoutes(app);
});
