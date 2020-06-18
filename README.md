Chaque composant représente un jeu de données géré par le backend, exemple : les utilisateurs, les listes d'attentes, les cours du navets, sont tous trois des types de composants valables.

## Un composant contient
### Interfaces
- l'interface de base (avec les champs qui constitue la donné qu'il gère, comme le nom d'utilisateur, la date à laquelle il s'est enregistré, son rôle sur le site, etc.) ;
- l'interface dite "Document" qui représente une entité en base de donnée de notre objet (elle ajoute notamment un id) ;
- l'interface dite "Db" qui sera utile pour pré-programmer des tâches récurrentes à effectuer sur la base de données ou pour faciliter des requêtes.

### Base de donnée
- Un schéma mongoose, qui permet d'indiquer quels champs de l'objet se retrouvent en base de donnée, il ressemble de très près à l'interface de base ;
- Un model mongoose, qui indique juste que le schéma déclaré sera en usage sur telle collection de la base de données ;
- Une classe avec le code des méthodes à accrocher au schema. Les methodes seront utilisables automatiquement sur les documents et les statiques seront utilisables sur le modèle (aussi appelé "db" dans le composant)

### Routes
Composition routeur express. (description des routes avec une leur chemin, leur méthode HTTP et la fonction qui gère la réponse.)

**Problème avec les routes :** gestion des permissions. Comment s'assurer que la personne connectée à le droit de faire cette action ? Ou de voir tous les champs ?