<div class="good_pic">
    <div id="{{=sliderId}}" class="slideBox_good">
        <div class="bd">
            <ul>
            {{
                for (var i in product.previewImagesJson) {
            }}
                <li><img src="{{=product.previewImagesJson[i]}}" /></li>
            {{
                }
            }}
            </ul>
        </div>
        <div class="hd"><ul></ul></div>
    </div>
</div>
{{
    var specNames = '';
    for (var i in product.specifications) {
        specNames += product.specifications[i].name + '  ';
    }
}}
<div class="spec-detail w">
    <div class="good_tab">
        <ul id="myTab0" class="good_tabT clearfix">
            <li class="active btn-spec">规格参数</li>
            <li class="normal btn-images">商品图片</li>
        </ul>
    </div>
    <div id="myTab0_Content0" class="tab-spec good_cs">
        <div class="good_cont">
            ·品牌：{{=product.brand}}<br>
            ·产品名称：{{=product.name}}<br>
            ·适用年龄：6-12个月<br>
            ·规格：{{=specNames}}<br>
            {{=product.desc}}
        </div>
    </div>
    <div id="myTab0_Content1" class="tab-images good_cs none">
        <div class="good_cont">
        {{
            for (var i in product.detailImagesJson) {
        }}
            <p><img data-src="{{=product.detailImagesJson[i]}}" /></p>
        {{
            }
        }}
            <p>
                ·品牌：{{=product.brand}}<br>
                ·产品名称：{{=product.name}}<br>
                ·适用年龄：6-12个月<br>
                ·规格：{{=specNames}}<br>
                {{=product.desc}}
            </p>
        </div>
    </div>
</div>