jQuery(document).ready(function($){

	/*    Tabletop code
	 *	  Load content from Google Spreadsheet
	 */

	var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/12Gtjc00RaSKo7cYYiYks9yxL7ptwnThH9EYzOvOpVgs/pubhtml';

	function init() {
	Tabletop.init( { key: publicSpreadsheetUrl,
	                 callback: showInfo,
	                 simpleSheet: true } )
	}

	function showInfo(data, tabletop) {
	 	// uncomment to view your data in the console!
	 	// console.log('red hot data:');
		// console.log(tabletop.foundSheetNames);
		var settings = tabletop.sheets('Settings');
		var stories = tabletop.sheets('Stories');
	    // console.log('settings:');
	    // console.log(settings.elements[0].hero_image_url);
	    // console.log('stories:');
	    // console.log(stories.elements);

	    // set hero image 
	    var bgURL = 'url("' + settings.elements[0].hero_image_url + '")';
	    $('#hero').css('background-image', bgURL);

	    // Handlebars templating
	    var source = $('#story-template').html();
	    var template = Handlebars.compile(source);
	    stories.elements.forEach( function(story) {
		    var render = template(story);
	    	// append to timeline container
	    	$('#content').append(render);
	    });

	}

	window.addEventListener('DOMContentLoaded', init);

});