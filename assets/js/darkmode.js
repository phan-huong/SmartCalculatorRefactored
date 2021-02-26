// Dark mode
let dark_mode = document.getElementById("dark_mode");
let dark_mode_icon = document.createElement("img");
dark_mode_icon.setAttribute("src", "assets/images/night.png");
dark_mode.appendChild(dark_mode_icon);

dark_mode_icon.onclick = function (){
    document.body.classList.toggle("dark_body");
    dark_mode.classList.toggle("night");

    var is_night = dark_mode.classList.contains("night");
    if (is_night) {
        this.setAttribute("src", "assets/images/day.png");
        this.style.backgroundColor = "#666666";
        mute_icon.style.backgroundColor = "#666666";
    } else {
        this.setAttribute("src", "assets/images/night.png");
        this.style.backgroundColor = "#333333";
        mute_icon.style.backgroundColor = "#333333";
    }
};