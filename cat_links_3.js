var CL_config = {
	name: '[[User:DannyS712/Cat links|Cat Links]]',
	version: 3.0,
	location: (window.CL_location || 'p-cactions'),
	testing: true,
	debug: true
};
var CL_choices = {
	cat: null,
	nss: null,
	cat_link: null,
	edit_summary: null,
	list_element: '* '
};

$(function (){
	if (mw.config.get('wgCurRevisionId') === 0 ) return;
	mw.loader.load('//en.wikipedia.org/w/index.php?title=User:DannyS712 test/cat links 3.css&action=raw&ctype=text/css', 'text/css'); // Import stylesheet
	importScript('User:DannyS712 test/append.js');
	importScript('User:DannyS712 test/CL helper.js');
	mw.loader.using(['mediawiki.util', 'mediawiki.api', 'mediawiki.Title', 'mediawiki.RegExp'], cat_links_main());
});

function cat_links_main() {
	mw.util.addPortletLink(CL_config.location, '#', 'CL', 'aca-tag', null, null, "#ca-move");
	$('#aca-tag').on('click', function() {
		$('body').prepend('<div id="CL-modal">'+
			'<div id="CL-interface">'+
				'<h4 id="CL-interface-header"></h4>'+
				'<hr>'+
				'<div id="CL-interface-content"></div>'+
				'<hr>'+
				'<div id="CL-interface-footer"></div>'+
			'</div>'+
		'</div>');
		screen0();
	});
	var screen0 = function() {
		$("#CL-interface-header, #CL-interface-content, #CL-interface-footer").empty();
		$("#CL-interface-header").text("Category links generator...");
		$("#CL-interface-content").text("Loading...");
		screen1();
	};
	var screen1 = function() {
		$("#CL-interface-header, #CL-interface-content, #CL-interface-footer").empty();
		$("#CL-interface-header").text("Category links");
		$("#CL-interface-content").append(
			$('<div>').append( $('<label>').text('What category would you like add add from?') ),
			$('<div>').append( 
				$('<label>').text('Category:'),
				$('<input>').attr({'type':'text','id':'CL-cat-name','name':'CL-cat-name'})
			),
			$('<hr>')
		);
		$('#CL-cat-name').focus();
		$("#CL-interface-content").append(
			$('<div>').css('margin-bottom','0.5em').append(
				$('<div>').append( $('<label>').attr('for','CL-option-newtitle').append('Namespaces to add from:') ),
				$('<div>').append(
					$('<button>').attr('id', 'CL-set-all').text('Select all'),
					$('<button>').attr('id', 'CL-set-none').text('Unselect all'),
					$('<button>').attr('id', 'CL-set-invert').text('Invert selections')
				)
			),
			$('<hr>'),
			$('<div>').attr({'class': 'CL-row'}).append(
				$('<div>').attr({'class': 'CL-column'}).append(
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Article','id':'CL-option-checkbox-Article'}),
						$('<label>').attr({'for':'CL-option-Article', 'id':'CL-option-label-Article'}).text('Articles')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-User','id':'CL-option-checkbox-User'}),
						$('<label>').attr({'for':'CL-option-User', 'id':'CL-option-label-User'}).text('User')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Wikipedia','id':'CL-option-checkbox-Wikipedia'}),
						$('<label>').attr({'for':'CL-option-Wikipedia', 'id':'CL-option-label-Wikipedia'}).text('Wikipedia')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-File','id':'CL-option-checkbox-File'}),
						$('<label>').attr({'for':'CL-option-File', 'id':'CL-option-label-File'}).text('File')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-MediaWiki','id':'CL-option-checkbox-MediaWiki'}),
						$('<label>').attr({'for':'CL-option-MediaWiki', 'id':'CL-option-label-MediaWiki'}).text('MediaWiki')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Template','id':'CL-option-checkbox-Template'}),
						$('<label>').attr({'for':'CL-option-Template', 'id':'CL-option-label-Template'}).text('Template')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Help','id':'CL-option-checkbox-Help'}),
						$('<label>').attr({'for':'CL-option-Help', 'id':'CL-option-label-Help'}).text('Help')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Category','id':'CL-option-checkbox-Category'}),
						$('<label>').attr({'for':'CL-option-Category', 'id':'CL-option-label-Category'}).text('Category')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Portal','id':'CL-option-checkbox-Portal'}),
						$('<label>').attr({'for':'CL-option-Portal', 'id':'CL-option-label-Portal'}).text('Portal')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Book','id':'CL-option-checkbox-Book'}),
						$('<label>').attr({'for':'CL-option-Book', 'id':'CL-option-label-Book'}).text('Book')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Draft','id':'CL-option-checkbox-Draft'}),
						$('<label>').attr({'for':'CL-option-Draft', 'id':'CL-option-label-Draft'}).text('Draft')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-TimedText','id':'CL-option-checkbox-TimedText'}),
						$('<label>').attr({'for':'CL-option-TimedText', 'id':'CL-option-label-TimedText'}).text('TimedText')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Module','id':'CL-option-checkbox-Module'}),
						$('<label>').attr({'for':'CL-option-Module', 'id':'CL-option-label-Module'}).text('Module')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Gadget','id':'CL-option-checkbox-Gadget'}),
						$('<label>').attr({'for':'CL-option-Gadget', 'id':'CL-option-label-Gadget'}).text('Gadget')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Gadget_Definition','id':'CL-option-checkbox-Gadget_Definition'}),
						$('<label>').attr({'for':'CL-option-Gadget_Definition', 'id':'CL-option-label-Gadget_Definition'}).text('Gadget Definition')
					)
				),
				$('<div>').attr({'class': 'CL-column'}).append(
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Talk','id':'CL-option-checkbox-Talk'}),
						$('<label>').attr({'for':'CL-option-Talk', 'id':'CL-option-label-Talk'}).text('Talk')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-User_talk','id':'CL-option-checkbox-User_talk'}),
						$('<label>').attr({'for':'CL-option-User_talk', 'id':'CL-option-label-User_talk'}).text('User talk')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Wikipedia_talk','id':'CL-option-checkbox-Wikipedia_talk'}),
						$('<label>').attr({'for':'CL-option-Wikipedia_talk', 'id':'CL-option-label-Wikipedia_talk'}).text('Wikipedia talk')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-File_talk','id':'CL-option-checkbox-File_talk'}),
						$('<label>').attr({'for':'CL-option-File_talk', 'id':'CL-option-label-File_talk'}).text('File talk')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-MediaWiki_talk','id':'CL-option-checkbox-MediaWiki_talk'}),
						$('<label>').attr({'for':'CL-option-MediaWiki_talk', 'id':'CL-option-label-MediaWiki_talk'}).text('MediaWiki talk')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Template_talk','id':'CL-option-checkbox-Template_talk'}),
						$('<label>').attr({'for':'CL-option-Template_talk', 'id':'CL-option-label-Template_talk'}).text('Template talk')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Help_talk','id':'CL-option-checkbox-Help_talk'}),
						$('<label>').attr({'for':'CL-option-Help_talk', 'id':'CL-option-label-Help_talk'}).text('Help talk')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Category_talk','id':'CL-option-checkbox-Category_talk'}),
						$('<label>').attr({'for':'CL-option-Category_talk', 'id':'CL-option-label-Category_talk'}).text('Category talk')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Portal_talk','id':'CL-option-checkbox-Portal_talk'}),
						$('<label>').attr({'for':'CL-option-Portal_talk', 'id':'CL-option-label-Portal_talk'}).text('Portal talk')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Book_talk','id':'CL-option-checkbox-Book_talk'}),
						$('<label>').attr({'for':'CL-option-Book_talk', 'id':'CL-option-label-Book_talk'}).text('Book talk')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Draft_talk','id':'CL-option-checkbox-Draft_talk'}),
						$('<label>').attr({'for':'CL-option-Draft_talk', 'id':'CL-option-label-Draft_talk'}).text('Draft talk')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-TimedText_talk','id':'CL-option-checkbox-TimedText_talk'}),
						$('<label>').attr({'for':'CL-option-TimedText_talk', 'id':'CL-option-label-TimedText_talk'}).text('TimedText talk')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Module_talk','id':'CL-option-checkbox-Module_talk'}),
						$('<label>').attr({'for':'CL-option-Module_talk', 'id':'CL-option-label-Module_talk'}).text('Module talk')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Gadget_talk','id':'CL-option-checkbox-Gadget_talk'}),
						$('<label>').attr({'for':'CL-option-Gadget_talk', 'id':'CL-option-label-Gadget_talk'}).text('Gadget talk')
					),
					$('<div>').css('margin-bottom','0.5em').append(
						$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Gadget_Definition_talk','id':'CL-option-checkbox-Gadget_Definition_talk'}),
						$('<label>').attr({'for':'CL-option-Gadget_Definition_talk', 'id':'CL-option-label-Gadget_Definition_talk'}).text('Gadget Definition talk')
					)
				)
			)
		);
		$("#CL-interface-footer").append(
			$('<button>').attr('id', 'CL-next').text('Add links!'),
			$('<button>').attr('id', 'CL-cancel').css('margin-left','3em').text('Cancel')
		);
		$("#CL-cancel").click(function(){
			$("#CL-modal").remove();
		});
		$("#CL-next").click(function(){
			get_chosen();
			$("#CL-modal").remove();
		});
		$("#CL-set-all").click(function(){ set_all( true ); });
		$("#CL-set-none").click(function(){ set_all( false ); });
		$("#CL-set-invert").click(function(){ invert_all() });
	};
}
function get_chosen(){
	CL_choices.cat = $('#CL-cat-name').val();
	CL_choices.nss = get_chosen_nss();
	CL_choices.cat_link = '[[:Category:' + CL_choices.cat + ']]';
	CL_choices.edit_summary = 'Adding links from ' + CL_choices.cat_link + ' with ' + CL_config.name + ' (version ' + CL_config.version + ')';

	console.log( CL_choices );
	console.log ( sanity_check() );
	add_links();
}
function sanity_check(){
	if (CL_choices.cat === null || CL_choices.cat === '') return false;
	if (CL_choices.nss.length === 0) return false;
	return true;
}
function add_links () {
	var catRequest = {
        action: 'query',
        list: 'categorymembers',
        cmlimit: 'max',
        cmtitle: 'Category:' + CL_choices.cat,
        cmprop: 'title',
        format: 'json'
	};
	$.get( mw.config.get( 'wgScriptPath' ) + '/api.php', catRequest, function( catResponse ) {
		var pages = catResponse.query.categorymembers;
		var links = "";
		for (var i = 0; i < pages.length; i++) {
			var this_link = make_link( pages[i], CL_choices.nss );
			links = links + this_link;
		}
		if ( links === "" ) alert( "There are no pages in the specified namespace(s) in that category." );
		else addNewSection( CL_choices.edit_summary , 'Pages in ' + CL_choices.cat_link , links );
	} );
}
function make_link( page_element, namespaces ){
	var page_ns = page_element.ns;
	var page_name = page_element.title;
	var this_link = "";
	if ( namespaces.includes ( page_ns ) ) {
		if ( page_ns === 6 || page_ns === 14 ) page_name = ':' + page_name;
		this_link = '* [[' + page_name + ']]\n';
	}
	return this_link;
}
