"use strict";function buildHtmlTable(t){var e=new Promise(function(e,r){var u=Object.keys(t[0]),n=u.reduce(function(t,e){return t+=" <th class='texto-derecha'>"+e+"</th>"},""),c=t.reduce(function(t,e){return t+="<tr>",t+=Object.keys(e).reduce(function(t,r){return t+=" <td>"+e[r]+"</td>"},""),t+"</tr>"},""),d="<table> <thead> <tr>"+n+" </tr></thead> <tbody>"+c+"</tbody></table>";e(d)});return e}module.exports=buildHtmlTable;