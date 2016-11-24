define([
	'underscore',
	'backbone'
], function(_, Backbone){

	var LastSearch = Backbone.Model.extend({
		defaults: {
			center_lat: '',
			center_long: '',
			place_name: '',
			title: '',
			count: 0
		}
	});

    return LastSearch;
});