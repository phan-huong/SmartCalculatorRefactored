/**
 * Play sound
 */
var sound = new Audio();
sound.src = "assets/C3.mp3";
function play_sound() {
    // Play button sound at the moment a button is pressed
    sound.play();
}

/**
 * Mute mode
 */
let enableMute = document.getElementById("enableMute");
let mute_icon = document.createElement("img");
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
        bleep.muted = false
    }
}