let calc = document.getElementById("calculator");

// Define the calculator buttons
let displayed_keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "*", "/", "+", "-"];

let number_list = [{code: 48, txt: 0}, {code: 96, txt: 0}, 
            {code: 49, txt: 1}, {code: 97, txt: 1},
            {code: 50, txt: 2}, {code: 98, txt: 2},
            {code: 51, txt: 3}, {code: 99, txt: 3},
            {code: 52, txt: 4}, {code: 100, txt: 4},
            {code: 53, txt: 5}, {code: 101, txt: 5},
            {code: 54, txt: 6}, {code: 102, txt: 6},
            {code: 55, txt: 7}, {code: 103, txt: 7},
            {code: 56, txt: 8}, {code: 104, txt: 8},
            {code: 57, txt: 9}, {code: 105, txt: 9}];

let operator_list = [               
            {code: 106, txt: '*'},
            {code: 107, txt: '+'},
            {code: 109, txt: '-'},
            {code: 111, txt: '/'}];

// Setup calculator

// Create calculator screen
let big_screen = document.createElement("div");
big_screen.setAttribute("id", "big_screen");
calc.appendChild(big_screen);

let calculator_screen = document.createElement("div");
calculator_screen.setAttribute("id", "calculator_screen");
big_screen.appendChild(calculator_screen);
calculator_screen.innerHTML = '';

// The Calculator screen shows "0" on starting
let result_screen = document.createElement("div");
result_screen.setAttribute("id", "result_screen");
big_screen.appendChild(result_screen);
result_screen.innerHTML = 0;

// Create inner left part (0-9 buttons & comma & ^2 buttons) & container
let left_part = document.createElement("div");
left_part.setAttribute("id", "left_part");
calc.appendChild(left_part);

// Left part container
let left_part_container = document.createElement("div");
left_part_container.setAttribute("id", "left_part_container");
left_part.appendChild(left_part_container);

// Keys of left part
let left_part_numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
let left_part_special = [{code: '.', txt: '.'}, {code: '-', txt: '&plusmn;'}];
for (taste of left_part_numbers) {
    let num_btn = document.createElement("button");
    num_btn.setAttribute("class","btn");
    left_part_container.appendChild(num_btn);
    num_btn.innerHTML = taste;
    num_btn.onclick = function () {
        print_it(calculator_screen, num_btn.innerHTML);
    };
}

// For dot/comma and plus/minus sign buttons
for (taste of left_part_special) {
    let num_btn = document.createElement("button");
    num_btn.setAttribute("class","btn");
    left_part_container.appendChild(num_btn);
    num_btn.innerHTML = taste.txt;
    let num_txt = taste.code;
    
    // For dot/comma button
    if (num_btn.innerHTML == ".") {
        num_btn.onclick = function() {
            let current_strg = calculator_screen.innerHTML;
            print_dot(calculator_screen, num_txt);
        }
    }

    // For plus/minus sign button (Vorzeichen)
    if (num_btn.innerHTML == "&plusmn;" || num_btn.innerHTML == "±") {
        num_btn.onclick = function() {
            calculator_screen.innerHTML += "(-";
        }
    }

}


// create inner right part (operation buttons)  & container
let right_part = document.createElement("div");
right_part.setAttribute("id","right_part");
calc.appendChild(right_part);

// right part container
let right_part_container = document.createElement("div");
right_part_container.setAttribute("id","right_part_container");
right_part.appendChild(right_part_container);

// Keys of right part
let right_part_special = ["DEL", "AC"];
let right_part_values = ["*", "/", "+", "-"];
let special_values = ["^2", "="];

// For "DEL" and "AC" Buttons
for (taste of right_part_special) {
    let num_btn = document.createElement("button");
    num_btn.setAttribute("class","btn");
    right_part_container.appendChild(num_btn);
    num_btn.innerHTML = taste;
    
    if (num_btn.innerHTML == "DEL") {
        num_btn.onclick = function() {
            let current_strg = calculator_screen.innerHTML;
            calculator_screen.innerHTML = current_strg.substr(0, current_strg.length - 1);
        }
    }

    if (num_btn.innerHTML == "AC") {
        num_btn.onclick = function() {
            calculator_screen.innerHTML = '';
            result_screen.innerHTML = '0';
        }
    }
}


// For Operators buttons
for (taste of right_part_values) {
    let num_btn = document.createElement("button");
    num_btn.setAttribute("class","btn");
    right_part_container.appendChild(num_btn);
    num_btn.innerHTML = taste;
    num_btn.onclick = function () {
        // Check if there is already a "(" of plus/minus button (Vorzeichen), then close it with ")"
        let current_str = calculator_screen.innerHTML;
        let bracket_open = current_str.lastIndexOf("(");
        let last_str = current_str.substr(bracket_open + 1, current_str.length);
        if (bracket_open >= 0) {
            let check_bracket_close = last_str.includes(")");
            if (!check_bracket_close) {
                calculator_screen.innerHTML += ")";
            }
        }
        

        // Handle the operator (replace operator if the last character on screen is also a operator) - prevent double operator
        let last_char = current_str.substr(current_str.length - 1, current_str.length);

        let check_it = false;
        for (i = 0; i < operator_list.length; i++) {
            if (last_char == operator_list[i].txt) {
                check_it = true;
                i = operator_list.length;
            }
        }

        if (check_it == true) {
            current_str = current_str.substr(0, current_str.length - 1);
            calculator_screen.innerHTML = current_str + this.innerHTML;
        } else {
            print_it(calculator_screen, this.innerHTML);
        }
    };
}


// For equal button (gleich) and exponent button (hoch 2)
for (taste of special_values) {
    let num_btn = document.createElement("button");
    num_btn.setAttribute("class","btn");
    right_part_container.appendChild(num_btn);
    num_btn.innerHTML = taste;

    // For equal button (gleich) button 
    if (num_btn.innerHTML == "=") { 
        num_btn.onclick = function() {
            berechnen(calculator_screen, result_screen);
        }
    }

    // For exponent button (hoch 2) button
    if (num_btn.innerHTML == "^2"){
        num_btn.onclick = function() {
            let current_str = calculator_screen.innerHTML;
            let endChar = current_str.charAt(current_str.length-1);

            // If last character is not an operator
            let test_operator = false;
            for (let index = 0; index < operator_list.length; index++) {
                if (endChar == operator_list[index].txt) {
                    test_operator = true;
                    index = operator_list.length;
                }
            }

            // If the screen does not just contain "sqr("
            if (!test_operator) {
                let pos = -1;
                for (let i = current_str.length - 1; i >= 0; i--) {
                    let test_new = false;
                    for (op of operator_list) {
                        // If the last found operator does not belong to a plus/minus sign (Vorzeichen)
                        if (op.txt == current_str[i] && current_str[i-1] != "(") {
                            pos = i;
                            i = -1;
                        }
                    }
                }

                if (pos >= 0) {
                    let current_slice = current_str.slice(pos+1,current_str.length);
                    if (current_slice.startsWith("(")){
                        current_slice = current_slice.slice(1, current_slice.length);
                    } else if (current_slice.startsWith("sqr")) {
                        current_slice = current_slice.slice(4, current_slice.length);
                    }

                    let new_str = current_str[pos] + "sqr(" + current_slice;

                    let corrected_scr = current_str.slice(0, pos) + new_str;

                    calculator_screen.innerHTML = corrected_scr;
                } else {
                    calculator_screen.innerHTML = "sqr(" + current_str;
                }
            }
        }
    }
}

let all_buttons = document.querySelectorAll(".btn");
for (btn of all_buttons) {
    btn.addEventListener("click", play_sound);
}