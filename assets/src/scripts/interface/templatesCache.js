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