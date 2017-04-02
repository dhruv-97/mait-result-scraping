var express = require('express');
var app = express();
var request = require('request');
var cheerio= require('cheerio');
var fs = require('fs');
var FormData = require('form-data');
var port=8080;
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
var marks =[];
	form.append('Roll_No', '60714803115');
	form.submit('http://ipuresult.com/index.php', function(err, res) {
	  // res – response object (http.IncomingMessage)  // 
	  	res.resume();
	  	var coo= mkdataCookie(res.headers['set-cookie']);
		var	cookie=dataCookieToString(coo);
		//console.log(cookie);
		request({
	  				url: "http://ipuresult.com/student_marks.php",
	     			method: "GET",
	    			json: true,
	   			 	headers: {"Cookie": cookie}
			}, function (error, response, body){
	    
	    	if(error)
				throw err;
			var $ = cheerio.load(response.body);
			
			var mark ={
				subjectID:'',
				subjectCode:'',
				subjectName:'',
				internal:'',
				external:'',
				total:'',
				credits:'' 
			};
			var i=0;
			$('.tftable td').each(function(){
				var content = $(this);
				var contentText = content.text();
				//console.log(contentText);
				if(i==0)
					mark.subjectID=contentText;
				else if(i==1)
					mark.subjectCode=contentText;
				else if(i==2)
					mark.subjectName=contentText;
				else if(i==3)
					mark.internal=contentText;
				else if(i==4)
					mark.external=contentText;
				else if(i==5)
					mark.total=contentText;
				else if(i==6){
					mark.credits=contentText;
					//console.log(mark);
					marks.push(mark);
					mark ={
						subjectID:'',
						subjectCode:'',
						subjectName:'',
						internal:'',
						external:'',
						total:'',
						credits:'' 
					};
					i=-1;
				}
				i++;

		});
		
		

	    });
	});

app.get('/results', function (req, res) {

	setTimeout(function(){ res.send(marks) }, 1000);
})


app.listen(port);
console.log('server running on '+port);