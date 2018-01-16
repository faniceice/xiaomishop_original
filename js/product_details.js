/***①加载指定编号的产品详情***/
$.ajax({
  url: 'data/product/details.php',
  data: 'lid='+location.search.split('=')[1],
  success: function(result){
    $('body > .loading').hide();
    console.log(result);
    var details = result.details;
    var family = result.family;
    $('#fname').html(family.fname);

    $('#mImg').attr({src:details.picList[0].md,jqimg:details.picList[0].lg,alt:"pic info"});
    //$('#mImg').attr('jqimg', details.picList[0].lg);
    //缩略图
    var html = '';
    $.each(details.picList, function(i, pic){
      if(i<5){
        html += `<li class="i1"><img src="${pic.sm}" data-md="${pic.md}" data-lg="${pic.lg}"></li>`;
      }
    })
    $('#icon_list').html(html);
    $('.right_detail .title').html(details.title);
    $('.right_detail .subtitle').html(details.subtitle);
    $('#pro_price span').html(details.price);
    $('.price .promise').html('<b>服务承诺：</b>'+details.promise);
    /*************②规格*用的另一种PHP拼接语言***********/
    var html = '<s>特色：</s><div>';
    $.each(family.laptopList, function(i, laptop){
      html += `<a href="product_details.html?lid=${laptop.lid}" class="avenge ${laptop.lid===details.lid?'borderChange':''}">运存16G，高清拍照</a>`;
    });
    html += '</div>';
    $('.spec').html(html);
    //详细参数


    var html = `
      <li><a href="#">商品名称：${details.lname}</a></li>
      <li><a href="#">系统：${details.os}</a></li>
      <li><a href="#">内存：${details.memory}</a></li>
      <li><a href="#">分辨率：${details.resolution}</a></li>
      <li><a href="#">运存：${details.video_card}</a></li>
      <li><a href="#">运行系统：${details.cpu}</a></li>
      <li><a href="#">定位：${details.video_memory}</a></li>
      <li><a href="#">分类：${details.category}</a></li>
      <li><a href="#">特色:${details.disk}</a></li>
    `;
    $('#parm ul').html(html);
    //详细介绍
    $('#product_introduction').append(details.details);

    //把内容改成显示，显示产品细节主体
    $('.product_details').show();
    console.log(details.price);
  }
   // console.log(details.price);
})

/**③监听商品缩略图单击事件，显示对应的中等尺寸图片**/
$('#icon_list').on('click', 'li img', function(){
  $('#mImg').attr('src', $(this).data('md'));
})

/*******④添加到购物车 立即购买收藏部分*******/
$(function () {
  var nav = $("#tab"); //得到导航对象
  var aside = $(".aside_nav");//右侧导航
  var win = $(window); //得到窗口对象
  var sc = $(document);//得到document文档对象。
  win.scroll(function () {
    if (sc.scrollTop() >= 1000) {
      nav.addClass("fixed_tab");
      aside.addClass("fixed_aside");
    }
    else {
      nav.removeClass("fixed_tab");
      aside.removeClass("fixed_aside");
    }
  })

  win.scroll(function () {
    if (sc.scrollTop() >= 60 && sc.scrollTop() < 1000) {
      $("#top").addClass("fixed_nav");
    }
    else {
      $("#top").removeClass("fixed_nav");
    }
  })
  //区域右侧大块导航
  $("#iteminfo .right p").click(function () {
    //$(this).addClass("clic").siblings().removeClass("clic");
    $(this).css("background-color", "#0AA1ED").siblings().css("background-color", "#e8e8e8");
    $(this).find("a").css("color", "#fff").parent().siblings().find("a").css("color", "#828282")
  })
  /**⑤选择商品进行添加*****悬停效果****/
  $(".spec").on('mouseenter', '.avenge',function () {
    $(this).css({"border": "1px solid #0AA1ED", "color": "#0AA1ED"});
  }).on('mouseleave', '.avenge', function () {
    $(this).css({"border": "1px solid #666", "color": "#666"})
  })

  /**⑥添加收藏**/
  $("#collect").click(function (e) {
    e.preventDefault();
    location.href = "my_collect.html";
  })
  /**⑦*****数量添加。加入购物车*******/
  var n = $("#buy-num").val() * 1;
  $(".numberMinus").click(function () {
    if (n >= 1) {
      $("#buy-num").val(n -= 1);
    }
  })
  console.log(n);
  $(".numberAdd").click(function () {

    $("#buy-num").val(n += 1);
    console.log(n);
    var p= $("#pro_price")[0];
    console.log(p);
  })
})

//$(function(){
//  "use strict";
//  var p=details.price;
//  console.log(p);
//  //var v=$("#buy-num").val*1;
//  var n = $("#buy-num").val() * 2;
//  console.log(n);
//  details.price= p * n;
//  console.log(details.price);
//  $('#pro_price span').html('￥'+details.price);
//})
//
//加入购物车操作
$("body").on('click', "#add_cart, #buy_now", function (e) {
  e.preventDefault();
  //获取购买数量
  var buyCount = $("#buy-num").val();
  $.ajax({
    type: 'POST',
    url: 'data/cart/add.php',
    data: {lid:location.search.split('=')[1], buyCount: buyCount},
    success: function(result){
      if(result.code===300){
        alertMsg('您尚未登录！');
        $('#alertMsg_btn1').click(function () {
          location.href = 'login.html';

        });
      }else if(result.code===200){
        alertMsg('添加成功！');
        $('#alertMsg_btn1').click(function () {
          location.href = 'cart.html';
        });
      }else {
        alertMsg('<b添加失败！</b><p>错误原因为：'+result.msg+'</p>');
      }
    }
  })
  /************⑧图片轮播悬停进入详情页效果*********/
  var speed = 20;
  var tab = document.getElementById("demo");
  var tab1 = document.getElementById("demo1");
  var tab2 = document.getElementById("demo2");
  tab2.innerHTML = tab1.innerHTML;
  function Marquee() {
    /*“视口宽度”减去预设“滚动宽度”如果没有的话，
    滚动宽度撤回已经播过的视口宽度，否则滚动宽度一直加*/
    if (tab2.offsetWidth - tab.scrollLeft <= 0)
      tab.scrollLeft -= tab1.offsetWidth
    else {
      tab.scrollLeft++;
    }
  }
  /*鼠标进入的话停止定时器，离开的话，启动定时器*/
  var MyMar = setInterval(Marquee, speed);
  tab.onmouseover = function () {
    clearInterval(MyMar)
  };
  tab.onmouseout = function () {
    MyMar = setInterval(Marquee, speed)
  };

})
/*********⑨放大镜************/