var express = require('express'),
request = require('request'),
pdfDocument = require('pdfkit');

// Start Express
var app = express();

// Use JSON in POST body
app.use(express.json());

// Setup POST response
app.get('/reporte', function(req, res) {
    // Create PDF
  

    // Write headers
    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
        'Content-Disposition': 'attachment; filename=Untitled.pdf'
    });

    console.log('mi prueba')
});

app.listen(3333,function(){
    console.log('escuchando...');
    })