// ==UserScript==
// @name        Imgur-on-reddit
// @namespace   http://phalacee.com/userscripts/
// @description Changes imgur links to the image instead of the page
// @version 1.0
// @include     http://*reddit.com/*
// @include     https://*reddit.com/*
// ==/UserScript==


function init() {

	var links = document.getElementsByTagName('a');
	for (var i = links.length - 1; i >= 0; --i) {
		href = links[i].getAttribute('href');

		if (/imgur.com\/a/i.test(href)) { // Highlight albums
			links[i].style.color = "#00CC99";
			newhref = href.replace("?gallery", "") + "/zip";
			links[i].setAttribute('href', newhref);
		} else if (/\/imgur.com/i.test(href)) {
			newhref = href.replace("//imgur", "//i.imgur").replace(".jpg", "")  + ".jpg";
			links[i].setAttribute('href', newhref);
			links[i].style.color = "#A6CF29";
		} else if (/imgur.com/i.test(href)) { // Highlight individual images
			links[i].style.color = "#A6CF29";
		}
	}
}

init();