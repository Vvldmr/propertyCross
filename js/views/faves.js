define([
	'jquery',
	'underscore',
	'backbone',
    'text!templates/_faves.html'
], function ($, _, Backbone, favesTemplate) {

	var FavesView = Backbone.View.extend({
        template: _.template(favesTemplate),

        collection: null,

        events: {
            'click .remove_fave': 'removeFave'
        },

		initialize: function (collection) {
            this.collection = collection;
		},

        removeFave: function (e) {
            var el = $(e.currentTarget);

            this.collection.get(el.data('id')).destroy();
            el.parent().parent().parent().remove();
        },

		render: function () {
			this.$el.html(this.template({
                items: this.collection.toJSON()
            }));

			return this;
		}
	});

	return FavesView;
});
