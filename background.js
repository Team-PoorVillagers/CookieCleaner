chrome.browserAction.onClicked.addListener(function(tab) {
	var str = tab.url;
	var hostname = (new URL(str)).hostname;
	domain_ = hostname;
	domain_ = domain_.split(".")
	domain_ = domain_[domain_.length - 2]
	var regex1 = RegExp(domain_);
	chrome.cookies.getAll({}, function(cookies) {
	    for(var i=0; i<cookies.length;i++) {
	      var cookie_domain = cookies[i].domain;
	      var result = regex1.test(cookie_domain);
	      if (result == true)
	      {
	      	var url = "http" + (cookies[i].secure ? "s" : "") + "://" + cookies[i].domain + cookies[i].path;
	      	chrome.cookies.remove({"url": url, "name": cookies[i].name});
	      }
	    }
	  });
});
