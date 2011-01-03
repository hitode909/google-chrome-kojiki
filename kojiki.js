function copyString(string) {
    var input = document.querySelector("input");
    input.value = string;
    input.select();
    document.execCommand("copy", false, null);
}

function parseHeader(url, callback) {
    chrome.cookies.getAll({ url: url }, function(cookies) {
        var str = '';
        cookies.forEach(function(item) {
            str += item.name + '=' + item.value + '; ';
        });
        callback(str);
    });
}

function wget_handler(info, tab) {
    var url = info.linkUrl ||info.pageUrl;
    parseHeader(url, function(cookie_str) {
        var command = "wget --cookies=off --header \"Cookie: " + cookie_str + "\" " + url;
        copyString(command);
    });
}

function curl_handler(info, tab) {
    var url = info.linkUrl ||info.pageUrl;
    parseHeader(url, function(cookie_str) {
        var command = "curl --cookie \"" + cookie_str + "\" " + url;
        copyString(command);
    });
}

function curl_with_header_handler(info, tab) {
    var url = info.linkUrl ||info.pageUrl;
    parseHeader(url, function(cookie_str) {
        var command = "curl -i --cookie \"" + cookie_str + "\" " + url;
        copyString(command);
    });
}

chrome.contextMenus.create({
    "title" : "Copy wget this link",
    "type" : "normal",
    "contexts" : ["link"],
    "onclick" : wget_handler
});

chrome.contextMenus.create({
    "title" : "Copy wget this page",
    "type" : "normal",
    "contexts" : ["page"],
    "onclick" : wget_handler
});

chrome.contextMenus.create({
    "title" : "Copy curl link",
    "type" : "normal",
    "contexts" : ["link"],
    "onclick" : curl_handler
});

chrome.contextMenus.create({
    "title" : "Copy curl this page",
    "type" : "normal",
    "contexts" : ["page"],
    "onclick" : curl_handler
});

chrome.contextMenus.create({
    "title" : "Copy curl with header link",
    "type" : "normal",
    "contexts" : ["link"],
    "onclick" : curl_with_header_handler
});

chrome.contextMenus.create({
    "title" : "Copy curl with header this page",
    "type" : "normal",
    "contexts" : ["page"],
    "onclick" : curl_with_header_handler
});
