
function(t) {
    "use strict";

    function e() {
        function t(t) {
            var e = this;
            return e.anchor = t.navbarElement, e.title = e.anchor.charAt(0).toUpperCase() + e.anchor.substr(1), e
        }
        return t.$inject = ["$scope"], {
            controller: t,
            controllerAs: "vm",
            restrict: "A",
            templateUrl: "views/navbarElement.phtml",
            scope: {
                navbarElement: "@"
            }
        }
    }
    t.module("interface").directive("navbarElement", e)
}(window.angular),
