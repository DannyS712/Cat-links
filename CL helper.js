var ns_dict = {
  "Article": 0,
  "Talk": 1,
  "User": 2,
  "User_talk": 3,
  "Wikipedia": 4,
  "Wikipedia_talk": 5,
  "File": 6,
  "File_talk": 7,
  "MediaWiki": 8,
  "MediaWiki_talk": 9,
  "Template": 10,
  "Template_talk": 11,
  "Help": 12,
  "Help_talk": 13,
  "Category": 14,
  "Category_talk": 15,
  "Portal": 100,
  "Portal_talk": 101,
  "Book": 108,
  "Book_talk": 109,
  "Draft": 118,
  "Draft_talk": 119,
  "TimedText": 710,
  "TimedText_talk": 711,
  "Module": 828,
  "Module_talk": 829,
  "Gadget": 2300,
  "Gadget_talk": 2301,
  "Gadget_Definition": 2302,
  "Gadget_Definition_talk": 2303
};
var checkbox_array = Object.keys(ns_dict);

function set_all(setting) {
  checkbox_array.forEach(function (e) {
    $("#CL-option-checkbox-" + e).prop("checked", setting);
  });
}

function invert_all() {
  checkbox_array.forEach(function (e) {
    $("#CL-option-checkbox-" + e).prop("checked", !$("#CL-option-checkbox-" + e).prop("checked"));
  });
}

function get_chosen_nss() {
  var chosen_ns_s_array = [];
  checkbox_array.forEach(function (e) {
    if ($("#CL-option-checkbox-" + e).prop("checked")) {
      chosen_ns_s_array.push(ns_dict[e]);
    }
  });
  return chosen_ns_s_array;
}
