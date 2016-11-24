define([
	'jquery',
	'underscore',
	'backbone',
    'text!templates/_items.html',
    'text!templates/houses.html'
], function ($, _, Backbone, itemsTemplate, houseTemplate) {

	var HousesView = Backbone.View.extend({
        template: _.template(itemsTemplate),
        houseTemplate: _.template(houseTemplate),

        collection: null,

        events: {
            'click #btn_back': 'close',
            'click #load_more_btn': 'loadMore'
        },

		initialize: function (collection) {
			window.collection = collection;

            this.collection = collection;
            this.listenTo(collection, 'addSuccess', this.loadSuccess);
		},
        
        loadSuccess: function(){
            var el = this.$("#load_more_btn");

            if(this.collection.resultCount <= this.collection.length){
                el.parent().remove();
            }else{
                el.attr("disabled", false);
            }

            this.$("#count_show_on_page").text(this.collection.length);

            this.showLast();
        },

        loadMore: function (e) {
            $(e.target).attr("disabled", true);
            this.collection.findHouses();
        },

        showLast: function(isAll){
            var frag = $(document.createDocumentFragment());
            var showCount = isAll && this.collection.length || this.collection.length % this.collection.numberOnPage || this.collection.numberOnPage;
            
            _.each(this.collection.last(showCount), function (item) {
                var data = item.toJSON();
                data.cid = item.cid;
                frag.append(this.houseTemplate(data));
            }, this);
            
            this.$("#show_items").append(frag);
        },

		render: function () {
			this.$el.html(this.template({
                count:          this.collection.length,
                isLocation:     this.collection.isLocation,
                searchString:   this.collection.searchString,
                resultCount:    this.collection.resultCount
            }));

            this.showLast(true);
			return this;
		},

        close: function () {
            this.collection.reset();
            this.remove();
        }

	});

	return HousesView;
});
