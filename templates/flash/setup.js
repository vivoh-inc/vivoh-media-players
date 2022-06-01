var source;
var state = "pause";
function play() {
    if (state == "play") {
        api.pause();
        document.getElementById("stopButton").style.display = "none";
	document.getElementById("playButton").style.display = "inline"
	state = "pause";
    } else {
        api.play(-1);
	document.getElementById("stopButton").style.display = "inline";
	document.getElementById("playButton").style.display = "none"
        state = "play";
    }
}

window.onload = () => {
    source = Vivoh.hls.getSource(document.location.search, document.location.pathname)
    document.getElementById("playButton").style.display = "inline";
    setTimeout(function(){ api.load(source); }, 1000);
}
