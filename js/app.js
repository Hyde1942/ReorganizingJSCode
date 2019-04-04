(function(global, $){
	global.EM2 = new EventEmitter2();

	$(function(){
		EM2.emit('init');
	});
	
})(window, jQuery)