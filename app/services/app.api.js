clinicaApp
.factory("API", function($resource) {
    return {
        Cajaingreso:  $resource('http://localhost:8000/accounts/cajaingresos'+'/:id/', {'id': "@id"},
        {
            'update': { method:'PUT' },
            'get': { method:'GET' },
            'query':  {method:'GET', isArray:true},
            'save':   {method:'POST'},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'}
        }),
        Citahistorial:  $resource('http://localhost:8000/accounts/citahistorials'+'/:id/', {'id': "@id"},
        {
            'update': { method:'PUT' },
            'get': { method:'GET' },
            'query':  {method:'GET', isArray:true},
            'save':   {method:'POST'},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'}
        }),
        Citainscripcion:  $resource('http://localhost:8000/accounts/citainscripcions'+'/:id/', {'id': "@id"},
        {
            'update': { method:'PUT' },
            'get': { method:'GET' },
            'query':  {method:'GET', isArray:true},
            'save':   {method:'POST'},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'}
        }),
        Cliente:  $resource('http://localhost:8000/accounts/clientes'+'/:id/', {'id': "@id"},
        {
            'update': { method:'PUT' },
            'get': { method:'GET' },
            'query':  {method:'GET', isArray:true},
            //'get': { method:'GET', cache: true },
            //'create': { method:'POST' },
            'save':   {method:'POST'},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'}
        }),
        Cuentausuario:  $resource('http://localhost:8000/accounts/cuentausuarios'+'/:id/', {'id': "@id"},
        {
            'update': { method:'PUT' },
            'get': { method:'GET' },
            'query':  {method:'GET', isArray:true},
            'save':   {method:'POST'},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'}
        }),
        Especialidad:  $resource('http://localhost:8000/accounts/especialidads'+'/:id/', {'id': "@id"},
        {
            'update': { method:'PUT' },
            'get': { method:'GET' },
            'query':  {method:'GET', isArray:true},
            'save':   {method:'POST'},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'}
        }),
        Odontologo:  $resource('http://localhost:8000/accounts/odontologos'+'/:id/', {'id': "@id"},
        {
            'update': { method:'PUT' },
            'get': { method:'GET' },
            'query':  {method:'GET', isArray:true},
            'save':   {method:'POST'},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'}
        }),
    };

});
