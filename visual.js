$(function (){
	if (mw.config.get('wgCurRevisionId') === 0 ) return;
	mw.loader.load('//en.wikipedia.org/w/index.php?title=User:DannyS712 test/interface.css&action=raw&ctype=text/css', 'text/css'); // Import stylesheet
	mw.loader.using(['mediawiki.util', 'mediawiki.api', 'mediawiki.Title', 'mediawiki.RegExp'], cat_links_main());
});

function cat_links_main() {
	mw.util.addPortletLink('p-cactions', '#', 'CL', 'aca-tag', null, null, "#ca-move");
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
		$("#CL-interface-header").text("Tags Manager...");
		$("#CL-interface-content").text("Loading...");
		screen1();
	};
	var screen1 = function() {
		$("#CL-interface-header, #CL-interface-content, #CL-interface-footer").empty();
		$("#CL-interface-header").text("Category links: Namespaces");
		$("#CL-interface-content").append(
			$('<label>').text('What category would you like add add from?: '),
			$('<input>').attr({'type':'text','id':'CL-cat-name','name':'CL-cat-name'})
		);
		$("#CL-interface-content").append(
			$('<div>').css('margin-bottom','0.5em').append(
				$('<label>').attr('for','CL-option-newtitle').append(
					'Namespaces to add from:'
				)
			),
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
	};
}
function get_chosen(){
	var ns_dict = {
  		"Article": 0,
  		"Talk": 1,
  		"User": 2,
  		"User talk": 3,
  		"Wikipedia": 4,
  		"Wikipedia talk": 5,
  		"File": 6,
  		"File talk": 7,
  		"MediaWiki": 8,
  		"MediaWiki talk": 9,
  		"Template": 10,
  		"Template talk": 11,
  		"Help": 12,
  		"Help talk": 13,
  		"Category": 14,
  		"Category talk": 15,
  		"Portal": 100,
  		"Portal talk": 101,
  		"Book": 108,
  		"Book talk": 109,
  		"Draft": 118,
  		"Draft talk": 119,
  		"TimedText": 710,
  		"TimedText talk": 711,
  		"Module": 828,
  		"Module talk": 829,
  		"Gadget": 2300,
  		"Gadget talk": 2301,
  		"Gadget Definition": 2302,
  		"Gadget Definition talk": 2303
	};
	var chosen_ns_s_array = [];
	var chosen_category = $('#CL-cat-name').val();

	if ($("#CL-option-checkbox-Article").prop("checked")) chosen_ns_s_array.push(ns_dict["Article"]);
	if ($("#CL-option-checkbox-Talk").prop("checked")) chosen_ns_s_array.push(ns_dict["Talk"]);
	if ($("#CL-option-checkbox-User").prop("checked")) chosen_ns_s_array.push(ns_dict["User"]);
	if ($("#CL-option-checkbox-User_talk").prop("checked")) chosen_ns_s_array.push(ns_dict["User talk"]);
	if ($("#CL-option-checkbox-Wikipedia").prop("checked")) chosen_ns_s_array.push(ns_dict["Wikipedia"]);
	if ($("#CL-option-checkbox-Wikipedia_talk").prop("checked")) chosen_ns_s_array.push(ns_dict["Wikipedia talk"]);
	if ($("#CL-option-checkbox-File").prop("checked")) chosen_ns_s_array.push(ns_dict["File"]);
	if ($("#CL-option-checkbox-File_talk").prop("checked")) chosen_ns_s_array.push(ns_dict["File talk"]);
	if ($("#CL-option-checkbox-MediaWiki").prop("checked")) chosen_ns_s_array.push(ns_dict["MediaWiki"]);
	if ($("#CL-option-checkbox-MediaWiki_talk").prop("checked")) chosen_ns_s_array.push(ns_dict["MediaWiki talk"]);
	if ($("#CL-option-checkbox-Template").prop("checked")) chosen_ns_s_array.push(ns_dict["Template"]);
	if ($("#CL-option-checkbox-Template_talk").prop("checked")) chosen_ns_s_array.push(ns_dict["Template talk"]);
	if ($("#CL-option-checkbox-Help").prop("checked")) chosen_ns_s_array.push(ns_dict["Help"]);
	if ($("#CL-option-checkbox-Help_talk").prop("checked")) chosen_ns_s_array.push(ns_dict["Help talk"]);
	if ($("#CL-option-checkbox-Category").prop("checked")) chosen_ns_s_array.push(ns_dict["Category"]);
	if ($("#CL-option-checkbox-Category_talk").prop("checked")) chosen_ns_s_array.push(ns_dict["Category talk"]);
	if ($("#CL-option-checkbox-Portal").prop("checked")) chosen_ns_s_array.push(ns_dict["Portal"]);
	if ($("#CL-option-checkbox-Portal_talk").prop("checked")) chosen_ns_s_array.push(ns_dict["Portal talk"]);
	if ($("#CL-option-checkbox-Book").prop("checked")) chosen_ns_s_array.push(ns_dict["Book"]);
	if ($("#CL-option-checkbox-Book_talk").prop("checked")) chosen_ns_s_array.push(ns_dict["Book talk"]);
	if ($("#CL-option-checkbox-Draft").prop("checked")) chosen_ns_s_array.push(ns_dict["Draft"]);
	if ($("#CL-option-checkbox-Draft_talk").prop("checked")) chosen_ns_s_array.push(ns_dict["Draft talk"]);
	if ($("#CL-option-checkbox-TimedText").prop("checked")) chosen_ns_s_array.push(ns_dict["TimedText"]);
	if ($("#CL-option-checkbox-TimedText_talk").prop("checked")) chosen_ns_s_array.push(ns_dict["TimedText talk"]);
	if ($("#CL-option-checkbox-Module").prop("checked")) chosen_ns_s_array.push(ns_dict["Module"]);
	if ($("#CL-option-checkbox-Module_talk").prop("checked")) chosen_ns_s_array.push(ns_dict["Module talk"]);
	if ($("#CL-option-checkbox-Gadget").prop("checked")) chosen_ns_s_array.push(ns_dict["Gadget"]);
	if ($("#CL-option-checkbox-Gadget_talk").prop("checked")) chosen_ns_s_array.push(ns_dict["Gadget talk"]);
	if ($("#CL-option-checkbox-Gadget_Definition").prop("checked")) chosen_ns_s_array.push(ns_dict["Gadget Definition"]);
	if ($("#CL-option-checkbox-Gadget_Definition_talk").prop("checked")) chosen_ns_s_array.push(ns_dict["Gadget Definition talk"]);

	var choices = {
		cat: chosen_category,
		nss: chosen_ns_s_array
	};
	console.log( choices );
	console.log ( sanity_check( choices ) );
}
function sanity_check( choices ){
	if (choices.cat === null || choices.cat === ''){
		return false;
	}
	if (choices.nss.length === 0){
		return false;
	}
	return true;
}