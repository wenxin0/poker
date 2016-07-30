/*$(function(){
  $('.animation')
  .animate({width:400},1000)
  .delay(1000)
  .queue(function(){
    $(this).css('backgroundColor','red').dequeue();
  })
  .animate({height:400},1000)


//子弹
  for(var i=0;i<300;i++){
    var w=Math.floor(Math.random()*4+3);
    var r=Math.floor(Math.random()*155+100);
    var left=Math.floor(Math.random()*$(document).width());
    var top=Math.floor(Math.random()*$(document).height());
    $('<div>')
    .addClass('zidan')
    .width(w)
    .height(w)
    .css('backgroundColor','rgba('+r+',30,200,0.7)')
    .appendTo('body')
    .delay(i*10)
    .animate({
      left:left,
      top:top
    })
   } 
})*/


   //扑克牌
   $(function(){
    var poker=[];
    var colors=['c','h','d','s'];
    var biao={};
    while(poker.length<52){
      var huase=colors[Math.floor(Math.random()*4)];
      var shuzi=Math.ceil(Math.random()*13);
      var item={huase:huase,shuzi:shuzi};
      if(!biao[huase+'_'+shuzi]){
        poker.push(item);
        biao[huase+'_'+shuzi]=true;
      } 
    }
    console.table(poker);//数字中所有元素为对象的数字可以使用
   
   var fapai=function(){
    var d=0;
    var index=0;
    for(var i=0;i<7;i++){  
      var t=i*60;
      for(var j=0;j<i+1;j++){
        index+=1;
        d+=90;
        var l=(6-i)*50+j*100;
        $('<div>')
        .addClass('pai shang')
        .css({
        backgroundImage:'url(img/'+poker[index].shuzi+poker[index].huase+'.png)'       
        })
        .appendTo('.zhuozi')
        .delay(d)
        .animate({
          top:t,
          left:l,
          opacity:1
        })
        .attr('id',i+'_'+j)
        .data('shuzi',poker[index].shuzi)
      }
    }
  

    for(;index<poker.length;index++){
      d+=90;
      $('<div>')
        .addClass('pai zuo')
        .css({
        backgroundImage:'url(img/'+poker[index].shuzi+poker[index].huase+'.png)'      
        })
        .appendTo('.zhuozi')
        .delay(d)
        .animate({
          top:500,
          left:140,
          opacity:1
        })
        .data('shuzi',poker[index].shuzi)
    }
 
  
  
    
    //判断上牌是否被压住
    var ison=function(el){
      var x=Number($(el).attr('id').split('_')[0]);
      var y=Number($(el).attr('id').split('_')[1]);
      return $('#'+(x+1)+'_'+y).length||$('#'+(x+1)+'_'+(y+1)).length;
    }
    
    var shangyizhang;
    $('.zhuozi .pai').on('click',function(){
    if($(this).hasClass('shang')&&ison(this)){
      return;
    }
      $(this).toggleClass('chulie');
      $(this).animate({top:'-=20'});
    
    //点击恰好是13时
    if($(this).data('shuzi')==13){
      $(this).animate({
        top:0,
        left:610,
        opacity:0
      }).queue(function(){
        $(this).remove();
      })
      shangyizhang=undefined;
      return;
    }
    if(!shangyizhang){//第一次点击
      shangyizhang=$(this);
    }else{//第二次点击
      if(shangyizhang.data('shuzi')+$(this).data('shuzi')==13){
        shangyizhang.delay(400).animate({
          top:0,
          left:610,
          opacity:0
        }).queue(function(){
          $(this).remove();
        })     
      $(this).animate({
        top:0,
        left:610,
        opacity:0
      }).queue(function(){
        $(this).remove();
      });
      shangyizhang=undefined;
    }else{
      shangyizhang.delay(400).animate({
        top:'+=20'
      }).removeClass('chulie');
      $(this).animate({
        top:'+=20'
      }).removeClass('chulie');
      shangyizhang=undefined;
      $('.zhuozi .tips').css({'display':'block'});
      var t=setTimeout(function(){
        $('.zhuozi .tips').css({'display':'none'});
      },3000);      
      }
    }
  })
 }
  $('.fapai').on('click',function(){
    fapai();
  })


  //按钮
  var zIndex=1;
  $('.zhuozi .move-right').on('click',function(){
    zIndex+=1;
    $('.zhuozi .zuo')
    .eq(-1)
    .removeClass('zuo')
    .addClass('you')
    .animate({
      top:500,
      left:455
    })
    .css({
      zIndex:zIndex
    })
  })

  var num=0;
  $('.zhuozi .move-left').on('click',function(){    
    if($('.zuo').length){
      $('.zhuozi .tips1').css({'display':'block'});
      var t=setTimeout(function(){
        $('.zhuozi .tips1').css({'display':'none'});
      },3000);
      return;
    }
    num+=1;
    if(num>3){
      $('.gameover').css('display','block');
      return;
    }
    $('.you').each(function(i,el){
      $(this)
      .delay(i*30)
      .animate({
        top:500,
        left:140
      })
      .css({
        zIndex:0
      })
      .removeClass('you')
      .addClass('zuo')
    })
  })

  $('.kaichang h1').on('click',function(){
    $('.kaichang').addClass('animation');  
  })
  $('.restart').on('click',function(){
    location.reload();
  })

  $('.jieshao').on('click',function(){
      $('.jieshao1').css({'display':'block'});
      var time=setTimeout(function(){
        $('.jieshao1').css({'display':'none'});
      },3000);
    })
  
  

})