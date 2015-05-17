<div class="delivery-info sh_bd clearfix">
</div>
<div class="order-detail sh_bd clearfix">
</div>
<div class="payment sh_bd clearfix">
    <div class="sh_tit1">支付方式</div>
    <div class="sh_info">
        <p class="sh_zffs"><label><input name="payment" type="radio" value="0" {{=payment == 0 ? 'checked' : ''}}>在线支付</label>
            <label><input name="payment" type="radio" value="1" {{=payment == 1 ? 'checked' : ''}}>货到付款</label>
        </p>
    </div>
</div>
<div class="dietitian sh_bd clearfix">
    <div class="sh_tit1">营养师</div>
    <div class="sh_info">
        <p class="sh_name">{{=dietitianName}} {{=dietitianTel}}</p>
    </div>
</div>
<div class="sh_bd clearfix">
    <div class="sh_tit1">消费者</div>
    <div class="sh_info">
        <p class="sh_name">
            <label id="city_label">{{=consumerName || '请选择我的消费者'}}</label>
            <select name="" class="new-select consumer">
            {{
                var consumers = ['张三', '马志伟', '张江龙'];
                for (var i in consumers) {
            }}
                <option value="{{=consumers[i]}}" {{=consumerName == consumers[i] ? 'selected' : ''}}>{{=consumers[i]}}</option>
            {{
                }
            }}
            </select>
        </p>
    </div>
</div>
<div class="generate-submit sh_bd">
    <ul class="sh_hj">
        <li>共 <span class="count"></span> 件，总金额：￥<span class="amount"></span></li>
        <li><a class="order-submit-btn" href="javascript:void(0);">提交订单</a></li>
    </ul>
</div>