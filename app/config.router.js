clinicaApp
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
})

.run(
    ['$rootScope', '$state', '$stateParams','authService','$location','$window',
      function ( $rootScope,   $state,   $stateParams, authService,$location, $window) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;     
        /*******************************agregado**************************/
        authService.fillAuthData(); 
        if(authService.authentication.isAuth==false){
            //$window.location="../skyend_accounts";
        }       
        /******************************************************************/
      }
    ]
  )

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,   $urlRouterProvider) {
  $stateProvider
    //------------------------------
    // HOME
    //------------------------------
    .state('app', {
      url: '/',
      templateUrl: 'app/views/Home.html'
    })
    //------------------------------
    // Inicio
    //------------------------------
    .state('Inicio', {
      url: '/Inicio',
      templateUrl: 'app/views/Inicio.html'
    })
/*
    //------------------------------
    // HOME
    //------------------------------
    .state('app', {
      url: '/',
      templateUrl: 'partials/home.tmpl.html'
    })
    //------------------------------
    // inicio page http://plnkr.co/edit/u18KQc?p=preview
    //------------------------------
    .state('getting-started', {
      url: '/getting-started',
      templateUrl: 'partials/getting-started.tmpl.html'
    })
*/

    $stateProvider
    //------------------------------
    // Cajaingreso
    //------------------------------
    .state('Cajaingreso', {
      url: '/Cajaingreso',
      templateUrl: 'app/views/Cajaingreso/index.html'
    })
    //------------------------------
    // Citahistorial
    //------------------------------
    .state('Citahistorial', {
      url: '/Citahistorial',
      templateUrl: 'app/views/Citahistorial/index.html'
    })
    //------------------------------
    // Citainscripcion
    //------------------------------
    .state('Citainscripcion', {
      url: '/Citainscripcion',
      templateUrl: 'app/views/Citainscripcion/index.html'
    })
    //------------------------------
    // Cliente
    //------------------------------
    .state('Cliente', {
      url: '/Cliente',
      templateUrl: 'app/views/Cliente/index.html'
    })
    //------------------------------
    // Cuentausuario
    //------------------------------
    .state('Cuentausuario', {
      url: '/Cuentausuario',
      templateUrl: 'app/views/Cuentausuario/index.html'
    })
    //------------------------------
    // Especialidad
    //------------------------------
    .state('Especialidad', {
      url: '/Especialidad',
      templateUrl: 'app/views/Especialidad/index.html'
    })
    //------------------------------
    // Odontologo
    //------------------------------
    .state('Odontologo', {
      url: '/Odontologo',
      templateUrl: 'app/views/Odontologo/index.html'
    });

    $urlRouterProvider.otherwise('/');

  }]);