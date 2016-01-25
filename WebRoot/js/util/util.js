/**
 * function：string startWith
 */
String.prototype.startWith=function(str){     
  var reg=new RegExp("^"+str);     
  return reg.test(this);        
}  
/**
 * function：string endWith
 */
String.prototype.endWith=function(str){     
  var reg=new RegExp(str+"$");     
  return reg.test(this);        
}
/**
 * function:string to object
 * msg:string or object
 */
function evalStr(msg){
	if(typeof(msg) == "object"){
		return msg;
	}else if(typeof(msg) == "string"){
		return eval("("+msg+")");
	}else{
		return null;
	}
}

/**
 * function：执行可能会抛出异常的函数
 * fun:目标函数
 */
function doException(fun){
	 try{   
     	if(typeof(fun) == "function"){
     		var args = [];  
     		for(var i=0; i<arguments.length; i++){
     			if(i == (arguments.length -1)){
     				break;
     			}
     			args.push(arguments[i+1]);  
     		}
     		fun.apply(this, args);
     	}
     }catch(exception){   
         //alert("调用函数" + fun + "出错");
     }finally{   
         //callback
     }   	
}