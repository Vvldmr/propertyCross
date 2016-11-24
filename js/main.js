require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	},
	paths: {
		jquery: '../node_modules/jquery/dist/jquery',
		underscore: '../node_modules/underscore/underscore',
		backbone: '../node_modules/backbone/backbone',
		backboneLocalstorage: '../node_modules/backbone.localstorage/backbone.localStorage',
		text: '../node_modules/requirejs-text/text'
	}
});

require([
    'jquery',
    'backbone',
	'routers/router'
], function ($, Backbone, RouterMain) {

	// window.Router = new RouterMain;

    $(document).on("click", "a", function(e) {
        var href = $(this).attr("href");
        var protocol = this.protocol + "//";

        if(href && href.slice(0, protocol.length) !== protocol && href.indexOf("javascript:") !== 0) {
            e.preventDefault();

			RouterMain.navigate(href, true);
        }
    });
});
