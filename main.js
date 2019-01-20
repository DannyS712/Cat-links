var accepted_ns = [];

var cl_config = {
	debug: true,
};

mw.loader.using( 'mediawiki.util', function () {
    importScript('User:DannyS712 test/append.js');
    $(document).ready( function () { 
        var link = mw.util.addPortletLink( 'p-cactions', '#', 'Cats', 'ca-cats', 'cats'); 
        $( link ).click( function ( event ) {
            event.preventDefault();
            cats();
        } );
    } );
} );
function cats () {
	var page = prompt("Please enter the category name (not including \"Category:\")", "Wikipedians");
	requested_ns = prompt("What namespace would you like to be included? (Use the namespace number) (If you would like to use mulitple namespaces, seperate each with \', \', or use \'all\' to allow all namespaces)", "0");
	parse_requested_ns( requested_ns );
	
	if (page === null || page === "") {
	  console.log( "User cancelled the prompt." );
	} else {
		console.log( page );
		var catRequest = {
            action: 'query',
            list: 'categorymembers',
            cmlimit: 'max',
            cmtitle: 'Category:' + page,
            cmprop: 'title',
            format: 'json'
		};
		$.get( mw.config.get( 'wgScriptPath' ) + '/api.php', catRequest, function( catResponse ) {
			var pages = catResponse.query.categorymembers;
			var links = "";
			for (var i = 0; i < pages.length; i++) {
				var this_link = make_link( pages[i] );
				links = links + this_link;
			}
			if ( links === "" ) alert( "There are no pages in the specified namespace(s) in that category." );
			else addNewSection( 'Adding links with [[User:DannyS712/Cat links|cat links]]', 'Pages in [[:Category:' + page + ']]', links );
		} );
	}
}
function make_link( page_element ){
	var page_ns = page_element.ns;
	var page_name = page_element.title;
	var this_link = "";
	if ( accepted_ns.includes ( page_ns ) || accepted_ns.includes ( -3 ) )  {
		if ( page_ns === 6 || page_ns === 14 ) page_name = ':' + page_name;
		this_link = '* [[' + page_name + ']]\n';
	}
	return this_link;
}
function parse_requested_ns ( requested_ns ){
	if (cl_config.debug) console.log( requested_ns );
	if ( requested_ns === "all" ) {
		accepted_ns.push( -3 );
		return;
	}

	var ns_string_array = requested_ns.toString().split(", ");
	for (index = 0; index < ns_string_array.length; ++index) {
    	var this_ns = parseInt( ns_string_array[index] );
    	accepted_ns.push( this_ns );
	}
}