////购物车控制显示
//$("#head_car").hover(function () {
//    $(this).css("background", "#FBFEE9");
//    $(".head_car_text").css("color", "#ff6700");
//    $("#car_content").stop(true, false).slideDown(300);
//}, function () {
//    $(this).css("background", "#424242");
//    $(".head_car_text").css("color", "#b0b0b0");
//    $("#car_content").stop(true, false).slideUp(300);
//})
//导航栏控制显示
var index=0;
$(".menu_li").hover(function () {
    $("#menu_content_bg").css("border", "1px solid #D0D0D0");
    $(this).css("color", "#ff6700");
    console.log($(this).attr("control"));
    $("#" + $(this).attr("control")).show().siblings('li').hide();
    $("#menu_content_bg").height(230);
}, function () {
    var i=$(this).index();
    $("#" + $(this).attr("control")).hide();
    $(this).css("color", " #424242");
    $('#menu_content_bg').hover(function(){
    $(".menu_li").eq(i).css("color", "#ff6700");
    $("#" + $(".menu_li").eq(i).attr("control")).show().siblings('li').hide();
   },function(){    
    $("#menu_content_bg").height(0);
    $("#menu_content_bg").css("border", "0px solid #D0D0D0");
   })
})
/****************搜索框失去和获取焦点border颜色改变************/
//$("#find_input").focus(function () {
//    $("#find_wrap").css("border", "1px solid #ff6700");
//    $("#find_but").css("border-left", "1px solid #ff6700");
//
//    //console.log($(this).parent().children('.find_select'));
//    $(this).parent().children('.input_hot_word').fadeOut("linear");
//    $('#find_select').css('display','block');
//
//})
//$("#find_input").blur(function () {
//    $("#find_wrap").css("border", "1px solid #F0F0F0");
//    $("#find_but").css("border-left", "1px solid #F0F0F0");
//    $(this).parent().children('.input_hot_word').fadeIn("linear");
//   $('#find_select').css('display','none');
//})
//搜索按钮的背景颜色改变
//$("#find_but").hover(function () {
//    $(this).css({"background": "#ff6700", color: "#fff"});
//}, function () {
//    $(this).css({"background": "#fff", color: "#424242"});
//})
/***************菜单栏的显示******************/
$("#banner_menu_wrap").children().hover(function () {
    $(this).css("background", "#ff6700");
    $(this).children(".banner_menu_content").css("border", "1px solid #F0F0F0").show();
}, function () {
    $(this).css("background", "none");
    $(this).children(".banner_menu_content").css("border", "0px solid #F0F0F0").hide();
});

/************为轮播做准备**************/
console.log(1);
$(function () {
    /********ajax取数据,动态形成轮播图***********/
    $.ajax({
    url: 'data/product/index.php',
    success: function (data) {
        "use strict";
        var html = '';
        var idot='';
        for (var i = 0; i < data.carouselItems.length; i++) {
            var c = data.carouselItems[i];
            html += `
                <li >
                    <a href="${c.href}"><img src="${c.img}"></a>
                </li>
               `;
            idot +=`
                <li ></li>
            `;
        }
        $('#big_banner_pic').html(html);
        $('.big_banner_idx').html(idot);
        //初始化i
        var i= 0,isStart=false;
        var big_banner_pic = $("#big_banner_pic");
        var allimg = $("#big_banner_pic li").length;

        //轮播控制
        console.log(big_banner_pic);
        function img_change() {
            var img_i = i * -1226 + "px";
            //console.log(img_i);
            big_banner_pic.animate({opacity: ".2"}, 100, function () {
                big_banner_pic.css("left", img_i);
                big_banner_pic.animate({
                    opacity: "1"
                }, 30);
                $('.big_banner_idx li').eq(i).addClass('big_banner_active').siblings('.big_banner_active').removeClass('big_banner_active');
            })
        }
        function start(){
            if(!isStart){
                isStart=true;
                setInterval(automatic, 4000);
            }else{
                clearInterval();
            }
        }
        function stop(){
            clearInterval( "change_self_time" );
            isStart=false;
        }
        function automatic() {
            i += 1;
            if (i >= allimg) {
                i = 0;
            }
            img_change();
        }
        //轮播上一张下一张图标控制
        $("#big_banner_change_wrap").hover(function () {
            stop();
            $("#big_banner_change_wrap").children().show();
        }, function () {
            start();
            $("#big_banner_change_wrap").children().hide();
        })
        /***前进后退按钮***/
            //$("#big_banner_change_prev").click(function () {
            //    i += 1;
            //    if (i >= allimg) {
            //        i = 0;
            //    }
            //    img_change();
            //});
            //$("#big_banner_change_next").click(function () {
            //    i -= 1;
            //    if (i <= 0) {
            //        i = allimg - 1;
            //    }
            //    img_change();
            //});

        $('.big_banner_idx li').hover(function(){
            stop();
            i=$(this).index();
            img_change();
        },function(){
            start();
        });
        start();
    }
})
})






//小米明星图片顶部彩色线条设置
$(function () {
    $("#head_hot_goods_content").children().children().eq(0).css("border-color", "#ff7600");
    $("#head_hot_goods_content").children().children().eq(1).css("border-color", "red");
    $("#head_hot_goods_content").children().children().eq(2).css("border-color", "#adff2f");
    $("#head_hot_goods_content").children().children().eq(3).css("border-color", "#6495ed");
    $("#head_hot_goods_content").children().children().eq(4).css("border-color", "#6a5acd");
    $("#head_hot_goods_content").children().children().eq(5).css("border-color", "#ff7600");
    $("#head_hot_goods_content").children().children().eq(6).css("border-color", "red");
    $("#head_hot_goods_content").children().children().eq(7).css("border-color", "#adff2f");
    $("#head_hot_goods_content").children().children().eq(8).css("border-color", "#6495ed");
    $("#head_hot_goods_content").children().children().eq(9).css("border-color", "#6a5acd");
});
//右上小图标控制
$("#head_hot_goods_prave").click(function () {
    $("#head_hot_goods_content").children("ul").animate({
        left: "0px"
    }, 300)
});
$("#head_hot_goods_next").click(function () {
    $("#head_hot_goods_content").children("ul").animate({
        left: "-1226px"
    }, 300)
});

var ml=false;
t= setInterval(function(){  
    
    if(ml==false){
         $("#head_hot_goods_content").children("ul").animate({
        left: "-1226px"
        }, 100);
          ml=true;
    }else if(ml==true){
        $("#head_hot_goods_content").children("ul").animate({
        left: "0"
    }, 100)
        ml=false;
    }
},3000);




$("#head_hot_goods_prave").hover(function () {
    $(this).css("color", "#ff6700");
}, function () {
    $(this).css("color", "#BEBEBE");
})
$("#head_hot_goods_next").hover(function () {
    $(this).css("color", "#ff6700");
}, function () {
    $(this).css("color", "#BEBEBE");
})

$(".floor_goods_wrap_li").hover(function () {
    $(this).css({
        "top": "-5px",
        "box-shadow": "0px 15px 30px rgba(0,0,0,0.2)"
    });
}, function () {
    $(this).css({
        "top": "0px",
        "box-shadow": "none"
    });
})

$(".foot_bottom_r").children("span").hover(function () {
    $(this).css({"background": "#ff6700", color: "#fff"});
}, function () {
    $(this).css({"background": "none", color: "#ff6700"});
})




