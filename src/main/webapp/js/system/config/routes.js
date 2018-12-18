var autenticacionAdministrador = function ($q, $location, $http, sessionService, countcarritoService) {
    var deferred = $q.defer();
    var usuario;
    var nombreUsuario;
    var idUsuarioLogeado;
    $http({
        method: 'GET',
        url: 'json?ob=usuario&op=check'
    }).then(function (response) {
        respuesta = response;
        if (response.data.status === 200) {
            //comprobar que el usuario en sesión es administrador
            usuario = response.data.message.obj_tipoUsuario.id;
            nombreUsuario = response.data.message.nombre + ' ' + response.data.message.ape1;
            idUsuarioLogeado = response.data.message.id;
            if (usuario === 1) {
                countcarritoService.updateCarrito();
                //hay que meter el usuario activo en el sessionService
                sessionService.setTipoUserId(usuario);
                sessionService.setUserId(idUsuarioLogeado);
                sessionService.setUserName(nombreUsuario);
                sessionService.setSessionActive();
                deferred.resolve();
            } else {
                $location.path('/home');
            }
        } else {
            $location.path('/home');
        }
    }, function (response) {
        $location.path('/home');
        respuesta = response;
    });

    return deferred.promise;
};
var autenticacionUsuario = function ($q, $location, $http, sessionService, countcarritoService, $routeParams) {
    var deferred = $q.defer();
    var usuario;
    var nombreUsuario;
    var idUsuarioLogeado;
    var id = $routeParams.id;
    $http({
        method: 'GET',
        url: 'json?ob=usuario&op=check'
    }).then(function (response) {
        if (response.data.status === 200) {
            //comprobar que el usuario en sesión es usuario

            usuario = response.data.message.obj_tipoUsuario.id;
            nombreUsuario = response.data.message.nombre + ' ' + response.data.message.ape1;
            idUsuarioLogeado = response.data.message.id;
            if (usuario === 2) {
                countcarritoService.updateCarrito();
                //hay que meter el usuario activo en el sessionService
                sessionService.setTipoUserId(usuario);
                sessionService.setUserId(idUsuarioLogeado);
                sessionService.setUserName(nombreUsuario);
                sessionService.setSessionActive();
                deferred.resolve();

            }

            //hay que meter el usuario activo en el sessionService
        } else {
            $location.path('/home');
        }
    }, function (response) {
        $location.path('/home');
    });
    return deferred.promise;
};



trolleyes.config(['$routeProvider', function ($routeProvider) {
        //ADMINISTRADOR
        //USUARIO
        $routeProvider.when('/usuario/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/usuario/plist.html', controller: 'usuarioPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/plist', {templateUrl: 'js/app/usuario/plist.html', controller: 'usuarioPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/view/:id?', {templateUrl: 'js/app/usuario/view.html', controller: 'usuarioViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/edit/:id?', {templateUrl: 'js/app/usuario/edit.html', controller: 'usuarioEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/remove/:id?', {templateUrl: 'js/app/usuario/remove.html', controller: 'usuarioRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/create/', {templateUrl: 'js/app/usuario/create.html', controller: 'usuarioCreateController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/plistfactura/:id?/:rpp?/:page?/:order?', {templateUrl: 'js/app/usuario/plistfactura.html', controller: 'usuarioPlistFacturaController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/new', {templateUrl: 'js/app/usuario/new.html', controller: 'usuarioNewController', resolve: {auth: autenticacionAdministrador}});

        //TIPOUSUARIO
        $routeProvider.when('/tipousuario/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/tipousuario/plist.html', controller: 'tipousuarioPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/edit/:id?', {templateUrl: 'js/app/tipousuario/edit.html', controller: 'tipousuarioEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/view/:id?', {templateUrl: 'js/app/tipousuario/view.html', controller: 'tipousuarioViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/remove/:id?', {templateUrl: 'js/app/tipousuario/remove.html', controller: 'tipousuarioRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/new', {templateUrl: 'js/app/tipousuario/new.html', controller: 'tipousuarioNewController', resolve: {auth: autenticacionAdministrador}});

        //FACTURA
        $routeProvider.when('/factura/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/factura/plist.html', controller: 'facturaPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/edit/:id?', {templateUrl: 'js/app/factura/edit.html', controller: 'facturaEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/plistlinea/:id?/:rpp?/:page?/:order?', {templateUrl: 'js/app/factura/plistlinea.html', controller: 'facturaViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/remove/:id?', {templateUrl: 'js/app/factura/remove.html', controller: 'facturaRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/new', {templateUrl: 'js/app/factura/new.html', controller: 'facturaNewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/newfacturauser/:id?', {templateUrl: 'js/app/factura/newfacturauser.html', controller: 'facturaNewUserController', resolve: {auth: autenticacionAdministrador}});


        //TIPOPORDUCTO
        $routeProvider.when('/tipoproducto/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/tipoproducto/plist.html', controller: 'tipoproductoPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/edit/:id?', {templateUrl: 'js/app/tipoproducto/edit.html', controller: 'tipoproductoEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/view/:id?', {templateUrl: 'js/app/tipoproducto/view.html', controller: 'tipoproductoViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/remove/:id?', {templateUrl: 'js/app/tipoproducto/remove.html', controller: 'tipoproductoRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/new', {templateUrl: 'js/app/tipoproducto/new.html', controller: 'tipoproductoNewController', resolve: {auth: autenticacionAdministrador}});

        //PRODUCTO
        $routeProvider.when('/producto/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/producto/plist.html', controller: 'productoPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/plist_1/:rpp?/:page?/:order?', {templateUrl: 'js/app/producto/plist_1.html', controller: 'productoPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/view/:id?', {templateUrl: 'js/app/producto/view.html', controller: 'productoViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/edit/:id?', {templateUrl: 'js/app/producto/edit.html', controller: 'productoEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/remove/:id?', {templateUrl: 'js/app/producto/remove.html', controller: 'productoRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/new', {templateUrl: 'js/app/producto/new.html', controller: 'productoNewController', resolve: {auth: autenticacionAdministrador}});

        //LINEA
        $routeProvider.when('/linea/edit/:id?', {templateUrl: 'js/app/linea/edit.html', controller: 'lineaEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/linea/lineafactura/:id?', {templateUrl: 'js/app/linea/lineafactura.html', controller: 'lineaNewController', resolve: {auth: autenticacionAdministrador}});

        //USUARIOS
        $routeProvider.when('/usr/usuario/view/:id?', {templateUrl: 'js/app/usr/usuario/view.html', controller: 'usuarioViewController', resolve: {auth: autenticacionUsuario}});
        $routeProvider.when('/usr/factura/plistlinea/:id?/:rpp?/:page?/:order?', {templateUrl: 'js/app/usr/factura/plistlinea.html', controller: 'facturaViewController', resolve: {auth: autenticacionUsuario}});
        $routeProvider.when('/usr/producto/view/:id?', {templateUrl: 'js/app/usr/producto/view.html', controller: 'productoViewController', resolve: {auth: autenticacionUsuario}});
        $routeProvider.when('/usr/producto/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/usr/producto/plist.html', controller: 'productoPlistUsrController', resolve: {auth: autenticacionUsuario}});
        $routeProvider.when('/usr/usuario/plistfactura/:id?/:rpp?/:page?/:order?', {templateUrl: 'js/app/usr/usuario/plistfactura.html', controller: 'usuarioPlistFacturaController', resolve: {auth: autenticacionUsuario}});


        //LOGIN
        $routeProvider.when('/login', {templateUrl: 'js/app/login.html', controller: 'loginController'});

        //OTROS
        $routeProvider.when('/', {templateUrl: 'js/app/common/home.html', controller: 'homeController'});
        $routeProvider.when('/home', {templateUrl: 'js/app/common/home.html', controller: 'homeController'});
        $routeProvider.when('/carrito', {templateUrl: 'js/app/common/carrito.html', controller: 'carritoController'});


        $routeProvider.otherwise({redirectTo: '/'});
    }]);
