import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SQLite } from '@ionic-native/sqlite';
import { BdServiceProvider } from '../providers/bd-service/bd-service';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  // public sqlite: SQLite

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public bdServiceProvider: BdServiceProvider,
    public sqlite: SQLite) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.createDatabase(splashScreen);
    });
  }

  private createDatabase(splashScreen){
    this.sqlite.create({
      name: 'data.db',
      location: 'default' // the location field is required
    })
    .then((db) => {
      this.bdServiceProvider.setDatabase(db);
      this.bdServiceProvider.createTableNits();
    })
    // .then(() =>{
    //   splashScreen.hide();
    //   this.rootPage = 'HomePage';
    // })
    .catch(error =>{
      console.error(error);
    });
  }
}

