// put event handlers for header links here

var header = (function (){
	var $header_links = $('[rel="js-header"]');

	function clickNavigation(event) {
		event.preventDefault();
		event.stopPropagation();
		var page_url = $(this).attr('href');
		EM2.emit('modalOpen',page_url);
	}

	function setup(){
	   $header_links.on('click','[rel*="js"]',clickNavigation);
	}

	EM2.on('init',setup);
})()