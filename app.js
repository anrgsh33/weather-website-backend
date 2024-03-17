require("dotenv").config();
const express = require("express");
const https = require("https"); //Native node module
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//https://stackoverflow.com/questions/38757235/express-how-to-send-html-together-with-css-using-sendfile?rq=3 link to stackoverflow article
app.get("/api/", function (req, res) {
  const apiKey = process.env.API_KEY;
  //console.log(apikey);
  const cityName = req.query.cityname;
  console.log(cityName);
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    //console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data); // convert JSON to js object JSON.stringify(object) it converts js object into JSON
      res.json(weatherData);
    });
  });
});

app.listen(process.env.PORT || 5000, function () {
  console.log("Server is running on port 5000");
});
