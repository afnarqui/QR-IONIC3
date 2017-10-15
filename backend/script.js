function request (url,method,dataType,params){
    
method = method || "GET";

var xhr = window.XMLHttpRequest  
     ? new XMLHttpRequest() 
     : new ActiveXObject("Microsoft.XMLHTTP");

return new Promise (function (resolve,reject){
  
      xhr.onreadystatechange = function(){

          var DONE = 4; // readyState 4 means the request is done.
          var OK = 200; // status 200 is a successful return.
          
           if (xhr.readyState ===  XMLHttpRequest.DONE) {
               if (xhr.status === OK) {
                   if(dataType === "blob"){
                       return resolve(xhr.response);
                   }else{
                       return resolve(JSON.parse(xhr.responseText));
                   }
               }
           }
       };
       xhr.open(method,url, true);
       if(dataType){
           xhr.responseType = dataType;        
       }
       if(params){
          xhr.send(JSON.stringify(params));    
       }else{
          xhr.send();    
       }
});

}