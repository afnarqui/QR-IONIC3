"use strict";function toJson(){return{fromXml:function(r){return new Promise(function(n,t){return r?void parser.parseString(r,function(r,e){return r?t(r):void n(e)}):n(r)})},fromObjectXML:function(r){var n=this,t=[],e={},o=function(o){return"string"!=typeof r[o]?"continue":void t.push(n.fromXml(r[o]).then(function(r){var n=Object.keys(r)[0];e[o]=r[n]}))};for(var i in r){o(i)}var u=t.reduce(function(r,n){return r.then(n)});return u.then(function(r){return e})}}}var fs=require("fs"),xml2js=require("xml2js"),parser=new xml2js.Parser({explicitRoot:!1,explicitArray:!1,ignoreAttrs:!0});module.exports=toJson();