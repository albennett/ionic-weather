// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'angular-skycons'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('weatherCtrl', function($http){
  var weather = this;
  navigator.geolocation.getCurrentPosition(function (geopos){ 
    var lat = geopos.coords.latitude;
    var long = geopos.coords.longitude;
    var apikey = '88eb88be23406cc2c563c798d72aa649';
    var url = '/api/forecast/' + apikey + '/' + lat + ',' + long;
    var self = this;

    $http.get(url).then(function (res){
      console.log("res", res);
      weather.temp = parseInt(res.data.currently.temperature);
      weather.summary = res.data.currently.summary;
      weather.icon = res.data.currently.icon;
    })
  });

  weather.temp = "--";
});

// .config(function ($stateProvider, $urlRouterProvider){

//   $stateProvider.state('root', {
//     url: '/',
//     template: '<h1>Hello World</h1>'
//   });

//   $urlRouterProvider.otherwise('/');
// })
