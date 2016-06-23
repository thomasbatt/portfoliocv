
$('document').ready(function(){ 


    $("a.gallery-item").next("br").remove();

    $("a.gallery-item").mouseover(function(e)
    {
        $("body").append("<img class='features-hover' src='"+$(this).attr("rel")+"' alt='' />");
        $("img.features-hover").css({display:"none", visibility:"visible"}).fadeIn(350);
        $(this).children("a.gallery-item img").stop().animate({opacity: 0.5, top: "5px", left: "5px"}, "fast");
    }).mousemove(function(e)
    {
        $("img.features-hover").css({left:e.pageX+30, top:e.pageY-150});
    }).mouseout(function()
    {
        $(this).children("a.gallery-item img").stop().animate({opacity: 1, top: "0", left: "0"}, "fast");
        $("img.features-hover").remove();
    });

    $(".connect-div a").mouseover(function()
    {
        $(this).next(".connect-div span img.connect-bg").stop(true, true).animate({opacity: "show"}, "fast");
    }).mouseout(function()
    {
        $(this).next(".connect-div span img.connect-bg").stop(true, true).animate({opacity: "hide"}, "fast");
    });

    $(function(){

        var appendthis =  ("<div class='modal-overlay js-modal-close'></div>");

        $('a[data-modal-id]').click(function(e) {
            e.preventDefault();
            $(".modal-box").css({
                top: ($(window).height() - $(".modal-box").outerHeight()) / 2 + $(window).scrollTop() , 
                left: ($(window).width() - $(".modal-box").outerWidth()) / 2
            });
        $("body").append(appendthis);
        $(".modal-overlay").fadeTo(500, 0.7);
        //$(".js-modalbox").fadeIn(500);
            var modalBox = $(this).attr('data-modal-id');
            $('#'+modalBox).fadeIn($(this).data());
        });  
              
      
        $(".js-modal-close, .modal-overlay").click(function() {
            $(".modal-box, .modal-overlay").fadeOut(500, function() {
                $(".modal-overlay").remove();

            });
         
        });
         
        $(window).resize(function() {
            $(".modal-box").css({
                top: ($(window).height() - $(".modal-box").outerHeight()) / 2 + $(window).scrollTop() , 
                left: ($(window).width() - $(".modal-box").outerWidth()) / 2
            });
        // console.log("height:"+$(window).height());
        // console.log("width:"+$(window).width());
        });
         
        $(window).resize();

     
    });

    new WOW().init();


});




! function(t) {
    "use strict";
    t.module("interface", [])
}(window.angular),
function(t) {
    "use strict";

    function e(t) {
        function e(e, n, i, l) {
            n.on("mouseenter", function() {
                t(function() {
                    l.icon = l.icon + "-over", console.debug(l.icon)
                })
            }).on("mouseleave", function() {
                t(function() {
                    l.icon = l["class"]
                })
            })
        }

        function n(t) {
            var e = this;
            return e.link = "https://" + t.socialLink, e["class"] = t.socialIcon, e.alt = e["class"].charAt(0).toUpperCase() + e["class"].substr(1), e.icon = e["class"], e
        }
        return n.$inject = ["$scope"], {
            restrict: "AE",
            controller: n,
            controllerAs: "vm",
            link: e,
            templateUrl: "./interface/socialIcon.html",
            scope: {
                socialIcon: "@",
                socialLink: "@"
            }
        }
    }
    t.module("interface").directive("socialIcon", e), e.$inject = ["$timeout"]
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
    "use strict";
    t.module("timeline", [])
}(window.angular),
function(t) {
    "use strict";

    function e() {
        function t(t) {
            function e() {
                return n()
            }

            function n() {
                return t.getRecords().then(function(t) {
                    return i.records = t, i.records
                })
            }
            var i = this;
            i.records = [], e()
        }
        return t.$inject = ["education"], {
            restrict: "AE",
            controller: t,
            controllerAs: "vm",
            templateUrl: "/timeline/timeline.html"
        }
    }
    t.module("timeline").directive("timeline", e)
}(window.angular),
function(t) {
    "use strict";
    t.module("skills", [])
}(window.angular),
function(t) {
    "use strict";

    function e() {
        return {
            restrict: "AE",
            scope: {
                skill: "&"
            },
            templateUrl: "src/skills/skillElement.html"
        }
    }
    t.module("skills").directive("skillElement", e)
}(window.angular),
function(t) {
    "use strict";

    function e(t, e) {
        function n() {
            return t.get(e.api + "/skill").then(function(t) {
                return t.data.results
            })["catch"](function(t) {
                console.debug("[SkillsFactory]", t)
            })
        }
        var i = {
            getSkills: n
        };
        return i
    }
    t.module("skills").factory("skill", e), e.$inject = ["$http", "ELH_SITE"]
}(window.angular),
function(t) {
    "use strict";

    function e() {
        function t(t) {
            function e() {
                return n()
            }

            function n() {
                return t.getSkills().then(function(t) {
                    return i.skills = t, i.skills
                })
            }
            var i = this;
            i.skills = [], e()
        }
        return t.$inject = ["skill"], {
            restrict: "AE",
            controller: t,
            controllerAs: "vm",
            templateUrl: "/skills/skills.html"
        }
    }
    t.module("skills").directive("skills", e)
}(window.angular),
function(t) {
    "use strict";
    t.module("projects", [])
}(window.angular),
function(t) {
    "use strict";

    function e(t, e) {
        function n() {
            return t.get(e.api + "/project").then(function(t) {
                return t.data.results
            })["catch"](function(t) {
                console.debug("[ProjectsFactory]", t)
            })
        }
        var i = {
            getProjects: n
        };
        return i
    }
    t.module("projects").factory("project", e), e.$inject = ["$http", "ELH_SITE"]
}(window.angular),
function(t) {
    "use strict";

    function e() {
        function t(t) {
            function e() {
                return n()
            }

            function n() {
                return t.getProjects().then(function(t) {
                    return i.projects = t, i.projects
                })
            }
            var i = this;
            i.projects = [], e()
        }
        return t.$inject = ["project"], {
            restrict: "AE",
            controller: t,
            controllerAs: "vm",
            templateUrl: "/projects/projects.html"
        }
    }
    t.module("projects").directive("projects", e)
}(window.angular),
function(t) {
    "use strict";
    t.module("posts", [])
}(window.angular),
function(t) {
    "use strict";
    t.module("education", [])
}(window.angular),
function(t) {
    "use strict";

    function e(t, e) {
        function n() {
            return t.get(e.api + "/record").then(function(t) {
                return t.data
            })["catch"](function(t) {
                console.debug("[EducationFactory]", t)
            })
        }
        var i = {
            getRecords: n
        };
        return i
    }
    t.module("education").factory("education", e), e.$inject = ["$http", "ELH_SITE"]
}(window.angular),
function(t) {
    "use strict";
    t.module("config", [])
}(window.angular),
function(t) {
    "use strict";
    var e = {
        version: "5.0.0",
        name: "THOMAS BATT website",
        author: "BATT <thomasbatt@gmail.com>",
        api: "http://localhost:1234/api"
    };
    t.module("config").constant("ELH_SITE", e)
}(window.angular),
function(t) {
    "use strict";
    t.module("website", ["angular-parallax", "duScroll", "ngTooltip", "sticky", "config", "education", "interface"])
}(window.angular),
function(t) {
    try {
        t = angular.module("website")
    } catch (e) {
        t = angular.module("website", [])
    }
    t.run(["$templateCache", function(t) {
        t.put("./interface/navbar.html", '<div class="nav-header"><span class="hamburger"></span> <span class="title">{{:: vm.menu }}</span></div><ul class="nav-bar"><li navbar-element="profil"></li><li navbar-element="competences"></li><li navbar-element="projets"></li><li> <a class="brackets_links js-open-modal" offset="120" data-modal-id="contacter">contact</a> </li></ul>')
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
        t.put("./interface/socialIcon.html", '<a ng-href="{{:: vm.link }}" target="_blank"><img ng-src="./assets/images/icons/{{:: vm.icon }}.png" class="social-img {{:: vm.class }}" alt="{{:: vm.alt }}"></a>')
    }])
}(),
function(t) {
    try {
        t = angular.module("website")
    } catch (e) {
        t = angular.module("website", [])
    }
    t.run(["$templateCache", function(t) {
        t.put("./skills/skillElement.html", '<i title="{{ techno }}" class="devicon-{{ techno | lowercase }}-plain colored"></i>')
    }])
}(),
function(t) {
    try {
        t = angular.module("website")
    } catch (e) {
        t = angular.module("website", [])
    }
    t.run(["$templateCache", function(t) {
        t.put("./skills/skills.html", '<div class="col-s-12 col-m-4"><h3>Development</h3><skill-element ng-repeat="skill in skills" ng-if="skill.type === \'dev\'" skill="skill.techno"></skill-element></div><div class="col-s-12 col-m-4"><h3>Tools I use(d)</h3><skill-element ng-repeat="skill in skills" ng-if="skill.type === \'tool\'" skill="skill.techno"></skill-element></div><div class="col-s-12 col-m-4"><h3>Sys admin</h3><skill-element ng-repeat="skill in skills" ng-if="skill.type === \'sys\'" skill="skill.techno"></skill-element></div>')
    }])
}(),
function(t) {
    try {
        t = angular.module("website")
    } catch (e) {
        t = angular.module("website", [])
    }
    t.run(["$templateCache", function(t) {
        t.put("./timeline/timeline.html", '<div class="content"><h2>Timeline</h2></div>')
    }])
}(),
function(t) {
    try {
        t = angular.module("website")
    } catch (e) {
        t = angular.module("website", [])
    }
    t.run(["$templateCache", function(t) {
        t.put("./projects/projects.html", '<div class="project col-s-12" ng-repeat="project in vm.projects"><div class="col-m-4 visible-m"><div class="border">{{:: project.icon }}</div></div><div class="description col-m-8">{{:: project.name }}<p>{{:: project.description }} <i ng-if="{{:: project.link  }}" class="devicons devicons-responsive"></i><a ng-href="{{: project.link }}">Demo</a><br><i ng-if="{{:: project.github }}" class="devicons devicons-github"></i><a ng-href="{{:: project.github }}">Github</a><br><skill-element ng-repeat="techno in project.technologies" skill="techno"></skill-element></p></div></div>')
    }])
}();