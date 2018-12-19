'use strict'

moduleProducto.controller('productoPlistUsrControllerUsr', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService','countcarritoService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService,countcarritoService) {

        $scope.totalPages = 1;
        if (sessionService.getTipoUserId() === 1) {
            $scope.isAdmin = true;
        }

        if (!$routeParams.order) {
            $scope.orderURLServidor = "";
            $scope.orderURLCliente = "";
        } else {
            $scope.orderURLServidor = "&order=" + $routeParams.order;
            $scope.orderURLCliente = $routeParams.order;
        }

        if (!$routeParams.rpp) {
            $scope.rpp = '10';
        } else {
            $scope.rpp = $routeParams.rpp;
        }

        if (!$routeParams.page) {
            $scope.page = 1;
        } else {
            if ($routeParams.page >= 1) {
                $scope.page = $routeParams.page;
            } else {
                $scope.page = 1;
            }
        }

        //getcount
        $http({
            method: 'GET',
            url: '/json?ob=producto&op=getcount'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuariosNumber = response.data.message;
            $scope.totalPages = Math.ceil($scope.ajaxDataUsuariosNumber / $scope.rpp);
            if ($scope.page > $scope.totalPages) {
                $scope.page = $scope.totalPages;
                $scope.actulizar();
            }
            pagination2();
        }, function (response) {
            $scope.ajaxDataUsuariosNumber = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: '/json?ob=producto&op=getpage&rpp=' + $scope.rpp + '&page=' + $scope.page + $scope.orderURLServidor
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message;
            $scope.comprar = true;
            if (($scope.ajaxDataUsuarios.existencias === 0) || ($scope.ajaxDataUsuarios.existencias === null)) {
                $scope.comprar = false;
            }
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
        });

        $scope.actulizar = function () {
            $location.url(`usr/producto/plist/` + $scope.rpp + `/` + $scope.page + '/' + $scope.orderURLCliente);
        };
        //paginacion neighbourhood
        function pagination2() {
            $scope.list2 = [];
            $scope.neighborhood = 1;
            for (var i = 1; i <= $scope.totalPages; i++) {
                if (i === $scope.page) {
                    $scope.list2.push(i);
                } else if (i <= $scope.page && i >= ($scope.page - $scope.neighborhood)) {
                    $scope.list2.push(i);
                } else if (i >= $scope.page && i <= ($scope.page - -$scope.neighborhood)) {
                    $scope.list2.push(i);
                } else if (i === ($scope.page - $scope.neighborhood) - 1) {
                    if ($scope.page >= 4) {
                        $scope.list2.push("...");
                    }
                } else if (i === ($scope.page - -$scope.neighborhood) + 1) {
                    if ($scope.page <= $scope.totalPages - 3) {
                        $scope.list2.push("...");
                    }
                }
            }
        }
        ;
        $scope.addProducto = function (id) {

            $http({
                method: 'GET',
                url: '/json?ob=carrito&op=add&prod=' + id + '&cant=1'
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxCarrito = response.data.message;
                countcarritoService.updateCarrito();
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxCarrito = response.data.message || 'Request failed';
            });
        };
        
        $scope.isActive = toolService.isActive;



    }



]);