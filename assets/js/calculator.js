let calc = document.getElementById("calculator");

/**
 * Define the calculator buttons
 */
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

/**
 * Setup calculator
 * Calculator's screen is made up of a big screen,
 * a calculator screen where the input operations are shown
 * and the result screen.
 */

// Create big screen
let big_screen = document.createElement("div");
big_screen.setAttribute("id", "big_screen");
calc.appendChild(big_screen);

// Create calculator screen
let calculator_screen = document.createElement("div");
calculator_screen.setAttribute("id", "calculator_screen");
big_screen.appendChild(calculator_screen);
calculator_screen.innerHTML = '';

// The Calculator screen shows "0" on starting
let result_screen = document.createElement("div");
result_screen.setAttribute("id", "result_screen");
big_screen.appendChild(result_screen);
result_screen.innerHTML = 0;

/**
 * Create left button area
 */

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
let left_part_signs = [{code: '.', txt: '.'}, {code: '-', txt: '&plusmn;'}];
for (left_part_number of left_part_numbers) {
    let number_button = document.createElement("button");
    number_button.setAttribute("class","btn");
    left_part_container.appendChild(number_button);
    number_button.innerHTML = left_part_number;
    number_button.onclick = function () {
        print_screen(calculator_screen, number_button.innerHTML);
    };
}

// For dot/comma and plus/minus sign buttons
for (left_part_sign of left_part_signs) {
    let number_button = document.createElement("button");
    number_button.setAttribute("class","btn");
    left_part_container.appendChild(number_button);
    number_button.innerHTML = left_part_sign.txt;
    let num_txt = left_part_sign.code;
    
    // For dot/comma button
    if (number_button.innerHTML == ".") {
        number_button.onclick = function() {
            let current_strg = calculator_screen.innerHTML;
            print_dot(calculator_screen, num_txt);
        }
    }

    // For plus/minus sign button (Vorzeichen)
    if (number_button.innerHTML == "&plusmn;" || number_button.innerHTML == "±") {
        number_button.onclick = function() {
            calculator_screen.innerHTML += "(-";
        }
    }
}

/**
 * Create right button area
 */

// Create inner right part (operation buttons)  & container
let right_part = document.createElement("div");
right_part.setAttribute("id","right_part");
calc.appendChild(right_part);

// Right part container
let right_part_container = document.createElement("div");
right_part_container.setAttribute("id","right_part_container");
right_part.appendChild(right_part_container);

// Keys of right part
let right_part_specials = ["DEL", "AC"];
let right_part_values = ["*", "/", "+", "-"];
let special_values = ["^2", "="];

// For "DEL" and "AC" Buttons
for (right_part_special of right_part_specials) {
    let number_button = document.createElement("button");
    number_button.setAttribute("class","btn");
    right_part_container.appendChild(number_button);
    number_button.innerHTML = right_part_special;
    
    if (number_button.innerHTML == "DEL") {
        number_button.onclick = function() {
            let current_string = calculator_screen.innerHTML;
            calculator_screen.innerHTML = current_string.substr(0, current_string.length - 1);
        }
    }

    if (number_button.innerHTML == "AC") {
        number_button.onclick = function() {
            calculator_screen.innerHTML = '';
            result_screen.innerHTML = '0';
        }
    }
}

/**
 * Create operator buttons
 */
for (right_part_value of right_part_values) {
    let number_button = document.createElement("button");
    number_button.setAttribute("class","btn");
    right_part_container.appendChild(number_button);
    number_button.innerHTML = right_part_value;
    number_button.onclick = function () {
        // Check if there is already a "(" of plus/minus button (Vorzeichen), then close it with ")"
        let current_str = calculator_screen.innerHTML;
        let bracket_open = current_str.lastIndexOf("(");
        // Get the string inside the brackets
        let last_str = current_str.substr(bracket_open + 1, current_str.length);
        if (bracket_open >= 0) {
            let check_bracket_close = last_str.includes(")");
            if (!check_bracket_close) {
                calculator_screen.innerHTML += ")";
            }
        }
        
        // Handle the operator - replace operator if the last character on screen is also a operator
        // Prevent double operator
        let last_char = current_str.substr(current_str.length - 1, current_str.length);
        let is_operator = false;
        for (i = 0; i < operator_list.length; i++) {
            if (last_char == operator_list[i].txt) {
                is_operator = true;
                i = operator_list.length;
            }
        }
        if (is_operator == true) {
            current_str = current_str.substr(0, current_str.length - 1);
            calculator_screen.innerHTML = current_str + this.innerHTML;
        } else {
            print_screen(calculator_screen, this.innerHTML);
        }
    };
}

/**
 * Create equal button "=" and exponent button "^2"
 */
for (special_value of special_values) {
    let number_button = document.createElement("button");
    number_button.setAttribute("class","btn");
    right_part_container.appendChild(number_button);
    number_button.innerHTML = special_value;

    // For equal button button 
    if (number_button.innerHTML == "=") { 
        number_button.onclick = function() {
            calculate(calculator_screen, result_screen);
        }
    }

    // For exponent 2 button
    if (number_button.innerHTML == "^2"){
        number_button.onclick = function() {
            let current_str = calculator_screen.innerHTML;
            let endChar = current_str.charAt(current_str.length-1);

            // If last character is not an operator
            let is_operator = false;
            for (let index = 0; index < operator_list.length; index++) {
                if (endChar == operator_list[index].txt) {
                    is_operator = true;
                    index = operator_list.length;
                }
            }

            // If the screen does not just contain "sqr("
            if (!is_operator) {
                let pos = -1;
                for (let i = current_str.length - 1; i >= 0; i--) {
                    for (operator of operator_list) {
                        // If the last found operator does not belong to a plus/minus sign (Vorzeichen)
                        if (operator.txt == current_str[i] && current_str[i-1] != "(") {
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
                    let corrected_screen = current_str.slice(0, pos) + new_str;
                    calculator_screen.innerHTML = corrected_screen;
                } else {
                    calculator_screen.innerHTML = "sqr(" + current_str;
                }
            }
        }
    }
}

/**
 * Play sound with every button pressed
 */
let all_buttons = document.querySelectorAll(".btn");
for (btn of all_buttons) {
    btn.addEventListener("click", play_sound);
}