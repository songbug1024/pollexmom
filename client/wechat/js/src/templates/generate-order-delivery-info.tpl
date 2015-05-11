<p class="sh_topbg"></p>
<div class="sh_tit1">收货信息</div>
<a href="javascript:void(0);" class="edit-btn sh_a">
{{
    if (typeof id === 'undefined') {
}}
    <div class="sh_info">
        <p class="sh_name">新增收货地址</p>
        <span class="s-point"></span>
    </div>
{{
    } else {
}}
    <div class="sh_info">
        <p class="sh_name">{{=consigneeName}} {{=consigneeTel}}</p>
        <p class="sh_add receiver-address">{{=provinceName}} {{=cityName}} {{=regionName}} {{=detailAddress}}</p>
        <span class="s-point"></span>
    </div>
{{
    }
}}
</a>
