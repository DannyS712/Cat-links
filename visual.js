$(function (){
	if (mw.config.get('wgCurRevisionId') === 0 ) return;
	mw.loader.using(['mediawiki.util', 'mediawiki.api', 'mediawiki.Title', 'mediawiki.RegExp'], tagsmanager());
});

var tagsmanager = function tagsmanager() {
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
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-externallinks','id':'TH-option-checkbox-externallinks'}),
				$('<label>').attr({'for':'TH-option-externallinks', 'id':'TH-option-label-externallinks'}).text('{{external links}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-fansite','id':'TH-option-checkbox-fansite'}),
				$('<label>').attr({'for':'TH-option-fansite', 'id':'TH-option-label-fansite'}).text('{{fansite}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-fiction','id':'TH-option-checkbox-fiction'}),
				$('<label>').attr({'for':'TH-option-fiction', 'id':'TH-option-label-fiction'}).text('{{fiction}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-globalize','id':'TH-option-checkbox-globalize'}),
				$('<label>').attr({'for':'TH-option-globalize', 'id':'TH-option-label-globalize'}).text('{{globalize}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-GOCEinuse','id':'TH-option-checkbox-GOCEinuse'}),
				$('<label>').attr({'for':'TH-option-GOCEinuse', 'id':'TH-option-label-GOCEinuse'}).text('{{GOCEinuse}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-hoax','id':'TH-option-checkbox-hoax'}),
				$('<label>').attr({'for':'TH-option-hoax', 'id':'TH-option-label-hoax'}).text('{{hoax}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-improvecategories','id':'TH-option-checkbox-improvecategories'}),
				$('<label>').attr({'for':'TH-option-improvecategories', 'id':'TH-option-label-improvecategories'}).text('{{improve categories}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-incomprehensible','id':'TH-option-checkbox-incomprehensible'}),
				$('<label>').attr({'for':'TH-option-incomprehensible', 'id':'TH-option-label-incomprehensible'}).text('{{incomprehensible}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-in-universe','id':'TH-option-checkbox-in-universe'}),
				$('<label>').attr({'for':'TH-option-in-universe', 'id':'TH-option-label-in-universe'}).text('{{in-universe}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-inuse','id':'TH-option-checkbox-inuse'}),
				$('<label>').attr({'for':'TH-option-inuse', 'id':'TH-option-label-inuse'}).text('{{in use}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-leadmissing','id':'TH-option-checkbox-leadmissing'}),
				$('<label>').attr({'for':'TH-option-leadmissing', 'id':'TH-option-label-leadmissing'}).text('{{lead missing}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-leadrewrite','id':'TH-option-checkbox-leadrewrite'}),
				$('<label>').attr({'for':'TH-option-leadrewrite', 'id':'TH-option-label-leadrewrite'}).text('{{lead rewrite}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-leadtoolong','id':'TH-option-checkbox-leadtoolong'}),
				$('<label>').attr({'for':'TH-option-leadtoolong', 'id':'TH-option-label-leadtoolong'}).text('{{lead too long}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-leadtooshort','id':'TH-option-checkbox-leadtooshort'}),
				$('<label>').attr({'for':'TH-option-leadtooshort', 'id':'TH-option-label-leadtooshort'}).text('{{lead too short}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-linkrot','id':'TH-option-checkbox-linkrot'}),
				$('<label>').attr({'for':'TH-option-linkrot', 'id':'TH-option-label-linkrot'}).text('{{linkrot}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-manual','id':'TH-option-checkbox-manual'}),
				$('<label>').attr({'for':'TH-option-manual', 'id':'TH-option-label-manual'}).text('{{manual}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-merge','id':'TH-option-checkbox-merge'}),
				$('<label>').attr({'for':'TH-option-merge', 'id':'TH-option-label-merge'}).text('{{merge}}		Other articles:'),
				$('<input>').attr({'type':'text', 'name':'TH-option-merge', 'id':'TH-option-merge'})
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-mergeto','id':'TH-option-checkbox-mergeto'}),
				$('<label>').attr({'for':'TH-option-mergeto', 'id':'TH-option-label-mergeto'}).text('{{merge to}}		Other articles:'),
				$('<input>').attr({'type':'text', 'name':'TH-option-mergeto', 'id':'TH-option-mergeto'})
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-mergefrom','id':'TH-option-checkbox-mergefrom'}),
				$('<label>').attr({'for':'TH-option-mergefrom', 'id':'TH-option-label-mergefrom'}).text('{{merge from}}		Other articles:'),
				$('<input>').attr({'type':'text', 'name':'TH-option-mergefrom', 'id':'TH-option-mergefrom'})
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-morefootnotes','id':'TH-option-checkbox-morefootnotes'}),
				$('<label>').attr({'for':'TH-option-morefootnotes', 'id':'TH-option-label-morefootnotes'}).text('{{more footnotes}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-newsrelease','id':'TH-option-checkbox-newsrelease'}),
				$('<label>').attr({'for':'TH-option-newsrelease', 'id':'TH-option-label-newsrelease'}).text('{{news release}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-nofootnotes','id':'TH-option-checkbox-nofootnotes'}),
				$('<label>').attr({'for':'TH-option-nofootnotes', 'id':'TH-option-label-nofootnotes'}).text('{{no footnotes}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-non-free','id':'TH-option-checkbox-non-free'}),
				$('<label>').attr({'for':'TH-option-non-free', 'id':'TH-option-label-non-free'}).text('{{non-free}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-notability','id':'TH-option-checkbox-notability'}),
				$('<label>').attr({'for':'TH-option-notability', 'id':'TH-option-label-notability'}).text('{{notability}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-notEnglish','id':'TH-option-checkbox-notEnglish'}),
				$('<label>').attr({'for':'TH-option-notEnglish', 'id':'TH-option-label-notEnglish'}).text('{{not English}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-onesource','id':'TH-option-checkbox-onesource'}),
				$('<label>').attr({'for':'TH-option-onesource', 'id':'TH-option-label-one source'}).text('{{one source}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-originalresearch','id':'TH-option-checkbox-originalresearch'}),
				$('<label>').attr({'for':'TH-option-originalresearch', 'id':'TH-option-label-originalresearch'}).text('{{original research}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-orphan','id':'TH-option-checkbox-orphan'}),
				$('<label>').attr({'for':'TH-option-orphan', 'id':'TH-option-label-orphan'}).text('{{orphan}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-overcoverage','id':'TH-option-checkbox-overcoverage'}),
				$('<label>').attr({'for':'TH-option-overcoverage', 'id':'TH-option-label-overcoverage'}).text('{{overcoverage}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-overlinked','id':'TH-option-checkbox-overlinked'}),
				$('<label>').attr({'for':'TH-option-overlinked', 'id':'TH-option-label-overlinked'}).text('{{overlinked}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-overlydetailed','id':'TH-option-checkbox-overlydetailed'}),
				$('<label>').attr({'for':'TH-option-overlydetailed', 'id':'TH-option-label-overlydetailed'}).text('{{overly detailed}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-over-quotation','id':'TH-option-checkbox-over-quotation'}),
				$('<label>').attr({'for':'TH-option-over-quotation', 'id':'TH-option-label-over-quotation'}).text('{{over-quotation}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-peacock','id':'TH-option-checkbox-peacock'}),
				$('<label>').attr({'for':'TH-option-peacock', 'id':'TH-option-label-peacock'}).text('{{peacock}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-plot','id':'TH-option-checkbox-plot'}),
				$('<label>').attr({'for':'TH-option-plot', 'id':'TH-option-label-plot'}).text('{{plot}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-POV','id':'TH-option-checkbox-POV'}),
				$('<label>').attr({'for':'TH-option-POV', 'id':'TH-option-label-POV'}).text('{{POV}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-primarysources','id':'TH-option-checkbox-primarysources'}),
				$('<label>').attr({'for':'TH-option-primarysources', 'id':'TH-option-label-primarysources'}).text('{{primary sources}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-prose','id':'TH-option-checkbox-prose'}),
				$('<label>').attr({'for':'TH-option-prose', 'id':'TH-option-label-prose'}).text('{{prose}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-recentism','id':'TH-option-checkbox-recentism'}),
				$('<label>').attr({'for':'TH-option-recentism', 'id':'TH-option-label-recentism'}).text('{{recentism}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-refimprove','id':'TH-option-checkbox-refimprove'}),
				$('<label>').attr({'for':'TH-option-refimprove', 'id':'TH-option-label-refimprove'}).text('{{refimprove}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-roughtranslation','id':'TH-option-checkbox-roughtranslation'}),
				$('<label>').attr({'for':'TH-option-roughtranslation', 'id':'TH-option-label-roughtranslation'}).text('{{rough translation}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-sections','id':'TH-option-checkbox-sections'}),
				$('<label>').attr({'for':'TH-option-sections', 'id':'TH-option-label-sections'}).text('{{sections}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-self-published','id':'TH-option-checkbox-self-published'}),
				$('<label>').attr({'for':'TH-option-self-published', 'id':'TH-option-label-self-published'}).text('{{self-published}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-technical','id':'TH-option-checkbox-technical'}),
				$('<label>').attr({'for':'TH-option-technical', 'id':'TH-option-label-technical'}).text('{{technical}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-tense','id':'TH-option-checkbox-tense'}),
				$('<label>').attr({'for':'TH-option-tense', 'id':'TH-option-label-tense'}).text('{{tense}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-third-party','id':'TH-option-checkbox-third-party'}),
				$('<label>').attr({'for':'TH-option-third-party', 'id':'TH-option-label-third-party'}).text('{{third-party}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-tone','id':'TH-option-checkbox-tone'}),
				$('<label>').attr({'for':'TH-option-tone', 'id':'TH-option-label-tone'}).text('{{tone}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-toofewopinions','id':'TH-option-checkbox-toofewopinions'}),
				$('<label>').attr({'for':'TH-option-toofewopinions', 'id':'TH-option-label-toofewopinions'}).text('{{too few opinions}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-uncategorized','id':'TH-option-checkbox-uncategorized'}),
				$('<label>').attr({'for':'TH-option-uncategorized', 'id':'TH-option-label-uncategorized'}).text('{{uncategorized}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-underconstruction','id':'TH-option-checkbox-underconstruction'}),
				$('<label>').attr({'for':'TH-option-underconstruction', 'id':'TH-option-label-underconstruction'}).text('{{under construction}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-underlinked','id':'TH-option-checkbox-underlinked'}),
				$('<label>').attr({'for':'TH-option-underlinked', 'id':'TH-option-label-underlinked'}).text('{{underlinked}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-undue','id':'TH-option-checkbox-undue'}),
				$('<label>').attr({'for':'TH-option-undue', 'id':'TH-option-label-undue'}).text('{{undue}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-unfocused','id':'TH-option-checkbox-unfocused'}),
				$('<label>').attr({'for':'TH-option-unfocused', 'id':'TH-option-label-unfocused'}).text('{{unfocused}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-unreferenced','id':'TH-option-checkbox-unreferenced'}),
				$('<label>').attr({'for':'TH-option-unreferenced', 'id':'TH-option-label-unreferenced'}).text('{{unreferenced}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-unreliablesources','id':'TH-option-checkbox-unreliablesources'}),
				$('<label>').attr({'for':'TH-option-unreliablesources', 'id':'TH-option-label-unreliable sources'}).text('{{unreliable sources}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-undisclosedpaid','id':'TH-option-checkbox-undisclosedpaid'}),
				$('<label>').attr({'for':'TH-option-undisclosedpaid', 'id':'TH-option-label-undisclosedpaid'}).text('{{undisclosed paid}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-update','id':'TH-option-checkbox-update'}),
				$('<label>').attr({'for':'TH-option-update', 'id':'TH-option-label-update'}).text('{{update}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-verylong','id':'TH-option-checkbox-verylong'}),
				$('<label>').attr({'for':'TH-option-verylong', 'id':'TH-option-label-very long'}).text('{{very long}}')
			),
			$('<div>').css('margin-bottom','0.5em').append(
				$('<input>').attr({'type':'checkbox', 'name':'TH-option-checkbox-weasel','id':'TH-option-checkbox-weasel'}),
				$('<label>').attr({'for':'TH-option-weasel', 'id':'TH-option-label-weasel'}).text('{{weasel}}')
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
		string = "{{external links";
		var externallinks = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-externallinks').click();
			externallinks = 1;
		}
		string = "{{fansite";
		var fansite = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-fansite').click();
			fansite = 1;
		}
		string = "{{fiction";
		var fiction = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-fiction').click();
			fiction = 1;
		}
		string = "{{globalize";
		var globalize = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-globalize').click();
			globalize = 1;
		}
		string = "{{GOCEinuse";
		var GOCEinuse = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-GOCEinuse').click();
			GOCEinuse = 1;
		}
		string = "{{hoax";
		var hoax = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-hoax').click();
			hoax = 1;
		}
		string = "{{improve categories";
		var improvecategories = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-improvecategories').click();
			improvecategories = 1;
		}
		string = "{{incomprehensible";
		var incomprehensible = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-incomprehensible').click();
			incomprehensible = 1;
		}
		string = "{{in-universe";
		var in_universe = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-in-universe').click();
			in_universe = 1;
		}
		string = "{{in use";
		var inuse = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-inuse').click();
			inuse = 1;
		}
		string = "{{lead missing";
		var leadmissing = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-leadmissing').click();
			leadmissing = 1;
		}
		string = "{{lead rewrite";
		var leadrewrite = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-leadrewrite').click();
			leadrewrite = 1;
		}
		string = "{{lead too long";
		var leadtoolong = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-leadtoolong').click();
			leadtoolong = 1;
		}
		string = "{{lead too short";
		var leadtooshort = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-leadtooshort').click();
			leadtooshort = 1;
		}
		string = "{{manual";
		var manual = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-manual').click();
			manual = 1;
		}
		string = "{{merge|";
		var merge = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-merge').click();
			var temp4 = content.indexOf("|date=");
			temp1 = content.indexOf('{{merge|');
			if (temp1 != temp4 - 8) {
				temp2 = content.indexOf('|', temp1+9);
				temp3 = content.substring(temp1+8,temp2);
				document.getElementById('TH-option-merge').value = temp3;
			}
			merge = 1;
		}
		string = "{{merge to";
		var mergeto = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-mergeto').click();
			temp4 = content.indexOf("|date=", temp1+13);
			temp1 = content.indexOf('{{merge to|');
			if (temp1 != temp4 - 11) {
				temp2 = content.indexOf('|', temp1+12);
				temp3 = content.substring(temp1+11,temp2);
				document.getElementById('TH-option-mergeto').value = temp3;
			}
			mergeto = 1;
		}
		string = "{{merge from";
		var mergefrom = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-mergefrom').click();
			temp4 = content.indexOf("|date=",temp1+13);
			temp1 = content.indexOf('{{merge from|');
			if (temp1 != temp4 - 13) {
				temp2 = content.indexOf('|', temp1+14);
				temp3 = content.substring(temp1+13,temp2);
				document.getElementById('TH-option-mergefrom').value = temp3;
			}
			mergefrom = 1;
		}
		string = "{{more footnotes";
		var morefootnotes = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-morefootnotes').click();
			morefootnotes = 1;
		}
		string = "{{news release";
		var newsrelease = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-newsrelease').click();
			newsrelease = 1;
		}
		string = "{{no footnotes";
		var nofootnotes = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-nofootnotes').click();
			nofootnotes = 1;
		}
		string = "{{non-free";
		var non_free = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-non-free').click();
			non_free = 1;
		}
		string = "{{notability";
		var notability = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-notability').click();
			notability = 1;
		}
		string = "{{plot";
		var plot = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-plot').click();
			plot = 1;
		}
		string = "{{not English";
		var notEnglish = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-notEnglish').click();
			notEnglish = 1;
		}
		string = "{{one source";
		var onesource = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-onesource').click();
			onesource = 1;
		}
		string = "{{original research";
		var originalresearch = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-originalresearch').click();
			originalresearch = 1;
		}
		string = "{{orphan";
		var orphan = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-orphan').click();
			orphan = 1;
		}
		string = "{{overcoverage";
		var overcoverage = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-overcoverage').click();
			overcoverage = 1;
		}
		string = "{{overlinked";
		var overlinked = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-overlinked').click();
			overlinked = 1;
		}
		string = "{{overly detailed";
		var overlydetailed = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-overlydetailed').click();
			overlydetailed = 1;
		}
		string = "{{linkrot";
		var lin = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-linkrot').click();
			lin = 1;
		}
		string = "{{over-quotation";
		var over_quotation = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-over-quotation').click();
			over_quotation = 1;
		}
		string = "{{peacock";
		var peacock = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-peacock').click();
			peacock = 1;
		}
		string = "{{POV";
		var POV = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-POV').click();
			POV = 1;
		}
		string = "{{primary sources";
		var primarysources = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-primarysources').click();
			primarysources = 1;
		}
		string = "{{prose";
		var prose = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-prose').click();
			prose = 1;
		}
		string = "{{recentism";
		var recentism = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-recentism').click();
			recentism = 1;
		}
		string = "{{refimprove";
		var refimprove = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-refimprove').click();
			refimprove = 1;
		}
		string = "{{rough translation";
		var roughtranslation = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-roughtranslation').click();
			roughtranslation = 1;
		}
		string = "{{sections";
		var sections = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-sections').click();
			sections = 1;
		}
		string = "{{self-published";
		var self_published = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-self-published').click();
			self_published = 1;
		}
		string = "{{technical";
		var technical = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-technical').click();
			technical = 1;
		}
		string = "{{tense";
		var tense = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-tense').click();
			tense = 1;
		}
		string = "{{third-party";
		var third_party = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-third-party').click();
			third_party = 1;
		}
		string = "{{tone";
		var tone = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-tone').click();
			tone = 1;
		}
		string = "{{too few opinions";
		var toofewopinions = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-toofewopinions').click();
			toofewopinions = 1;
		}
		string = "{{uncategorized";
		var uncategorized = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-uncategorized').click();
			uncategorized = 1;
		}
		string = "{{under construction";
		var underconstruction = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-underconstruction').click();
			underconstruction = 1;
		}
		string = "{{underlinked";
		var underlinked = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-underlinked').click();
			underlinked = 1;
		}
		string = "{{undue";
		var undue = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-undue').click();
			undue = 1;
		}
		string = "{{unfocused";
		var unfocused = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-unfocused').click();
			unfocused = 1;
		}
		string = "{{unreferenced";
		var unreferenced = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-unreferenced').click();
			unreferenced = 1;
		}
		string = "{{unreliable sources";
		var unreliablesources = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-unreliablesources').click();
			unreliablesources = 1;
		}
		string = "{{undisclosed paid";
		var undisclosedpaid = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-undisclosedpaid').click();
			undisclosedpaid = 1;
		}
		string = "{{update";
		var update = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-update').click();
			update = 1;
		}
		string = "{{very long";
		var verylong = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-verylong').click();
			verylong = 1;
		}
		string = "{{weasel";
		var weasel = 0;
		if (content.includes(string)) {
			document.getElementById('TH-option-checkbox-weasel').click();
			weasel = 1;
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
			if ($("#TH-option-checkbox-externallinks").prop("checked") && externallinks === 0) {
				wikitext += "{{external links|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-externallinks").prop("checked") && externallinks == 1) {
				pos1 = content.indexOf('{{external links');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-fansite").prop("checked") && fansite === 0) {
				wikitext += "{{fansite|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-fansite").prop("checked") && fansite == 1) {
				pos1 = content.indexOf('{{fansite');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-fiction").prop("checked") && fiction === 0) {
				wikitext += "{{fiction|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-fiction").prop("checked") && fiction == 1) {
				pos1 = content.indexOf('{{fiction');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-globalize").prop("checked") && globalize === 0) {
				wikitext += "{{globalize|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-globalize").prop("checked") && globalize == 1) {
				pos1 = content.indexOf('{{globalize');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-GOCEinuse").prop("checked") && GOCEinuse === 0) {
				wikitext += "{{GOCEinuse|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-GOCEinuse").prop("checked") && GOCEinuse == 1) {
				pos1 = content.indexOf('{{GOCEinuse');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-hoax").prop("checked") && hoax === 0) {
				wikitext += "{{hoax|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-hoax").prop("checked") && hoax == 1) {
				pos1 = content.indexOf('{{hoax');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-improvecategories").prop("checked") && improvecategories === 0) {
				wikitext += "{{improve categories|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-improvecategories").prop("checked") && improvecategories == 1) {
				pos1 = content.indexOf('{{improve categories');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-incomprehensible").prop("checked") && incomprehensible === 0) {
				wikitext += "{{incomprehensible|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-incomprehensible").prop("checked") && incomprehensible == 1) {
				pos1 = content.indexOf('{{incomprehensible');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-in-universe").prop("checked") && in_universe === 0) {
				wikitext += "{{in-universe|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-in-universe").prop("checked") && in_universe == 1) {
				pos1 = content.indexOf('{{in-universe');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-inuse").prop("checked") && inuse === 0) {
				wikitext += "{{in use|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-inuse").prop("checked") && inuse == 1) {
				pos1 = content.indexOf('{{in use');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-leadmissing").prop("checked") && leadmissing === 0) {
				wikitext += "{{lead missing|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-leadmissing").prop("checked") && leadmissing == 1) {
				pos1 = content.indexOf('{{lead missing');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-leadrewrite").prop("checked") && leadrewrite === 0) {
				wikitext += "{{lead rewrite|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-leadrewrite").prop("checked") && leadrewrite == 1) {
				pos1 = content.indexOf('{{lead rewrite');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-leadtoolong").prop("checked") && leadtoolong === 0) {
				wikitext += "{{lead too long|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-leadtoolong").prop("checked") && leadtoolong == 1) {
				pos1 = content.indexOf('{{lead too long');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-leadtooshort").prop("checked") && leadtooshort === 0) {
				wikitext += "{{lead too short|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-leadtooshort").prop("checked") && leadtooshort == 1) {
				pos1 = content.indexOf('{{lead too short');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-linkrot").prop("checked") && lin === 0) {
				wikitext += "{{linkrot|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-linkrot").prop("checked") && lin == 1) {
				pos1 = content.indexOf('{{linkrot');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-manual").prop("checked") && manual === 0) {
				wikitext += "{{manual|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-manual").prop("checked") && manual == 1) {
				pos1 = content.indexOf('{{manual');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-merge").prop("checked") && merge === 0) {
				wikitext += "{{merge|"+$('#TH-option-merge').val().trim()+"|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-merge").prop("checked") && merge == 1) {
				pos1 = content.indexOf('{{merge');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-mergeto").prop("checked") && mergeto === 0) {
				wikitext += "{{merge to|"+$('#TH-option-mergeto').val().trim()+"|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-mergeto").prop("checked") && mergeto == 1) {
				pos1 = content.indexOf('{{merge to');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-mergefrom").prop("checked") && mergefrom === 0) {
				wikitext += "{{merge from|"+$('#TH-option-mergefrom').val().trim()+"|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-mergefrom").prop("checked") && mergefrom == 1) {
				pos1 = content.indexOf('{{merge from');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-morefootnotes").prop("checked") && morefootnotes === 0) {
				wikitext += "{{more footnotes|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-morefootnotes").prop("checked") && morefootnotes == 1) {
				pos1 = content.indexOf('{{more footnotes');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-newsrelease").prop("checked") && newsrelease === 0) {
				wikitext += "{{news release|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-newsrelease").prop("checked") && newsrelease == 1) {
				pos1 = content.indexOf('{{news release');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-nofootnotes").prop("checked") && nofootnotes === 0) {
				wikitext += "{{no footnotes|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-nofootnotes").prop("checked") && nofootnotes == 1) {
				pos1 = content.indexOf('{{no footnotes');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-non-free").prop("checked") && non_free === 0) {
				wikitext += "{{non-free|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-non-free").prop("checked") && non_free == 1) {
				pos1 = content.indexOf('{{non-free');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-notability").prop("checked") && notability === 0) {
				wikitext += "{{notability|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-notability").prop("checked") && notability == 1) {
				pos1 = content.indexOf('{{notability');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-notEnglish").prop("checked") && notEnglish === 0) {
				wikitext += "{{not English|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-notEnglish").prop("checked") && notEnglish == 1) {
				pos1 = content.indexOf('{{not English');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-onesource").prop("checked") && onesource === 0) {
				wikitext += "{{one source|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-onesource").prop("checked") && onesource == 1) {
				pos1 = content.indexOf('{{one source');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-originalresearch").prop("checked") && originalresearch === 0) {
				wikitext += "{{original research|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-originalresearch").prop("checked") && originalresearch == 1) {
				pos1 = content.indexOf('{{original research');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-orphan").prop("checked") && orphan === 0) {
				wikitext += "{{orphan|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-orphan").prop("checked") && orphan == 1) {
				pos1 = content.indexOf('{{orphan');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-overcoverage").prop("checked") && overcoverage === 0) {
				wikitext += "{{overcoverage|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-overcoverage").prop("checked") && overcoverage == 1) {
				pos1 = content.indexOf('{{overcoverage');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-overlinked").prop("checked") && overlinked === 0) {
				wikitext += "{{overlinked|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-overlinked").prop("checked") && overlinked == 1) {
				pos1 = content.indexOf('{{overlinked');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-overlydetailed").prop("checked") && overlydetailed === 0) {
				wikitext += "{{overly detailed|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-overlydetailed").prop("checked") && overlydetailed == 1) {
				pos1 = content.indexOf('{{overly detailed');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-over-quotation").prop("checked") && over_quotation === 0) {
				wikitext += "{{over-quotation|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-over-quotation").prop("checked") && over_quotation == 1) {
				pos1 = content.indexOf('{{over-quotation');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-peacock").prop("checked") && peacock === 0) {
				wikitext += "{{peacock|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-peacock").prop("checked") && peacock == 1) {
				pos1 = content.indexOf('{{peacock');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-plot").prop("checked") && plot === 0) {
				wikitext += "{{plot|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-plot").prop("checked") && plot == 1) {
				pos1 = content.indexOf('{{plot');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-POV").prop("checked") && POV === 0) {
				wikitext += "{{POV|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-POV").prop("checked") && POV == 1) {
				pos1 = content.indexOf('{{POV');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-primarysources").prop("checked") && primarysources === 0) {
				wikitext += "{{primary sources|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-primarysources").prop("checked") && primarysources == 1) {
				pos1 = content.indexOf('{{primary sources');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-prose").prop("checked") && prose === 0) {
				wikitext += "{{prose|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-prose").prop("checked") && prose == 1) {
				pos1 = content.indexOf('{{prose');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			if ($("#TH-option-checkbox-recentism").prop("checked") && recentism === 0) {
				wikitext += "{{recentism|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-recentism").prop("checked") && recentism == 1) {
				pos1 = content.indexOf('{{recentism');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-refimprove").prop("checked") && refimprove === 0) {
				wikitext += "{{refimprove|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-refimprove").prop("checked") && refimprove == 1) {
				pos1 = content.indexOf('{{refimprove');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-roughtranslation").prop("checked") && roughtranslation === 0) {
				wikitext += "{{rough translation|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-roughtranslation").prop("checked") && roughtranslation == 1) {
				pos1 = content.indexOf('{{rough translation');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-sections").prop("checked") && sections === 0) {
				wikitext += "{{sections|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-sections").prop("checked") && sections == 1) {
				pos1 = content.indexOf('{{sections');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-self-published").prop("checked") && self_published === 0) {
				wikitext += "{{self-published|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-self-published").prop("checked") && self_published == 1) {
				pos1 = content.indexOf('{{self-published');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-technical").prop("checked") && technical === 0) {
				wikitext += "{{technical|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-technical").prop("checked") && technical == 1) {
				pos1 = content.indexOf('{{technical');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-tense").prop("checked") && tense === 0) {
				wikitext += "{{tense|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-tense").prop("checked") && tense == 1) {
				pos1 = content.indexOf('{{tense');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-third-party").prop("checked") && third_party === 0) {
				wikitext += "{{third-party|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-third-party").prop("checked") && third_party == 1) {
				pos1 = content.indexOf('{{third-party');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-tone").prop("checked") && tone === 0) {
				wikitext += "{{tone|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-tone").prop("checked") && tone == 1) {
				pos1 = content.indexOf('{{tone');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-toofewopinions").prop("checked") && toofewopinions === 0) {
				wikitext += "{{too few opinions|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-toofewopinions").prop("checked") && toofewopinions == 1) {
				pos1 = content.indexOf('{{too few opinions');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-uncategorized").prop("checked") && uncategorized === 0) {
				wikitext += "{{uncategorized|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-uncategorized").prop("checked") && uncategorized == 1) {
				pos1 = content.indexOf('{{uncategorized');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-underconstruction").prop("checked") && underconstruction === 0) {
				wikitext += "{{under construction|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-underconstruction").prop("checked") && underconstruction == 1) {
				pos1 = content.indexOf('{{under construction');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-underlinked").prop("checked") && underlinked === 0) {
				wikitext += "{{underlinked|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-underlinked").prop("checked") && underlinked == 1) {
				pos1 = content.indexOf('{{underlinked');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-undue").prop("checked") && undue === 0) {
				wikitext += "{{undue|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-undue").prop("checked") && undue == 1) {
				pos1 = content.indexOf('{{undue');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-unfocused").prop("checked") && unfocused === 0) {
				wikitext += "{{unfocused|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-unfocused").prop("checked") && unfocused == 1) {
				pos1 = content.indexOf('{{unfocused');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-unreferenced").prop("checked") && unreferenced === 0) {
				wikitext += "{{unreferenced|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-unreferenced").prop("checked") && unreferenced == 1) {
				pos1 = content.indexOf('{{unreferenced');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-unreliablesources").prop("checked") && unreliablesources === 0) {
				wikitext += "{{unreliable sources|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-unreliablesources").prop("checked") && unreliablesources == 1) {
				pos1 = content.indexOf('{{unreliable sources');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-undisclosedpaid").prop("checked") && undisclosedpaid === 0) {
				wikitext += "{{undisclosed paid|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-undisclosedpaid").prop("checked") && undisclosedpaid == 1) {
				pos1 = content.indexOf('{{undisclosed paid');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-update").prop("checked") && update === 0) {
				wikitext += "{{update|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-update").prop("checked") && update == 1) {
				pos1 = content.indexOf('{{update');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-verylong").prop("checked") && verylong === 0) {
				wikitext += "{{very long|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-verylong").prop("checked") && verylong == 1) {
				pos1 = content.indexOf('{{very long');
				pos2 = content.indexOf('}}', pos1);
				remove = content.substring(pos1,pos2+3);
				content = content.replace(remove,'');
			}
			/******************************/
			if ($("#TH-option-checkbox-weasel").prop("checked") && weasel === 0) {
				wikitext += "{{weasel|date="+monthNames[d.getMonth()]+' '+d.getFullYear()+"}}\n";
			}
			else if (!$("#TH-option-checkbox-weasel").prop("checked") && weasel == 1) {
				pos1 = content.indexOf('{{weasel');
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