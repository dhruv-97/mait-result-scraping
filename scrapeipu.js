var cheerio= require('cheerio');
var request = require('request');
 
// var cookieParser = require('cookie-parser');
var port=8081;
/*
var url = "https://www.indeed.com/cmp/Fuze-Lab/jobs/Entry-Junior-PHP-Jquery-MySQL-Coder-Team-Member-01790db21236725e";
request(url,function(err,resp,body){
	if(err)
		throw err;
	var $ = cheerio.load(body);
	var companyName=$('.company');
	var companyNameText= companyName.text();
	var jobTitle=$('.jobtitle font');
	var jobTitleText = jobTitle.text();
	var location = ('.location');
	var locationText = location.text();
	var summary = $('#job_summary p');
	var summaryText = summary.text();
	var job={
		jobTitle: jobTitleText,
		location: locationText,
		companyName: companyNameText,
		summary: summaryText
	}
	$('.company').filter(function(){
		var companyName=$(this);
		companyNameText=companyName.text();
	})
	
	console.log(job);
})
*/
var url ="http://ipu.ac.in/exam_notices.php"
request(url, function(err,resp,body){
	if(err)
		throw err;
	var $ = cheerio.load(body);
	var notices=[];
	$('.table-box td a').each(function(){
		var content = $(this);
		var contentText = content.text();
		if(contentText.search('B. Tech')!=-1 || contentText.search("B.Tech")!=-1){
			var urlText = $(this).attr('href');
			notices.push({
				notice: contentText,
				url: urlText
			})
		}
	});
	console.log(notices);
})


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
/*
request
	.get('http://ipuresult.com/index.php')
	.on('response', function(response)	{
		coo= mkdataCookie(response.headers['set-cookie']);
		cookie=dataCookieToString(coo);
		console.log(coo);
		console.log(cookie);
		//var myJSONObject = {"Cookie": '"'+dataCookieToString(coo)+'"'};
		request({
  				url: "http://ipuresult.com/student_marks.php",
     			method: "GET",
    			json: true,
   			 	headers: {"Cookie": 'PHPSESSID=afb92dfc222d6d662f8bd0c44d8e2201'}
		}, function (error, response, body){
    
    console.log(response.body);
    });
});

request({
  			url: "http://ipuresult.com/index.php",
     		method: "POST",
    		json: true,
   			body: {"Roll_No": '60714803115'}
		}, function (error, response, body){
			coo= mkdataCookie(response.headers['set-cookie']);
			cookie=dataCookieToString(coo);
			console.log(coo);
			console.log(cookie);
		
    	
    
    });
*/
/*
Request = unirest.post("http://ipuresult.com/index.php")
            .form({
                Roll_No: '60714803115'
            })
            .timeout(26000)
            .end(function (res) {
            	console.log(res.body);
            });
	

app.listen(port);
console.log('server running on '+port);
*/