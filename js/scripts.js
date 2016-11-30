$(window).load(function () {

    "use strict";

    $('.first-filter').trigger('click');

    //Center Slider Paging

    var TcenterAmount = ($('#testimonials').height() / 2) - ($('#testimonials-slider .flex-control-paging').height() / 2);
    $('#testimonials-slider .flex-control-paging').css('top', TcenterAmount - 30);

    // Remove loader

    $('#progress-bar').width('100%');
    $('#loader').hide();

});

$(document).ready(function () {

    "use strict";

    // Loader bar

    var count = 1;

    $('img').load(function () {

        $('#progress-bar').css('width', count * 170);
        count = count + 1;
    });

    $('#loader').css('padding-top', $(window).height() / 2);

    // Smooth Scroll to internal links

    $('.smooth-scroll').smoothScroll({
        offset: -69,
        speed: 800
    });

    // Initialize Sliders

    $('#home-slider').flexslider({
        directionNav: false,
        touch: true,
        slideshowSpeed: 3250
    });

    $('#testimonials-slider').flexslider({
        directionNav: false,
        touch: true,
        slideshowSpeed: 5500
    });

    // added for news slider by Jared
    $('#news-slider').flexslider({
        directionNav: false,
        touch: true,
        slideshowSpeed: 2500,
        controlNav: false
    });

    // Mobile Menu

    $('#mobile-toggle').click(function () {
        if ($('#navigation').hasClass('open-nav')) {
            $('#navigation').removeClass('open-nav');
        } else {
            $('#navigation').addClass('open-nav');
        }
    });

    $('#menu li a').click(function () {
        if ($('#navigation').hasClass('open-nav')) {
            $('#navigation').removeClass('open-nav');
        }
    });

    // Adjust slide height for smaller screens

    if ($(window).height() < 760) {
        $('#home-slider .slides li').css('height', $(window).height());
    }


    // Append HTML <img>'s as CSS Background for slides
    // also center the content of the slide

    $('#home-slider .slides li').each(function () {

        var imgSrc = $(this).children('.slider-bg').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('.slider-bg').remove();

        var slideHeight = $(this).height();
        var contentHeight = $(this).children('.slide-content').height();
        var padTop = (slideHeight / 2) - (contentHeight / 2);

        $(this).children('.slide-content').css('padding-top', padTop);

    });

    // Sticky Nav

    $(window).scroll(function () {

        if ($(window).scrollTop() > 300) {
            $('#navigation').addClass('sticky-nav');
        } else {
            $('#navigation').removeClass('sticky-nav');
        }

    });

    // Append .divider <img> tags as CSS backgrounds

    $('.divider').each(function () {
        var imgSrc = $(this).children('.divider-bg').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('.divider-bg').remove();
    });

    // Center slider paging

    var centerAmount = ($('#home-slider .slides li').height() / 2) - ($('#home-slider .flex-control-paging').height() / 2);
    $('#home-slider .flex-control-paging').css('top', centerAmount);



    // Parallax Backgrounds

    /*$(window).scroll(function(){
		
		var scrollAmount = -$(window).scrollTop()/3;
		$('#home-slider .slides li').css('background-position-y', scrollAmount);
	
	});*/

    // Initialize Isotope

    $('#project-container').isotope({
        // options
        itemSelector: '.project',
        layoutMode: 'masonry'
    });

    $('#filters a').click(function () {
        var selector = $(this).attr('data-filter');
        $('#project-container').isotope({
            filter: selector
        });
        $('#filters a').children('.btn').removeClass('active');
        $(this).children('.btn').addClass('active');
        return false;

    });

    // Project Clicks with AJAX call

    $('.project-btn-holder a').click(function (event) {
        event.preventDefault();

        if ($('#ajax-container').hasClass('open-container')) {
            $('#ajax-container').addClass('closed-container');
            $('#ajax-container').removeClass('open-container');
        }

        var fileID = $(this).attr('data-project-file');

        if (fileID != null) {
            $('html,body').animate({
                scrollTop: $('#ajax-container').offset().top - 100
            }, 500);

        }

        $.ajax({
            url: fileID
        }).success(function (data) {
            $('#ajax-container').addClass('open-container');
            $('#ajax-container').html(data);
            $('.project-slider').flexslider({
                directionNav: false
            });
            $('#ajax-container').removeClass('closed-container');

            $('.close-project').click(function () {
                $('#ajax-container').addClass('closed-container');
                $('#ajax-container').removeClass('open-container');
                $('html,body').animate({
                    scrollTop: $('#project-container').offset().top - 100
                }, 500);
                setTimeout(function () {
                    $('#ajax-container').html('');
                }, 1000);
            });
        });

    });

    // Contact Form Code

    $('#form-button').click(function () {

        var name = $('#form-name').val();
        var email = $('#form-email').val();
        var message = $('#form-message').val();
        var error = 0;

        if (name === '' || email === '' || message === '') {
            error = 1;
            $('#details-error').fadeIn(200);
        } else {
            $('#details-error').fadeOut(200);
        }

        if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(email))) {
            $('#details-error').fadeIn(200);
            error = 1;
        }

        var dataString = 'name=' + name + '&email=' + email + '&text=' + message;

        if (error === 0) {
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: dataString,
                success: function () {
                    $('#details-error').fadeOut(1000);
                    $('#form-sent').fadeIn(1000);
                }
            });
            return false;
        }

    });




});