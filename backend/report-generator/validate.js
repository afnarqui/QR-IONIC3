"use strict";function validateParams(a,r,t,e){var n=void 0,i=new Promise(function(t,i){if(["txt","pdf","csv","docx","csvp"].indexOf(e)===-1&&(n="Formato no soportado"),a&&a.length&&a.some(function(a){return!a.plantilla&&a.data&&a.data.length})||(n="No hay datos a exportar"),r||(n="No seleccionó ninguna plantilla"),!n){var o="pdf"===e?"docx":e;o="csvp"==e?"csv":o;var s=path.join(config.plantillas[o],r+"."+o);fs.stat(s,function(a,r){!a&&r.isFile()||(n="La plantilla seleccionada no existe"),t(n)})}t(n)});return i}function prepareReportParams(a){var r=a.map(function(a){return a.data}),t=a.reduce(function(a,r){return r.vars?Object.assign(a,r.vars):a},{});return{fullData:r,fullVars:t}}function unionObject(a){for(var r=Object.keys(a),t=r.length-1;t>-1;t--)this[r[t]]=a[r[t]];return this}var fs=require("fs"),path=require("path"),config=require("./config");module.exports={validateParams:validateParams,prepareReportParams:prepareReportParams};