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
    console.log( `file://${require.resolve('./certificado.jpg')}`)
    request({
        url: `file://${require.resolve('./certificado.jpg')}`,
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