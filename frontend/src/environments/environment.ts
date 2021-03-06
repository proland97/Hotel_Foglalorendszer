// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const baseUrl = 'http://localhost:3000';

export const environment = {
  production: false,
  baseUrl: baseUrl,
  registrateUrl: baseUrl + '/registration',
  loginUrl: baseUrl + '/login',
  logoutUrl: baseUrl + '/logout',
  hotelsUrl: baseUrl + '/hotel/hotels',
  createHotelUrl: baseUrl + '/hotel/add-hotel',
  modifyHotelUrl: baseUrl + '/hotel/edit-hotel',
  deleteHotelUrl: baseUrl + '/hotel/delete-hotel',
  getHotelUrl: baseUrl + '/hotel/hotel',
  rateUrl: baseUrl + '/ratings/rate',
  reservationUrl: baseUrl + '/reservations/reservation',
  myReservationsUrl: baseUrl + '/reservations/myreservation',
  uploadHotelImageUrl: baseUrl + '/hotel/uploadhotelimage',
  deleteHotelImagesUrl: baseUrl + '/hotel/deletehotelimages',
  uploadUrl: baseUrl + '/hotel/uploadroomimage',
  deleteRoomImagesUrl: baseUrl + '/hotel/deleteroomimages',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
