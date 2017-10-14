import { Injectable } from '@angular/core';

@Injectable()
export class nitsServices{

  nits: any[] = [];

  constructor(){

  }

  getNits(){
    this.nits.
    push(
      {nombreintegrado: 'andres', cedula: 102030, correo: 'afnarqui9@gmail.com', id: 1})
      return this.nits;
  }
  
}
