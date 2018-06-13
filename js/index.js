$(function(){
    // 响应式按钮
    
    $('.menu').on('click',function () {
        // 获取主菜单ul
        $('.nav-list').slideToggle(500);
        $('.nav-list-fake').slideToggle();
        // 取消a标签
        $('.nav-list>li>a').removeAttr('href');//去掉a标签中的href属性 
        $('.nav-list>li>a').removeAttr('onclick');//去掉a标签中的onclick事件 
    });

    $('.nav-list>li').hover(function(){
        $(this).find('ul').stop().slideDown(300);
    },function(){
        $('.nav-list-child').stop().slideUp(300);
    });
    imgHeight();

    // 图片轮播
    // var myApi1 = new Myapi();
    // myApi1.JSON.lagout($('.banner'),1000,0);
    autoPlay();

    
    // 通告轮播
    var interval=setInterval('timer(".swap-list")',3500);
    // $('notice-swap').hover(function(){
    //     clearInterval(interval);
    // },function(){
    //     interval();
    // });

    goTop();
});
// 监听窗口改变大小
$(window).resize(function() {
    imgHeight();
    var width = $(this).width();  
    if(width >= 768){
        $('.nav-list').show(0);
    }
});

// 获取图片高度
function imgHeight(){
    var img = $('.banner-img>li>a>img');
    var imgHeight = img.height();
    // console.log(imgHeight);
    $('.page-banner').height(imgHeight+'px');
    $('.prev').css('top', imgHeight/2-20+'px');
    $('.next').css('top', imgHeight/2-20+'px');
    $('.banner-pointer').css({
        'top': imgHeight-45+'px',
        // 'marginLeft': -$('.banner-pointer').width()/2+'px'
    });
    $('.banner-title>li').css({
        'top': imgHeight-55+'px',
        // 'marginLeft': -$('.banner-pointer').width()/2+'px'
    });
}

// 图片轮播
var autoPlay = function (){
    var index = 0;
    var img = $('.banner-img>li'); 
    var bannerPointe = $('.banner-pointer>li');
    var bannerTitle = $('.banner-title>li');
    var timeOut;    
    function cut(){
        $('.prev').on('click', function(){
            if(index == 1){
                index = img.length - 1;
            }else if(index == 0){
                index = img.length - 2;
            }else{
                index-=2;
            }
            showItem();
        });
        $('.next').on('click', function(){
            showItem();
        });
    }
    function showItem(){
        // 隐藏所有图片
        img.css('opacity', '0');
        // 显示图片
        img.eq(index).css('opacity','1');
        pointer(index);
        title(index);
        if(index > img.length - 2){
            index = 0;
        }else{
            index++;
        }
    }
    bannerPointe.on('click', function () {
        index = $(this).index();  
        showItem();  
    });
    function pointer(pointeIndex){
        bannerPointe.css('backgroundColor', 'rgba(0,0,0,0)');
        bannerPointe.eq(pointeIndex).css('backgroundColor', 'rgba(255,255,255,1)');
    }
    function title(pointeIndex){
        bannerTitle.stop().hide();
        bannerTitle.eq(pointeIndex).stop().slideDown(500);
    }
    function changeItem(){
        showItem();
        timeOut = setTimeout(changeItem, 4000);
    }
    changeItem();
    cut();
    $('.page-banner').hover(function(){
        clearTimeout(timeOut);
    },function(){
        changeItem();
    });
}

function timer(obj){
    $(obj).animate({
        marginTop : "-110px"  
        },1000,function(){  
			$(this).css({marginTop : "0px"}).find("li:first").appendTo(this);  
	    });
}
function goTop(){
    $(window).scroll(function() {  
        var $scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop; //兼容浏览器  
        if($scrollTop > 100) { //滚动高度可调  
            $(".gotop").fadeIn();  
        } else {  
            $(".gotop").fadeOut();  
        };  
    });
    $(".gotop").click(function(){
        //点击“回到顶部”，滚动到顶部，并带动画效果
        $("html,body").animate({scrollTop:0},500);
    }); 
}