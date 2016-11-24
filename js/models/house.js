define([
	'underscore',
	'backbone'
], function(_, Backbone){

	var House = Backbone.Model.extend({
		defaults: {
			title: '',
			img_url: '',
			price_formatted: ''
		}
	});

    return House;
});