$(function (){
	if (mw.config.get('wgCurRevisionId') === 0 ) return;
	<link rel="stylesheet" type="text/css" href="/interface.css"/>
	mw.loader.using(['mediawiki.util', 'mediawiki.api', 'mediawiki.Title', 'mediawiki.RegExp'], tagsmanager());
});

function tagsmanager() {
	mw.util.addPortletLink('p-cactions', '#', 'Tags M', 'aca-tag', null, null, "#ca-move");
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
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Article','id':'CL-option-checkbox-Article'}),
				$('<label>').attr({'for':'CL-option-Article', 'id':'CL-option-label-Article'}).text('Articles')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Talk','id':'CL-option-checkbox-Talk'}),
				$('<label>').attr({'for':'CL-option-Talk', 'id':'CL-option-label-Talk'}).text('Talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-User','id':'CL-option-checkbox-User'}),
				$('<label>').attr({'for':'CL-option-User', 'id':'CL-option-label-User'}).text('User')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-User_talk','id':'CL-option-checkbox-User_talk'}),
				$('<label>').attr({'for':'CL-option-User_talk', 'id':'CL-option-label-User_talk'}).text('User talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Wikipedia','id':'CL-option-checkbox-Wikipedia'}),
				$('<label>').attr({'for':'CL-option-Wikipedia', 'id':'CL-option-label-Wikipedia'}).text('Wikipedia')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Wikipedia_talk','id':'CL-option-checkbox-Wikipedia_talk'}),
				$('<label>').attr({'for':'CL-option-Wikipedia_talk', 'id':'CL-option-label-Wikipedia_talk'}).text('Wikipedia talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-File','id':'CL-option-checkbox-File'}),
				$('<label>').attr({'for':'CL-option-File', 'id':'CL-option-label-File'}).text('File')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-File_talk','id':'CL-option-checkbox-File_talk'}),
				$('<label>').attr({'for':'CL-option-File_talk', 'id':'CL-option-label-File_talk'}).text('File talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-MediaWiki','id':'CL-option-checkbox-MediaWiki'}),
				$('<label>').attr({'for':'CL-option-MediaWiki', 'id':'CL-option-label-MediaWiki'}).text('MediaWiki')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-MediaWiki_talk','id':'CL-option-checkbox-MediaWiki_talk'}),
				$('<label>').attr({'for':'CL-option-MediaWiki_talk', 'id':'CL-option-label-MediaWiki_talk'}).text('MediaWiki talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Template','id':'CL-option-checkbox-Template'}),
				$('<label>').attr({'for':'CL-option-Template', 'id':'CL-option-label-Template'}).text('Template')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Template_talk','id':'CL-option-checkbox-Template_talk'}),
				$('<label>').attr({'for':'CL-option-Template_talk', 'id':'CL-option-label-Template_talk'}).text('Template talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Help','id':'CL-option-checkbox-Help'}),
				$('<label>').attr({'for':'CL-option-Help', 'id':'CL-option-label-Help'}).text('Help')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Help_talk','id':'CL-option-checkbox-Help_talk'}),
				$('<label>').attr({'for':'CL-option-Help_talk', 'id':'CL-option-label-Help_talk'}).text('Help talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Category','id':'CL-option-checkbox-Category'}),
				$('<label>').attr({'for':'CL-option-Category', 'id':'CL-option-label-Category'}).text('Category')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Category_talk','id':'CL-option-checkbox-Category_talk'}),
				$('<label>').attr({'for':'CL-option-Category_talk', 'id':'CL-option-label-Category_talk'}).text('Category talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Portal','id':'CL-option-checkbox-Portal'}),
				$('<label>').attr({'for':'CL-option-Portal', 'id':'CL-option-label-Portal'}).text('Portal')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Portal_talk','id':'CL-option-checkbox-Portal_talk'}),
				$('<label>').attr({'for':'CL-option-Portal_talk', 'id':'CL-option-label-Portal_talk'}).text('Portal talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Book','id':'CL-option-checkbox-Book'}),
				$('<label>').attr({'for':'CL-option-Book', 'id':'CL-option-label-Book'}).text('Book')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Book_talk','id':'CL-option-checkbox-Book_talk'}),
				$('<label>').attr({'for':'CL-option-Book_talk', 'id':'CL-option-label-Book_talk'}).text('Book talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Draft','id':'CL-option-checkbox-Draft'}),
				$('<label>').attr({'for':'CL-option-Draft', 'id':'CL-option-label-Draft'}).text('Draft')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Draft_talk','id':'CL-option-checkbox-Draft_talk'}),
				$('<label>').attr({'for':'CL-option-Draft_talk', 'id':'CL-option-label-Draft_talk'}).text('Draft talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-TimedText','id':'CL-option-checkbox-TimedText'}),
				$('<label>').attr({'for':'CL-option-TimedText', 'id':'CL-option-label-TimedText'}).text('TimedText')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-TimedText_talk','id':'CL-option-checkbox-TimedText_talk'}),
				$('<label>').attr({'for':'CL-option-TimedText_talk', 'id':'CL-option-label-TimedText_talk'}).text('TimedText talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Module','id':'CL-option-checkbox-Module'}),
				$('<label>').attr({'for':'CL-option-Module', 'id':'CL-option-label-Module'}).text('Module')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Module_talk','id':'CL-option-checkbox-Module_talk'}),
				$('<label>').attr({'for':'CL-option-Module_talk', 'id':'CL-option-label-Module_talk'}).text('Module talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Gadget','id':'CL-option-checkbox-Gadget'}),
				$('<label>').attr({'for':'CL-option-Gadget', 'id':'CL-option-label-Gadget'}).text('Gadget')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Gadget_talk','id':'CL-option-checkbox-Gadget_talk'}),
				$('<label>').attr({'for':'CL-option-Gadget_talk', 'id':'CL-option-label-Gadget_talk'}).text('Gadget talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Gadget_Definition','id':'CL-option-checkbox-Gadget_Definition'}),
				$('<label>').attr({'for':'CL-option-Gadget_Definition', 'id':'CL-option-label-Gadget_Definition'}).text('Gadget Definition')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'CL-option-checkbox-Gadget_Definition_talk','id':'CL-option-checkbox-Gadget_Definition_talk'}),
				$('<label>').attr({'for':'CL-option-Gadget_Definition_talk', 'id':'CL-option-label-Gadget_Definition_talk'}).text('Gadget Definition talk')
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
			var chosen_category = $('#CL-cat-name').val();
			console.log( chosen_category );
			if ($("#CL-option-checkbox-Article").prop("checked")) console.log("Articles");
			if ($("#CL-option-checkbox-Talk").prop("checked")) console.log("Talk");
			if ($("#CL-option-checkbox-User").prop("checked")) console.log("User");
			if ($("#CL-option-checkbox-User_talk").prop("checked")) console.log("User talk");
			if ($("#CL-option-checkbox-Wikipedia").prop("checked")) console.log("Wikipedia");
			if ($("#CL-option-checkbox-Wikipedia_talk").prop("checked")) console.log("Wikipedia talk");
			if ($("#CL-option-checkbox-File").prop("checked")) console.log("File");
			if ($("#CL-option-checkbox-File_talk").prop("checked")) console.log("File talk");
			if ($("#CL-option-checkbox-MediaWiki").prop("checked")) console.log("MediaWiki");
			if ($("#CL-option-checkbox-MediaWiki_talk").prop("checked")) console.log("MediaWiki talk");
			if ($("#CL-option-checkbox-Template").prop("checked")) console.log("Template");
			if ($("#CL-option-checkbox-Template_talk").prop("checked")) console.log("Template talk");
			if ($("#CL-option-checkbox-Help").prop("checked")) console.log("Help");
			if ($("#CL-option-checkbox-Help_talk").prop("checked")) console.log("Help talk");
			if ($("#CL-option-checkbox-Category").prop("checked")) console.log("Category");
			if ($("#CL-option-checkbox-Category_talk").prop("checked")) console.log("Category talk");
			if ($("#CL-option-checkbox-Portal").prop("checked")) console.log("Portal");
			if ($("#CL-option-checkbox-Portal_talk").prop("checked")) console.log("Portal talk");
			if ($("#CL-option-checkbox-Book").prop("checked")) console.log("Book");
			if ($("#CL-option-checkbox-Book_talk").prop("checked")) console.log("Book talk");
			if ($("#CL-option-checkbox-Draft").prop("checked")) console.log("Draft");
			if ($("#CL-option-checkbox-Draft_talk").prop("checked")) console.log("Draft talk");
			if ($("#CL-option-checkbox-TimedText").prop("checked")) console.log("TimedText");
			if ($("#CL-option-checkbox-TimedText_talk").prop("checked")) console.log("TimedText talk");
			if ($("#CL-option-checkbox-Module").prop("checked")) console.log("Module");
			if ($("#CL-option-checkbox-Module_talk").prop("checked")) console.log("Module talk");
			if ($("#CL-option-checkbox-Gadget").prop("checked")) console.log("Gadget");
			if ($("#CL-option-checkbox-Gadget_talk").prop("checked")) console.log("Gadget talk");
			if ($("#CL-option-checkbox-Gadget_Definition").prop("checked")) console.log("Gadget Definition");
			if ($("#CL-option-checkbox-Gadget_Definition_talk").prop("checked")) console.log("Gadget Definition talk");
			$("#CL-modal").remove();
		});
	};
}