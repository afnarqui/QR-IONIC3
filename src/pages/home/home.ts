import { Component } from '@angular/core';
import { ToastController,Platform, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { FileChooser } from '@ionic-native/file-chooser';
import { BdServiceProvider } from '../../providers/bd-service/bd-service';
import { EmailComposer } from '@ionic-native/email-composer';
import { nitsServices } from '../../servicios/nits.services';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { NavController } from 'ionic-angular';
import { DocumentViewer } from '@ionic-native/document-viewer';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  qrData = null;
  createdCode = null;
  scannedCode = null;
  nits: any[] = [];
  correo: any[] = [];
  public cordova:any;
    

  constructor(private barcodeScanner: BarcodeScanner,
              private toastController:ToastController,
              private platform:Platform,
              private fileChooser:FileChooser,
              public bdServiceProvider: BdServiceProvider,
              public alertController:AlertController,
              public emailComposer:EmailComposer,
              public NitsServices:nitsServices,
              public iab:InAppBrowser,
              public navCtrl: NavController,
              private document: DocumentViewer) {}
            
            

  crearQR() {
    this.createdCode = this.qrData;
  }

  scanQR() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    }, (err) => {
        this.mostrarToast('Error: ' + err);
    });
  }

  private mostrarToast(texto:string){
    this.toastController.create({
      message: texto,
      duration: 2500
    })
    .present();
  }

  seleccionarTap(){
    if(!this.platform.is("cordova")){
      this.mostrarToast("Error: no estamos en un dispositivo");
      return;
    }

    this.fileChooser.open()
    .then(uri => this.mostrarToast(uri))
    .catch(err => this.mostrarToast(err));



  }  

  getAllNits(){
    this.bdServiceProvider.getAllNits()
    .then( data => {
      this.nits = data;
      
    })
    .catch( error => {
      this.mostrarToast("Error  : " + error );
    });
  }  


  openAlertNewNits(){
    if(!this.platform.is("cordova")){
      this.mostrarToast("Error: no estamos en un dispositivo");
     
      this.nits.push(
        {nombreintegrado: 'andres', cedula: 102030, correo: 'afnarqui9@gmail.com', id: 1}
      )
      // this.enviarCorreo(this.nits)
      return;
    }

    let alert = this.alertController.create({
      title: 'Crear Nits',
      message: 'escribe el nombre de el nit',
      inputs: [
        {
          name: 'nombreintegrado',
          placeholder: 'Digitar el nombre.',
        },
          {
            name: 'cedula',
            placeholder: 'Digitar la cedula.',
          }  
          ,
          {
            name: 'correo',
            placeholder: 'Digitar el correo.',
          }          
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () =>{
            this.mostrarToast('Cancelar..' )
          }
        },
        {
          text: 'Crear',
          handler: (data)=>{ 
            data.completed = false;
            this.bdServiceProvider.createNits(data)
            .then(response => {
              // this.nits.unshift( data );
              this.getAllNits();
              
             // this.enviarCorreo(data)
            })
            .catch( error => {
              this.mostrarToast('Error..' + error)
            })
          }
        }
      ]
    });
    alert.present();    
   
  }

  updateNits(task, index){
    task = Object.assign({}, task);
    task.completed = !task.completed;
    this.bdServiceProvider.update(task)
    .then( response => {
      this.nits[index] = task;
    })
    .catch( error => {
      this.mostrarToast('Error..' + error)
    })
  }  

  deleteNits(task: any, index){
    this.bdServiceProvider.delete(task)
    .then(response => {
      this.mostrarToast(response);
      this.nits.splice(index, 1);
    })
    .catch( error => {
      this.mostrarToast('Error..' + error)
    })
  }  

  // ionViewDidLoad(){
  //   if(!this.platform.is("cordova")){
  //     this.mostrarToast("Error: no estamos en un dispositivo");
  //     this.nits = this.NitsServices.getNits();
  //     return;
  //   }    
  //  this.getAllNits();
  // }  
  ionViewDidLoad(){  
  //  this.getAllNits();
  //  this.correo.push(
  //   {correo: 'afnarqui9@gmail.com'}
  // )

  this.mostrarToast('antes del pdf')
  this.document.viewDocument('assets/myFile.pdf', 'application/pdf', {"title":"nose"})
  this.mostrarToast('despues del pdf pdf')
  // const before = Date.now();

              
        // this.mostrarToast('DEVICE READY FIRED AFTER'  + before + 'ms')
  
        //           this.cordova.plugins.pdf.htmlToPDF({
        //                   data: "<html> <h1>  Hello World  </h1> </html>",
        //                   documentSize: "A4",
        //                   landscape: "portrait",
        //                   type: "base64"
        //               },
        //               (sucess) => this.mostrarToast('sucess: '+ sucess),
        //               (error) => (sucess) => this.mostrarToast('error : '+ sucess))


  }  

  enviarCorreo(data: any) {
    this.mostrarToast('se puede mandar enviado con exito..')
    // this.mostrarToast(data)
    
    this.emailComposer.isAvailable().then((available: boolean) =>{
      // this.mostrarToast(this.correo['correo'])
      // this.mostrarToast('sin hacer nada: ' + this.correo[0].correo)
      if(!available) {
        this.mostrarToast('se puede mandar enviado con exito..')
        let correo = JSON.stringify(data[0].correo)
        this.mostrarToast('correo: ' + correo)
        
      }
     });
     
     let email = {
       to: data[0].correo,
       cc: data[0].correo,
       bcc: [data[0].correo, data[0].correo],
      //  attachments: [
      //    'file://img/logo.png',
      //    'res://icon.png',
      //    'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
      //    'file://README.pdf'
      //  ],
       subject: 'Cordova Icons',
       body: 'este es el correo',
       isHtml: true
     };
     
     // Send a text message using default options
     this.emailComposer.open(email);
     this.mostrarToast('correo enviado con exito..')
  }
  ///+scannedCode+
  enviarcorreo2(createdCode:any){


    this.mostrarToast('antes del pdf')
    this.document.viewDocument('assets/myFile.pdf', 'application/pdf', {"title":"nose funcione"})
    this.mostrarToast('despues del pdf pdf')

    


    let htmlLInk = "TO:afnarqui9@gmail.com;SUB:aja aja;BODY:EL MENSAJE AJA2 "+createdCode+" ;;";
    this.mostrarToast(htmlLInk);
    ///MATMSG:TO
    htmlLInk = htmlLInk.replace("TO:","mailto:");
    htmlLInk = htmlLInk.replace(";SUB:", "?subject=");
    htmlLInk = htmlLInk.replace(";BODY:", "&body=");
    htmlLInk = htmlLInk.replace(";;", "");
    htmlLInk = htmlLInk.replace(/ /g, "%20");
    
    this.mostrarToast(htmlLInk);
    
    this.iab.create( htmlLInk, "_system");
  }

}
