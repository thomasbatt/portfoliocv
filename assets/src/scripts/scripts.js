
$('document').ready(function(){ 

// ------------------------AJAX---------------------------
    $('.js_submit_contact').click(function(e){
        e.preventDefault();
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
    $("a.gallery-item").next("br").remove();
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
    $('[navbar-element="contact"], .js-open-contact').click(function(e){
        e.preventDefault();
        $('.contact').fadeIn();
    });
    $('.button-close').click(function(e){
        e.preventDefault();
        $('.contact').fadeOut();
        $('.sendmailsuccess').fadeOut();
    });

//-------------------------SCALE ANIMATION---------------------------
    var windowWidth, windowHeight, windowScrollTop;
    function getWindowDimension(){
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        windowScrollTop = $(window).scrollTop();
    }
    $(window).scroll(function () {
        getWindowDimension();
        var scale = (windowScrollTop/windowHeight > 1)?1:windowScrollTop/windowHeight;
        $('.scale-animation').css({
            opacity:1-(scale/1.5), 
            transform: 'scale('+(1-scale/2)+') translateY('+(scale*350)+'px)'
        });
        $('.scrollDownArrow').css({
            opacity:1-(scale*4)
        });
    });
    
// ----------------------------WOW JS--------------------------------
    new WOW().init();

});
