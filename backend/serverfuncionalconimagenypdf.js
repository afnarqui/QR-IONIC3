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
    var doc = new pdfDocument();

    // Write headers
    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
        'Content-Disposition': 'attachment; filename=Untitled.pdf'
    });

    // Pipe generated PDF into response
    doc.pipe(res);

    // Process image
    
    request({
        url: "https://firebasestorage.googleapis.com/v0/b/geo9-17cbe.appspot.com/o/img%2F1504892415004?alt=media&token=244c0256-7955-47b7-9c9a-d09b61de0e40",
        encoding: null // Prevents Request from converting response to string
    }, function(err, response, body) {
        if (err) throw err;

        // Inject image
        doc.image(body); // `body` is a Buffer because we told Request
                         // to not make it a string

        doc.end(); // Close document and, by extension, response
        return;
    });
});

app.listen(3333,function(){
    console.log('escuchando...');
    })