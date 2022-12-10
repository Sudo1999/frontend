// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,    // C'est la première ligne de environment.ts, à laquelle on ajoute ensuite une autre ligne :
  apiBaseUrl: 'http://localhost:8080/api'   // 8080 est le port d'origine du projet Spring Boot
  //apiBaseUrl: 'http://localhost:3000'   // localhost:3000 est l'url du serveur json (npm run json)

  /* Le projet une fois connecté au serveur ou à la base, l'url http://localhost:4200/ ne fonctionne que si
      l'apiBaseUrl peut indiquer au navigateur comment interpréter l'adresse. Dans un cas l'url conduit à
      'http://localhost:8080/api', et dans l'autre à 'http://localhost:3000'.
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
