clinicaApp

.controller("CitainscripcionController", function($scope, API, $window, $mdDialog) {

    API.Cliente.query(function(r) {
        $scope.cliente_nombre_list = r;
    }, function(error) {
        console.log("Errorum  " + error);
    });

    API.Odontologo.query(function(r) {
        $scope.odontologo_nombre_list = r;
    }, function(error) {
        console.log("Errorum  " + error);
    });

    $scope.d_list = [];
    $scope.citainscripcion = {};

    list = function() {
        API.Citainscripcion.query(function(r) {
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
        $scope.citainscripcion.id=null;
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Citainscripcion/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.citainscripcion={};
        }, function(){
        });
    };

    $scope.get = function(d) {
        $scope.citainscripcion = API.Citainscripcion.get({id : d.id});
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Citainscripcion/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.citainscripcion={};
        }, function(){
        });
    };

    $scope.save = function() {
        if ($scope.citainscripcion.id) {
            API.Citainscripcion.update({ id: $scope.citainscripcion.id }, $scope.citainscripcion).$promise.then(function(r) {
                console.log(r);
                list();
                $mdDialog.hide();
            }, function(error) {
                console.log("Error  " + error);
            });
        } else {
            API.Citainscripcion.save($scope.citainscripcion).$promise.then(function(r) {
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
            API.Citainscripcion.delete({ "id": d.id }).$promise.then(function (r) {
                console.log(r);
                list();
            }, function (error) {
                console.log(error);
            });
        }
    };

});