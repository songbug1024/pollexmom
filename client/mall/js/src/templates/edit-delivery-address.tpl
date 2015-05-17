<div class="sh_bd clearfix">
    <p class="sh_topbg"></p>
    <div class="sh_tit1">{{=model ? '编辑' : '新增'}}收货信息</div>
    <div class="sh_add_list">


        <div class="sh_pd">
            <div class="tbl-type">
                <span class="tbl-cell w80"><span>收货人姓名：</span></span>
                <span class="tbl-cell"><span><input type="text" maxlength="20" class="new-input consigneeName" name="" value="{{=model.consigneeName}}"></span></span>
            </div>
        </div>
        <!--错误提示信息-->
        <div class="sh_pd" style="display:none;">
            <div class="tbl-type">
                <span class="tbl-cell w80"><span style="color:#f00;">收货人姓名不能为空</span></span>
            </div>
        </div>
        <!--错误提示信息 END-->

        <div class="sh_pd">
            <div class="tbl-type">
                <span class="tbl-cell w80"><span>收货人电话：</span></span>
                <span class="tbl-cell"><span><input type="text" maxlength="20" class="new-input consigneeTel" name="" value="{{=model.consigneeTel}}"></span></span>
            </div>
        </div>

        <div class="sh_pd">
            <div class="tbl-type">
                <span class="tbl-cell w50"><span>省份：</span></span>
                <span class="tbl-cell">
                    <span class="new-input-span">
                        <span class="new-sel-box new-p-re">
                            <label id="province_label">{{=model.provinceName || '-请选择-'}}</label>
                            <select name="address.idProvince" id="address_province" class="address_province new-select" style="width:200px;">
                                <option value="">-请选择-</option>
                                {{
                                    for (var i in provinces) {
                                }}
                                <option {{=provinces[i] === model.provinceName ? 'selected' : ''}} value="{{=provinces[i]}}">{{=provinces[i]}}</option>
                                {{
                                    }
                                }}
                            </select>
                        </span>
                    </span>
                </span>
            </div>
        </div>

        <div class="sh_pd">
            <div class="tbl-type">
                <span class="tbl-cell w50"><span>城市：</span></span>
                <span class="tbl-cell">
                	<span class="new-input-span">
                        <span class="new-sel-box new-p-re">
                            <label id="city_label">{{=model.cityName || '-请选择-'}}</label>
                            <select name="address.idCity" id="address_city" class="address_city new-select" style="width:200px;">
                                <option value="">-请选择-</option>
                                {{
                                if (typeof cities !== 'undefined' && cities.length > 0) {
                                    for (var j in cities) {
                                }}
                                    <option {{=cities[j] === model.cityName ? 'selected' : ''}} value="{{=cities[j]}}">{{=cities[j]}}</option>
                                {{
                                    }
                                }
                                }}
                            </select>
                        </span>
                    </span>
                </span>
            </div>
        </div>


        <div class="sh_pd">
            <div class="tbl-type">
                <span class="tbl-cell w50"><span>区县：</span></span>
                <span class="tbl-cell">
                	<span class="new-input-span">
                        <span class="new-sel-box new-p-re">
                            <label id="area_label">{{=model.regionName || '-请选择-'}}</label>
                            <select class="address_area new-select" name="address.idArea" id="address_area" style="width:200px;">
                                <option value="">-请选择-</option>
                                {{
                                if (typeof regions !== 'undefined' && regions.length > 0) {
                                    for (var k in regions) {
                                    }}
                                    <option {{=regions[k] === model.regionName ? 'selected' : ''}} value="{{=regions[k]}}">{{=regions[k]}}</option>
                                    {{
                                    }
                                }
                                }}
                            </select>
                        </span>
                    </span>
                </span>
            </div>
        </div>


        <div class="sh_pd border-b-none">
            <div class="tbl-type">
                <span class="tbl-cell w70"><span>地址信息：</span></span>
                <span class="tbl-cell"><span><textarea rows="2" style="height:auto;width:100%;" type="text" class="detailAddress new-input" >{{=model.detailAddress}}</textarea></span></span>
            </div>
        </div>

    </div>

</div>
<div class="btn_shedit"><a href="javascript:void(0);">确定</a></div>