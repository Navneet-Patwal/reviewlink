//require express ,https and body-parser
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express(); //creating our app

app.use(bodyParser.urlencoded({extended:true}));// allowing for json like format
app.use(express.static("public"));

//get and post method

//sending our root /home page
app.get("/",function(req, res){
  res.sendFile(__dirname+"/index.html")
})

//getting data through our form and api
app.post("/", function(req, res){
 //getting input value
  const placeName = req.body.placename;

  let url = "maps.googleapis.com/mapsapi/place/textsearch/json?query=" + placeName +"&key=APIkey";

//getting data through google's api
  https.get(url, (response) => {
    reponse.on("data", (data) =>{
      const dat = JSON.parse(data);
      const placeId = dat.place_id;
      //generating review link
      var reviewLink = "search.google.com/local/writereview?placeid="+placeId;
    })

  })
  //sending generated link to front-end
   res.send('<div class="container-fluid">'+ reviewLink+'</div>');
   res.redirect("/");
})

//sever started at port 3000
app.listen(3000,() => {
  console.log("server running at port 3000");
})
