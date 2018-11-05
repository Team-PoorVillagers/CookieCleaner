chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    	var url = tabs[0].url;
    	var regex =  /:\/\/(.[^/]+)/;
    	domain = url.match(regex)[1];
    	var subdomains = domain.split(".");
    	var subdomain = subdomains.slice(-2,-1);
    	var regex_domain = new RegExp(subdomain);
    	chrome.cookies.getAll({} , function(cookies){
    		for(var i=0; i<cookies.length;i++) {
    			var cookies_domain = cookies[i].domain;
    			if(regex_domain.test(cookies_domain) == true){
        			chrome.cookies.remove({url : "http" + (cookies[i].secure ? "s" : "")  + "://" + cookies[i].domain  + cookies[i].path, name: cookies[i].name});
        		}
    		}
    	});
	});
});
