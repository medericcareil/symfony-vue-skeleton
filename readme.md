# Symfony and Vue Skeleton

<a href="https://github.com/medericcareil"><img src="https://assets.dryicons.com/uploads/icon/svg/8308/d2fb96a4-96bf-4a9c-b182-e95f925c54ff.svg" alt="Logo Github" width="55" height="auto"></a>

Ce squelette de projet est réalisé avec la LTS 5.4 de Symfony et la version 3 TypeScript de Vue

## Pré-requis

- Composer version 2.x
- Symfony CLI
- yarn ou npm
- Git version 2.x
- PHP version 8.x
- OpenSSH

## Installation

### Dans un terminal, à la racine du projet taper les commandes suivante :

```shell
composer install
```
---

```shell
yarn install
```
ou

```shell
npm install
```

Une fois toutes les dépendances installées vous devez créer, à la racine du projet, un fichier `.env` (vous pouvez également créer un fichier `.env.local` pour séparer l'environnement de dev et prod).

Une fois effectuée, copier le contenu du fichier [.env.exemple](.env.exemple) et coller le, dans vos fichiers. Configurer l'accès à votre BDD et autres variables d'environnement.

### Création, Migrations et Remplissage de la BDD

Création :
```shell
symfony console d:d:c
```

Migrations :
```shell
symfony console d:m:m
```

Il existe une fixture pour la création d'utilisateur dans le fichier : [src/DataFixtures/UserFixtures.php](src/DataFixtures/UserFixtures.php)

```shell
symfony console d:f:l --no-interaction
```

### Génération des clées SSL

```shell
php bin/console lexik:jwt:generate-keypair
``` 

## Démarrage des serveurs de développement

Back :
```shell
symfony serve
``` 

---

Front :
```shell
yarn watch
``` 

ou

```shell
npm run dev
``` 

## Fonctionnalités

Liste des fonctionnalités ci-dessous :

- Un service d'envoi de mail [src/Service/Utils/Mailer/MailerService.php](src/Service/Utils/Mailer/MailerService.php)

- Un service de génération de PDF [src/Service/Utils/PDF/PdfGenerator.php](src/Service/Utils/PDF/PdfGenerator.php).  
Pour la création d'un template de PDF, vous référer au fichier d'exemple suivant : [src/Service/Utils/PDF/Templates/HtmlExempleToPdf.php](src/Service/Utils/PDF/Templates/HtmlExempleToPdf.php)

- Un service d'upload de fichier [src/Service/Utils/Upload/UploadService.php](src/Service/Utils/Upload/UploadService.php)

- Le projet implémente un système de `middleware` côté front pour la protection des routes : [assets/core/middleware/middleware-type.ts](assets/core/middleware/middleware-type.ts).  
La déclaration des middlewares ou `guards` ce fait dans le dossier suivant : [assets/core/middleware/guards](assets/core/middleware/guards).  
Pour les utiliser rien de plus simple, tout ce fait dans la déclaration des routes : [assets/routes.ts](assets/routes.ts)

- Un service pour les requêtes : [assets/core/services/requests/request-service.ts](assets/core/services/requests/request-service.ts).  
Avec des intercepteurs pour les `request` et `response` :  
[assets/core/services/requests/interceptor/request-interceptor.ts](assets/core/services/requests/interceptor/request-interceptor.ts)  
[assets/core/services/requests/interceptor/reponse-interceptor.ts](assets/core/services/requests/interceptor/reponse-interceptor.ts)

- Un `store` avec `Vuex` : [assets/core/store/store.ts](assets/core/store/store.ts)

Utiles :

- Abstract class `Enum` : [src/Kernel/Enum.php](src/Kernel/Enum.php).  
Avec un exemple de déclaration d'enum : [src/Enum/RolesEnum.php](src/Enum/RolesEnum.php)

- L'ajout des variables d'environnement pour le front se fait dans le fichier [webpack.config.js](webpack.config.js).

- La méthode d'ajout des `meta` déclarer dans le fichier [routes.ts](assets/routes.ts) se fait ici : [assets/core/router/config/add-meta.ts](assets/core/router/config/add-meta.ts)  
Cette fonction est appelée dans le [router](assets/core/router/router.ts) de Vue. C'est également là que les middlewares sont exécutés.

## Auteur
* _**Médéric CAREIL**_
