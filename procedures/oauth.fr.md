# Implémenter un client Oauth

Cette procédure décrit comment permettre le connexion oauth avec discord depuis un client frontend.

## 0. Prérequis

- Avoir démarré le backend en ayant chargé les variables d'environement (fichier `conf.env` + commande `export $(cat conf.env | xargs)`.)
- Utiliser le port 3000 pour le frontend et une route `/login` (soit `localhost:3000/login`) ou avoir demandé la création d'une nouvelle redirection à la connexion, pour mettre une autre addresse.

## 1. Création de la page de login

Sur votre page de login, il doit y avoir un lien vers l'authentification discord.

Pour les tests, l'url suivant a été utilisé :
```html
<a href="https://discord.com/api/oauth2/authorize?client_id=676485112564678657&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=identify%20guilds">
  Log in with discord
</a>
```

## 2. Échange du code contre une paire de jetons

Voici un exemple de code qui procède à l'échange.

```tsx
  // Parsing de ce qu'il y a dans l'URL
  this.query = querystring.parse(this.props.location.search);
  // Est-ce qu'il y a un code tel que donné par discord ?
  if (this.query.code) {
    try {
      // requête d'échange des jetons avec le backend
      let res = await fetch(
        `http://localhost:9000/discord/access_token?code=${this.query.code}`
      );
      let body = await res.json();
      // on peut afficher le token pour vérifier
      // mais il faudrai le mettre dans le cache, pour ne pas le perdre d'une page à l'autre
      // il y a aussi un "refesh_token" de reçu dans la réponse, qu'il faut garder.
      if (body?.access_token)
        this.setState({ access_token: body.access_token });
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        this.setState({ access_token: "not found" });
      }, 3000);
    }
  }
```

## 3. Utiliser le jeton pour authentifier des requêtes

Pour que le jeton soit utilisé lors des requêtes, il faut ajouter un header `Authorization`, à toutes les requêtes, contenant `Bearer` suivi d'un espace et du `access_token`.

Testez votre implémentation en faisant un requête sur `http://localhost:9000/users/self`.

## 4. Rafraichir le jeton en cas d'expiration

Quand l'access_token expire, il faut utiliser la même route que sur l'étape précédente, mais plutot que d'envoyer `code`, il faut envoyer `refresh_token` avec le jeton de rafraichissement sauvegardé précédement.

Une nouvelle paire `access_token`, `refresh_token` sere alors délivrée.

> Vous saurez qu'un jeton n'est plus valide quand vous receverez des erreurs 401 sur des requêtes vraissemblablement correctes.

> Si vous recevez une 403, en revanche, il s'agit d'une resource à laquelle vous navez explicitement pas le droit d'accèder.
