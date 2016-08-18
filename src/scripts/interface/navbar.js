function(angular, $link) {
    "use strict";

    function navbar($scope) {
        function link($link, $menu) {
            $menu.on("click", function() {
                $menu[0].clientWidth < 768 && $scope(function() {
                    $menu.toggleClass("open")
                })
            })
        }

        function navbar() {
            var $scope = this;
            return $scope.menu = "Menu", $scope
        }
        return {
            controller: navbar,
            controllerAs: "vm",
            restrict: "AE",
            link: link,
            templateUrl: "views/interface/navbar.min.phtml",
            scope: !1
        }
    }
    angular.module("interface").directive("navbar", navbar), navbar.$inject = ["$timeout"]
}(window.angular, window.document),