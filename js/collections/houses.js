/*global define */
define([
    'jquery',
	'underscore',
	'backbone',
	'models/house'
], function ($, _, Backbone, House) {

	var TodosCollection = Backbone.Collection.extend({
		model: House,

        numberOnPage: 10,

        isAmbiguous: false,
        resultCount: 0,

        pageNumber: 1,
        searchString: '',
        isLocation: false,

		findHouses: function(value, callback, isLocation){
            if(isLocation !== undefined){
                this.isLocation = !!isLocation;
            }
            if(value){
                this.searchString = value;
            }else{
                this.pageNumber += 1;
            }

			var searchData = {
				country: 'uk',
				pretty: 1,
				action: 'search_listings',
				encoding: 'json',
				listing_type: 'buy',
				page: this.pageNumber,
				number_of_results: this.numberOnPage
			};

            searchData[this.isLocation ? 'centre_point' : 'place_name'] = this.searchString;

			$.ajax({
				url: "http://api.nestoria.co.uk/api",
				data: searchData,
				method: 'GET',
				timeout: 5000,
				dataType: "jsonp",
				success: (function(data) {
                    this.resultCount = data.response.total_results;
					
                    switch (data.response.application_response_code) {
					    case "100":
					    case "101":
					    case "110":
                            this.isAmbiguous = false;
					        break;
					    case "200":
					    case "202":
                            this.isAmbiguous = true;
					        break;
                        default:
                            data.response.error = "Bad request";
					}
                    if(!data.response.listings.length || !data.response.locations.length){
                        data.response.error = data.response.error || !data.response.locations.length ?
                            'The location given was not recognised.'
                            :
                            'There were no properties found for the given location';
                    }else{
                        this.add(data.response.listings);
                        this.trigger('addSuccess')
                    }
                    if(callback){
                        callback(data.response);
                    }
				}).bind(this),
				error: function() {
                    callback({
                        error: 'n error occurred while searching. Please check your network connection and try again.'
                    });
                }
			});
		}
	});

	return new TodosCollection();
});
