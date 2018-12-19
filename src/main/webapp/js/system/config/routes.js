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
        $routeProvider.when('/usuario/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/usuario/plist.html', controller: 'usuarioPlistControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/plist', {templateUrl: 'js/app/usuario/plist.html', controller: 'usuarioPlistControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/view/:id?', {templateUrl: 'js/app/usuario/view.html', controller: 'usuarioViewControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/edit/:id?', {templateUrl: 'js/app/usuario/edit.html', controller: 'usuarioEditControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/remove/:id?', {templateUrl: 'js/app/usuario/remove.html', controller: 'usuarioRemoveControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/create/', {templateUrl: 'js/app/usuario/create.html', controller: 'usuarioCreateControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/plistfactura/:id?/:rpp?/:page?/:order?', {templateUrl: 'js/app/usuario/plistfactura.html', controller: 'usuarioPlistFacturaControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/new', {templateUrl: 'js/app/usuario/new.html', controller: 'usuarioNewControllerAdm', resolve: {auth: autenticacionAdministrador}});

        //TIPOUSUARIO
        $routeProvider.when('/tipousuario/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/tipousuario/plist.html', controller: 'tipousuarioPlistControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/edit/:id?', {templateUrl: 'js/app/tipousuario/edit.html', controller: 'tipousuarioEditControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/view/:id?', {templateUrl: 'js/app/tipousuario/view.html', controller: 'tipousuarioViewControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/remove/:id?', {templateUrl: 'js/app/tipousuario/remove.html', controller: 'tipousuarioRemoveControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/new', {templateUrl: 'js/app/tipousuario/new.html', controller: 'tipousuarioNewControllerAdm', resolve: {auth: autenticacionAdministrador}});

        //FACTURA
        $routeProvider.when('/factura/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/factura/plist.html', controller: 'facturaPlistControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/edit/:id?', {templateUrl: 'js/app/factura/edit.html', controller: 'facturaEditControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/plistlinea/:id?/:rpp?/:page?/:order?', {templateUrl: 'js/app/factura/plistlinea.html', controller: 'facturaViewControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/remove/:id?', {templateUrl: 'js/app/factura/remove.html', controller: 'facturaRemoveControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/new', {templateUrl: 'js/app/factura/new.html', controller: 'facturaNewControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/newfacturauser/:id?', {templateUrl: 'js/app/factura/newfacturauser.html', controller: 'facturaNewUserControllerAdm', resolve: {auth: autenticacionAdministrador}});


        //TIPOPORDUCTO
        $routeProvider.when('/tipoproducto/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/tipoproducto/plist.html', controller: 'tipoproductoPlistControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/edit/:id?', {templateUrl: 'js/app/tipoproducto/edit.html', controller: 'tipoproductoEditControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/view/:id?', {templateUrl: 'js/app/tipoproducto/view.html', controller: 'tipoproductoViewControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/remove/:id?', {templateUrl: 'js/app/tipoproducto/remove.html', controller: 'tipoproductoRemoveControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/new', {templateUrl: 'js/app/tipoproducto/new.html', controller: 'tipoproductoNewControllerAdm', resolve: {auth: autenticacionAdministrador}});

        //PRODUCTO
        $routeProvider.when('/producto/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/producto/plist.html', controller: 'productoPlistControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/plist_1/:rpp?/:page?/:order?', {templateUrl: 'js/app/producto/plist_1.html', controller: 'productoPlistControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/view/:id?', {templateUrl: 'js/app/producto/view.html', controller: 'productoViewControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/edit/:id?', {templateUrl: 'js/app/producto/edit.html', controller: 'productoEditControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/remove/:id?', {templateUrl: 'js/app/producto/remove.html', controller: 'productoRemoveControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/new', {templateUrl: 'js/app/producto/new.html', controller: 'productoNewControllerAdm', resolve: {auth: autenticacionAdministrador}});

        //LINEA
        $routeProvider.when('/linea/edit/:id?', {templateUrl: 'js/app/linea/edit.html', controller: 'lineaEditControllerAdm', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/linea/lineafactura/:id?', {templateUrl: 'js/app/linea/lineafactura.html', controller: 'lineaNewControllerAdm', resolve: {auth: autenticacionAdministrador}});

        //USUARIOS
        $routeProvider.when('/usr/usuario/view/:id?', {templateUrl: 'js/app/usr/usuario/view.html', controller: 'usuarioViewControllerUsr', resolve: {auth: autenticacionUsuario}});
        $routeProvider.when('/usr/factura/plistlinea/:id?/:rpp?/:page?/:order?', {templateUrl: 'js/app/usr/factura/plistlinea.html', controller: 'facturaViewControllerUsr', resolve: {auth: autenticacionUsuario}});
        $routeProvider.when('/usr/producto/view/:id?', {templateUrl: 'js/app/usr/producto/view.html', controller: 'productoViewControllerUsr', resolve: {auth: autenticacionUsuario}});
        $routeProvider.when('/usr/producto/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/usr/producto/plist.html', controller: 'productoPlistUsrControllerUsr', resolve: {auth: autenticacionUsuario}});
        $routeProvider.when('/usr/usuario/plistfactura/:id?/:rpp?/:page?/:order?', {templateUrl: 'js/app/usr/usuario/plistfactura.html', controller: 'usuarioPlistFacturaControllerUsr', resolve: {auth: autenticacionUsuario}});


        //LOGIN
        $routeProvider.when('/login', {templateUrl: 'js/app/login.html', controller: 'loginController'});

        //OTROS
        $routeProvider.when('/', {templateUrl: 'js/app/common/home.html', controller: 'homeController'});
        $routeProvider.when('/home', {templateUrl: 'js/app/common/home.html', controller: 'homeController'});
        $routeProvider.when('/carrito', {templateUrl: 'js/app/common/carrito.html', controller: 'carritoController'});


        $routeProvider.otherwise({redirectTo: '/'});
    }]);
