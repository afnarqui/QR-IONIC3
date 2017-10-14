import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

@Injectable()
export class BdServiceProvider {
  db: SQLiteObject = null;
  constructor() {}

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }


  createTableNits(){
    let sql = 'CREATE TABLE IF NOT EXISTS nits(id INTEGER PRIMARY KEY AUTOINCREMENT, nombreintegrado TEXT, cedula INTEGER , correo TEXT,completed INTEGER)';
    return this.db.executeSql(sql, []);
  }  

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)';
    return this.db.executeSql(sql, []);
  }  

  getAllNits(){
    let sql = 'SELECT * FROM nits';
    return this.db.executeSql(sql, [])
    .then(response => {
      let nits = [];
      for (let index = 0; index < response.rows.length; index++) {
        nits.push( response.rows.item(index) );
      }
      return Promise.resolve( nits );
    })
    .catch(error => Promise.reject(error));
  }    



  getAll(){
    let sql = 'SELECT * FROM tasks';
    return this.db.executeSql(sql, [])
    .then(response => {
      let tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( tasks );
    })
    .catch(error => Promise.reject(error));
  }  

  create(task: any){
    let sql = 'INSERT INTO tasks(title, completed) VALUES(?,?)';
    return this.db.executeSql(sql, [task.title, task.completed]);
  }  

  createNits(task: any){
    let sql = 'INSERT INTO nits(nombreintegrado,cedula,correo , completed) VALUES(?,?,?,?)';
    return this.db.executeSql(sql, [task.nombreintegrado,task.cedula, task.correo, task.completed]);
  }    

  update(task: any){
    let sql = 'UPDATE tasks SET title=?, completed=? WHERE id=?';
    return this.db.executeSql(sql, [task.title, task.completed, task.id]);
  }  

  updateNits(nits: any){
    let sql = 'UPDATE nits SET nombreintegrado=?,cedula=?,correo=?, completed=? WHERE id=?';
    return this.db.executeSql(sql, [nits.nombreintegrado, nits.cedula, nits.correo, nits.completed, nits.id]);
  }    

  deleteNits(nits: any){
    let sql = 'DELETE FROM nits WHERE id=?';
    return this.db.executeSql(sql, [nits.id]);
  }  

  delete(task: any){
    let sql = 'DELETE FROM tasks WHERE id=?';
    return this.db.executeSql(sql, [task.id]);
  }    

  // private mostrarToast(texto:string){
  //   this.toastController.create({
  //     message: texto,
  //     duration: 2500
  //   })
  //   .present();
  // }  

}

