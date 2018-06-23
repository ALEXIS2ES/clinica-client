clinicaApp

.controller("EspecialidadController", function($scope, API, $window, $mdDialog) {
    
    $scope.d_list = [];
    $scope.especialidad = {};

    list = function() {
        API.Especialidad.query(function(r) {
            $scope.d_list = r;
        }, function(error) {
            console.log("Error  " + error);
        });

    };
    list();

    $scope.cancel = function() {
        //$mdDialog.hide();
        $mdDialog.cancel();
    };

    $scope.new = function() {
        $scope.especialidad.id=null;
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Especialidad/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.especialidad={};
        }, function(){
        });
    };

    $scope.get = function(d) {
        $scope.especialidad = API.Especialidad.get({id : d.id});
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Especialidad/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.especialidad={};
        }, function(){
        });
    };

    $scope.save = function() {
        if ($scope.especialidad.id) {
            API.Especialidad.update({ id: $scope.especialidad.id }, $scope.especialidad).$promise.then(function(r) {
                console.log(r);
                list();
                $mdDialog.hide();
            }, function(error) {
                console.log("Error  " + error);
            });
        } else {
            API.Especialidad.save($scope.especialidad).$promise.then(function(r) {
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
            API.Especialidad.delete({ "id": d.id }).$promise.then(function (r) {
                console.log(r);
                list();
            }, function (error) {
                console.log(error);
            });
        }
    };

});