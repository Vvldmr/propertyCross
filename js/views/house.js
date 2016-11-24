define([
	'jquery',
	'underscore',
	'backbone',
    'text!templates/_item.html',
    'collections/houses',
	'collections/faves'
], function ($, _, Backbone, itemTemplate, Houses, Faves) {

	var HouseView = Backbone.View.extend({
        item: '',
        template: _.template(itemTemplate),
		fave: false,

        events: {
			'click #btn_back': 'close',
			'click #add_fave': 'addFave'
        },

		addFave: function () {
            if(this.fave){
                Faves.get(this.fave.get('id')).destroy();
                this.$('#add_fave').removeClass('btn-warning');
            }else{
                Faves.add(this.item.toJSON());
                this.$('#add_fave').addClass('btn-warning');
            }
		},

		initialize: function (param){

            window.f = Faves;

            this.item = param.item;
            this.fave = param.fave;
            if(param.isFavePage){
                this.isFavePage = true;
                this.fave = this.item;
            }
		},

		render: function () {
            var data = this.item.toJSON() || {};
            data.isFave = !!this.fave;
            data.isFavePage = this.isFavePage;

            this.$el.html(this.template( data ));

			return this;
		},

		close: function () {
			this.remove();
		}
	});

	return HouseView;
});
