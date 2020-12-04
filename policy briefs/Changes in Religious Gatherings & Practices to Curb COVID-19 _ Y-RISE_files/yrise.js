/**
 * This file contains the main JavaScript functionality for the theme.
 * 
 * @author Pix & Hue
 */

jQuery(document).ready(function($) {

	"use strict";

	yrise_loading_gif();

	/* -- Sticky Menu -- */
	$("#yrise-sticky-header-container").sticky({
  		topSpacing:0,
  		zIndex:9999
  	});
  	$("#yrise-sticky-header-container").on('sticky-start', function() { 
  		$('#yrise-sticky-header-container').fadeIn();
  		$('.yrise-header-container').hide();
  	});
  	$("#yrise-sticky-header-container").on('sticky-end', function() { 
  		$('#yrise-sticky-header-container').hide();
  		$('.yrise-header-container').fadeIn();
  	});
  	$("#yrise-menu-mobile.yrise-sticky-nav").sticky({
  		topSpacing:0,
  		zIndex:9999
  	});

  	/* -- Mobile Menu -- */
  	$('#yrise-nav-wrapper.yrise-sticky-nav-wrapper .menu').slicknav({
		prependTo:'#yrise-menu-mobile',
		label:'',
		allowParentLinks: true
	});	

	/* -- Affiliated Researchers (Updated in Version 2.4) -- */
	if(!$('body').hasClass('elementor-editor-active')) { 
		$('.yrise-affiliated-researchers-columns-section img').bind('click', yrise_display_affiliated_researchers_description);
		$('.yrise-affiliated-researchers-columns-section h6').bind('click', yrise_display_affiliated_researchers_description);
		$('.yrise-affiliated-researchers-columns-section .yrise-nc-icon').bind('click', yrise_hide_affiliated_researchers_description);
	}

	/* -- Open Pop Up Window of Affiliated Researcher when Redirecting from Another page -- */
	if($('.page-id-1979').length > 0) {
		if(window.location.href.indexOf("affiliated-researcher") > -1) {
			var affiliated_researcher_url = location.href.split('#');
			var affiliate_researcher_overlay = '#'+ affiliated_researcher_url[1].split('/')[1];
			yrise_display_redirected_affiliated_researchers_description(affiliate_researcher_overlay);
		}
	}	
		
	/* -- Projects Page -- */
	$('.yrise-projects-read-more').bind('click', yrise_projects_expand_text);
	$('.yrise-projects-read-less').bind('click', yrise_projects_hide_text);

	/* -- Home Page - Animate Arrow in Top Section -- */
	$('#yrise-home-page.yrise-site-arrow').on('click', function() {
		$(this).parents('.elementor-section').last().prev().slideToggle(500);
		$(this).toggleClass('yrise-arrow-rotated');
	});

	/* -- Home Page - Update location of link to wrap icon --*/
	if($('.yrise-five-circle-section ').length) {
		$('.yrise-five-circle-column .elementor-heading-title a').each(function() {
			$(this).addClass('yrise-five-circle-link');
			$(this).closest('.yrise-five-circle-column').wrap($(this));
		});
	}	

  	/* -- Themes Pages - Update location of link to wrap icon --*/
	if($('.yrise-research-icon-section').length) {
		$('.yrise-theme-icon-column .elementor-heading-title a').each(function() {
			$(this).addClass('yrise-theme-icon-column-link');
			$(this).closest('.yrise-theme-icon-column').wrap($(this));
		});
	}

	/* -- Research Output Page - Update location of link to wrap icon --*/
	if($('#yrise-research-menu').length) {
		$('.yrise-research-icon-column .elementor-heading-title a').each(function() {
			$(this).addClass('yrise-research-icon-column-link');
			$(this).closest('.yrise-research-icon-column').wrap($(this));
		});
	}

});

var $j = jQuery.noConflict();

/*************************************
 * Loading Gif
**************************************/	
function yrise_loading_gif() {

	$j(window).load(function() {
		$j(".yrise-loader").fadeOut("slow");
	});	
}

/*************************************
 * Show Affiliated Researchers Section 
**************************************/
function yrise_display_affiliated_researchers_description(event) {

	event.preventDefault();
  	event.stopPropagation();
  	var yrise_affiliated_researcher_overlay = $j(this).parent().attr('href');
  	if($j(this).is('h6')) { 
  		yrise_affiliated_researcher_overlay = $j(this).children(':first').attr('href');
  	}
  	var affiliate_researcher_columns_section = $j(this).closest('.yrise-affiliated-researchers-columns-section');
  	var yrise_affiliated_researcher_column_height = affiliate_researcher_columns_section.outerHeight();

  	affiliate_researcher_columns_section.addClass('yrise-af-active');
	
	$j(yrise_affiliated_researcher_overlay).fadeIn();
	$j(yrise_affiliated_researcher_overlay).addClass('yrise-af-description-active');
	$j(yrise_affiliated_researcher_overlay).find('.yrise-nc-icon').show();
	var custom_spacer_height = $j(yrise_affiliated_researcher_overlay).outerHeight() + 130 - yrise_affiliated_researcher_column_height;
	affiliate_researcher_columns_section.find('.elementor-spacer-inner').css('height', custom_spacer_height);

	var popup_top = $j(this).offset().top;
	var window_top = $j(window).scrollTop();
	if (popup_top > window_top) { 
		$j('html, body').animate({ 
			scrollTop: $j(yrise_affiliated_researcher_overlay).offset().top - 140
		}, 'slow');	
	}
}

/******************************************************************
 * Show Affiliated Researcher PopUp - Redirected from Another Page 
*******************************************************************/	
function yrise_display_redirected_affiliated_researchers_description(researcher_overlay) {

	var yrise_affiliated_researcher_overlay = $j('#yrise-content').find(researcher_overlay);
	var affiliate_researcher_columns_section = $j(yrise_affiliated_researcher_overlay).closest('.yrise-affiliated-researchers-columns-section');
	var yrise_affiliated_researcher_column_height = affiliate_researcher_columns_section.outerHeight();
	
	affiliate_researcher_columns_section.addClass('yrise-af-active');
	$j(yrise_affiliated_researcher_overlay).fadeIn();
	$j(yrise_affiliated_researcher_overlay).addClass('yrise-af-description-active');
	
	$j(window).load(function(){
		var custom_spacer_height = $j(yrise_affiliated_researcher_overlay).outerHeight() + 130 - yrise_affiliated_researcher_column_height;
		affiliate_researcher_columns_section.find('.elementor-spacer-inner').css('height', custom_spacer_height);

		var popup_top = $j(yrise_affiliated_researcher_overlay).offset().top;
		var window_top = $j(window).scrollTop();
		if (popup_top > window_top) { 
			$j('html, body').animate({ 
				scrollTop: $j(yrise_affiliated_researcher_overlay).offset().top - 140
			}, 800);	
		}
	});	
}

/******************************************
 * Hide Affiliated Researchers Description
********************************************/	
function yrise_hide_affiliated_researchers_description() {

	$j(this).hide();

	//Hide Description
	$j(this).closest('.yrise-people-description.yrise-affiliated-researcher').css('display', 'none');
	$j(this).closest('.yrise-affiliated-researchers-columns-section').removeClass('yrise-af-active');
}	


/*************************************
 * Projects Page Expand Text
**************************************/	
function yrise_projects_expand_text(event)  {

	event.preventDefault();
	$j(this).prev().hide();
	$j(this).hide();
	var parent_section = $j(this).closest('.yrise-projects-default-section');
	parent_section.next().find('.yrise-project-expanded-text .elementor-column-wrap').fadeIn();
}

/*************************************
 * Projects Page Hide Text
**************************************/	
function yrise_projects_hide_text(event)  {

	event.preventDefault();
	var project_container = $j(this).closest('.yrise-project-expanded-text .elementor-column-wrap');
	var parent_section = project_container.closest('.yrise-projects-expanded-section');
	project_container.hide();
	parent_section.prev().find('.yrise-projects-default-text').fadeIn();
	parent_section.prev().find('.yrise-projects-read-more').fadeIn();
}