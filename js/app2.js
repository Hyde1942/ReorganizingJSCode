(function(global, $){
	global.EM2 = new EventEmitter2();

	$(function(){
		EM2.emit('init');
	});

	var carousel = (function(){

		var $content = $("[rel=js-carousel] > [rel=js-content]"),
		$items = $content.children("[rel=js-items]"),
		$left = $("[rel=js-carousel] > [rel=js-controls] > [rel=js-left]"),
		$right = $("[rel=js-carousel] > [rel=js-controls] > [rel=js-right]");

		contentWidth = $content.width();
		itemsWidth = $items.width();
		position = 0;
		maxPosition = (itemsWidth - contentWidth);

		function scrollLeft(evt) {
			evt.preventDefault();
			evt.stopPropagation();
			evt.stopImmediatePropagation();

			if (position > 0) {
				position = Math.max(0,position - 197);
			}

			$items.css({ left: (-position) + "px" });
		}

		function scrollRight(evt){
			evt.preventDefault();
			evt.stopPropagation();
			evt.stopImmediatePropagation();

			if (position < maxPosition) {
				position = Math.min(maxPosition,position + 197);
			}

			$items.css({ left: (-position) + "px" });
		}

		function loadPerson(){
			var id = $(this).index();
			EM2.emit('personClicked',id);
		}

		function slideTo(personId){
			if ((personId * 200) > contentWidth){
				position = Math.min(maxPosition,(personId * 197));
			}else {
				position = Math.max(0,(personId * 197));
			}
			console.log(`Scrolling to ${position}`);
			$items.css({ left: (-position) + "px" });
		}

		function setup(){
			$left.on('click',  scrollLeft);
			$right.on('click', scrollRight);
			$items.on('click','[rel*="js-item"]', loadPerson);
			EM2.on('personClicked',slideTo)
		}

		EM2.on('init',setup);

		return {
			slideTo: slideTo
		}


	})()


	var details = (function(){

		var $content,
		$gotoPersonID;

		function loadPersonData(id){
			$content.load(`details/${id}`).fadeIn('fast');
		}

		function setup(){
			$content = $("[rel=js-details]");
			$gotoPersonID = $content.on('click', '[rel*="js-person"]', function(event){
				event.preventDefault();
				event.stopPropagation();
				var id = $(this).attr('data-person');
				loadPersonData(id);
				EM2.emit('personClicked', id);
			});

			
			EM2.on('personClicked',function(id){
				loadPersonData(id);
			})
		}
		EM2.on('init',setup);
		return {
			loadPerson: loadPersonData
		}

	})()

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


var modal = (function(){

	var $modal = $('[rel="js-modal"]'),
	$modalContent = $modal.find('[rel="js-modalContent"]'),
	$closeBtn = $modal.find('[rel="js-closeModal"]');


	function openModal(){
		if($modal.is(':visible')){
			closeModal();
		}else{
			$modal.fadeIn();
		}
	}

	function closeModal(){
		$modal.fadeOut('fast');
	}

	function loadContent(pageUrl){
		$modalContent.load(pageUrl);
		openModal();
	}
	
	function setup(){
		EM2.on('modalOpen',loadContent);
		$closeBtn.on('click',closeModal);
	}

	EM2.on('init',setup);

})()

})(window, jQuery)





