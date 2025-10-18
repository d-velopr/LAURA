/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

  	})


	/*----------------------------------------------------*/
	/*	Sticky Navigation
	------------------------------------------------------*/
   $(window).on('scroll', function() {

		var y = $(window).scrollTop(),
		    topBar = $('header');
     
	   if (y > 1) {
	      topBar.addClass('sticky');
	   }
      else {
         topBar.removeClass('sticky');
      }
    
	});
	

	/*-----------------------------------------------------*/
  	/* Mobile Menu - ENHANCED VERSION
   ------------------------------------------------------ */  
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation'),
       body = $('body');

	// Ensure menu is hidden on page load for mobile
	if ($(window).width() <= 768) {
		nav.hide();
	}

   // Toggle menu on button click
   toggleButton.on('click', function(event){
		event.preventDefault();

		toggleButton.toggleClass('is-clicked');
		nav.slideToggle(300);
		nav.toggleClass('is-visible');
		body.toggleClass('menu-is-open');
	});

	// Handle dropdown clicks on mobile
	if ($(window).width() <= 768) {
		$('.main-navigation .dropdown > a').on('click', function(e) {
			e.preventDefault();
			
			var parent = $(this).parent();
			var dropdown = parent.find('.dropdown-content');
			
			// Close other dropdowns
			$('.main-navigation .dropdown').not(parent).removeClass('is-open');
			$('.main-navigation .dropdown-content').not(dropdown).slideUp(200);
			
			// Toggle current dropdown
			parent.toggleClass('is-open');
			dropdown.slideToggle(200);
		});
	}

  	// Check if mobile menu button is visible
  	if (toggleButton.is(':visible')) {
		nav.addClass('mobile');
	}

	// Handle window resize
  	$(window).resize(function() {
		if ($(window).width() > 768) {
			// Desktop view
			nav.css('display', 'block');
			nav.show();
			toggleButton.removeClass('is-clicked');
			body.removeClass('menu-is-open');
			nav.removeClass('mobile');
		} else {
			// Mobile view
			nav.addClass('mobile');
			if (!nav.hasClass('is-visible')) {
				nav.css('display', 'none');
				nav.hide();
			}
		}
  	});

	// Close menu when clicking a link on mobile
  	$('#main-nav-wrap li a').on("click", function(e) {   

   		if (nav.hasClass('mobile')) {
			// Don't close if it's a dropdown parent and we're clicking to expand
			if ($(this).parent().hasClass('dropdown') && !$(this).parent().hasClass('is-open')) {
				return; // Let the dropdown handler above take care of it
			}
			
			// Close menu only if clicking on actual links (not dropdown parents)
			if (!$(this).parent().hasClass('dropdown') || $(this).parent().find('.dropdown-content').length === 0) {
				toggleButton.toggleClass('is-clicked'); 
				nav.slideUp(300);
				nav.removeClass('is-visible');
				body.removeClass('menu-is-open');
			}
   		}     
  	});

	// Close menu when clicking outside on mobile
	$(document).on('click', function(e) {
		if ($(window).width() <= 768) {
			if (!$(e.target).closest('.menu-toggle, .main-navigation').length) {
				if (nav.hasClass('is-visible')) {
					nav.slideUp(300);
					nav.removeClass('is-visible');
					toggleButton.removeClass('is-clicked');
					body.removeClass('menu-is-open');
				}
			}
		}
	});


   /*----------------------------------------------------*/
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------*/
	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");	

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');			

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		}, 

		offset: '25%'

	});


	/*----------------------------------------------------*/
  	/* Flexslider
  	/*----------------------------------------------------*/
  	$(window).load(function() {

	   $('#testimonial-slider').flexslider({
	   	namespace: "flex-",
	      controlsContainer: "",
	      animation: 'slide',
	      controlNav: true,
	      directionNav: true,
	      smoothHeight: true,
	      slideshowSpeed: 7000,
	      animationSpeed: 600,
	      randomize: false,
	      touch: true,
	   });

   });


	/*----------------------------------------------------*/
  	/* Smooth Scrolling
  	------------------------------------------------------*/
  	$('.smoothscroll').on('click', function (e) {
	 	
	 	e.preventDefault();

   	var target = this.hash,
    	$target = $(target);

    	$('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });

  	});  
  

   /*----------------------------------------------------*/
	/*  Placeholder Plugin Settings
	------------------------------------------------------*/ 

	$('input, textarea, select').placeholder()  


	/*---------------------------------------------------- */
   /* ajaxchimp
	------------------------------------------------------ */

	// Example MailChimp url: http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
	var mailChimpURL = 'http://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e65110b38d'

	$('#mc-form').ajaxChimp({

		language: 'es',
	   url: mailChimpURL

	});

	// Mailchimp translation
	//
	//  Defaults:
	//	 'submit': 'Submitting...',
	//  0: 'We have sent you a confirmation email',
	//  1: 'Please enter a value',
	//  2: 'An email address must contain a single @',
	//  3: 'The domain portion of the email address is invalid (the portion after the @: )',
	//  4: 'The username portion of the email address is invalid (the portion before the @: )',
	//  5: 'This email address looks fake or invalid. Please enter a real email address'

	$.ajaxChimp.translations.es = {
	  'submit': 'Submitting...',
	  0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
	  1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
	  2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
	  3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
	  4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
	  5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
	}


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */ 
  	$(".fluid-video-wrapper").fitVids();


 	/*---------------------------------------------------- */
	/*	Modal Popup
	------------------------------------------------------ */

    $('.video-link a').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 200,
       showCloseBtn: false,
       mainClass: 'mfp-fade'       

    });

    $(document).on('click', '.close-popup', function (e) {
    		e.preventDefault();
    		$.magnificPopup.close();
    });


 	/*----------------------------------------------------- */
  	/* Back to top
   ------------------------------------------------------- */ 
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}		

	});		

})(jQuery);