clinicaApp

.controller("CajaingresoController", function($scope, API, $window, $mdDialog) {

    API.Cuentausuario.query(function(r) {
        $scope.cuentausuario_nombre_list = r;
    }, function(error) {
        console.log("Errorum  " + error);
    });

    API.Citainscripcion.query(function(r) {
        $scope.citainscripcion_nombre_list = r;
    }, function(error) {
        console.log("Errorum  " + error);
    });

    $scope.d_list = [];
    $scope.cajaingreso = {};

    list = function() {
        API.Cajaingreso.query(function(r) {
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
        $scope.cajaingreso.id=null;
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Cajaingreso/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.cajaingreso={};
        }, function(){
        });
    };

    $scope.get = function(d) {
        $scope.cajaingreso = API.Cajaingreso.get({id : d.id});
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Cajaingreso/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.cajaingreso={};
        }, function(){
        });
    };

    $scope.save = function() {
        if ($scope.cajaingreso.id) {
            API.Cajaingreso.update({ id: $scope.cajaingreso.id }, $scope.cajaingreso).$promise.then(function(r) {
                console.log(r);
                list();
                $mdDialog.hide();
            }, function(error) {
                console.log("Error  " + error);
            });
        } else {
            API.Cajaingreso.save($scope.cajaingreso).$promise.then(function(r) {
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
            API.Cajaingreso.delete({ "id": d.id }).$promise.then(function (r) {
                console.log(r);
                list();
            }, function (error) {
                console.log(error);
            });
        }
    };

});