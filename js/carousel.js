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


