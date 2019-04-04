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



