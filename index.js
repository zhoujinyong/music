$(function(){
	var audio = $('audio').get(0);
	var musics=[
      {path:'media/不要让女人轻易流眼泪.mp3',name:'不要让女人轻易流眼泪',artistan:'金久哲',duration:'04:19'},
      {path:'media/坑蒙拐骗偷.mp3',name:'坑蒙拐骗偷',artistan:'阿权',duration:'03:55'},
      {path:'media/入戏太深.mp3',name:'入戏太深',artistan:'马旭东',duration:'03:45'},
      {path:'media/我把真心给了你.mp3',name:'我把真心给了你',artistan:'周越洪',duration:'03:57'},
      {path:"media/甜蜜蜜.mp3",name:"甜蜜蜜",artistan:"群星",duration:"04:38"},
      {path:"media/Aggiungi.mp3",name:"Aggiungi",artistan:"Masimo",duration:"04:22"},
      {path:"media/月光下的凤尾竹.mp3",name:"云南情 巴乌与葫芦丝",artistan:"pure",duration:"05:23"}
     ]
	 var $num=$('.open-list div')
	 var indexs=0;
	 $(musics).each(function(i,v){
	 	//创建li追加到音乐播放列表，同时 li里面用span标签获取歌曲信息。同时生成4个div标签显示喜欢 下载 删除等背景图片
	 	 $('<li data-id='+i+'><span class="song-name" >'+v.name+'</span><span class="artistan" alt="aaaaa">'+v.artistan+'</span><span class="duration">'+v.duration+'</span><div class="opration"><div class="like"></div><div class="share"></div><div class="shoucang"></div><div class="delete"></div></div></li>').appendTo('.play-list ul')
	 	 //获取数组中音乐信息的条数并追加到div中用来显示列表的数量
	 	 $num.html(musics.length);
	 })
	 //给列表里创建出来的li添加点击事件
	 $('.play-list li').on('click',function(e){
	 	//阻止浏览器的默认样式
      e.preventDefault();
      //获取被点击li在数组中的下标
      indexs=$(this).index();
      //根据下标获取到相应的音乐信息的路径
//    console.log(musics[indexs].path)
      audio.src=musics[indexs].path;
      //获取到相应信息以后 让歌曲开始播放
      audio.play();
     })
	  // 处理列表界面 
     $('#audio').on('play',function(){
     	//首先全部移除li身上的class
      $('.play-list li').removeClass("playing");
      //找到当前点击的那个添加class
      $('.play-list li').eq(indexs).addClass('playing');
      //声明v等于数组中被点击的音乐信息
      var v=musics[indexs];
      //分别把被点击的信息中得到音乐名  演唱者  播放时长追加到指定元素中 
      $('.mini-player #music-name').text(v.name);//音乐名
      $('.mini-player .singer').text(v.artistan);//演唱者
      $('.mini-player .music-date').text(v.duration);//播放时长
     })
     //切换歌曲
     //获取上一首的按钮
     var $previous=$('.mini-player .previous');
//   获取下一首的信息
     var $next=$('.mini-player .next');
     $next.on('click',function(){
      //列表播放 使用的类名分别为  ordered_bt(顺序播放)  unordered_bt（随机播放）  cycle_single_bt（单曲循环）  cycle_bt（列表循环）
      //当受到点击事件歌曲信息发生变化的时候检查被点击的按钮有没有顺序播放或者列表循环的类名
          if($(".btn").hasClass('ordered_bt')){
          	//如果有就让当前歌曲的下标加一
         indexs+=1; 
         //如果没有顺序播放的类就检查有没有随机播放的类名
          }
          if($(".btn").hasClass('unordered_bt')){
          	//如果有就让当前下标变成随机生成的小于或者等于数组中音乐信息的个数的随机整数
          indexs=Math.floor(Math.random()*musics.length)
          } 
          //如果被点击的按钮没有以上两种类名 就检查有没有单曲循环的类
          if($(".btn").hasClass('cycle_single_bt')){
			//如果有就让当前下表标不变
			indexs=indexs
          }
          if($(".btn").hasClass('cycle_bt')){
          	//如果有就让当前歌曲的下标加一
         indexs+=1; 
         //如果没有顺序播放的类就检查有没有随机播放的类名
          }
          //如果下标大于或者等于数中信息的个数 就让下标等于0
     if(!indexs||indexs>=musics.length){
        indexs=0;
      }
//   在数组中读取被选择下标的路径并让其播放
       audio.src=musics[indexs].path;
       audio.play();
     })
     //点击上一曲按钮
      $previous.on('click',function(){
//    如果被选信息下标小于或者等于0，就让下标等于数组中信息额个数
      if(!indexs||indexs<=0){
        indexs=musics.length;
      }
      //如果下标大于0就减1
      indexs -=1;
      //   在数组中读取被选择下标的路径并让其播放
       audio.src=musics[indexs].path;
       audio.play();
     })
	// 在播放完成之后
    $('#audio').on('ended',function(){
      $next.trigger('click');
//    console.log(indexs);
    })
    
  // 清空单个
    var $del=$('.play-list .delete')
      //点击删除按钮
    $del.on('click',function(e){
    	//阻止事件冒泡
      e.stopPropagation();
      //申明i被删除的下标
      var i=$('.play-list .delete').index(this);
//    console.log(i);
      $(this).closest('li').remove();   //删除最靠近他的父元素li
      musics.splice(i,1)               //同时删除数据
        audio.src='';                   //清理地址为空
        $play.removeClass('pause')         //还原播放按钮
        $current.width(0);                  //清理音乐播放条进度
        $playop.css({left:-$playop.width()/2})
        $('.play-list li').removeClass("playing");    //清理其他歌曲的点击效果
        $num.html(musics.length);                     //读取设置列表个数
        $('.mini-player #music-name').text('听我想听的歌');    //清理歌曲信息
        $('.mini-player .singer').text('qq音乐');
        $('.mini-player .music-date').text('....'); 
    })
     //清空整个列表
     var $clearall=$('.play-list .clear-list');
     var $ul=$('.play-list  ul')
     $clearall.on('click',function(){
       $del.trigger('click'); 
     })
      

      //播放模式
      var $order=$('.playbar_select .ordered_bt');
      var $unorder=$('.playbar_select .unordered_bt');
      var $single=$('.playbar_select .cycle_single_bt');
      var $cycle=$('.playbar_select .cycle_bt');
      var $select=$('.playbar_select')
      var $change=$(".bar-op .next + div ")
      $change.on('click',function(e){
           e.preventDefault;
           $select.css('display','block');
      })
      $order.on('click',function(){
        $change.removeClass();
        $select.css('display','none');
        $change.addClass('ordered_bt');

      })
      $unorder.on('click',function(){
        $change.removeClass();
        $select.css('display','none');
        $change.addClass('unordered_bt');

      })
      $single.on('click',function(){
        $change.removeClass();
        $select.css('display','none');
        $change.addClass('cycle_single_bt');

      })
      $cycle.on('click',function(){
        $change.removeClass();
        $select.css('display','none');
        $change.addClass('cycle_bt');

      })


  // 播放条
      
      var audio=$('#audio').get(0);
      var $audio=$('#audio');
      var $play=$('.mini-player .play');
      var $mute=$('.volome-mute');
      var $vre=$('.volume-regulate');
      var $vbar=$('.volume-bar');
      var $vop=$('.volume-op');
      var w=$vre.width();
      // 点击开始播放
      $play.on('click',function(){
        if(indexs==undefined){
          indexs=0;
          audio.src=musics[indexs].path;
        }
//      console.log(audio.paused)
      	if(audio.paused){
          audio.src=musics[indexs].path;
      		audio.play();
      	}else{
      		audio.pause();
      	}
      	
      })
      $audio.on('play',function(){
         $play.addClass('pause') 
      })
      $audio.on('pause',function(){
         $play.removeClass('pause') 
      })
      // 点击静音
      $mute.on('click',function(){
      	if(!$(this).attr('ov')){
      		$(this).attr('ov',audio.volume)
      	     audio.volume=0;
      	 }else{
      	 	audio.volume=$(this).attr('ov');
      	 	$(this).removeAttr('ov');
      	 }
      })



      // 调节音量
      $vre.on('click',function(e){
      	if(e.offsetX<=0){
      		e.offsetX=0
      	}
      	audio.volume=e.offsetX/w;
      })      

       //点击改变音量条的界面
      $audio.on('volumechange',function(){
      	  if(audio.volume===0){
      	  	$mute.addClass('jingyin')
      	  }else{
      	  	$mute.removeClass('jingyin')
      	  }
          $vbar.width(audio.volume*w);
          $vop.css({left:audio.volume*w-$vop.width()/2})
           
      })
	
	  $vop.on('click',function(e){
	  	  e.stopPropagation();
	  })

	  	// 音量拖动
	$('.volume-regulate .volume-op').on('mousedown',function(e){
		e.preventDefault();	
		$('.volume-regulate').addClass('moving')
		//$(this).closest('.volume-regulate').addClass('moving')
        $(document).on('mousemove',function(e){
	    // var w=(e.clientX-$('.volume-regulate').offset().left)/$('.volume-regulate').width();
	    // if( w >= 0 && w <= 1){audio.volume=w};
	    var v=(e.pageX-$('.volume-regulate').offset().left)/$('.volume-regulate').width();
	    v=(v>1)?1:v;
	    v=(v<0)?0:v;
	    audio.volume=v
	})
        $(document).on('mouseup',function(){
        	$('.volume-regulate').removeClass('moving')
        	$(document).off('mousemove')
        })

})
    


    var $bgbar=$('.player-bar .player-bg-bar');
    var $current=$('.player-bar .play-current-bar');
    var $playop=$('.player-bar .progress-op')
    var bgw=$bgbar.width();
     $audio.on('timeupdate',function(e){
     	 e.stopPropagation();
        var ll=audio.currentTime/audio.duration*bgw;
        $current.width(ll);
        $playop.css({left:ll-$playop.width()/2})
    })
     
    $bgbar.on('click',function(e){
    	 e.stopPropagation();
    	var tt=(e.pageX-$(this).offset().left)/bgw*audio.duration;
    	audio.currentTime=tt;				
// 		console.log(tt)
    })  
   
    //拖动
    $playop.on('mousedown',function(e){
    	e.preventDefault();     
    	$(document).on('mousemove',function(e){
    	 var t = e.clientX /bgw;
      	if( t >= 0 && t<=1 ){
   			audio.currentTime = audio.duration*t
   		}
    		
    		
//       var ww=(e.pageX-$bgbar.offset().left)/bgw*audio.duration;
//       ww=ww>=audio.duration?audio.duration:ww;
//       ww=ww<=0?0:ww;
//       audio.currentTime=ww;
    	});
    	$(document).on('mouseup',function(){
          $(document).off('mousemove')
          $(document).off('mouseup')
    	})
    })


    



    // 获取时间的函数
     var gettime=function(time){
      if(isNaN(time)){
        return '--:--';
      };
     	var min=Math.floor(time/60);
     	var sec=parseInt(time%60);
     	if(sec<10){
     		sec='0'+sec
     	}
     	if(min<10){
     		min='0'+min
     	}
     	return min+':'+sec;
     }
    // 进度条时间
    var $show=$('.time_show');
    $bgbar.on('mouseover',function(e){
      e.preventDefault;
      $show.css('display','block')
	    var ww=e.pageX-$bgbar.offset().left;
	    $show.css({left:ww-$show.width()/2})
		    $bgbar.on('mousemove',function(e){
			    var ww=e.pageX-$bgbar.offset().left;
			    $show.css({left:ww-$show.width()/2})
			    var ct=ww/bgw*audio.duration;
			    $show.find('p').html(gettime(ct))
		    })
    })
     $bgbar.on('mouseout',function(e){
        $bgbar.off('mousemove')
        $show.css('display','none')
     })
     $playop.on('click',function(e){
	  	  e.stopPropagation();
	  })




   //展开 收起s
   $openlist=$('.open-list');
   $op2=$('.play-list .close')
   $list=$('.play-list');
   $openlist.on('click',function(){
       $list.toggleClass('shouqi')
       // setTimeout(function(){$list.css('display','none')},800)
   })
   $op2.on('click',function(){
      $list.addClass('shouqi')
   })
})
