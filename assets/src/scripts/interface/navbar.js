function(t, e) {
    "use strict";

    function n(t) {
        function e(e, n, i, l) {
            n.on("click", function() {
                n[0].clientWidth < 768 && t(function() {
                    n.toggleClass("open")
                })
            })
        }

        function n() {
            var t = this;
            return t.menu = "Menu", t
        }
        return {
            controller: n,
            controllerAs: "vm",
            restrict: "AE",
            link: e,
            templateUrl: "views/dist/ng-interface/navbar.phtml",
            scope: !1
        }
    }
    t.module("interface").directive("navbar", n), n.$inject = ["$timeout"]
}(window.angular, window.document),