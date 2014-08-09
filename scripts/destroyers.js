Lucille.prototype.destroy = function(){

	// var that = this;
	// var msg = confirm('Would you like to remove this chord?');

	// if(msg){ 
		this.lucille.remove();
		this.svg.remove();
		delete this;
	// }

};