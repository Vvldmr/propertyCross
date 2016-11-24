/*global define */
define([
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'models/house'
], function (_, Backbone, Store, House) {

	var TodosCollection = Backbone.Collection.extend({
		model: House,
		localStorage: new Store('faves'),

        initialize: function () {
            this.listenTo(this, 'add', this.saveFaves);
        },

        saveFaves: function (item) {
            item.save();
        }
	});

	return new TodosCollection();
});
