// events body background class
// add attributes to header to collapsable header menu
$(function()
{
    var templateId  = $('#template-id').val();
    console.log("template ID: " + templateId);
    switch (templateId){

        //Template E white background (EVENTS)
        case "template-home":
            $('body').addClass('template-home');
            break;

        //Template E white background (EVENTS)
        case "template-e-bgw":
            $('body').addClass('template-event-bgw');
            break;

        //template E black bg EVENTS   
        case "template-e":
            $('body').addClass('template-event');   
            break;            

        //template issue     
        case "template-a":
            $('body').addClass('template-issue');
            break;            
    
        //template publication     
        case "template-d":
            $('body').addClass('template-publication');
            break;

        //template publication     
        case "template-c-one-col":
            $('body').addClass('template-blog-one-col');
            break;

                       
    }


    var issuesContainer = $('.issuesIssues').parent('.perc-widget').parent('.perc-vertical');

    // SORT ELEMENTS IN ISSUE INDEX PAGE
    function sortIssuesElements(issueWrapper, sortDescending) 
    {
        // Get the list items and setup an array for sorting
        var issueElements = issueWrapper.children('.perc-widget');
        var vals = [];

        // Populate the array
        for(var i = 0, elem = issueElements.length; i < elem; i++){
            vals.push(issueElements[i].innerHTML);
        }

        // Sort it
        vals.sort();

        // Sometimes you gotta DESC
        if(sortDescending){
           vals.reverse();
        }

        // Change the list on the page
        for(var i = 0, elem = issueElements.length; i < elem; i++){
           issueElements[i].innerHTML = vals[i];
        }
    }

    // call sorting fn only for the issues page
    if(issuesContainer){
        sortIssuesElements(issuesContainer);
    }
});


// SLICH SLIDER & slippry
$(function()
{
    /*
    //ADDED TO PERCUSSION WIDGET
    //HOME SLIDER
    // splippry slider options 
    var thumbs = jQuery('#thumbnails').slippry({

        // general elements & wrapper
        slippryWrapper: '<div class="slippry_box thumbnails" />',
        // options
        pause: 30000,
        // transition: 'horizontal',
        transition: 'fade',
        pager: false,
        auto: false,
        
        onSlideBefore: function (el, index_old, index_new) {
            jQuery('.thumbs a img').removeClass('active');
            jQuery('img', jQuery('.thumbs a')[index_new]).addClass('active');
            
            //remove any styling apply to the caption wrapper
            var captionContainer    = jQuery('.sy-caption-wrap');
            var captionWrapper      = captionContainer.children('.sy-caption');
            captionWrapper.removeClass('nclr-slide-0 nclr-slide-1 nclr-slide-2 nclr-slide-3');
            jQuery('.sy-caption-wrap').addClass('container');
            // add styling base on order

            captionWrapper.on('click', function(){
                var slidelinks = jQuery('#thumbnails').children('li').children('a');
                console.log($(slidelinks[index_new]).attr('href'));
            });

            switch(index_new){
                case 0:
                    // captionWrapper.addClass('nclr-slide-0');
                    break;                
                
                case 1:
                    // captionWrapper.addClass('nclr-slide-1');
                    break;                

                case 2:
                    // captionWrapper.addClass('nclr-slide-2');
                    break;                

                case 3:
                    // captionWrapper.addClass('nclr-slide-3');
                    break;                                                
            } 
        }
    });
    jQuery('.thumbs a').click(function () {
        thumbs.goToSlide($(this).data('slide'));
        return false;
    });
    */

    
    //SLICH SLIDER
    // home slider
    $('.main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.main-slider-thumbs').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.main-slider',
        dots: false,
        centerMode: true,
        focusOnSelect: true
    });

    /*
    //ADDED TO PERCUSSION WIDGET
    $('.testimonials').slick({
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: false,
        infinite: true,
        vertical:true
    });
    */

    $('.event-text-slider').slick({
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: true,
        infinite: true,
    });
});


//Publication
$(function(){
    if($('#template-id').val() === "template-d"){
        
        window.onload = function(){
            var sliderContainer         = $('.publication-carusel'),
                slideThumbsWrapper      = $('.publication-thumbnails').children('ul'),
                slidesCover             = sliderContainer.find('.publication-cover'),
                slides                  = slidesCover.find('.carusel-slide'),      
                slideStageWrapper       = sliderContainer.find('.publication-slider-stage'),
                transition_time         = 1000,
                time_between_slides     = 4000,
                slideCoverWidth         = 0;

            for( var i = slides.length - 1; i >= 0; i-- ){
                //get the widgth of th slider wrapper
                slideCoverWidth = slideCoverWidth + $(slides[i]).outerWidth();
                
                //construct the slider thumbs elements
                slideThumbElements = $('<li>',{
                    'class'         : 'slide-thumb',
                    'data-index'    : i,
                    html            : $('<a>', {
                        'href' : '#',
                        html   : $('<img>',{
                           'class'  : 'img-responsive',
                           'src'    : $(slides[i]).children('a').children('img').attr('src')
                        })    
                    })
                });

                slideThumbElements.appendTo(slideThumbsWrapper);    

                //init position for slides
                $(slides[i]).css({
                    'left'      : -($(slides[i]).outerWidth() + 10),
                    'opacity'   : 0,  
                });    
                
                //init postion for slide 0
                $(slides[0]).css({
                    'left'      : 0,
                    'opacity'   : 1 
                });    
            }

            //gets slider wrapper width        
            // slidesCover.width(slideCoverWidth);

            //slides thumbs
            var slideThumbs = slideThumbsWrapper.find('.slide-thumb');

            //handles the click events
            slideThumbs.on('click', function(e){
                e.preventDefault();
                $this = $(this);

                var currentSlide = slidesCover.find('.active-slide')
                    clickedSlide = $(slides[$this.attr('data-index')]);

                // avoid animate the current slide agian     
                if( clickedSlide.attr('class').indexOf('active-slide') !== -1 ){
                    return false;
                }
                
                                
                // SLIDE OUT CURRENT image    
                currentSlide
                    .animate({
                        left    : $(slides[$this.attr('data-index')]).outerWidth() + 'px', 
                        opacity : 0   
                    }, 1000 , function(){
                        $self = $(this);

                        $self.css({ 'left' : - ($self.outerWidth() + 10) });
                        //fix jquery issue of removing class name
                        // $self.removeClass('carusel-slide');
                        $self.removeAttr('class');
                        // add class necesary for the slider
                        $self.addClass('carusel-slide');
                    });

                //Slide in clicked image
                clickedSlide
                    .animate({
                        left      : 0,
                        opacity   : 1  
                    }, 1000, function(){
                        $self = $(this);
                        $self.addClass('active-slide');
                    });    
            });
        }
    }
});



// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('body').on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});




// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});



// Highlight the top nav as scrolling occurs
/*$('body').scrollspy({
    target: '.navbar-fixed-top'
})
*/



// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});


// Bootstrap Carrousel
$('.carousel').carousel();
