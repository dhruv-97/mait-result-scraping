var FormData = require('form-data');
var request = require('request');
var cheerio= require('cheerio');
function mkdataCookie(cookie) {
    var t, j;
    cookie = cookie.toString().replace(/,([^ ])/g, ",[12],$1").split(",[12],");
    for (var x = 0; x < cookie.length; x++) {
        cookie[x] = cookie[x].split("; ");
        j = cookie[x][0].split("=");
        t = {
            key: j[0],
            value: j[1]
        };
        for (var i = 1; i < cookie[x].length; i++) {
            j = cookie[x][i].split("=");
            t[j[0]] = j[1];
        }
        cookie[x] = t;
    }
    return cookie;
}
function dataCookieToString(dataCookie) {
    var t = "";
    for (var x = 0; x < dataCookie.length; x++) {
        t += ((t != "") ? "; " : "") + dataCookie[x].key + "=" + dataCookie[x].value;
    }
    return t;
} 
var form = new FormData();
 
form.append('Roll_No', '60714803115');
form.submit('http://ipuresult.com/index.php', function(err, res) {
  // res – response object (http.IncomingMessage)  // 
  	res.resume();
  	var coo= mkdataCookie(res.headers['set-cookie']);
	var	cookie=dataCookieToString(coo);
	console.log(cookie);
	request({
  				url: "http://ipuresult.com/student_marks.php",
     			method: "GET",
    			json: true,
   			 	headers: {"Cookie": cookie}
		}, function (error, response, body){
    
    	if(error)
			throw err;
		var $ = cheerio.load(response.body);
		var info=[];
		$('.tftable td').each(function(){
			var content = $(this);
			var contentText = content.text();
			console.log(contentText);
	});
	//console.log(info);

    });
});