var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');
var colors = require('colors');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

app.use(express.static('./app/public'));

app.listen(PORT, function() {
    console.log(`Friend Finder is running on {PORT}`);
});