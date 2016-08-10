function(t) {
    'use strict';

    t.module("interface").controller('onClick', ['$scope', function($scope) {
        $scope.openContact = function(){
            $('.contact').fadeIn();
        };
    }]);
}(window.angular),