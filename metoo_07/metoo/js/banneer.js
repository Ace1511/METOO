


Element.prototype.myFocus=function(_time){
	var that =this; 

	var focus_pic_li = that.firstChild.childNodes;
	var focus_btn_ul = that.lastChild;
	var focus_btn_li = focus_btn_ul.childNodes;

	var oldindex=0; 
	var mouseoverTime = null;
    var timmer = setInterval(autoplay,3000); //绑定自动播放程序

	focus_btn_ul.addEventListener("mouseover",showTag,false);
	focus_btn_ul.addEventListener("mouseout",showaag,false);


	function showTag(e){
		var e=e ||event;
		var target= e.target || e.srcElement;
		if (target.tagName=="LI"){
		
			clearInterval(timmer);
			mouseoverTime= setTimeout(function(){
						showChg(target.index(),oldindex);	
	         		},400)
		}
	}


	function showaag(e){
		var e=e ||event;
		var target= e.target || e.srcElement;
		if (target.tagName=="LI"){
			timmer = setInterval(autoplay,3000); //自动计时
				clearTimeout(mouseoverTime);
		}
	}

	

	function autoplay(){
		if (oldindex<focus_btn_li.length-1){
			newindex=oldindex+1;
		}
		else{
			newindex=0;
		}

	showChg(newindex,oldindex);

	}

	function showChg (now,old){

		if (now!=old){
		
		focus_pic_li[old].style.opacity=1;
			
			var _t1  = setInterval (function(){
				focus_pic_li[old].style.opacity = Number(focus_pic_li[old].style.opacity) / 2;
				if (focus_pic_li[old].style.opacity < 0.1){
					focus_pic_li[old].style.opacity = 0;
					focus_pic_li[old].style.display="none";
					clearInterval(_t1);
				}
			},100)

			/*
			下一张图片从无到有，opcity 值从0 到1 
			*/
			focus_pic_li[now].style.opacity= 0 ;
			focus_pic_li[now].style.display="block";
			var _t2  = setInterval (function(){
				focus_pic_li[now].style.opacity = ( Number(focus_pic_li[now].style.opacity)+1) / 2;
				if (focus_pic_li[now].style.opacity > 0.9){
					focus_pic_li[now].style.opacity = 1;
					clearInterval(_t2);
				}
			},100);

			focus_btn_li[old].delclass("act");
			focus_btn_li[now].addClass("act");
			oldindex = now;
		}
	}

}
function getElemenrtsClassName(classname){
	var jh=[];
	var $all=document.getElementsByTagName("*")
	for(var i=0;i<$all.length;i++){
		var b=String($all[i].getAttribute("class")).split(" ")
		for(var j=0;j<b.length;j++){
			if(b[j]==classname){
				jh.push($all[i])
			}
		}
	}
	return jh
}
//删除样式
Element.prototype.delclass=function(name){
	if(this.hasAttribute("class")){
		var old=this.getAttribute("class");
		var old_arr=old.split(" ")
		for(var i=0;i<old_arr.length;i++){
			if(old_arr[i]==name){
				old_arr.splice(i,1)
			}
			var newclass=old_arr.join(" ");
			this.setAttribute("class",newclass);
		}
	}
}
//添加样式
Element.prototype.addClass=function(name){
	if(this.hasAttribute("class")){
		var old= this.getAttribute("class");
		this.setAttribute("class",old+" "+name)
	}
	else{
		this.setAttribute("class",name)
	}
}
//删除空文档
function clearNullNode($node){
 var childList= $node.childNodes;
    for( var i=0;i<childList.length;i++){
	 	if(childList[i].nodeType == 3 && !/\S/.test(childList[i].nodeValue)){
			$node.removeChild(childList[i]);
		 }
	}
}
	//\S非空白字符
    var  $all=document.getElementsByTagName("*"); 
    for(i=0;i<$all.length;i++){
      if($all[i].hasChildNodes()){
           clearNullNode($all[i]);
        }
	}
//返回索引值
Element.prototype.index=function(){
	var parent=this.parentNode;
	var sibling=parent.childNodes;
	for (var i =0 ;i<sibling.length ; i++) {
		if(sibling[i]==this){
			return i
		}
	};
}
