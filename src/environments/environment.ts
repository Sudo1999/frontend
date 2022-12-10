// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,    // C'est la première ligne de environment, à laquelle on ajoute ensuite des compléments
  apiBaseUrl: 'http://localhost:8080/api'   // 8080 est le port d'origine du projet Spring Boot
  //apiBaseUrl: 'http://localhost:3000'   // localhost:3000 est l'url du serveur json (npm run json)
  /* A ce stade l'url http://localhost:4200/ ne fonctionne que si une des deux lignes du dessus est accessible.
  Si l'une des deux lignes ('http://localhost:8080/api' ou 'http://localhost:3000') est accessible on obtient le tableau vide.
  */
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
