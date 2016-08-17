function(t) {
    "use strict";

    function e($http,$timeout) {
        function t(t) {
            var e = this;
            return e.anchor = t.navbarElement, e.title = e.anchor.charAt(0).toUpperCase() + e.anchor.substr(1), e
        };
        var obj = [];
        $http.get('bower.json').success(function(data) { 
            obj.urlViews = data.root.urlViews
        });
        return t.$inject = ["$scope"], {
            controller: t,
            controllerAs: "vm",
            restrict: "A",
            templateUrl: "views/interface/navbarElement.min.phtml",
            scope: {
                navbarElement: "@"
            }
        }
    }
    t.module("interface").directive("navbarElement", ['$http', e ])
}(window.angular),

