/*global define */
define([
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'models/lastSearch'
], function (_, Backbone, Store, LastSearch) {

	var TodosCollection = Backbone.Collection.extend({
		model: LastSearch,
		localStorage: new Store('lastSearch'),

        initialize: function () {
            this.listenTo(this, 'add', this.saveFaves);
        },

		addLastSearch: function (response) {
			var data = {
				center_lat: response.center_lat,
				center_long: response.center_long,
				place_name: response.place_name,
				title: response.title,
				count: response.count
			};

			if(this.where({place_name: response.place_name}).length){ return; }
			if(this.length === 5){
				this.at(0).destroy();
			}
			
			this.add(data);
		},
		
        saveFaves: function (item) {
            item.save();
        }
	});

	return new TodosCollection();
});
