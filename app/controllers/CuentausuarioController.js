clinicaApp

.controller("CuentausuarioController", function($scope, API, $window, $mdDialog) {

    API.Cliente.query(function(r) {
        $scope.cliente_nombre_list = r;
    }, function(error) {
        console.log("Errorum  " + error);
    });

    $scope.d_list = [];
    $scope.cuentausuario = {};

    list = function() {
        API.Cuentausuario.query(function(r) {
            $scope.d_list = r;
        }, function(error) {
            console.log("Error  " + error);
        });
    };
    list();

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.new = function() {
        $scope.cuentausuario.id=null;
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Cuentausuario/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.cuentausuario={};
        }, function(){
        });
    };

    $scope.get = function(d) {
        $scope.cuentausuario = API.Cuentausuario.get({id : d.id});
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Cuentausuario/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.cuentausuario={};
        }, function(){
        });
    };

    $scope.save = function() {
        if ($scope.cuentausuario.id) {
            API.Cuentausuario.update({ id: $scope.cuentausuario.id }, $scope.cuentausuario).$promise.then(function(r) {
                console.log(r);
                list();
                $mdDialog.hide();
            }, function(error) {
                console.log("Error  " + error);
            });
        } else {
            API.Cuentausuario.save($scope.cuentausuario).$promise.then(function(r) {
                console.log(r);
                list();
                $mdDialog.hide();
            }, function(error) {
                console.log("Error  " + error);
            });
        }
    };
    
    $scope.delete = function(d){
        if ($window.confirm('Confirm delete')) {
            API.Cuentausuario.delete({ "id": d.id }).$promise.then(function (r) {
                console.log(r);
                list();
            }, function (error) {
                console.log(error);
            });
        }
    };

});
