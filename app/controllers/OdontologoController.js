clinicaApp

.controller("OdontologoController", function($scope, API, $window, $mdDialog) {
    
    $scope.d_list = [];
    $scope.odontologo = {};

    list = function() {
        API.Odontologo.query(function(r) {
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
        $scope.odontologo.id=null;
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Odontologo/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.odontologo={};
        }, function(){
        });
    };

    $scope.get = function(d) {
        $scope.odontologo = API.Odontologo.get({id : d.id});
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Odontologo/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.odontologo={};
        }, function(){
        });
    };

    $scope.save = function() {
        if ($scope.odontologo.id) {
            API.Odontologo.update({ id: $scope.odontologo.id }, $scope.odontologo).$promise.then(function(r) {
                console.log(r);
                list();
                $mdDialog.hide();
            }, function(error) {
                console.log("Error  " + error);
            });
        } else {
            API.Odontologo.save($scope.odontologo).$promise.then(function(r) {
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
            API.Odontologo.delete({ "id": d.id }).$promise.then(function (r) {
                console.log(r);
                list();
            }, function (error) {
                console.log(error);
            });
        }
    };

});