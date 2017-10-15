var express          = require('express'),
app              = express(),
bodyParser       = require('body-parser');
var nodemailer = require('nodemailer');
var reportGenerator = require("./report-generator/main")
// (config.plantillas)
app.use(bodyParser());
 
app.get('/correoafn',function(req, res) {
    var pdf = require('html-pdf');
    var fs = require('fs');
    
    var html = `<h3>hola</h3><p>chau</p>
    
    <img src="~/certificado.png" alt="no esta">
    <h1>despues del certificado</h1>
    `

      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // mail.clubhonorarios.com
        port: 587,
        auth: {
            user: 'afnarqui9@gmail.com',
            pass: 'quintero1.' 
        }
    });

    pdf.create('./index.html').toStream(function(err, stream){
      var mailOptions = {
        from: 'afnarqui@hotmail.com', //grab form data from the request body object
        to: 'afnarqui9@gmail.com',
        subject: 'PDF',
        text: 'holaaa node cuerpo!!!',
        attachments: [
          {   // stream as an attachment
              filename: 'ejemplo.pdf',
              content: stream
          }],
       };

      transporter.sendMail(mailOptions,function(error, info){
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        };
      });
        
    });
});



app.get('/reporte1',function(req, res) {
    var pdf = require('html-pdf');
    var fs = require('fs');





    
    var html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Reporteador</title>
    </head>
    <body>
        
        
        <a id="reporte"></a>
        
        <p>hola a todos</p>
     
        <img id="imagen" width=168 height=66>

        <script languaje="javascript">
        var contenedor=document.getElementById("imagen");
        var xx = parent.location.href;
        var xx = xx.toUpperCase();
        if (xx.indexOf('INDEX.ASP')!=-1){
        contenedor.src="certificado.jpg"
        }else{
        contenedor.src="./certificado.jpg"
        }
        </script>
        



        <script src="script.js"></script>
        <script>       
        
            
            var a = document.getElementById("reporte");
            // docx
            var tipo = "pdf";
            var params = {
                email:{
                  para:"afnarqui9@gmail.com",
                  asunto:"reporter",
                  texto:"esto es increhible .... mira el adjunto"
                },
                plantilla:"ejemplo3",
                exportar:tipo,
                "data": [
                {
                    "nombre":"Sergio",
                    "apellido":"Arboleda",
                    "anos" : "22",
                    "tel":"123123123",
                    "dir":"Cr 87 N 92-c32"
                },
                {
                    "nombre":"Jhoana",
                    "apellido":"Arboleda",
                    "anos" : "21",
                    "tel":"123123123",
                    "dir":"Cr 87 N 92-c32"
                },
                {
                    "nombre":"Mariana",
                    "apellido":"Arboleda",
                    "anos" : "24",
                    "tel":"123123123",
                    "dir":"Cr 87 N 92-c32"
                },
                {
                    "nombre":"Juan",
                    "apellido":"Arboleda",
                    "anos" : "25",
                    "tel":"123123123",
                    "dir":"Cr 87 N 92-c32"
                },
                {
                    "nombre":"Hilda",
                    "apellido":"Arboleda",
                    "anos" : "26",
                    "tel":"123123123",
                    "dir":"Cr 87 N 92-c32"
                },
                {
                    "nombre":"Andres",
                    "apellido":"Arboleda",
                    "anos" : "26",
                    "tel":"123123123",
                    "dir":"Cr 87 N 92-c32"
                },
                {
                    "nombre":"Mari",
                    "apellido":"Arboleda",
                    "anos" : "20",
                    "tel":"123123123",
                    "dir":"Cr 87 N 92-c32"
                }    
                ]
            };
            
            
                 request("http://localhost:3333/reporte","POST","blob",params)
                    .then((response)=>{
                         
                        var url = window.URL.createObjectURL(response);
                        a.href = url;
                        a.download = "data."+tipo;
                        a.click();
                    })
                    .catch(console.log.bind(console));
            
            
            
            
            
    
        </script>
    </body>
    </html>
    `

      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // mail.clubhonorarios.com
        port: 587,
        auth: {
            user: 'afnarqui9@gmail.com',
            pass: 'quintero1.' 
        }
    });
    console.log(html)
    pdf.create(html).toStream(function(err, stream){
      var mailOptions = {
        from: 'afnarqui@hotmail.com', //grab form data from the request body object
        to: 'afnarqui9@gmail.com',
        subject: 'PDF',
        text: 'holaaa node cuerpo!!!',
        attachments: [
          {   // stream as an attachment
              filename: 'ejemplo.pdf',
              content: stream
          }],
       };

      transporter.sendMail(mailOptions,function(error, info){
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        };
      });
        
    });
});




/**
 


{
	"email": {
		"para": "afnarqui9@gmail.com",
		"asunto": "reporter",
		"texto": "esto es increhible .... mira el adjunto"
	},
    "plantillas": {
        "docx" :"C:\\reportgenerator\\ejemplo\\Word\\",
        "csv"  : "C:\\reportgenerator\\ejemplo\\Excel\\",
        "txt"  : "C:\\reportgenerator\\ejemplo\\Txt\\"
    },
	"exportar": "pdf",
	"data": [{
			"nombre": "Sergio",
			"apellido": "Arboleda",
			"anos": "22",
			"tel": "123123123",
			"dir": "Cr 87 N 92-c32"
		},
		{
			"nombre": "Jhoana",
			"apellido": "Arboleda",
			"anos": "21",
			"tel": "123123123",
			"dir": "Cr 87 N 92-c32"
		},
		{
			"nombre": "Mariana",
			"apellido": "Arboleda",
			"anos": "24",
			"tel": "123123123",
			"dir": "Cr 87 N 92-c32"
		},
		{
			"nombre": "Juan",
			"apellido": "Arboleda",
			"anos": "25",
			"tel": "123123123",
			"dir": "Cr 87 N 92-c32"
		},
		{
			"nombre": "Hilda",
			"apellido": "Arboleda",
			"anos": "26",
			"tel": "123123123",
			"dir": "Cr 87 N 92-c32"
		},
		{
			"nombre": "Andres",
			"apellido": "Arboleda",
			"anos": "26",
			"tel": "123123123",
			"dir": "Cr 87 N 92-c32"
		},
		{
			"nombre": "Mari",
			"apellido": "Arboleda",
			"anos": "20",
			"tel": "123123123",
			"dir": "Cr 87 N 92-c32"
		}
	]
}


 */


app.get('/reporte', function (req, res, next) {
 console.log('voy aca')
 getData(req, req.url, function (data, files) {
    debugger
            // if (req.url === "/reporte") {
                if (1 === 1)
                debugger
                let configObject = data.find((item) => item.plantilla);
                return reportGenerator(data, configObject.plantilla, configObject.email, configObject.exportar, configObject.groupBy, res);
            }
    
            // if (req.url === "/correo") {
            //     console.log("Enviando correo ...");
            //     let adjuntos = getAdjuntos(files.upload);
            //     sendEmail(data.para, data.asunto, data.mensaje, adjuntos, res);
            // }
    
        });
})

function server(req, res) {
    console.log("Request for ->" + req.url);
    setHeaders(res);
    debugger
    getData(req, req.url, function (data, files) {

        if (req.url === "/reporte") {
            debugger
            let configObject = data.find((item) => item.plantilla);
            return reportGenerator(data, configObject.plantilla, configObject.email, configObject.exportar, configObject.groupBy, res);
        }

        // if (req.url === "/correo") {
        //     console.log("Enviando correo ...");
        //     let adjuntos = getAdjuntos(files.upload);
        //     sendEmail(data.para, data.asunto, data.mensaje, adjuntos, res);
        // }

    });
}

function getData(req, url, fn) {
    debugger
        // if (url === "/reporte") {
            if (1 === 1) {
    
            let body = "";
    
            req.on("data", function (chunk) {
                body += chunk;
            });
            req.on("end", function (chunk) {
                fn(JSON.parse(req.query.data));
            });
    
        } else {
            let form = new formidable.IncomingForm();
            form.multiples = true;
            form.uploadDir = uploadDir;
            form.parse(req, function (err, fields, files) {
                fn(fields, files);
            });
        }
    }

    



 
app.listen(3333,function(){
console.log('Listening...');
})