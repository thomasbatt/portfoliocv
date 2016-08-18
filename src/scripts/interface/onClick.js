function(angular) {
    'use strict';

    function onclick($scope) {
        $scope.openContact = function(){
            $('.contact').fadeIn();
        };
    }
    angular.module("interface").controller('onClick', ['$scope', onclick ]);
}(window.angular),