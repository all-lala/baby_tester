# Projet

## Fonctionnalités

- [x] Pouvoir créer une partie
- [x] Pouvoir supprimer une partie
- [x] Pouvoir terminer une partie
- [x] Dans la liste, différencier des autres les parties terminées
- [x] Avoir un compteur des parties non terminées
- [x] À chaque modification, création ou suppression, il doit y avoir propagation en temps réel sur les autres clients connectés
  > Utilisation de SSE

## Contraintes

- [x] Utilisation de NodeJS
- [x] PostgreSQL
  > Version > 12 utilisé
- [x] Pas d’ORM
  > Connection via [node-postres](https://node-postgres.com/) utilisé
- [ ] Mac, Linux ou Windows
- [x] Javascript côté client sans framework ni librairie (pas de jQuery, Vue, Angular, React)
  > Axios pour les requêtes HTTP
- [x] L’utilisation de librairies clientes est autorisée (mais non obligatoire) pour :
  - [ ] La gestion des dates
    > Non nécessaire
  - [ ] La gestion des Websockets
    > SSE utilisé sans librairie
- [x] Pas d’identification pour accéder à l’application
- [x] Aucun rechargement de page à l’utilisation, c'est du temps réel

# Bonus - chat

## Fonctionnalités visibles

- [ ] Gestion des utilisateurs (simple déclaration ou connecté?)
- [ ] Gestion d'une image d'utilisateur
- [ ] Recherche d'un utilisateur pour chatter
- [ ] Ecrire et transmettre un message
- [ ] Différencier les messages du l'utilisateur en cours "Moi"
- [ ] Propagation en temps réel sur les autres clients connectés
