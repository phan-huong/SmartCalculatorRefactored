// Sounds
var bleep = new Audio();
bleep.src = "assets/C3.mp3";
function play_sound() {
    bleep.play(); // Play button sound now
}


//mute
let enableMute = document.getElementById("enableMute");
let mute_icon   =document.createElement("img");
mute_icon.setAttribute("src", "assets/images/mute.png");
enableMute.appendChild(mute_icon);
mute_icon.onclick = function (){
    enableMute.classList.toggle("mute");

    var is_muted = enableMute.classList.contains("mute");

    if(is_muted){
        bleep.muted = true;
        this.setAttribute("src", "assets/images/play.png");
    
    } else {
        this.setAttribute("src", "assets/images/mute.png");
        bleep.muted=false
    }
}