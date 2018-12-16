'use strict'

moduleCommon.controller('homeController', ['$scope', '$location', 'toolService', 'sessionService', '$http',
    function ($scope, $location, toolService, sessionService, $http) {
        
        $http({
            method: 'GET',
            url: '/json?ob=usuario&op=check'
        }).then(function (response) {
            if (response.status === 200) {
                if (sessionService.isSessionActive) {
                    $scope.usuariologeado = sessionService.getUserName();
                    if ($scope.usuariologeado === "") {
                        $scope.ocultar = false;
                    } else {
                        $scope.ocultar = true;
                    }
                }
            } else if (response.status === 401 || response.status === 500) {
                if (sessionService.setSessionInactive) {
                    $scope.usuariologeado = sessionService.getUserName();
                    if ($scope.usuariologeado === "") {
                        $scope.ocultar = true;
                    } else {
                        $scope.ocultar = false;
                    }
                }
            }
        })


        $scope.ruta = $location.path();

        $scope.isActive = toolService.isActive;

    }
]);