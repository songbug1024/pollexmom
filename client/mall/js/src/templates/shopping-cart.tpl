<div class="top2 clearfix">
    <!--<img src="images/top2_gwc.png">-->
    <h2 class="top2_titleimg"><img src="images/btn_gwc.png" width="65" height="65"></h2>
</div>
<h1 class="top_title">购物车</h1>
<div class="w shopping-cart-main-container">
    {{
        if (typeof id === 'undefined' || !items || items.length <= 0) {
    }}
    <div class="clear"></div>
    <div class="blank20"></div>
    <p class="noCar"></p>
    <p class="noCar_info">您的购物车内还没有任何商品</p>
    {{
        }
    }}
</div>