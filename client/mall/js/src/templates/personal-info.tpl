<div class="top2 clearfix">
    <h2 class="top2_titleimg"><img src="{{=avatar}}" width="65" height="65"></h2>
</div>
<h1 class="top_title">个人信息</h1>

<div class="w">
    <div class="user_xinxi">
        <ul class="user_xinxi_item clearfix">
            <li>会员编号：</li>
            <li>{{=userNumber}}</li>
        </ul>
        <ul class="user_xinxi_item clearfix">
            <li>姓名：</li>
            <li>{{=personalInfo.realName || username}}</li>
        </ul>
        <ul class="user_xinxi_item clearfix">
            <li>手机号：</li>
            <li>{{=tel}}</li>
        </ul>
        <ul class="user_xinxi_item clearfix">
            <li>出生日期：</li>
            <li>{{=personalInfo.birthday || "未知"}}</li>
        </ul>
    </div>
</div>