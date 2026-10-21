const bg_list = [
    "assets/0.gif",
    "assets/1.gif",
    "assets/2.gif",
    "assets/3.gif",
    "assets/4.gif",
    "assets/5.gif",
    "assets/6.gif",
    "assets/7.gif",
    "assets/8.gif"
];

current_index = 0;
const image_element = document.getElementById("active-background");

function alternate_bg() {
    current_index = current_index + 1;
    if (current_index == bg_list.length) {
        current_index = 0;
    }
    image_element.src = bg_list[current_index];
}

setInterval(alternate_bg, 9000);