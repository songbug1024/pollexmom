<h2 class="order-title">订单号：<a href="#order/{{=id}}" class="order-number">{{=orderNumber}}</a></h2>
<p class="order-amount">共 {{=amountCount}} 件商品，总计：<b class="amount-price">￥{{=amountPrice}}</b></p>
<div class="order-operation">
    <div class="user_dd_rbot clearfix">
    {{
        if (status === 98) {
    }}
        {{
            if (payment === 0) {
        }}
            <a class="btn_ddfk tobe-pay">去付款</a>
        {{
            } else {
        }}
            <a class="btn_ddfk cash-on-delivery">货到付款</a>
        {{
            }
        }}
        <a class="btn_ddfk cancel">取消订单</a>
    {{
        } else if (status === 1) {
    }}
        <a class="btn_ddfk canceled">已取消</a>
    {{
        } else if (status === 2) {
    }}
        <a class="btn_ddfk tobe-delivery">等待发货</a>
    {{
        } else if (status === 3) {
    }}
        <a class="btn_ddfk accepted">已接单</a>
    {{
        } else if (status === 4) {
    }}
        <a class="btn_ddfk charge-back">退单中</a>
    {{
        } else if (status === 5) {
    }}
        <a class="btn_ddfk tobe-receipt">等待收获</a>
    {{
        } else if (status === 6) {
    }}
        <a class="btn_ddfk rejected">已拒绝</a>
    {{
        } else if (status === 99) {
    }}
        <a class="btn_ddfk paid">已支付</a>
    {{
        }
    }}
    </div>
</div>