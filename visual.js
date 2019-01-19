$(function (){
	if (mw.config.get('wgCurRevisionId') === 0 ) return;
	mw.loader.using(['mediawiki.util', 'mediawiki.api', 'mediawiki.Title', 'mediawiki.RegExp'], tagsmanager());
});

function tagsmanager() {
	var config = {};
	config.script = {
		advert:  ' ([[User:Abelmoschus Esculentus/TagsManager.js|TagsManager.js]])',
		version: ' (1.0.2)'
	};
	config.mw = mw.config.get( [
		'wgArticleId',
		'wgPageName',
		'wgUserGroups',
		'wgUserName',
	]);
	config.pagedata = {};
	var API = new mw.Api( {
		ajax: {
			headers: { 
				'Api-User-Agent': 'TagsManager/' + config.script.version + 
					'(https://en.wikipedia.org/wiki/User:Abelmoschus_Esculentus/TagsManager)'
			}
		}
	});
	mw.util.addPortletLink('p-cactions', '#', 'Tags M', 'aca-tag', null, null, "#ca-move");
	$('#aca-tag').on('click', function() {
		$('body').prepend('<div id="TH-modal">'+
			'<div id="TH-interface">'+
				'<h4 id="TH-interface-header"></h4>'+
				'<hr>'+
				'<div id="TH-interface-content"></div>'+
				'<hr>'+
				'<div id="TH-interface-footer"></div>'+
			'</div>'+
		'</div>');
		$("#TH-modal").css({
			"position": "fixed",
			"z-index": "1",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"overflow": "hidden",
			"background-color": "rgba(0,0,0,0.4)"
		});
		$("#TH-interface").css({
			"background-color": "#f0f0f0",
			"margin": "15% auto",
			"padding": "2px 20px",
			"border": "1px solid #888",
			"width": "80%",
			"max-width": "60em",
			"font-size": "90%"
		});
		$("#TH-interface-content").css({
			"min-height": "7em",
			"width" : "875px",
			"height" : "400px",
			"overflow-y": "scroll"
		});
		$("#TH-interface-footor").css("min-height", "3em");
		screen0();
	});
	var pagedata = function() {
		var checkPageData = function() {
			if (config.pagedata.oldwikitext !== null) {
				screen1();
			}
		};
		API.get( {
			action: 'query',
			pageids: config.mw.wgArticleId,
			prop: 'revisions',
			rvprop: 'content'
		})
		.done( function(result) {
			config.pagedata.oldwikitext = result.query.pages[config.mw.wgArticleId].revisions[0]['*'];
			checkPageData();
		})
		.fail(function(c,r) {
			API.abort();
			var retry = confirm("Could not retrieve page wikitext:\n"+"\n\nTry again?");
			if (retry) {
				pagedata();
			} 
			else {
				$("#TH-modal").remove();
			}
		});
	};
	var screen0 = function() {
		$("#TH-interface-header, #TH-interface-content, #TH-interface-footer").empty();
		$("#TH-interface-header").text("Tags Manager...");
		$("#TH-interface-content").text("Loading...");
		pagedata();
	};
	var screen1 = function() {
		$("#TH-interface-header, #TH-interface-content, #TH-interface-footer").empty();
		$("#TH-interface-header").text("Tags Manager: options");
		$("#TH-interface-content").append(
			$('<div>').css('margin-bottom','0.5em').append(
				$('<label>').attr('for','TH-option-newtitle').append(
					'Tags available:'
				)
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Article','id':'TH-option-checkbox-Article'}),
				$('<label>').attr({'for':'TH-option-Article', 'id':'TH-option-label-Article'}).text('Articles')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Talk','id':'TH-option-checkbox-Talk'}),
				$('<label>').attr({'for':'TH-option-Talk', 'id':'TH-option-label-Talk'}).text('Talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-User','id':'TH-option-checkbox-User'}),
				$('<label>').attr({'for':'TH-option-User', 'id':'TH-option-label-User'}).text('User')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-User_talk','id':'TH-option-checkbox-User_talk'}),
				$('<label>').attr({'for':'TH-option-User_talk', 'id':'TH-option-label-User_talk'}).text('User talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Wikipedia','id':'TH-option-checkbox-Wikipedia'}),
				$('<label>').attr({'for':'TH-option-Wikipedia', 'id':'TH-option-label-Wikipedia'}).text('Wikipedia')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Wikipedia_talk','id':'TH-option-checkbox-Wikipedia_talk'}),
				$('<label>').attr({'for':'TH-option-Wikipedia_talk', 'id':'TH-option-label-Wikipedia_talk'}).text('Wikipedia talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-File','id':'TH-option-checkbox-File'}),
				$('<label>').attr({'for':'TH-option-File', 'id':'TH-option-label-File'}).text('File')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-File_talk','id':'TH-option-checkbox-File_talk'}),
				$('<label>').attr({'for':'TH-option-File_talk', 'id':'TH-option-label-File_talk'}).text('File talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-MediaWiki','id':'TH-option-checkbox-MediaWiki'}),
				$('<label>').attr({'for':'TH-option-MediaWiki', 'id':'TH-option-label-MediaWiki'}).text('MediaWiki')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-MediaWiki_talk','id':'TH-option-checkbox-MediaWiki_talk'}),
				$('<label>').attr({'for':'TH-option-MediaWiki_talk', 'id':'TH-option-label-MediaWiki_talk'}).text('MediaWiki talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Template','id':'TH-option-checkbox-Template'}),
				$('<label>').attr({'for':'TH-option-Template', 'id':'TH-option-label-Template'}).text('Template')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Template_talk','id':'TH-option-checkbox-Template_talk'}),
				$('<label>').attr({'for':'TH-option-Template_talk', 'id':'TH-option-label-Template_talk'}).text('Template talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Help','id':'TH-option-checkbox-Help'}),
				$('<label>').attr({'for':'TH-option-Help', 'id':'TH-option-label-Help'}).text('Help')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Help_talk','id':'TH-option-checkbox-Help_talk'}),
				$('<label>').attr({'for':'TH-option-Help_talk', 'id':'TH-option-label-Help_talk'}).text('Help talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Category','id':'TH-option-checkbox-Category'}),
				$('<label>').attr({'for':'TH-option-Category', 'id':'TH-option-label-Category'}).text('Category')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Category_talk','id':'TH-option-checkbox-Category_talk'}),
				$('<label>').attr({'for':'TH-option-Category_talk', 'id':'TH-option-label-Category_talk'}).text('Category talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Portal','id':'TH-option-checkbox-Portal'}),
				$('<label>').attr({'for':'TH-option-Portal', 'id':'TH-option-label-Portal'}).text('Portal')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Portal_talk','id':'TH-option-checkbox-Portal_talk'}),
				$('<label>').attr({'for':'TH-option-Portal_talk', 'id':'TH-option-label-Portal_talk'}).text('Portal talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Book','id':'TH-option-checkbox-Book'}),
				$('<label>').attr({'for':'TH-option-Book', 'id':'TH-option-label-Book'}).text('Book')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Book_talk','id':'TH-option-checkbox-Book_talk'}),
				$('<label>').attr({'for':'TH-option-Book_talk', 'id':'TH-option-label-Book_talk'}).text('Book talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Draft','id':'TH-option-checkbox-Draft'}),
				$('<label>').attr({'for':'TH-option-Draft', 'id':'TH-option-label-Draft'}).text('Draft')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Draft_talk','id':'TH-option-checkbox-Draft_talk'}),
				$('<label>').attr({'for':'TH-option-Draft_talk', 'id':'TH-option-label-Draft_talk'}).text('Draft talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-TimedText','id':'TH-option-checkbox-TimedText'}),
				$('<label>').attr({'for':'TH-option-TimedText', 'id':'TH-option-label-TimedText'}).text('TimedText')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-TimedText_talk','id':'TH-option-checkbox-TimedText_talk'}),
				$('<label>').attr({'for':'TH-option-TimedText_talk', 'id':'TH-option-label-TimedText_talk'}).text('TimedText talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Module','id':'TH-option-checkbox-Module'}),
				$('<label>').attr({'for':'TH-option-Module', 'id':'TH-option-label-Module'}).text('Module')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Module_talk','id':'TH-option-checkbox-Module_talk'}),
				$('<label>').attr({'for':'TH-option-Module_talk', 'id':'TH-option-label-Module_talk'}).text('Module talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Gadget','id':'TH-option-checkbox-Gadget'}),
				$('<label>').attr({'for':'TH-option-Gadget', 'id':'TH-option-label-Gadget'}).text('Gadget')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Gadget_talk','id':'TH-option-checkbox-Gadget_talk'}),
				$('<label>').attr({'for':'TH-option-Gadget_talk', 'id':'TH-option-label-Gadget_talk'}).text('Gadget talk')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Gadget_Definition','id':'TH-option-checkbox-Gadget_Definition'}),
				$('<label>').attr({'for':'TH-option-Gadget_Definition', 'id':'TH-option-label-Gadget_Definition'}).text('Gadget Definition')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-Gadget_Definition_talk','id':'TH-option-checkbox-Gadget_Definition_talk'}),
				$('<label>').attr({'for':'TH-option-Gadget_Definition_talk', 'id':'TH-option-label-Gadget_Definition_talk'}).text('Gadget Definition talk')
			)
		);
		$("#TH-interface-footer").append(
			$('<label>').text('Edit summary: '),
			$('<input>').attr({'type':'text','id':'TH-editsummary','name':'TH-editsummary'}),
			$('<br />'),
			$('<button>').attr('id', 'TH-next').text('Tag!'),
			$('<button>').attr('id', 'TH-cancel').css('margin-left','3em').text('Cancel')
		);
		var content = config.pagedata.oldwikitext;
		$("#TH-cancel").click(function(){
			$("#TH-modal").remove();
		});
		$("#TH-next").click(function(){
			var editsummary = $('#TH-editsummary').val();
			var wikitext = "";
			if ($("#TH-option-checkbox-Article").prop("checked")) console.log("Articles");
			if ($("#TH-option-checkbox-Talk").prop("checked")) console.log("Talk");
			if ($("#TH-option-checkbox-User").prop("checked")) console.log("User");
			if ($("#TH-option-checkbox-User_talk").prop("checked")) console.log("User talk");
			if ($("#TH-option-checkbox-Wikipedia").prop("checked")) console.log("Wikipedia");
			if ($("#TH-option-checkbox-Wikipedia_talk").prop("checked")) console.log("Wikipedia talk");
			if ($("#TH-option-checkbox-File").prop("checked")) console.log("File");
			if ($("#TH-option-checkbox-File_talk").prop("checked")) console.log("File talk");
			if ($("#TH-option-checkbox-MediaWiki").prop("checked")) console.log("MediaWiki");
			if ($("#TH-option-checkbox-MediaWiki_talk").prop("checked")) console.log("MediaWiki talk");
			if ($("#TH-option-checkbox-Template").prop("checked")) console.log("Template");
			if ($("#TH-option-checkbox-Template_talk").prop("checked")) console.log("Template talk");
			if ($("#TH-option-checkbox-Help").prop("checked")) console.log("Help");
			if ($("#TH-option-checkbox-Help_talk").prop("checked")) console.log("Help talk");
			if ($("#TH-option-checkbox-Category").prop("checked")) console.log("Category");
			if ($("#TH-option-checkbox-Category_talk").prop("checked")) console.log("Category talk");
			if ($("#TH-option-checkbox-Portal").prop("checked")) console.log("Portal");
			if ($("#TH-option-checkbox-Portal_talk").prop("checked")) console.log("Portal talk");
			if ($("#TH-option-checkbox-Book").prop("checked")) console.log("Book");
			if ($("#TH-option-checkbox-Book_talk").prop("checked")) console.log("Book talk");
			if ($("#TH-option-checkbox-Draft").prop("checked")) console.log("Draft");
			if ($("#TH-option-checkbox-Draft_talk").prop("checked")) console.log("Draft talk");
			if ($("#TH-option-checkbox-TimedText").prop("checked")) console.log("TimedText");
			if ($("#TH-option-checkbox-TimedText_talk").prop("checked")) console.log("TimedText talk");
			if ($("#TH-option-checkbox-Module").prop("checked")) console.log("Module");
			if ($("#TH-option-checkbox-Module_talk").prop("checked")) console.log("Module talk");
			if ($("#TH-option-checkbox-Gadget").prop("checked")) console.log("Gadget");
			if ($("#TH-option-checkbox-Gadget_talk").prop("checked")) console.log("Gadget talk");
			if ($("#TH-option-checkbox-Gadget_Definition").prop("checked")) console.log("Gadget Definition");
			if ($("#TH-option-checkbox-Gadget_Definition_talk").prop("checked")) console.log("Gadget Definition talk");
			wikitext += content;
			screen2(wikitext, editsummary);
		});
	};
	var screen2 = function(wikitext, editsummary) {
		$("#TH-interface-header, #TH-interface-content, #TH-interface-footer").empty();
		$("#TH-interface-header").text("Tags Manager: In progress...");
		$("#TH-interface-content").append(
			$('<ul>').attr('id', 'TH-tasks').css("color", "#888").append(
				$('<li>').attr('id', 'TH-task0').append(
					'Editing page ',
					$('<span>').attr('id','TH-status0').text('waiting')
				)
			)
		);
		$("#TH-interface-footer").append(
			$('<button>').attr('id', 'TH-abort').text('Abort'),
			$('<span>').attr('id', 'TH-finished').hide().append(
				'Finished!<br />',
				$('<button>').attr('id', 'TH-close').text('Close')
			)
		);
		$("#TH-close").click( function(){
			$("#TH-modal").remove();
			window.location.reload();
		});
		$("TH-abort").click(function(){
			API.abort();
			$("#TH-modal").remove();
			window.location.reload();
		});
		tag(wikitext, editsummary);
	};
	var tag = function(wikitext, editsummary) {
		$("#TH-task0").css({"color":"#00F", "font-weight":"bold"});
		$("#TH-status0").html("...");
		if (editsummary === '') {
			editsummary = "Editing tags";
		}
		API.postWithToken( 'edit', {
			action: 'edit',
			title: config.mw.wgPageName,
			text: wikitext,
			summary: editsummary + config.script.Talk
		})
		.done( function() {
		$("#TH-task0").css({"color":"#000", "font-weight":""});
				$("#TH-status0").append(" Done!");
				$("#TH-finished, #TH-abort").toggle();
		})
		.fail( function(c,r) {
			if (r.textStatus === 'abort') { return; }
			var retry = confirm("Could not tag the page:\n" + "\n\nTry again?");
			if (retry) {
				tag(wikitext);
			}
			else {
				$("#TH-task0").css({"color":"#F00", "font-weight":""});
				$("#TH-status0").append(" Skipped");
				$("#TH-finished, #TH-abort").toggle();
			}
		});
	};
};