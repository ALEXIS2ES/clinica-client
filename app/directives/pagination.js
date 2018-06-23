clinicaApp

  .directive('miPagination', function (){
    return {
      restrict: 'EA',
      link: myLink,
      scope: {
        page: '=',
        pages: '=',
        next: '=',
        previous: '=',
        rango: '=',
        accion: '&',
        activado: '@'
      },
      template:
      '<ul>' +
      '<li ' +
      'data-ng-class="ecq.myclase" ' +
      'data-ng-click="ecq.action()"' +
      'data-ng-repeat="ecq in Pagination"> ' +
      '<span data-ng-bind="ecq.value"></span> ' +
      '</li>' +
      '</ul>'
    };

    function myLink(scope, el, attrs) {
      scope.$watchCollection('[page,pages,next,previous,rango,activado]', function () {
        Algoritmo(scope, attrs);
      });
    }

    function parametrosDefault(scope, attrs) {
      scope.Pagination = [];
      scope.puntos = scope.puntos || '...';
      scope.page = parseInt(scope.page);
      scope.pages = parseInt(scope.pages);
      scope.adjacent = parseInt(scope.adjacent) || 2;
      scope.activado = scope.activado || 'active';
    }

    function anteriorSiguente(scope, opcion) {
      var deshabilitar, var1, var2;
      if(opcion === 'anterior') {
        deshabilitar = scope.page - 1 <= 0;
        var1 = { value : "<<", page: 1 };
        var2 = { value: "<", page: scope.previous };
      } else {
        deshabilitar = scope.page + 1 > scope.pages;
        var1 = { value : ">",page: scope.next };
        var2 = { value: ">>",page: scope.pages};
      }

      var mybutton = function(myparam, deshabilitar){
        scope.Pagination.push({
          value: myparam.value,
          action: function(){
            if(!deshabilitar) {
              myAccion(scope, myparam.page);
            }
          }
        });
      };

      mybutton(var1, deshabilitar);
      mybutton(var2, deshabilitar);
    }


    function myAccion(scope, page) {
      if (scope.page == page){return ; }
      scope.page = page;
      scope.accion({ page: scope.page,pages: scope.pages} );
    }

    function rango(inicio, fin, scope) {
      var i = 0;
      for (i = inicio; i <= fin; i++) {
        var item = {
          value: i,
          myclase: scope.page == i ? scope.activado : '',
          action: function () {
            myAccion(scope, this.value);
          }
        };
        scope.Pagination.push(item);
      }
    }

    function agregarPuntos(scope) {
      scope.Pagination.push({value: scope.puntos});
    }

    function agregarRango(scope) {
      scope.Pagination.push({value: scope.rango});
    }

    function agregarPrimero(next,scope) {
      rango(1,2,scope);
      if(next != 3){
        agregarPuntos(scope);
      }
    }

    function agregarUltimo(prev,scope) {
      if(prev != scope.pages - 2){
        agregarPuntos(scope);
      }
      rango(scope.pages - 1,scope.pages, scope);
    }


    function Algoritmo(scope, attrs) {
      parametrosDefault(scope, attrs);
      var adj = (scope.adjacent * 2) + 2;
      var inicio, fin;

      agregarRango(scope);
      anteriorSiguente(scope,'anterior');
      if (scope.pages <= (adj + 2)) {
        inicio = 1;
        rango(inicio, scope.pages, scope);
      }else{

        if (scope.page - scope.adjacent <= 2) {
          inicio = 1;
          fin = 1 + adj;
          rango(inicio, fin, scope);
          agregarUltimo(fin,scope);
          
        
        } else if (scope.page < scope.pages - (scope.adjacent + 2)) {

          inicio = scope.page - scope.adjacent;
          fin = scope.page + scope.adjacent;

          agregarPrimero(inicio,scope);
          rango(inicio,fin,scope);
          agregarUltimo(fin,scope);
          

        
        }else{
          inicio = scope.pages - adj;
          fin = scope.pages;
          agregarPrimero(inicio,scope);
          rango(inicio, fin, scope); 
        }
      }
      anteriorSiguente(scope,'siguente');
    }
  });
