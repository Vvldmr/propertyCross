define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/_index.html',
    'collections/faves',
    'collections/houses',
    'collections/lastSearches'
], function ($, _, Backbone, indexTemplate, Faves, Houses, LastSearches) {

	var IndexView = Backbone.View.extend({
		template: _.template(indexTemplate),

        searchType: 'name',

		events: {
            'click #btn_search': 'searchHouse',
            'change #search_type': 'searchTypeChange',
            'click .status-search--content li': 'recentSearch'
		},

        searchTypeChange: function () {
            var type = this.$('#search_type').val(),
                field = this.$('#field_search');
            if(type == 'loc'){
                field.attr('placeholder', '2.34523,-3.5212...');
            }else{
                type = 'name';
                field.attr('placeholder', 'London...');
            }
            this.searchType = type == 'loc' ? type : 'name';
        },

		initialize: function () {
            LastSearches.fetch({reset:true});
		},

		render: function () {
            this.$el.html(this.template({
                favesLength: Faves.length,
                lastSearches: LastSearches.toJSON()
            }));

            return this;
		},

        startSearch: function(){
            var field = this.$('#field_search'),
                btn = this.$('#btn_search'),
                value = field.val();

            if(!value || this.searchType == 'loc' && !/^-?\d+\.\d+, ?-?\d+\.\d+$/.test(value)){
                field.addClass('form-control--danger');
                return false;
            }
            if(this.searchType == 'loc'){
                value = value.replace(' ', '');
            }
            if(field.hasClass('form-control--danger')){
                field.removeClass('form-control--danger');
            }

            field.attr("disabled", true);
            btn.attr("disabled", true);
            
            return value;
        },
        stopSearch: function (response) {
            this.$('#field_search').attr("disabled", false);
            this.$('#btn_search').attr("disabled", false);
            // this.$field_search.val("");

            if(response.error){
                this.$('#error_search').text(response.error);
                this.$('.status-search').hide();

                return;
            }

            var locations = response.locations.pop();
            locations.count = response.total_results;
            LastSearches.addLastSearch(locations);
            
            this.remove();
            Backbone.history.navigate("search", {trigger: true});
        },

        recentSearch: function (e) {
            var id = $(e.target).data('id');

            Houses.findHouses(LastSearches.get(id).get('place_name'), Backbone.history.navigate.bind(Backbone.history, "search", {trigger: true}));
        },

		searchHouse: function () {
            var value = this.startSearch();
            if(!value) return;

            Houses.findHouses(value, this.stopSearch.bind(this), this.searchType === 'loc');
		}
	});

	return IndexView;
});
