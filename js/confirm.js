/**加载已勾选的购物车条目**/
$.ajax({
  url: 'data/cart/list_checked.php',
  success: function(result){
    if(result.code==200){
        console.log(result);
        var totalPrice = 0;
        var html = '';
      $.each(result.data, function(i, l){

        totalPrice += l.price*l.count;
        html += `
        <ul class="item_detail">
            <li class="p_info">
                <b><img src="${l.pic}"/></b>

                <b class="product_name lf">
                    ${l.title}
                </b>
                <br/>
            <span class="product_color ">
               规格：${l.spec}
            </span>
            </li>
            <li class="p_price">
                <i>价格</i>
                <br/>
                <span class="pro_price">￥<span class="ppp_price">${l.price}</span></span>
            </li>
            <li class="p_count">X<span>${l.count}</span></li>
            <li class="p_tPrice">￥<span>${l.price*l.count}</span></li>
        </ul>
        `
      })
      $('#load_list').html(html);
    }
  }
})