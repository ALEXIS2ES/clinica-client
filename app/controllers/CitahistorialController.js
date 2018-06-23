clinicaApp

.controller("CitahistorialController", function($scope, API, $window, $mdDialog) {

    API.Citainscripcion.query(function(r) {
        $scope.citainscripcion_nombre_list = r;
    }, function(error) {
        console.log("Errorum  " + error);
    });

    API.Especialidad.query(function(r) {
        $scope.especialidad_nombre_list = r;
    }, function(error) {
        console.log("Errorum  " + error);
    });

    $scope.d_list = [];
    $scope.citahistorial = {};

    list = function() {
        API.Citahistorial.query(function(r) {
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
        $scope.citahistorial.id=null;
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Citahistorial/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.citahistorial={};
        }, function(){
        });
    };

    $scope.get = function(d) {
        $scope.citahistorial = API.Citahistorial.get({id : d.id});
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Citahistorial/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.citahistorial={};
        }, function(){
        });
    };

    $scope.save = function() {
        if ($scope.citahistorial.id) {
            API.Citahistorial.update({ id: $scope.citahistorial.id }, $scope.citahistorial).$promise.then(function(r) {
                console.log(r);
                list();
                $mdDialog.hide();
            }, function(error) {
                console.log("Error  " + error);
            });
        } else {
            API.Citahistorial.save($scope.citahistorial).$promise.then(function(r) {
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
            API.Citahistorial.delete({ "id": d.id }).$promise.then(function (r) {
                console.log(r);
                list();
            }, function (error) {
                console.log(error);
            });
        }
    };

});