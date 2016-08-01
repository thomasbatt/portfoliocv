
$('document').ready(function(){ 

// ------------------------AJAX---------------------------
    $('.js_submit_contact').click(function(evenement)
    {
        evenement.preventDefault();
        var name = $(this).parents('form').find('[name="name"]').val();
        var email = $(this).parents('form').find('[name="email"]').val();
        var subject = $(this).parents('form').find('[name="subject"]').val();
        var message = $(this).parents('form').find('[name="message"]').val();
        var send_copy = $(this).parents('form').find('[name="send_copy"]').val();

        $.post('index.php', {name:name,email:email,subject:subject,message:message,send_copy:send_copy,action:'send_mail'}, function(){
            $.get('index.php?ajax&page=error', function(error){
                if(error == ""){
                    var url = window.location.href.split('/');
                    var newUrl = "";
                    for (i = 0; i < url.length-1; i++) {
                      newUrl += url[i]+"/";
                    }
                    newUrl += 'sendmailsuccess';
                    window.location.href = newUrl ;
                }else{
                    $.get('index.php?ajax&page=contact', function(message){
                        $('.js-contact-error').replaceWith(message);
                    });
                }
            });
        });
    });

// ---------------------THUMBNAIL--------------------------------
    $("a.gallery-item").next("br")
        .remove();
    $("a.gallery-item").mouseover(function(e){
        $("body").append("<img class='features-hover' src='"+$(this).attr("rel")+"' alt='' />");
        $("img.features-hover").css({
                display:"none",
                visibility:"visible"
            })
            .fadeIn(350);
        $(this).children("a.gallery-item img")
            .stop()
            .animate({
                opacity: 0.5,
                top: "5px",
                left: "5px"
            },
            "fast");
    }).mousemove(function(e){
        $("img.features-hover").css({
                left:e.pageX+30,
                top:e.pageY-150
            });
    }).mouseout(function(){
        $(this).children("a.gallery-item img")
            .stop()
            .animate({
                opacity: 1,
                top: "0",
                left: "0"
            },
            "fast");
        $("img.features-hover").remove();
    });

    $(".connect-div a").mouseover(function(){
        $(this).next(".connect-div span img.connect-bg")
            .stop(true, true)
            .animate({
                opacity: "show"
            },
            "fast");
    }).mouseout(function(){
        $(this).next(".connect-div span img.connect-bg")
            .stop(true, true)
            .animate({
                opacity: "hide"
            },
            "fast");
    });

// ------------------------------MODAL--------------------------------
    
        // $('.contact').hide();
    // $('.button-close').click(function(e){
    //     e.preventDefault();
    //     contact.fadeOut();
    // });

    $('.js-open-modal').click(function(e){
        e.preventDefault();
    var contact = $('.contact');
        contact.fadeIn();
        $.get('index.php/contact', function(page) {
            contact.html(page);
            $('.button-close').click(function(e){
                e.preventDefault();
                contact.fadeOut();
            });
        })
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
            });
        $(window).resize();
    });
    
// ----------------------------WOW JS--------------------------------

    new WOW().init();
});








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
        t.put("./interface/projects.html", '<div class="project col-s-12" ng-repeat="project in vm.projects"><div class="col-m-4 visible-m"><div class="border">{{:: project.icon }}</div></div><div class="description col-m-8">{{:: project.name }}<p>{{:: project.description }} <i ng-if="{{:: project.link  }}" class="devicons devicons-responsive"></i><a ng-href="{{: project.link }}">Demo</a><br><i ng-if="{{:: project.github }}" class="devicons devicons-github"></i><a ng-href="{{:: project.github }}">Github</a><br><skill-element ng-repeat="techno in project.technologies" skill="techno"></skill-element></p></div></div>')
    }])
}();