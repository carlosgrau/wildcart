'use strict'

moduleLinea.controller('lineaNewControllerAdm', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, toolService, $routeParams, sessionService) {
        $scope.idfactura = $routeParams.id;
        $scope.ajaxData = "";
        $scope.guardar = function () {
            var json = {
                id: null,
                cantidad: $scope.ajaxDatoTipoUsuario.cantidad,
                id_factura: $routeParams.id,
                id_producto: $scope.ajaxDatoTipoUsuario.obj_Producto.id

            };
            $http({
                method: 'GET',
                withCredentials: true,
                url: '/json?ob=linea&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.mensaje = true;
            }, function (response) {
                $scope.ajaxDatoTipoUsuario = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };
        $scope.save = function () {
            $http({
                method: 'GET',
                url: 'json?ob=producto&op=update&id=2',
                data: {json: JSON.stringify($scope.obj)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDatoTipoUsuario = response.data.message;
            }, function (response) {
                $scope.ajaxDatoTipoUsuario = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };
        $scope.productoRefresh = function () {
            $http({
                method: 'GET',
                url: 'json?ob=producto&op=get&id=' + $scope.data.obj_Producto.id
            }).then(function (response) {
                $scope.data.obj_tipoUsuario = response.data.message;
            }, function (response) {
                $scope.data = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };
        $scope.isActive = toolService.isActive;

    }]);