var canvasLeft=0,canvasRight=800,canvasTop=0,canvasBottom=400;
(window.load=function(){
	var canvas=document.getElementById("myCanvas");
	var ctx=canvas.getContext("2d");
    var x1 = 0, y1=0,x2=0, y2=0,width=0,height=0;
    var px1=-1,py1=-1,px2=-1,py2=-1;
    var node=[];
    var collection=[];
	canvas.addEventListener("mousedown",function(event){
		x1=0,y1=0;
        x1=event.offsetX;
        y1=event.offsetY;
	},false);
	canvas.addEventListener("mouseup",function(event){
			x2=0,y2=0,width=0,height=0;
	        x2=event.offsetX;
	        y2=event.offsetY;
        	
        	var left = x1<x2?x1:x2;
			var top = y1<y2?y1:y2;
	        width=Math.abs(x2-x1);
	        height=Math.abs(y2-y1);
            if(x1==x2 && y1==y2){
            }            
            else{
            	if(isInsideRect(x1,y1,collection).position){
            	/*********** inside rectnagle  ************/
	            	var rect=isInsideRect(x1,y1,collection).rect;
	            	if(isAroundBorder(x1,y1,x2,y2,rect,collection,ctx)){
	                      
	            	}
	            	else{
	                   	/*Inside body for move or drag   rectangle*/
	                   	dragRectangle(x1,y1,x2,y2,collection,ctx);
	                } 
            	
	            } 
	            else{
	            	/*Outside side rectangle draw new rectangle*/
	            	
	                
	            	var color = colorChanger().color;
	            	ctx.fillStyle=color;
		            ctx.fillRect(left,top,width,height);
		            var temp = {
		            	left:left,
		            	top:top,
		            	right:left+width,
		            	bottom:top+height,
		            	color:color
		            };
		            collection.push(temp);
	            }
            }
	    },false);
	/*Delete rectangle*/
	canvas.addEventListener("dblclick",function(event){
        var deleteX=event.offsetX;
        var deleteY=event.offsetY;
		deleteRectangle(deleteX,deleteY,collection,ctx);
	},false);
	/*Clear canvas event Listener */
	var clearElement=document.getElementById("clear");
	clearElement.addEventListener("click",function(){
        clearElement.style.boxShadow="none";
        clearCanvas(ctx);
        collection=[];
        setInterval(function(){ clearElement.style.boxShadow="7px 7px 0px black"; }, 500);
	},false);
})();

/*point around the border*/
function isAroundBorder(x1,y1,x2,y2,rect,collection,canvasObj){
   var result=false;
   var bLeft=rect.left;
   var bRight=rect.right;
   var bTop=rect.top;
   var bBottom=rect.bottom;
   /******** Condition  *********/
   var leftCondition=((bLeft<=x1) && (x1<=(bLeft+5)));
   var rightCondition= (((bRight-5)<=x1) && (x1<=(bRight)));
   var topCondition=((bTop<=y1) && (y1<=(bTop+5)));
   var bottomCondition=(((bBottom-5)<=y1) && (y1<=(bBottom)));

   if(leftCondition && topCondition){
		   	/*bottom*/
		   	strechRecLeftTop(x1,y1,x2,y2,rect,collection,canvasObj);
		    result=true;
	}  
   else if(leftCondition && bottomCondition){
		   	/*bottom*/
		   	strechRecLeftBottom(x1,y1,x2,y2,rect,collection,canvasObj);
		    result=true;
	}
	else if(rightCondition && topCondition){
		    strechRecRightTop(x1,y1,x2,y2,rect,collection,canvasObj);
		   	/*bottom*/
		    result=true;
	} 
	else if(rightCondition && bottomCondition){
		   	/*bottom*/
		   	strechRecRightBottom(x1,y1,x2,y2,rect,collection,canvasObj);
		    result=true;
	}      
   else if(leftCondition){
	   	/*left*/
	    strechRecLeft(x1,y1,x2,y2,rect,collection,canvasObj); 
	    result=true;
   }
   else if(rightCondition){
		   	/*right*/
		    strechRecRight(x1,y1,x2,y2,rect,collection,canvasObj);
		    result=true;
	}
	else if(topCondition){
		   	/*top*/
		    strechRecTop(x1,y1,x2,y2,rect,collection,canvasObj);;
		    result=true;
	}
	else if(bottomCondition){
		   	/*bottom*/
		    strechRecBottom(x1,y1,x2,y2,rect,collection,canvasObj);
		    result=true;
	} 
	
   return result;
}

/*Strech left-top border*/
	function strechRecLeftTop(x1,y1,x2,y2,rect,collection,canvasObj){
        var left=rect.left;
        var right=rect.right;
        var top=rect.top;
        var bottom=rect.bottom;
        /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Left*/
        var strechX=Math.abs(x1-x2);
        if(x1>x2){
            var sLeft=left-strechX;
            var sWidth=(Math.abs(left-right))+(strechX);
        }else{
            var sLeft=left+strechX;
            var sWidth=(Math.abs(left-right))-(strechX);
        }
        
        /*YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY top*/
        var strechY=Math.abs(y1-y2);
        if(y1>y2){
            var sTop=top-strechY;
            var sHeight=(Math.abs(top-bottom))+(strechY);
        }else{
            var sTop=top+strechY;
            var sHeight=(Math.abs(top-bottom))-(strechY);
        }

        var sRight=right;
        var sBottom=bottom;
        var sColor=rect.color;
        deleteRectangle(x1,y1,collection,canvasObj);
        newRectDrawPush(sLeft,sTop,sWidth,sHeight,collection,canvasObj,sColor);
	}

	/*Strech top-right border*/
	function strechRecRightTop(x1,y1,x2,y2,rect,collection,canvasObj){
        var left=rect.left;
        var right=rect.right;
        var top=rect.top;
        var bottom=rect.bottom;
        /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Left*/
        var strechX=Math.abs(x1-x2);
        if(x1>x2){
            var sright=right-strechX;
            var sWidth=(Math.abs(left-right))-(strechX);
        }else{
            var sRight=right+strechX;
            var sWidth=(Math.abs(left-right))+(strechX);
        }
        
        /*YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY top*/
        var strechY=Math.abs(y1-y2);
        if(y1>y2){
            var sTop=top-strechY;
            var sHeight=(Math.abs(top-bottom))+(strechY);
        }else{
            var sTop=top+strechY;
            var sHeight=(Math.abs(top-bottom))-(strechY);
        }

        var sLeft=left;
        var sBottom=bottom;
        var sColor=rect.color;
        deleteRectangle(x1,y1,collection,canvasObj);
        newRectDrawPush(sLeft,sTop,sWidth,sHeight,collection,canvasObj,sColor);
	}
    /*Strech Left-bottom border*/
	function strechRecLeftBottom(x1,y1,x2,y2,rect,collection,canvasObj){
        var left=rect.left;
        var right=rect.right;
        var top=rect.top;
        var bottom=rect.bottom;
        /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Left*/
        var strechX=Math.abs(x1-x2);
        if(x1>x2){
            var sLeft=left-strechX;
            var sWidth=(Math.abs(left-right))+(strechX);
        }else{
            var sLeft=left+strechX;
            var sWidth=(Math.abs(left-right))-(strechX);
        }
        
        /*YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY top*/
        var strechY=Math.abs(y1-y2);
        if(y1>y2){
            var sTop=top-strechY;
            var sHeight=(Math.abs(top-bottom))-(strechY);
        }else{
            var sBottom=bottom+strechY;
            var sHeight=(Math.abs(top-bottom))+(strechY);
        }
        var sTop=top;
        var sRight=right;
        var sColor=rect.color;
        deleteRectangle(x1,y1,collection,canvasObj);
        newRectDrawPush(sLeft,sTop,sWidth,sHeight,collection,canvasObj,sColor);
	}
	/*Strech right-bottom border*/
	function strechRecRightBottom(x1,y1,x2,y2,rect,collection,canvasObj){
        var left=rect.left;
        var right=rect.right;
        var top=rect.top;
        var bottom=rect.bottom;
        /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Left*/
        var strechX=Math.abs(x1-x2);
        if(x1>x2){
            var sRight=right-strechX;
            var sWidth=(Math.abs(left-right))-(strechX);
        }else{
            var sRight=right+strechX;
            var sWidth=(Math.abs(left-right))+(strechX);
        }
        
        /*YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY top*/
        var strechY=Math.abs(y1-y2);
        if(y1>y2){
            var sBottom=bottom-strechY;
            var sHeight=(Math.abs(top-bottom))-(strechY);
        }else{
            var sBottom=bottom+strechY;
            var sHeight=(Math.abs(top-bottom))+(strechY);
        }
        var sLeft=left;
        var sTop=top;
        var sColor=rect.color;
        deleteRectangle(x1,y1,collection,canvasObj);
        newRectDrawPush(sLeft,sTop,sWidth,sHeight,collection,canvasObj,sColor);
	}
/*Strech left border*/
	function strechRecLeft(x1,y1,x2,y2,rect,collection,canvasObj){
        var left=rect.left;
        var right=rect.right;
        var top=rect.top;
        var bottom=rect.bottom;
        /*Span info*/
        var strech=Math.abs(x1-x2);
        if(x1>x2){
            var sLeft=left-strech;
            var sWidth=(Math.abs(left-right))+(strech);
        }else{
            var sLeft=left+strech;
            var sWidth=(Math.abs(left-right))-(strech);
        }
        
        var sHeight=Math.abs(top-bottom);
        
        var sRight=right;
        var sTop=top;
        var sBottom=bottom;
        var sColor=rect.color;
        deleteRectangle(x1,y1,collection,canvasObj);
        newRectDrawPush(sLeft,sTop,sWidth,sHeight,collection,canvasObj,sColor);
	}
	/*Strech right border*/
	function strechRecRight(x1,y1,x2,y2,rect,collection,canvasObj){
        var left=rect.left;
        var right=rect.right;
        var top=rect.top;
        var bottom=rect.bottom;
        /*Span info*/
        var strech=Math.abs(x1-x2);
        if(x1<x2){
            var sRight=right+strech;
            var sWidth=(Math.abs(left-right))+(strech);
        }else{
            var sRight=right-strech;
            var sWidth=(Math.abs(left-right))-(strech);
        }
        
        var sHeight=Math.abs(top-bottom);
        
        var sLeft=left;
        var sTop=top;
        var sBottom=bottom;
        var sColor=rect.color;
        deleteRectangle(x1,y1,collection,canvasObj);
        newRectDrawPush(sLeft,sTop,sWidth,sHeight,collection,canvasObj,sColor);
	}
	/*Strech top border*/
	function strechRecTop(x1,y1,x2,y2,rect,collection,canvasObj){
        var left=rect.left;
        var right=rect.right;
        var top=rect.top;
        var bottom=rect.bottom;
        /*Span info*/
        var strech=Math.abs(y1-y2);
        if(y1>y2){
            var sTop=top-strech;
            var sHeight=(Math.abs(top-bottom))+(strech);
        }else{
            var sTop=top+strech;
            var sHeight=(Math.abs(top-bottom))-(strech);
        }
        
        var sWidth=Math.abs(left-right);
        
        var sLeft=left;
        var sRight=right;
        var sBottom=bottom;
        var sColor=rect.color;
        deleteRectangle(x1,y1,collection,canvasObj);
        newRectDrawPush(sLeft,sTop,sWidth,sHeight,collection,canvasObj,sColor);
	}

	/*Strech Bottom border*/
	function strechRecBottom(x1,y1,x2,y2,rect,collection,canvasObj){
        var left=rect.left;
        var right=rect.right;
        var top=rect.top;
        var bottom=rect.bottom;
        /*Span info*/
        var strech=Math.abs(y1-y2);
        if(y1<y2){
            var sBottom=bottom+strech;
            var sHeight=(Math.abs(top-bottom))+(strech);
        }else{
            var sBottom=bottom-strech;
            var sHeight=(Math.abs(top-bottom))-(strech);
        }
        
        var sWidth=Math.abs(left-right);
        
        var sLeft=left;
        var sRight=right;
        var sTop=top;
        var sColor=rect.color;
        deleteRectangle(x1,y1,collection,canvasObj);
        newRectDrawPush(sLeft,sTop,sWidth,sHeight,collection,canvasObj,sColor);
	}

/*Point inside rectangle*/
function isInsideRect(x,y,collection) {
	var result = false;
	var finalRect = null;
	var index = -1;
	var length=collection.length;
	for (var i = (length-1); i>-1; i--) {
		var rect = collection[i];
		if (x>=rect.left && x<=rect.right && y>=rect.top && y<=rect.bottom) {
			result = true;
			finalRect = rect;
			index = i; 
			break;
		}
      
		
	}
	return {
		position : result,
		rect : finalRect,
		index : index
	};
}

/*Function for Delete rectangle */
function deleteRectangle(x,y,collection,canvasObj){
	var insideRect = isInsideRect(x,y,collection);
	if (insideRect.position) {
		var rect = insideRect.rect;
		var width=rect.right-rect.left;
		var height=rect.bottom-rect.top;
		collection.splice(insideRect.index,1);
	    reDraw(collection,canvasObj);
	}
}

/*Clear and redraw*/
function reDraw(collection,canvasObj) {
	clearCanvas(canvasObj);
	for (var i = 0; i < collection.length; i++) {
		var rect=collection[i];
		var x=rect.left;
		var y=rect.top;
		var width=rect.right-rect.left;
		var height=rect.bottom-rect.top;
        canvasObj.fillStyle=rect.color;
        canvasObj.fillRect(x,y,width,height);
	}
}

/*Clear or reset canvas*/
function clearCanvas(canvasObj){
    canvasObj.clearRect(0,0,800,400);
}


/************ Drag rectangle*****************/
/*
   dip=dragInitialPosition
   dfp=dragFinalPosition
   apw=arbitraryPointWidth
   aph=arbitraryPointHeight

*/
function dragRectangle(dipX,dipY,dfpX,dfpY,collection,canvasObj){
	var insideRect=isInsideRect(dipX,dipY,collection);
	if(insideRect.position){
        var dragRect=insideRect.rect;
		var width=dragRect.right-dragRect.left;
		var height=dragRect.bottom-dragRect.top;
	    var apw=dipX-dragRect.left;
	    var aph=dipY-dragRect.top;
	    var xi=dipX-apw;
	    var yi=dipY-aph;
	    var xf=dfpX-apw;
	    var yf=dfpY-aph;
	    /*Check if it is not outside of any portion*/
	    if(rectInsideCanvas(xf,yf,width,height)){
	    	deleteRectangle(xi,yi,collection,canvasObj);
	        newRectDrawPush(xf,yf,width,height,collection,canvasObj,dragRect.color);
	    }
	}
}
/* function for only inside canvas*/
function rectInsideCanvas(xf,yf,width,height){
	if(xf>=canvasLeft && yf>=canvasTop && ((xf+width)<=canvasRight) && ((yf+height)<=canvasBottom)){
		return true;
	}
	return false;
}
/*Push on collection & new draw rectangle*/
function newRectDrawPush(xf,yf,width,height,collection,canvasObj,color){
    canvasObj.fillStyle=color;
	canvasObj.fillRect(xf,yf,width,height); 
	var temp={
		left:xf,
		top:yf,
		right:xf+width,
		bottom:yf+height,
		color:color
	}
	collection.push(temp);
}


/************* color *************/
function colorChanger(){
	var r=0,g=0,b=0;
	r=Math.floor((Math.random())*255);
	g=Math.floor((Math.random())*255);
	b=Math.floor((Math.random())*255);
    var color = "rgb(" +r+ "," +g+ "," +b+ ")";
	return {
		color:color
	}
}
