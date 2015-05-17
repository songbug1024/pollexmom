<div class="clear"></div>
<div class="blank10"></div>
<div id="{{=sliderId}}" class="slideBox">
    <div class="bd">
        <ul>
            {{
                for (var i in items) {
            }}
                <li data-priority="{{=items[i].priority}}">
                    <a class="pic" href="{{=items[i].href}}" title="{{=items[i].name}}">
                        <img src="{{=items[i].previewImage}}" />
                    </a>
                </li>
            {{
                }
            }}
        </ul>
    </div>
    <div class="hd"><ul></ul></div>
</div>