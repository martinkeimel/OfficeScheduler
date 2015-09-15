
angular.module('schedulerApp')
    .factory("helper", function ($mdToast) {

    var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
    var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;

    var helper = {
        StringToDate: function (value) {
            if (typeof value === 'string') {
                value = JSON.parse(value);
                var a = reISO.exec(value);
                if (a)
                    return new Date(value);
                a = reMsAjax.exec(value);
                if (a) {
                    var b = a[1].split(/[-+,.]/);
                    return new Date(b[0] ? +b[0] : 0 - +b[1]);
                }
            }
            return value;
        },
        ShowSuccessToast: function (message) {
            $mdToast.show({
                template: '<md-toast class="success">' +
                '<span flex>{{m}}</span>' +
                '</md-toast>',
                locals: {
                    m: message
                },
                position: "bottom right",
                hideDelay: 6000,
                controller: "ToastCtrl"
            });
        },
        ShowErrorToast: function (message) {
            $mdToast.show({
                template: '<md-toast class="error">' +
                '<span flex>Ha ocurrido un error: {{m}}</span>' +
                '<md-button ng-click="closeToast()">' +
                'OK' +
                '</md-button>' +
                '</md-toast>',
                locals: {
                    m: message
                },
                hideDelay: false,
                position: "bottom right",
                controller: "ToastCtrl"
            });
        },
        CloseToast: function () {
            $mdToast.hide();
        }
    };

    return helper;
}).controller('ToastCtrl', function ($scope, $mdToast, m) {
  $scope.m = m;
  
  $scope.closeToast = function() {
    $mdToast.hide();
  };
});