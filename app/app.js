var clinicaApp = angular.module('clinicaApp', [
  'angularytics',
  'ui.router',
  'ngMessages',
  'ngMaterial',
  'ngMdIcons',
  'ngResource',
  'oc.lazyLoad',
  'LocalStorageModule',
  'toastr',
  ]);


clinicaApp
//------------------------------
// Temas
//------------------------------
.config(function($mdThemingProvider) {
  //disable theme generation
  //$mdThemingProvider.generateThemesOnDemand(true);
  //$mdTheming.generateTheme('indigo');
  $mdThemingProvider.theme("docs-blue").primaryPalette("blue");
  $mdThemingProvider.theme("docs-red").primaryPalette("red");
  $mdThemingProvider.theme("docs-purple").primaryPalette("purple");

  $mdThemingProvider.theme("docs-indigo")
  .primaryPalette("indigo")
  .accentPalette('pink');
  //.backgroundPalette('lime')
  //.warnPalette('orange')
  //.dark();
  $mdThemingProvider.setDefaultTheme("docs-indigo");
  //disable theme generation
  //$mdThemingProvider.generateThemesOnDemand(true);
  //$mdTheming.generateTheme('docs-indigo');
  //$mdThemingProvider.disableTheming();
  //$mdThemingProvider.registerStyles(STYLESHEET);
  //$mdThemingProvider.storeTheme(true);
  //$mdThemingProvider.setStyles();
  //$mdThemingProvider.getStoredTheme()
  /*
  $mdThemingProvider.enableBrowserColor({
    theme: 'myTheme', // Default is 'default'
    palette: 'accent', // Default is 'primary', any basic material palette and extended palettes are available
    hue: '200' // Default is '800'
  });
  */
})
;

clinicaApp
.config(function($mdThemingProvider) {
  // Enable theme watching.
  $mdThemingProvider.alwaysWatchTheme(true);
});

clinicaApp
//------------------------------
// Google Analytics 
//------------------------------
.config(['AngularyticsProvider', function(AngularyticsProvider) {
 AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
}])
.run([
 'Angularytics',
 '$rootScope',
 '$timeout',
 function(Angularytics, $rootScope,$timeout) {
  Angularytics.init();
}]);


/*
red
pink
purple
deep-purple
indigo
blue
light-blue
cyan
teal
green
light-green
lime
yellow
amber
orange
deep-orange
brown
grey
blue-grey
*/