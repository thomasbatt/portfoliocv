function(angular) {
    "use strict";

    function navbar($http) {
        function navbarElement($element) {
            var $scope = this;
            return $scope.anchor = $element.navbarElement,
                $scope.title = $scope.anchor.charAt(0).toUpperCase() + $scope.anchor.substr(1),
                $scope
        };
        var obj = [];
        $http.get('bower.json').success(function(data) { 
            obj.urlViews = data.root.urlViews
        });
        return navbarElement.$inject = ["$scope"], {
            controller: navbarElement,
            controllerAs: "vm",
            restrict: "A",
            templateUrl: "views/interface/navbarElement.min.phtml",
            scope: {
                navbarElement: "@"
            }
        }
    }
    angular.module("interface").directive("navbarElement", ['$http', navbar ])
}(window.angular),

