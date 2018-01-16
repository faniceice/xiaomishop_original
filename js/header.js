
/*****①动态载入功能:页头和页尾+++②登陆登出功能*****/
$("body > #header").load("header.html",function(){
    $.ajax({
        url: 'data/user/session_data.php',
        success: function(result){

            if(result.uname){
                $('#head_landing').html('<li><a href="cart.html">购物车<img src="img/cart/cart.png" alt=""/></a></li><b>|</b><li>&nbsp;欢迎:'+result.uname+' <a href="logout.html" title="退出登录">退出</a><b>|</b></li><li><a href="uc_basic.html" title="用户中心">用户中心</a></li>');
                //$('.login_info').html('<li>&nbsp;欢迎:'+result.uname+' <a href="logout.html" title="退出登录">退出</a><b>|</b></li><li><a href="uc_basic.html" title="用户中心">用户中心</a></li>');
                $('[href="logout.html"]').click(function(e){
                    e.preventDefault();
                    $.ajax({
                        url: 'data/user/logout.php',
                        success: function(result){
                            if(result.code===200){
                                alertMsg('<h4>退出成功</h4>点击确定重新返回登录页面');
                                $('#alertMsg').on('click', '#alertMsg_btn1 cite', function (e) {
                                    e.preventDefault();
                                    location.href = 'login.html';
                                })
                            }else {
                                alertMsg('登录退出失败！原因：'+result.msg);
                            }
                        }
                    })
                });
            }
        }
    });
});

$('body>#nav').load('nav.html');

$('body > #footer').load('footer.html');

/***③搜索帮助，这里不需求PHP****/
$('body').on('click', '#find_but', function(){
    var kw = $('.find_input').val();
    var loc = 'products.html';
    if(kw){
        loc += '?kw='+kw;
    }
    location.href = loc;
})

/*④主nav导航颜色调整*/
$('#main_head_box>#menu_wrap>#menu_nav>ul>li').click(function(){
    $(this).children().addClass('activ');
    $(this).siblings().children().removeClass('activ');
})
/*⑤主导航栏固定*/
$(function(){
    var nav=$("#main_head_box"); //得到导航对象
    var win=$(window); //得到窗口对象
    var sc=$(document);//得到document文档对象。
    win.scroll(function(){
        if(sc.scrollTop()>=60){
            nav.addClass("fixed_nav");
        }
        else{
            nav.removeClass("fixed_nav");
        }
    })
})

/*********设定alertMsg函数，mode为空，即只有一个确认按钮，mode为1时有确认和取消两个按钮******/
/****放最后的原因是为了JS加载能快点***/
function alertMsg(msg, mode) {
    msg = msg || '';
    mode = mode || 0;
    var top = document.body.scrollTop || document.documentElement.scrollTop;
    var isIe = (document.all) ? true : false;
    var isIE6 = isIe && !window.XMLHttpRequest;
    var sTop = document.documentElement.scrollTop || document.body.scrollTop;
    var sLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    var winSize = function(){
        var xScroll, yScroll, windowWidth, windowHeight, pageWidth, pageHeight;
        // innerHeight获取的是可视窗口的高度，IE不支持此属性
        if (window.innerHeight && window.scrollMaxY) {
            xScroll = document.body.scrollWidth;
            yScroll = window.innerHeight + window.scrollMaxY;
        } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
            xScroll = document.body.scrollWidth;
            yScroll = document.body.scrollHeight;
        } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
            xScroll = document.body.offsetWidth;
            yScroll = document.body.offsetHeight;
        }

        if (self.innerHeight) {    // all except Explorer
            windowWidth = self.innerWidth;
            windowHeight = self.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight;
        } else if (document.body) { // other Explorers
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }

        // for small pages with total height less then height of the viewport
        if (yScroll < windowHeight) {
            pageHeight = windowHeight;
        } else {
            pageHeight = yScroll;
        }

        // for small pages with total width less then width of the viewport
        if (xScroll < windowWidth) {
            pageWidth = windowWidth;
        } else {
            pageWidth = xScroll;
        }

        return{
            'pageWidth':pageWidth,
            'pageHeight':pageHeight,
            'windowWidth':windowWidth,
            'windowHeight':windowHeight
        }
    }();
    //遮罩层
    var styleStr = 'top:0;left:0;position:absolute;z-index:10000;background:rgba(0,0,0,.6);width:' + winSize.pageWidth + 'px;height:' +  (winSize.pageHeight + 30) + 'px;';
    var shadowDiv = document.createElement('div'); //添加阴影DIV
    shadowDiv.style.cssText = styleStr; //添加样式
    shadowDiv.id = "shadowDiv";
    //如果是IE6则创建IFRAME遮罩SELECT
    if (isIE6) {
        var maskIframe = document.createElement('iframe');
        maskIframe.style.cssText = 'width:' + winSize.pageWidth + 'px;height:' + (winSize.pageHeight + 30) + 'px;position:absolute;visibility:inherit;z-index:-1;filter:alpha(opacity=0);';
        maskIframe.frameborder = 0;
        maskIframe.src = "about:blank";
        shadowDiv.appendChild(maskIframe);
    }
    document.body.insertBefore(shadowDiv, document.body.firstChild); //遮罩层加入文档


    //弹出框
    var styleStr1 = 'display:block;position:fixed;_position:absolute;left:' + (winSize.windowWidth / 2 - 200) + 'px;top:' + (winSize.windowHeight / 2 - 150) + 'px;_top:' + (winSize.windowHeight / 2 + top - 150)+ 'px;'; //弹出框的位置
    var alertBox = document.createElement('div');
    alertBox.id = 'alertMsg';
    alertBox.style.cssText = styleStr1;
    //创建弹出框里面的内容P标签
    var alertMsg_info = document.createElement('P');
    alertMsg_info.id = 'alertMsg_info';
    alertMsg_info.innerHTML = msg;
    alertBox.appendChild(alertMsg_info);
    //创建按钮
    var btn1 = document.createElement('a');
    btn1.id = 'alertMsg_btn1';
    btn1.href = 'javascript:void(0)';
    btn1.innerHTML = '<cite>确定</cite>';
    btn1.onclick = function () {
        document.body.removeChild(alertBox);
        document.body.removeChild(shadowDiv);
        return true;
    };

    alertBox.appendChild(btn1);
    if (mode === 1) {
        var btn2 = document.createElement('a');
        btn2.id = 'alertMsg_btn2';
        btn2.href = 'javascript:void(0)';
        btn2.innerHTML = '<cite>取消</cite>';
        btn2.onclick = function () {
            document.body.removeChild(alertBox);
            document.body.removeChild(shadowDiv);
            return false;
        };
        alertBox.appendChild(btn2);
    }
    document.body.appendChild(alertBox);
}