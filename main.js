// Install this version with:
// <code><nowiki>		{{subst:Iusc|User:DannyS712/Cat links 2.js}}																	</nowiki></code>
// or with
// <code><nowiki>		importScript( 'User:DannyS712/Cat links 2.js' ); // Backlink: [[User:DannyS712/Cat links 2.js]] 				</nowiki></code> 
//
// Special thanks to User:The Transhumanist for the idea
// If forking this script, please note my contributions / give me credit

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
	var number = parseInt(prompt("How many links would you like added", "10"), 10);

	var ns = 0;
	if (number == -1){
		ns = parseInt(prompt("What namespace would you like to be included? (Use the namespace number)", "0"), 0);
		number = parseInt(prompt("How many links would you like added", "10"), 10);
	}
	
	if (page === null || page === "") {
	  console.log( "User cancelled the prompt." );
	} else {
		console.log( page );
		var catRequest = {
            action: 'query',
            list: 'categorymembers',
            cmlimit: number,
            cmtitle: 'Category:' + page,
            cmprop: 'title',
            format: 'json'
		};
		$.get( mw.config.get( 'wgScriptPath' ) + '/api.php', catRequest, function( catResponse ) {
			var pages = catResponse.query.categorymembers;
			var listed = [];
			var links = "";
			for (var i = 0; i < pages.length; i++) {
				if ( pages[i].ns === ns ) {
					var this_link = '* [[' + pages[i].title + ']]\n';
					listed.push(this_link);
					links = links + this_link;
				}
			}
			if ( links === "" ) {
				alert( "There are no pages in the specified namespace in that category." );
			}
			else addNewSection( 'Adding links with [[User:DannyS712/Cat links|cat links]]', 'Pages in [[:Category:' + page + ']]', links );
		} );
	}
}
