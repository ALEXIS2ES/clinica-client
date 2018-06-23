'use strict';
clinicaApp.factory('authService', ['$http', '$q', 'localStorageService', 'config', function ($http, $q, localStorageService, config) {

    var serviceBase = config.baseUrl;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: "",
        userRetreived: false,
        firstName: '',
        lastName: '',
        email: '',
        roles: []
    };


    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };

    var _login = function (loginData) {

        var data = "grant_type=" + config.grant_type + "&client_id=" + 
        config.client_id + "&client_secret=" + config.client_secret + "&username=" + 
        loginData.userName + "&password=" + loginData.password;


        var deferred = $q.defer();

        $http.post(serviceBase + 'o/token/', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
            localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
            _authentication.userRetreived = false;
            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.userRetreived = false;
        _authentication.firstName = '';
        _authentication.lastName = '';
        _authentication.email = '';
        _authentication.roles.slice(0, _authentication.roles.length);

    };

    function getUserInfo() {
        return $http.get(serviceBase + 'accounts/clientes/1/');
    }

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            if (!_authentication.userRetreived) {
                return getUserInfo().then(function (result) {
                    _authentication.userRetreived = true;
                    var userData = result.data;
                    console.log("eee");
                    console.log(userData);
                    _authentication.email = userData.email;
                    _authentication.roles = [];//userData.roles;
                    _authentication.firstName = userData.firstName;
                    _authentication.lastName = userData.lastName;
                });
            }

        }
        return $q.when(true);
    };



    var _saveRegistrationxxx = function (registration) {


        return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };


    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
}]);