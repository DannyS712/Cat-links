function set_all ( setting ){
	$("#CL-option-checkbox-Article").prop("checked", setting);
	$("#CL-option-checkbox-Talk").prop("checked", setting);
	$("#CL-option-checkbox-User").prop("checked", setting);
	$("#CL-option-checkbox-User_talk").prop("checked", setting);
	$("#CL-option-checkbox-Wikipedia").prop("checked", setting);
	$("#CL-option-checkbox-Wikipedia_talk").prop("checked", setting);
	$("#CL-option-checkbox-File").prop("checked", setting);
	$("#CL-option-checkbox-File_talk").prop("checked", setting);
	$("#CL-option-checkbox-MediaWiki").prop("checked", setting);
	$("#CL-option-checkbox-MediaWiki_talk").prop("checked", setting);
	$("#CL-option-checkbox-Template").prop("checked", setting);
	$("#CL-option-checkbox-Template_talk").prop("checked", setting);
	$("#CL-option-checkbox-Help").prop("checked", setting);
	$("#CL-option-checkbox-Help_talk").prop("checked", setting);
	$("#CL-option-checkbox-Category").prop("checked", setting);
	$("#CL-option-checkbox-Category_talk").prop("checked", setting);
	$("#CL-option-checkbox-Portal").prop("checked", setting);
	$("#CL-option-checkbox-Portal_talk").prop("checked", setting);
	$("#CL-option-checkbox-Book").prop("checked", setting);
	$("#CL-option-checkbox-Book_talk").prop("checked", setting);
	$("#CL-option-checkbox-Draft").prop("checked", setting);
	$("#CL-option-checkbox-Draft_talk").prop("checked", setting);
	$("#CL-option-checkbox-TimedText").prop("checked", setting);
	$("#CL-option-checkbox-TimedText_talk").prop("checked", setting);
	$("#CL-option-checkbox-Module").prop("checked", setting);
	$("#CL-option-checkbox-Module_talk").prop("checked", setting);
	$("#CL-option-checkbox-Gadget").prop("checked", setting);
	$("#CL-option-checkbox-Gadget_talk").prop("checked", setting);
	$("#CL-option-checkbox-Gadget_Definition").prop("checked", setting);
	$("#CL-option-checkbox-Gadget_Definition_talk").prop("checked", setting);
}
function invert_all (){
	$("#CL-option-checkbox-Article").prop("checked", !$("#CL-option-checkbox-Article").prop("checked"));
	$("#CL-option-checkbox-Talk").prop("checked", !$("#CL-option-checkbox-Talk").prop("checked"));
	$("#CL-option-checkbox-User").prop("checked", !$("#CL-option-checkbox-User").prop("checked"));
	$("#CL-option-checkbox-User_talk").prop("checked", !$("#CL-option-checkbox-User_talk").prop("checked"));
	$("#CL-option-checkbox-Wikipedia").prop("checked", !$("#CL-option-checkbox-Wikipedia").prop("checked"));
	$("#CL-option-checkbox-Wikipedia_talk").prop("checked", !$("#CL-option-checkbox-Wikipedia_talk").prop("checked"));
	$("#CL-option-checkbox-File").prop("checked", !$("#CL-option-checkbox-File").prop("checked"));
	$("#CL-option-checkbox-File_talk").prop("checked", !$("#CL-option-checkbox-File_talk").prop("checked"));
	$("#CL-option-checkbox-MediaWiki").prop("checked", !$("#CL-option-checkbox-MediaWiki").prop("checked"));
	$("#CL-option-checkbox-MediaWiki_talk").prop("checked", !$("#CL-option-checkbox-MediaWiki_talk").prop("checked"));
	$("#CL-option-checkbox-Template").prop("checked", !$("#CL-option-checkbox-Template").prop("checked"));
	$("#CL-option-checkbox-Template_talk").prop("checked", !$("#CL-option-checkbox-Template_talk").prop("checked"));
	$("#CL-option-checkbox-Help").prop("checked", !$("#CL-option-checkbox-Help").prop("checked"));
	$("#CL-option-checkbox-Help_talk").prop("checked", !$("#CL-option-checkbox-Help_talk").prop("checked"));
	$("#CL-option-checkbox-Category").prop("checked", !$("#CL-option-checkbox-Category").prop("checked"));
	$("#CL-option-checkbox-Category_talk").prop("checked", !$("#CL-option-checkbox-Category_talk").prop("checked"));
	$("#CL-option-checkbox-Portal").prop("checked", !$("#CL-option-checkbox-Portal").prop("checked"));
	$("#CL-option-checkbox-Portal_talk").prop("checked", !$("#CL-option-checkbox-Portal_talk").prop("checked"));
	$("#CL-option-checkbox-Book").prop("checked", !$("#CL-option-checkbox-Book").prop("checked"));
	$("#CL-option-checkbox-Book_talk").prop("checked", !$("#CL-option-checkbox-Book_talk").prop("checked"));
	$("#CL-option-checkbox-Draft").prop("checked", !$("#CL-option-checkbox-Draft").prop("checked"));
	$("#CL-option-checkbox-Draft_talk").prop("checked", !$("#CL-option-checkbox-Draft_talk").prop("checked"));
	$("#CL-option-checkbox-TimedText").prop("checked", !$("#CL-option-checkbox-TimedText").prop("checked"));
	$("#CL-option-checkbox-TimedText_talk").prop("checked", !$("#CL-option-checkbox-TimedText_talk").prop("checked"));
	$("#CL-option-checkbox-Module").prop("checked", !$("#CL-option-checkbox-Module").prop("checked"));
	$("#CL-option-checkbox-Module_talk").prop("checked", !$("#CL-option-checkbox-Module_talk").prop("checked"));
	$("#CL-option-checkbox-Gadget").prop("checked", !$("#CL-option-checkbox-Gadget").prop("checked"));
	$("#CL-option-checkbox-Gadget_talk").prop("checked", !$("#CL-option-checkbox-Gadget_talk").prop("checked"));
	$("#CL-option-checkbox-Gadget_Definition").prop("checked", !$("#CL-option-checkbox-Gadget_Definition").prop("checked"));
	$("#CL-option-checkbox-Gadget_Definition_talk").prop("checked", !$("#CL-option-checkbox-Gadget_Definition_talk").prop("checked"));
}
function get_chosen_nss(){
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

	return chosen_ns_s_array;
}