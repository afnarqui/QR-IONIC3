"use strict";function toDocx(t){return new Promise(function(e,r){var o=htmldocx.asBlob(t);fs.writeFile(filePath,o,function(t){return t?r(t):void e(fs.createReadStream(filePath))})})}var htmldocx=require("html-docx-js"),fs=require("fs"),path=require("path"),filePath=path.join(__dirname,"temp/output.docx");module.exports=toDocx;