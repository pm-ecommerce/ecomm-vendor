// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  baseUrl: 'https://localhost:8080/',

  accountUrl: 'http://localhost:8080/pm-accounts/api/',
  categoryUrl: 'http://localhost:8080/pm-products/api/',
  orderUrl: 'http://localhost:8080/pm-orders/api/',
  reportUrl: 'http://localhost:8080/pm-reports/api/',

  imageUrl: 'https://your-aws-bucket.s3.us-west-2.amazonaws.com/',
  awsPoolId: 'awsPoolId',
  awsRegion: 'awsRegion',
  awsEndpoint: 'https://your-aws-bucket.s3.us-west-2.amazonaws.com/',
  awsBucket: 'awsBucket',
  awsFolder: 'awsFolder',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
