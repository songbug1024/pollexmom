<dl class="p_list">
    <dt>
        <a href="#product/{{=id}}">
            <img src="{{=previewImagesJson && previewImagesJson.length > 0 ? previewImagesJson[0] : ''}}">
        </a>
    </dt>
    <dd>
        <p class="p_title"><a href="#product/{{=id}}">{{=name}}</a></p>
        <p class="p_price">￥{{=price}}</p>
    </dd>
</dl>