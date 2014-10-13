// ==UserScript==
// @name        WebCoMark
// @namespace   http://phalacee.com/userscripts/
// @description Tracks webcomics for you
// @version 1.0
// @include     http://*cad-comic.com/cad/*
// @include     http://*leasticoulddo.com/comic/*
// @include     http://*xkcd.com/*/
// @include     http://questionablecontent.net/view.php?comic=*
// ==/UserScript==
// hostname => pathname+query of last read comic strip
var bookmarks = eval( GM_getValue( 'webcomark', '({})' ) );
var bookmarked = false; // keep state for whether bookmarked this time around

var site_host = location.hostname.replace( /^www\./i, '' );
var this_page = location.pathname + location.search;
var last_read = bookmarks[site_host] || '';

// store bookmark as the last read page for this domain
function set_bookmark( bookmark )
{
  bookmarked = true;
  bookmarks[site_host] = bookmark || this_page;
  GM_setValue( 'webcomark', bookmarks.toSource() );
}

function getNums(inTXT) {
  var reg = /\d.*\d/, test = inTXT.match(reg), ar;
  if (test == null) {
    return "NaP";
  } else {
    ar = reg.exec(inTXT);

    return ar[0];
  }
}

function isDigit(c) { 
    return (0 <= c && c <= 9);
}

function increment() {
    var e,s;
    var IB=1;
    alert('boom');
    var L = location.href;
    var LL = L.length;
    for (e=LL-1; e>=0; --e) {
    if (isDigit(L.charAt(e))) { 
        for(s=e-1; s>=0; --s) { 
      if (!isDigit(L.charAt(s))) {
          break; 
      }
            break;
        }
    }
    }
     ++s;
    if (e<0) { 
  return;
    }
    var oldNum = L.substring(s,e+1);
    var newNum = "" + (parseInt(oldNum,10) + IB);
    while (newNum.length < oldNum.length) { 
  newNum = 0 + newNum; 
    }
    location.href = L.substring(0,s) + newNum + L.slice(e+1);
}


function add_link( href, text, title )
{
  var a = document.createElement( 'a' );
  a.innerHTML = text;
  a.href = href;
  a.style.display = 'block';
  a.style.height = '35px';
  a.style.width = '150px';
  a.style.color = '#000';
  a.style.position = 'fixed';
  a.style.font = '18px verdana, sans-serif';
  a.style.background = '#ffffff';
  a.style.lineHeight = '35px';      
  a.style.top = '0px';
  a.style.left = '0px';
  a.style.padding = '0px';
  a.style.zIndex= '900';
  a.style.textAlign = 'center';
  a.style.border = '2px solid #336699';
  a.title = title;
  document.body.appendChild( a );
  if (text == 'Next Comic') {
      var b = document.createElement( 'a' );
      b.innerHTML = "+";
      b.href = "javascript:(function(){%20var%20e,s;%20IB=1;%20function%20isDigit(c)%20{%20return%20(%220%22%20<=%20c%20&&%20c%20<=%20%229%22)%20}%20L%20=%20location.href;%20LL%20=%20L.length;%20for%20(e=LL-1;%20e>=0;%20--e)%20if%20(isDigit(L.charAt(e)))%20{%20for(s=e-1;%20s>=0;%20--s)%20if%20(!isDigit(L.charAt(s)))%20break;%20break;%20}%20++s;%20if%20(e<0)%20return;%20oldNum%20=%20L.substring(s,e+1);%20newNum%20=%20%22%22%20+%20(parseInt(oldNum,10)%20+%20IB);%20while%20(newNum.length%20<%20oldNum.length)%20newNum%20=%20%220%22%20+%20newNum;%20location.href%20=%20L.substring(0,s)%20+%20newNum%20+%20L.slice(e+1);%20})();";
      b.style.height = '35px';
      b.style.width = '35px';
      b.style.color = '#000';
      b.style.position = 'fixed';
      b.style.font = '18px verdana, sans-serif';
      b.style.background = '#ffffff';
      b.style.lineHeight = '35px';      
      b.style.top = '0px';
      b.style.left = '159px';
      b.style.padding = '0px';
      b.style.zIndex= '900';
      b.title = "Increment";
      b.style.textAlign = 'center';
      b.style.border = '2px solid #336699';
      b.style.textAlign = 'center';
      document.body.appendChild( b );
  }
}

function add_link_to_next_comic()
{
  var sites = [], site;
  for( site in bookmarks ) {
    sites.push( site );
  }
  site = sites[(sites.indexOf( site_host ) + 1) % sites.length];
  add_link( 'http://'+ site + bookmarks[site], 'Next Comic', 'Jump to next comic site\'s last read bookmark' );
}

function add_link_to_last_read( href )
{
  add_link( href, 'Last Read', 'Automatic last read bookmark' );
}

function init()
{
  var cur_val = this_page, old_val = last_read, cur_num, old_num;
    
  cur_val = cur_val.replace("-", "");
  while(cur_val.search("-") != -1) {
    cur_val = cur_val.replace("-", "");
  }
  cur_num = getNums(cur_val);

  old_val = old_val.replace("-", "");
  while(old_val.search("-") != -1) {
    old_val = old_val.replace("-", "");
  }
  old_num = getNums(old_val);

  if ((cur_num == old_num && cur_num == "NaP" && old_num == "NaP") || (cur_num != "NaP" && cur_num > old_num) || (cur_num != "NaP" && old_num == "NaP") || (cur_num != "NaP" && cur_num == old_num) ) {
    set_bookmark(this_page);
  }

  if (bookmarked) {
    add_link_to_next_comic();
  } else {
    add_link_to_last_read(last_read);
  }
}

init();