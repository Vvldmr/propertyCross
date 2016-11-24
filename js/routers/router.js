define([
	'jquery',
	'backbone',
    'collections/houses',
    'collections/faves',
    'views/index',
    'views/houses',
    'views/house',
    'views/faves'
], function ($, Backbone, Houses, Faves, indexView, housesView, houseView, favesView) {
	
	var MainRouter = Backbone.Router.extend({

		$container: $('#app'),

        initialize: function () {
            var initFave = Faves.fetch({reset:true});

            window.fave = Faves;

            initFave.done(function(){
                Backbone.history.start({pushState: true});
            });
		},

		routes: {
            'faves': 'showFaves',
            'faves/:item_id': 'showFaveItem',
			'search': 'search',
			'search/:item_id': 'showItem',
			'': 'index'
		},

		showFaves: function(){
            var View = new favesView(Faves);
            this.$container.html(View.render().$el);
		},
		search: function(){
            var View = new housesView(Houses);
            this.$container.html(View.render().$el);
		},
        showFaveItem: function (itemId) {
            var param = {
                item: Faves.get(itemId),
                isFavePage: true
            };

            var View = new houseView(param);
            this.$container.html(View.render().$el);
        },
		showItem: function(itemId){
            var item = Houses.get(itemId);
            var param = {
                item: item,
                fave: Faves.where({
                    title: item.get('title'),
                    price: item.get('price')
                })[0]
            };
            
            var View = new houseView(param);
            this.$container.html(View.render().$el);
		},

		index: function () {
            var View = new indexView();
			this.$container.html(View.render().$el)
		}
	});

	return new MainRouter;
});
