function parseHeader(url, callback) {
    chrome.cookies.getAll({ url: url }, function(cookies) {
        var str = '';
        cookies.forEach(function(item) {
            str += encodeURIComponent(item.name) + '=' + encodeURIComponent(item.value) + '; ';
        });
        callback(str);
    });
}

function wget_handler(info, tab) {
    var url = info.linkUrl ||info.pageUrl;
    parseHeader(url, function(cookie_str) {
        var command = "wget --cookies=off --header \"Cookie: " + cookie_str + "\" " + url;
        chrome.tabs.create({ url: 'data:text/plain,' + command, selected: true});
    });
}

function curl_handler(info, tab) {
    var url = info.linkUrl ||info.pageUrl;
    parseHeader(url, function(cookie_str) {
        var command = "curl --cookie \"" + cookie_str + "\" " + url;
        chrome.tabs.create({ url: 'data:text/plain,' + command, selected: true});
    });
}

chrome.contextMenus.create({
    "title" : "wget link",
    "type" : "normal",
    "contexts" : ["link"],
    "onclick" : wget_handler
});

chrome.contextMenus.create({
    "title" : "wget this page",
    "type" : "normal",
    "contexts" : ["page"],
    "onclick" : wget_handler
});

chrome.contextMenus.create({
    "title" : "curl link",
    "type" : "normal",
    "contexts" : ["link"],
    "onclick" : curl_handler
});

chrome.contextMenus.create({
    "title" : "curl this page",
    "type" : "normal",
    "contexts" : ["page"],
    "onclick" : curl_handler
});
