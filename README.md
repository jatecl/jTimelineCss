# jTimelineCss
让jTimeline支持style
```
npm install https://github.com/jatecl/jTimelineCss.git --save
```

## 示例
```javascript
var jTimeline = require("jtimelinecss");

var $div = document.getElementById("image");
var player = new jTimeline().from($div, 0.5, { width: 30 })
	.to($div, 0.5, { height: 50 })
	.callback(function(){
		alert("end");
	})
	.play();
player.on("times", function(t){
	console.log(t);
});
player.process(0.5);
```

详情见[jTimeline](https://github.com/jatecl/jTimeline)