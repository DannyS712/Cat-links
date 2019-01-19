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
		'wgMonthNames'
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
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-multiple','id':'TH-option-checkbox-multiple'}),
				$('<label>').attr({'for':'TH-option-multiple', 'id':'TH-option-label-multiple'}).text('Group inside {{multiple issues}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-advert','id':'TH-option-checkbox-advert'}),
				$('<label>').attr({'for':'TH-option-advert', 'id':'TH-option-label-advert'}).text('{{advert}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-allplot','id':'TH-option-checkbox-allplot'}),
				$('<label>').attr({'for':'TH-option-allplot', 'id':'TH-option-label-allplot'}).text('{{all plot}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-autobiography','id':'TH-option-checkbox-autobiography'}),
				$('<label>').attr({'for':'TH-option-autobiography', 'id':'TH-option-label-autobiography'}).text('{{autobiography}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-BLPsources','id':'TH-option-checkbox-BLPsources'}),
				$('<label>').attr({'for':'TH-option-BLPsources', 'id':'TH-option-label-BLPsources'}).text('{{BLP sources}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-BLPunsourced','id':'TH-option-checkbox-BLPunsourced'}),
				$('<label>').attr({'for':'TH-option-BLPunsourced', 'id':'TH-option-label-BLPunsourced'}).text('{{BLP unsourced}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-citationstyle','id':'TH-option-checkbox-citationstyle'}),
				$('<label>').attr({'for':'TH-option-citationstyle', 'id':'TH-option-label-citationstyle'}).text('{{citation style}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-cleanup','id':'TH-option-checkbox-cleanup'}),
				$('<label>').attr({'for':'TH-option-cleanup', 'id':'TH-option-label-cleanup'}).text('{{cleanup}}		Reason:'),
				$('<input>').attr({'type':'text', 'name':'TH-option-cleanup', 'id':'TH-option-cleanup'})
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-cleanup-reorganize','id':'TH-option-checkbox-cleanup-reorganize'}),
				$('<label>').attr({'for':'TH-option-cleanup-reorganize', 'id':'TH-option-label-cleanup-reorganize'}).text('{{cleanup-reorganize}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-closeparaphrasing','id':'TH-option-checkbox-closeparaphrasing'}),
				$('<label>').attr({'for':'TH-option-closeparaphrasing', 'id':'TH-option-label-closeparaphrasing'}).text('{{close paraphrasing}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-COI','id':'TH-option-checkbox-COI'}),
				$('<label>').attr({'for':'TH-option-COI', 'id':'TH-option-label-COI'}).text('{{COI}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-condense','id':'TH-option-checkbox-condense'}),
				$('<label>').attr({'for':'TH-option-condense', 'id':'TH-option-label-condense'}).text('{{condense}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-confusing','id':'TH-option-checkbox-confusing'}),
				$('<label>').attr({'for':'TH-option-confusing', 'id':'TH-option-label-confusing'}).text('{{confusing}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-context','id':'TH-option-checkbox-context'}),
				$('<label>').attr({'for':'TH-option-context', 'id':'TH-option-label-context'}).text('{{context}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-copyedit','id':'TH-option-checkbox-copyedit'}),
				$('<label>').attr({'for':'TH-option-copyedit', 'id':'TH-option-label-copyedit'}).text('{{copy edit}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-copypaste','id':'TH-option-checkbox-copypaste'}),
				$('<label>').attr({'for':'TH-option-copypaste', 'id':'TH-option-label-copypaste'}).text('{{copypaste}}		URL:'),
				$('<input>').attr({'type':'text', 'name':'TH-option-copypaste', 'id':'TH-option-copypaste'})
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-disputed','id':'TH-option-checkbox-disputed'}),
				$('<label>').attr({'for':'TH-option-disputed', 'id':'TH-option-label-disputed'}).text('{{disputed}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-essay-like','id':'TH-option-checkbox-essay-like'}),
				$('<label>').attr({'for':'TH-option-essay-like', 'id':'TH-option-label-essay-like'}).text('{{essay-like}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-expandlanguage','id':'TH-option-checkbox-expandlanguage'}),
				$('<label>').attr({'for':'TH-option-expandlanguage', 'id':'TH-option-label-expandlanguage'}).text('{{expand language}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-expertneeded','id':'TH-option-checkbox-expertneeded'}),
				$('<label>').attr({'for':'TH-option-expertneeded', 'id':'TH-option-label-expertneeded'}).text('{{expert needed}}')
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
		var string = "{{advert";
		var adv = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-advert').click();
			adv = 1;
		}
		string = "{{all plot";
		var allplot = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-allplot').click();
			allplot = 1;
		}
		string = "{{autobiography";
		var autobiography = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-autobiography').click();
			autobiography = 1;
		}
		string = "{{BLP sources";
		var BLPsources = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-BLPsources').click();
			BLPsources = 1;
		}
		string = "{{BLP unsourced";
		var BLPunsourced = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-BLPunsourced').click();
			BLPunsourced = 1;
		}
		string = "{{citation style";
		var citationstyle = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-citationstyle').click();
			citationstyle = 1;
		}
		string = "{{cleanup";
		var cleanup = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-cleanup').click();
			var string1 = "{{cleanup|reason=";
			var string2 = "{{cleanup|reason=|";
			if (content.includes(string1) && !content.includes(string2)) {
				var temp1 = content.indexOf('{{cleanup|reason=');
				var temp2 = content.indexOf('|', temp1+18);
				var temp3 = content.substring(temp1+17,temp2);
				document.getElementById('TH-option-cleanup').value = temp3;
			}
			cleanup = 1;
		}
		string = "{{cleanup-reorganize";
		var cleanup_reorganize = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-cleanup-reorganize').click();
			cleanup_reorganize = 1;
		}
		string = "{{close paraphrasing";
		var closeparaphrasing = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-closeparaphrasing').click();
			closeparaphrasing = 1;
		}
		string = "{{COI";
		var COI = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-COI').click();
			COI = 1;
		}
		string = "{{condense";
		var condense = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-condense').click();
			condense = 1;
		}
		string = "{{confusing";
		var confusing = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-confusing').click();
			confusing = 1;
		}
		string = "{{context";
		var context = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-context').click();
			context = 1;
		}
		string = "{{copy edit";
		var copyedit = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-copyedit').click();
			copyedit = 1;
		}
		string = "{{copypaste";
		var copypaste = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-copypaste').click();
			string1 = "{{copypaste|url=";
			string2 = "{{copypaste|url=|";
			if (content.includes(string1) && !content.includes(string2)) {
				temp1 = content.indexOf('{{copypaste|url=');
				temp2 = content.indexOf('|', temp1+17);
				temp3 = content.substring(temp1+16,temp2);
				document.getElementById('TH-option-copypaste').value = temp3;
			}
			copypaste = 1;
		}
		string = "{{disputed";
		var disputed = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-disputed').click();
			disputed = 1;
		}
		string = "{{essay-like";
		var essay_like = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-essay-like').click();
			essay_like = 1;
		}
		string = "{{expand language";
		var expandlanguage = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-expandlanguage').click();
			expandlanguage = 1;
		}
		string = "{{expert needed";
		var expertneeded = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-expertneeded').click();
			expertneeded = 1;
		}
		string = "{{multiple issues";
		var multipleissues = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-multiple').click();
			multipleissues = 1;
		}
		$("#TH-cancel").click(function(){
			$("#TH-modal").remove();
		});
		$("#TH-next").click(function(){
			var editsummary = $('#TH-editsummary').val();
			var wikitext = "";
			var pos1, pos2, remove;
			var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], d = new Date();
			if ($("#TH-option-checkbox-multiple").prop("checked") && multipleissues === 0) {
				wikitext += "{{multiple issues|\n";
			}
			/******************************/
			if ($("#TH-option-checkbox-advert").prop("checked") && adv === 0) {
				wikitext += "{{advert|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-advert").prop("checked") && adv == 1) {
				pos1 = content.indexOf('{{advert');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-allplot").prop("checked") && allplot === 0) {
				wikitext += "{{all plot|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-allplot").prop("checked") && allplot == 1) {
				pos1 = content.indexOf('{{all plot');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-autobiography").prop("checked") && autobiography === 0) {
				wikitext += "{{autobiography|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-autobiography").prop("checked") && autobiography == 1) {
				pos1 = content.indexOf('{{autobiography');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-BLPsources").prop("checked") && BLPsources === 0) {
				wikitext += "{{BLP sources|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-BLPsources").prop("checked") && BLPsources == 1) {
				pos1 = content.indexOf('{{BLP sources');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-BLPunsourced").prop("checked") && BLPunsourced === 0) {
				wikitext += "{{BLP unsourced|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-BLPunsourced").prop("checked") && BLPunsourced == 1) {
				pos1 = content.indexOf('{{BLP unsourced');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-citationstyle").prop("checked") && citationstyle === 0) {
				wikitext += "{{citation style|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-citationstyle").prop("checked") && citationstyle == 1) {
				pos1 = content.indexOf('{{citation style');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-cleanup").prop("checked") && cleanup === 0) {
				wikitext += "{{cleanup|reason="+$('#TH-option-cleanup').val().trim()+"|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-cleanup").prop("checked") && cleanup == 1) {
				pos1 = content.indexOf('{{cleanup');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-cleanup-reorganize").prop("checked") && cleanup_reorganize === 0) {
				wikitext += "{{cleanup-reorganize|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-cleanup-reorganize").prop("checked") && cleanup_reorganize == 1) {
				pos1 = content.indexOf('{{cleanup-reorganize');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-closeparaphrasing").prop("checked") && closeparaphrasing === 0) {
				wikitext += "{{close paraphrasing|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-closeparaphrasing").prop("checked") && closeparaphrasing == 1) {
				pos1 = content.indexOf('{{close paraphrasing');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-COI").prop("checked") && COI === 0) {
				wikitext += "{{COI|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-COI").prop("checked") && COI == 1) {
				pos1 = content.indexOf('{{COI');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-condense").prop("checked") && condense === 0) {
				wikitext += "{{condense|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-condense").prop("checked") && condense == 1) {
				pos1 = content.indexOf('{{condense');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-confusing").prop("checked") && confusing === 0) {
				wikitext += "{{confusing|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-confusing").prop("checked") && confusing == 1) {
				pos1 = content.indexOf('{{confusing');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-context").prop("checked") && context === 0) {
				wikitext += "{{context|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-context").prop("checked") && context == 1) {
				pos1 = content.indexOf('{{context');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-copyedit").prop("checked") && copyedit === 0) {
				wikitext += "{{copy edit|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-copyedit").prop("checked") && copyedit == 1) {
				pos1 = content.indexOf('{{copy edit');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-copypaste").prop("checked") && copypaste === 0) {
				wikitext += "{{copypaste|url="+$('#TH-option-copypaste').val().trim()+"|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-copypaste").prop("checked") && copypaste == 1) {
				pos1 = content.indexOf('{{copypaste');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-disputed").prop("checked") && disputed === 0) {
				wikitext += "{{disputed|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-disputed").prop("checked") && disputed == 1) {
				pos1 = content.indexOf('{{disputed');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-essay-like").prop("checked") && essay_like === 0) {
				wikitext += "{{essay-like|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-essay-like").prop("checked") && essay_like == 1) {
				pos1 = content.indexOf('{{essay-like');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-expandlanguage").prop("checked") && expandlanguage === 0) {
				wikitext += "{{expand language|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-expandlanguage").prop("checked") && expandlanguage == 1) {
				pos1 = content.indexOf('{{expand language');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-expertneeded").prop("checked") && expertneeded === 0) {
				wikitext += "{{expert needed|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-expertneeded").prop("checked") && expertneeded == 1) {
				pos1 = content.indexOf('{{expert needed');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/			
			if ($("#TH-option-checkbox-multiple").prop("checked") && multipleissues === 0) {
				wikitext += "}}\n";
			}
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
			summary: editsummary + config.script.advert
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