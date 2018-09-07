"use strict";

var nextTick = require("next-tick");
module.exports = { plan: {}, on: function (name, cb) { nextTick(cb); } };
