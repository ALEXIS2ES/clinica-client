clinicaApp

.controller("ClienteController", function($scope, API, $window, $mdDialog) {
    
    $scope.d_list = [];
    $scope.cliente = {};

    $scope.exportData1 = function () {
        var blob = new Blob([document.getElementById('table').innerHTML],{
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.doc");
    };

    $scope.printIt = function(){
       var table = document.getElementById('table').innerHTML;
       var myWindow = $window.open('', '', 'width=800, height=600');
       myWindow.document.write(table);
       myWindow.print();
    };

    $scope.exportData = function () {
        var blob = new Blob([document.getElementById('table').innerHTML],{
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
    };
    
    list = function() {
        API.Cliente.query(function(r) {
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
        $scope.cliente.id=null;
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Cliente/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.cliente={};
        }, function(){
        });
    };

    $scope.get = function(d) {
        $scope.cliente = API.Cliente.get({id : d.id});
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Cliente/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.cliente={};
        }, function(){
        });
    };

    $scope.save = function() {
        if ($scope.cliente.id) {
            API.Cliente.update({ id: $scope.cliente.id }, $scope.cliente).$promise.then(function(r) {
                console.log(r);
                list();
                $mdDialog.hide();
            }, function(error) {
                console.log("Error  " + error);
            });
        } else {
            API.Cliente.save($scope.cliente).$promise.then(function(r) {
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
            API.Cliente.delete({ "id": d.id }).$promise.then(function (r) {
                console.log(r);
                list();
            }, function (error) {
                console.log(error);
            });
        }
    };

});
