'use strict';
moduleService.service('sessionService', ['$location', function ($location) {
        var isSessionActive = false;
        var userName = "";
        var userId='';
        var tipoUserId= '';
        var carrito = 0;
        var observerCallbacks = [];
        return {
            getUserName: function () {
                return userName;
            },
            setUserName: function (name) {
                userName = name;
            },
            isSessionActive: function () {
                return isSessionActive;
            },
            setSessionActive: function (name) {
                isSessionActive = true;
            },
            setSessionInactive: function (name) {
                isSessionActive = false;
            },
            getUserId: function () {
                return userId;
            },
            setUserId: function (id) {
                userId = id;
            },
            getTipoUserId: function () {
                return tipoUserId;
            },
            setTipoUserId: function (idTipoUsuario) {
                tipoUserId = idTipoUsuario;
            },
            setCountCarrito: function (cantidad) {
                carrito = cantidad;
                //Para que sirve el callback()
                //https://www.quora.com/What-is-the-call-back-function-in-AngularJS
                angular.forEach(observerCallbacks, function (callback) {
                    callback();
                });
            },
            getCountCarrito: function () {
                return carrito;
            },
            registerObserverCallback: function (callback) {
                observerCallbacks.push(callback);
            }
            
        };
        
    }]);