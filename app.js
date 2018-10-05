var express = require("express");
var request = require("request"); //HTTP call için (the simplest way possible to make http calls)

var app = express();

app.set("view engine", "ejs"); //Otomatik uzantı tanımlayıcı


// film arama route

app.get("/film_ara", function(req, res){
    var query = req.query.search; // formdan gelen name = "search" verisini çeker
    var url = "https://omdbapi.com/?s=" + query + "&apikey=e067be03"; // API key almak için siteyi ziyaret edin
    request(url, function(error, response, body){
        var data = JSON.parse(body); //String JSON formatını object formatına dönüştürür
        if(error || data.Response === 'False') {
            res.send(error || data.Error);
        } else {
            res.render("results", {data: data}); // ejs dosyasında object'e dönüştürülen datayı kullanmamızı sağlar
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){ // AWS c9 varsayılan PORT ve IP
   console.log("Movie App çalışıyor.."); 
});
