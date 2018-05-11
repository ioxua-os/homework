"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = Number(process.env.PORT) || 3000;
app.get('/', function (req, res) {
    res.send("olar");
});
app.listen(port, function () {
    console.log("Listening on PORT:", port);
});
