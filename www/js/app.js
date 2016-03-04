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


.controller('weatherCtrl', function($http, $ionicLoading){
  var weather = this;
  var apikey = '013ff5bfe2a4cdb4';
  var url = 'http://api.wunderground.com/api/013ff5bfe2a4cdb4/conditions/forecast/geolookup/q/autoip.json';
  weather.searchQuery;

  weather.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  weather.hide = function(){
        $ionicLoading.hide();
  };

  weather.show($ionicLoading);

  navigator.geolocation.getCurrentPosition(function (geopos){
    var lat = geopos.coords.latitude;
    var long = geopos.coords.longitude;
    $http.get('http://api.wunderground.com/api/013ff5bfe2a4cdb4/conditions/forecast/geolookup/q/' + lat + ',' + long + '.json').then(parseWUdata);
    // var url = '/api/forecast/' + apikey + '/' + lat + ',' + long;
    // $http.get(url + lat + ',' + long + '.json').then (function(parseWUData){
    //   var
    // })
  });

  function parseWUData(res){
    weather.hide($ionicLoading);
    console.log("res", res);
    weather.temp = res.data.current_observation.temp_f;
    weather.summary = res.data.current_observation.icon;
    weather.iconURL = res.data.current_observation.icon_url;
    weather.fiveDay = res.data.forecast.simpleforecast.forecastday;
    weather.city = res.data.location.city;

    return res;
  }

  $http.get(url).then(parseWUData);

  weather.temp = "--";
  var retrievedData = JSON.parse(localStorage.getItem('searchHistory')) || {};
  weather.searches = retrievedData;

  weather.search = function (){
    $http.get('http://api.wunderground.com/api/013ff5bfe2a4cdb4/conditions/forecast/geolookup/q/' + weather.searchQuery + '.json')
    .then(parseWUData)
    .then(function(res){

      var history = JSON.parse(localStorage.getItem('searchHistory')) || {};
        var keyname = res.data.current_observation.display_location.city + ', ' + res.data.current_observation.display_location.state;
        history[keyname] = res.data.current_observation.station_id;
        localStorage.setItem('searchHistory', JSON.stringify(history));
        weather.searches = history;

    });
  };

  weather.clickSearch = function(station_id) {
    console.log(station_id);
    $http.get('http://api.wunderground.com/api/fdcf53c91a30803b/conditions/forecast/geolookup/q/pws:' + station_id +'.json').then(parseWUData);
  }


});

// .config(function ($stateProvider, $urlRouterProvider){

//   $stateProvider.state('root', {
//     url: '/',
//     template: '<h1>Hello World</h1>'
//   });

//   $urlRouterProvider.otherwise('/');
// })
