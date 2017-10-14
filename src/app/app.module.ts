import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//components

import { FileChooser } from '@ionic-native/file-chooser';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SQLite } from '@ionic-native/sqlite';
import { BdServiceProvider } from '../providers/bd-service/bd-service';

import { HttpModule } from '@angular/http';
import { EmailComposer } from '@ionic-native/email-composer';
import { nitsServices } from '../servicios/nits.services';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgxQRCodeModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileChooser,
    SQLite,
    EmailComposer,
    nitsServices,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    BdServiceProvider
  ]
})
export class AppModule {}
