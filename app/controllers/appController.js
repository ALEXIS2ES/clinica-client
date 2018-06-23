'use strict';
clinicaApp

.controller('appController', [
  '$scope',
  '$mdSidenav',
  '$timeout',
  '$mdDialog',
  'menuService',
  '$location',
  '$rootScope',
  '$window',
  '$log',
  '$mdBottomSheet',
  'authService',
function($scope, $mdSidenav, $timeout, $mdDialog, menuService, $location, $rootScope, $window, $log, $mdBottomSheet, authService) {

  $scope.authentication = authService.authentication;

  var self = this;
  $scope.menu = menuService;
  $scope.path = path;
  $scope.goHome = goHome;
  $scope.openMenuL = openMenuL;
  $scope.closeMenuL = closeMenuL;
  $scope.openMenuR = openMenuR;
  $scope.closeMenuR = closeMenuR;
  $scope.isSectionSelected = isSectionSelected;
  // Methods used by menuLink and menuToggle directives
  this.isOpen = isOpen;
  this.isSelected = isSelected;
  this.toggleOpen = toggleOpen;
  //this.autoFocusContent = false;

  $rootScope.$on("$locationChangeSuccess", function(event, next, current){
   $mdSidenav("left").then(function(instance){ instance.close();});  });

  // show menu
        $scope.toggleLeftz = buildToggler('left');
        $scope.toggleLeft = buildDelayedToggler('left');
        $scope.toggleRight = buildToggler('right');
        //para switch
        $scope.openLeftMenu = function() {
          $mdSidenav('left').toggle();
        }
        $scope.isLeftOpen = function() {
        return $mdSidenav('left').isOpen();
        }
        $scope.isRightOpen = function() {
        return $mdSidenav('right').isOpen();
        }

        $rootScope.$on('$stateChangeSuccess', function() {
            $timeout(function() {
                if (document.getElementById('left')) {
                    $mdSidenav('left').close();
                }

            });
        });

        function closeMenuL() {
        $timeout(function() { $mdSidenav('left').close(); });
        }
        function openMenuL() {
          $timeout(function() { $mdSidenav('left').open(); });
        }
        function closeMenuR() {
          $timeout(function() { $mdSidenav('right').close(); });
        }
        function openMenuR() {
          $timeout(function() { $mdSidenav('right').open(); });
        }

        //Supplies a function that will continue to operate until the time is up.
        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }

        function buildDelayedToggler(navID) {
            return debounce(function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function() {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }

        function buildToggler(navID) {
            return function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function() {
                        $log.debug("toggle " + navID + " is done");
                    });
            };
        }

        function getCookie(cname) {
          var name = cname + "=";
          var ca = document.cookie.split(";");
          for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
              c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
              return c.substring(name.length, c.length);
            }
          }
          return "";
        }
        $scope.setTheme = function(theme) {
          document.cookie = "theme=" + theme;
          $scope.dynamicTheme = theme;
          console.log("cookie dynamicTheme=" + getCookie("theme"));
        };
        $scope.dynamicTheme = getCookie("theme");
        $scope.app = {
          name: "Catálogo App",
          version: "1.0.1"
        };

  
  function path() {
    return $location.path();
  }
  function goHome($event) {
    menuService.selectPage(null, null);
    $location.path( '/' );
  }
  function openPage() {
    $scope.closeMenu();
  }
  function isSelected(page) {
    return menuService.isPageSelected(page);
  }
  function isSectionSelected(section) {
    var selected = false;
    var openedSection = menuService.openedSection;
    if(openedSection === section){
      selected = true;
    }
    else if(section.children) {
      section.children.forEach(function(childSection) {
        if(childSection === openedSection){
          selected = true;
        }
      });
    }
    return selected;
  }
  function isOpen(section) {
    return menuService.isSectionSelected(section);
  }
  function toggleOpen(section) {
    menuService.toggleSelectSection(section);
  }
  $scope.alert = '';
  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex class="inset"> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };
  $scope.showAdd = function(ev) {
    $mdDialog.show({
      //controller: DialogController,
      controller: 'ClienteController',
      templateUrl: 'app/views/Cliente/form.html',
      //template: '<md-dialog aria-label="Form"><form name=''><md-dialog-content><md-content layout-padding><h3>registro {{cliente.id}}</h3><div><md-input-container flex><label>Nombre :</label><input ng-model="cliente.nombre_cliente" required></md-input-container><md-input-container flex><label>Apellidos :</label><input ng-model="cliente.apellidos_cliente" required></md-input-container><md-input-container flex><label>direccion :</label><input ng-model="cliente.direccion_cliente" required></md-input-container><md-input-container flex><label>telefono :</label><input ng-model="cliente.telefono_cliente" required></md-input-container><md-input-container flex><label>tipodoc :</label><input ng-model="cliente.tipodoc_cliente" required></md-input-container><md-input-container flex><label>numdoc :</label><input ng-model="cliente.numdoc_cliente" required></md-input-container><md-input-container flex><label>genero :</label><input ng-model="cliente.genero_cliente" required></md-input-container><md-input-container flex><label>email :</label><input ng-model="cliente.email_cliente" required></md-input-container><md-input-container flex><label>fecha :</label><input ng-model="cliente.fechasuscripcion_cliente" required></md-input-container></div></md-content></md-dialog-content><div class="md-actions" layout="row"><span flex></span><md-button type="reset" ng-click="cancel()">cancelar</md-button><md-button type="submit"  ng-click="save()" ng-disabled="!myform.$valid">guardar</md-button></div></form></md-dialog>',
      //template: '<md-dialog aria-label="Mango (Fruit)"><md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
      targetEvent: ev,
    })
    .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };

}]);


clinicaApp

.controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
            .then(function() {
                $log.debug("close LEFT is done");
            });

    };
})

.controller("RightCtrl", function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
        $mdSidenav("right").close().then(function() {
            $log.debug("close RIGHT is done");
        });
    };
})


.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Share', icon: 'share' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
  ];
  
  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
});

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
};