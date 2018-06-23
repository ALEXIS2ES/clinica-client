
var baseUrl = 'http://localhost:8000/';
var baseAdmisionUrl = 'http://localhost:8001/';


var client_id = 'YX73ry9Xck7OvBz15VELaBazyNYAdulgtOhADJJc';
var client_secret = 'tcLfskNxdkvO7ENxFGM3JGQ0dmc7vWwatHNe5Tl9fX4CDFRlsmN2vrcphlHSPMuZKydSVB8nupZuEWAUOJmpa4W3s0akd2faiVsnUe4VYbdgdH5MlbJdSQtmQczXO29H';
var grant_type= 'password';

var config = {
    appErrorPrefix: '[WebF1x Error] ', //Configure the exceptionHandler decorator
    docTitle: 'WebF1 xTest: ',
    httpCacheName: 'httpCache',
    baseUrl: baseUrl,
    baseAdmisionUrl: baseAdmisionUrl,

    client_id: client_id,
    client_secret: client_secret,
    grant_type: grant_type,

};

angular.module('clinicaApp')

.value('config', config);


angular.module('clinicaApp').config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    allowHtml: false,
    autoDismiss: false,
    closeButton: false,
    closeHtml: '<button>&times;</button>',
    containerId: 'toast-container',
    extendedTimeOut: 1000,
    iconClasses: {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    },
    maxOpened: 0,    
    messageClass: 'toast-message',
    newestOnTop: true,
    onHidden: null,
    onShown: null,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    preventOpenDuplicates: false,
    progressBar: true,
    tapToDismiss: true,
    target: 'body',
    templates: {
      toast: 'directives/toast/toast.html',
      progressbar: 'directives/progressbar/progressbar.html'
    },
    timeOut: 0,
    titleClass: 'toast-title',
    toastClass: 'toast'
  });
});
//extendedTimeOut: 1000,
//timeOut: 5000,


angular.module('clinicaApp').config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    // $httpProvider.defaults.headers.post['Content-Type'] = undefined;
    // $httpProvider.defaults.headers.put['Content-Type'] = undefined;
}])

.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);