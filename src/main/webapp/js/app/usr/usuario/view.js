'use strict'

moduleUsuario.controller('usuarioViewControllerUsr', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, toolService, $routeParams, sessionService) {
        if(parseInt($routeParams.id) === sessionService.getUserId()){
            
            $scope.pagina= true;
        $scope.cambioPassword = false;
        if (sessionService.getTipoUserId() === 1) {
            $scope.isAdmin = true;
        } else {
            $scope.isAdmin = false;
        }
        $http({
            method: 'GET',
            withCredentials: true,
            url: 'json?ob=usuario&op=get&id=' + $routeParams.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message;
        }, function (response) {
            $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
            $scope.status = response.status;
        });
        $scope.cambiarPass = function () {
            $http({
                method: 'GET',
                url: '/json?ob=usuario&op=changepassword&id=' + $routeParams.id + '&pass=' + forge_sha256($scope.ajaxDataUsuarios.password)
            }).then(function (response) {
                if (response.status === 200) {
                    $scope.cambioPassword = true;
                }
            });
        };
        $scope.isActive = toolService.isActive;
        
    }else{
    $scope.pagina= false;
}}]);