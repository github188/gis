/**
 * Js Map
 */
function Map(){
  	this.map = new Object();
   	this.length = 0;
   
  	this.size = function(){
    	return this.length;
   	}
   
   	this.put = function(key, value){
      	if(!this.map['_' + key]){
             ++this.length;
        }
      	this.map['_' + key] = value;
     
   	}
   
   	this.remove = function(key){
    	if(this.map['_' + key]){
          	--this.length;
        	return delete this.map['_' + key];
      	}else{
          return false;
      	}
   	}	
   
   	this.containsKey = function(key){
     	return this.map['_' + key] ? true:false;
   	}
    
   	this.get = function(key){    
      return this.map['_' + key] ? this.map['_' + key]:null;
   	}


 	this.inspect = function(){    
     	var str = '';
     	for(var each in this.map){
          str += '\n'+ each + '  Value:'+ this.map[each];
     	}
     	return str;
   	}
   	
   	this.values = function(){
   		var arr = new Array();
   		for(var each in this.map){
          arr.push(this.map[each]);
     	}
     	return arr;
   	}
   	
   	this.keys = function(){
   	  	var arr = new Array();
   		for(var each in this.map){
          arr.push(each.substring(1,each.length));
     	}
     	return arr;
   	}
}