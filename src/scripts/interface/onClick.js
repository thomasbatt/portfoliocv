function(t) {
    'use strict';

    function c(s) {
        s.openContact = function(){
            $('.contact').fadeIn();
        };
    }
    t.module("interface").controller('onClick', ['$scope', c ]);
}(window.angular),