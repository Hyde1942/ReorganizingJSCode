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

	EM2.on('init', setup);

	return {
		loadPerson: loadPersonData
	}

})()