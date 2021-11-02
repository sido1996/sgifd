// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  expirationTime: 5000000000,
  //backend: 'http://10.4.8.230:5000/api'
  //backend: 'http://10.48.2.29:28080/mpd'
  //backend: 'https://mpd-sgifd-backend.herokuapp.com'
  //backend: 'http://localhost:8080'
 
  backend: 'http://localhost:8080'
  //backend: 'https://backend-sgifd.gouv.bj',
  //backend: 'https://backend-sgifd.gouv.bj'


  //backend: 'https://backend-sgifd.gouv.bj:8443'
//  backend: 'http://10.250.2.180:8080'
//backend: 'http://10.4.200.214:8443'
//backend: 'http://localhost:8443'

};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
