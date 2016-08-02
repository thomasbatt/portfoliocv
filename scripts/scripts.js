
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

    var contact = $('.contact');

    $('.js-open-modal').click(function(e){
        e.preventDefault();
        $('.contact-body').css({
            top: ($(window).height() - $(".contact-body").outerHeight()) / 2 , 
            left: ($(window).width() - $(".contact-body").outerWidth()) / 2
            // top: 20+'%', 
            // left: 20+'%' 
        });
        contact.fadeIn();
    });
        $('.button-close').click(function(e){
            e.preventDefault();
            contact.fadeOut();
        });
        $(window).resize(function() {
            $(".contact-body").css({
                top: ($(window).height() - $(".contact-body").outerHeight()) / 2 , 
                left: ($(window).width() - $(".contact-body").outerWidth()) / 2
            });
        console.log(($(window).height() - $(".contact-body").outerHeight()) / 2 + $(window).scrollTop());
        console.log(($(window).width() - $(".contact-body").outerWidth()) / 2);
        });
        $(window).resize();

            // contact.click(function(e){
            //     e.preventDefault();
            //     contact.fadeOut();
            // });
        // })



    // $(function(){
    //     var appendthis =  ("<div class='modal-overlay js-modal-close'></div>");
    //     $('a[data-modal-id]').click(function(e) {
            
    //         e.preventDefault();
    //         $(".modal-box").css({
    //             top: ($(window).height() - $(".modal-box").outerHeight()) / 2 + $(window).scrollTop() , 
    //             left: ($(window).width() - $(".modal-box").outerWidth()) / 2
    //         });
    //         $("body").append(appendthis);
    //         $(".modal-overlay").fadeTo(500, 0.7);
    //             var modalBox = $(this).attr('data-modal-id');
    //             $('#'+modalBox).fadeIn($(this).data());
    //         });  
    //         $(".js-modal-close, .modal-overlay").click(function() {
    //             $(".modal-box, .modal-overlay").fadeOut(500, function() {
    //                 $(".modal-overlay").remove();
    //             });
    //         });
    //         $(window).resize(function() {
    //             $(".modal-box").css({
    //                 top: ($(window).height() - $(".modal-box").outerHeight()) / 2 + $(window).scrollTop() , 
    //                 left: ($(window).width() - $(".modal-box").outerWidth()) / 2
    //             });
    //         });
    //     $(window).resize();
    // });
    
// ----------------------------WOW JS--------------------------------

    new WOW().init();
});



