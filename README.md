# Cours ESGI Angular : Pokedex

Application Pokedex développé dans le cadre du cours d'Angular de ESGI dispensé par M. BENDAHMANE.

## Installation

Pour installer le projet, il suffit de cloner le projet et d'installer les dépendances avec la commande suivante :

```bash
  npm install
```

## Lancement

Pour lancer le projet, il suffit de lancer la commande suivante :

```bash
  npm start // ou ng serve
```

## Fonctionnalités

### Pokedex

* Affichage de la liste des pokemons avec un système de card.
  * Redirection vers la page de détail du pokemon au clic sur la card.
* Système de recherche par nom de pokemon.
  * Redirection vers la page de détail du pokemon au clic sur la card.


*** Routes : /pokedex ***

### Détail d'un pokemon

* Affichage du détail d'un pokemon avec ses caractéristiques.
* Affichage de la liste des évolutions du pokemon.
  * Redirection vers la page de détail du pokemon au clic sur la card.
* Possibilité d'ajouter le pokemon à la équipe du dresseur.

*** Routes : /pokedex/:id ***

### Carte du dresseur
* Formulaire de création d'un dresseur.
* Affichage de la liste des pokemons de l'équipe du dresseur.
  * Redirection vers la page de détail du pokemon au clic sur la card.
* Possibilité de reset le dresseur et son équipe

### Choix de pokemons

* Petite animation nostalgique de choix de pokemon des anciennes versions GBA avec une choix entre trois pokemons aléatoires.
  * Redirection vers la page de la carte du dresseur une fois le pokemon choisi.

## Autres :
- `Cours.md` : Notes prises lors des cours Angular de M. BENDAHMANE.
- `Consignes.md` : Consignes du projet avec les différents critères de notation.
- `Key-logger` : Projet de key-logger réalisé en cours dans un component à part.

## Authors

- [@Bertrand2808](https://www.github.com/Bertrand2808)
