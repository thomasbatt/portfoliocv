function(t) {
    try {
        t = angular.module("website")
    } catch (e) {
        t = angular.module("website", [])
    }
    t.run(["$templateCache", function(t) {
        t.put("", '<div class="nav-header"><span class="hamburger"></span> <span class="title">{{:: vm.menu }}</span></div><ul class="nav-bar"><li navbar-element="profil"></li><li navbar-element="competences"></li><li navbar-element="projets"></li><li navbar-element="contact" class="js-open-contact"></li></ul>')
    }])
}(),
function(t) {
    try {
        t = angular.module("website")
    } catch (e) {
        t = angular.module("website", [])
    }
    t.run(["$templateCache", function(t) {
        t.put("", '<a class="brackets_links" offset="120" du-scrollspy du-smooth-scroll="{{:: vm.anchor }}">{{:: vm.title }}</a>')
    }])
}(),
function(t) {
    try {
        t = angular.module("website")
    } catch (e) {
        t = angular.module("website", [])
    }
    t.run(["$templateCache", function(t) {
        t.put("", '<div class="project col-s-12" ng-repeat="project in vm.projects"><div class="col-m-4 visible-m"><div class="border">{{:: project.icon }}</div></div><div class="description col-m-8">{{:: project.name }}<p>{{:: project.description }} <i ng-if="{{:: project.link  }}" class="devicons devicons-responsive"></i><a ng-href="{{: project.link }}">Demo</a><br><i ng-if="{{:: project.github }}" class="devicons devicons-github"></i><a ng-href="{{:: project.github }}">Github</a><br><skill-element ng-repeat="techno in project.technologies" skill="techno"></skill-element></p></div></div>')
    }])
}(),