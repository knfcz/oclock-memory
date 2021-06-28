# API Node

## Configuration

Copiez le fichier _config.example.js_ et renommez le _config.js_, puis, si besoin, mettez à jour la config (port, nombre
de paires à générer, etc)

## Base de donnée

Créez la base de donnée du projet (par defaut "memory")

> mysql -u {VOTRE_UTILISATEUR_SQL} -p

> CREATE DATABASE memory;
> USE memory;

Puis, collez le contenu du fichier _database.sql_ et pressez entrée

## Lancement

Installez d'abord les dépendances

> npm i

Puis lancez le serveur

> node server.js

Le serveur écoutera alors sur le port spécifié dans le fichier de config

## Architecture

### http/

Ce dossier contient les controleurs et middlewares, qui seront chargé de traiter les requètes et répondre au client,
ainsi que les routes de notre api

### database/

Ce dossier contient la logique de connection à notre base de donnée ainsi que nos models

### services/

Ce dossier contient des classes encapsulant les différentes partie de notre logique métier

### utils/

Ce dossier contient des fonctions utilitaires
