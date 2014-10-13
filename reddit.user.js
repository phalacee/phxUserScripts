// ==UserScript==
// @name        Imgur-on-reddit
// @namespace   http://phalacee.com/userscripts/
// @description Changes imgur links to the image instead of the page
// @version 1.0
// @include     http://*reddit.com/*
// ==/UserScript==


var links = document.getElementsByTagName('a');
for (var i = links.length - 1; i >= 0; --i) {
	href = links[i].getAttribute('href');
	console.log(href);
}