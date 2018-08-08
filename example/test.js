import jTimeline from "../src/jTimelineCss";
import jMove from "jmove";
jMove.sizeUnit = () => "px";

var img1 = document.getElementById("i1");
var player = new jTimeline()
    .to(img1, 2, { left: 300, top: 400, opacity: 0.5 })
    .addTimeline(new jTimeline().to(img1, 2, { left: 100 }).callback(function () { console.log("test"); }), 1, 0.5, 1)
    .to(img1, 2, { left: 200, top: 200, opacity: 1 })
    .callback(function () {
        console.log("end");
    })
    .play({
        reverse: 3,
        repeat: 0,
        wait: 1,
        scale: 2
    });

player.on("times", function (t) {
    console.log(t);
});