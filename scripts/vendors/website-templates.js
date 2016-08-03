



! function(t) {
    "use strict";
    t.module("interface", [])
}(window.angular),


function(t) {
    "use strict";
    t.module("website", ["angular-parallax", "duScroll", "ngTooltip", "sticky", "interface"])
}(window.angular),


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
            templateUrl: "./interface/navbarElement.html",
            scope: {
                navbarElement: "@"
            }
        }
    }
    t.module("interface").directive("navbarElement", e)
}(window.angular),


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
            templateUrl: "./interface/navbar.html",
            scope: !1
        }
    }
    t.module("interface").directive("navbar", n), n.$inject = ["$timeout"]
}(window.angular, window.document),


function(t) {
    try {
        t = angular.module("website")
    } catch (e) {
        t = angular.module("website", [])
    }
    t.run(["$templateCache", function(t) {
        t.put("./interface/navbar.html", '<div class="nav-header"><span class="hamburger"></span> <span class="title">{{:: vm.menu }}</span></div><ul class="nav-bar"><li navbar-element="profil"></li><li navbar-element="competences"></li><li navbar-element="projets"></li><li> <a class="brackets_links js-open-contact" offset="120">contact</a> </li></ul>')
    }])
}(),


function(t) {
    try {
        t = angular.module("website")
    } catch (e) {
        t = angular.module("website", [])
    }
    t.run(["$templateCache", function(t) {
        t.put("./interface/navbarElement.html", '<a class="brackets_links" offset="120" du-scrollspy du-smooth-scroll="{{:: vm.anchor }}">{{:: vm.title }}</a>')
    }])
}(),


function(t) {
    try {
        t = angular.module("website")
    } catch (e) {
        t = angular.module("website", [])
    }
    t.run(["$templateCache", function(t) {
        t.put("./interface/projects.html", '<div class="project col-s-12" ng-repeat="project in vm.projects"><div class="col-m-4 visible-m"><div class="border">{{:: project.icon }}</div></div><div class="description col-m-8">{{:: project.name }}<p>{{:: project.description }} <i ng-if="{{:: project.link  }}" class="devicons devicons-responsive"></i><a ng-href="{{: project.link }}">Demo</a><br><i ng-if="{{:: project.github }}" class="devicons devicons-github"></i><a ng-href="{{:: project.github }}">Github</a><br><skill-element ng-repeat="techno in project.technologies" skill="techno"></skill-element></p></div></div>')
    }])
}();