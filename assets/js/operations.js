/**
 * Use Keyboard to calculate
 */
document.onkeydown = function() {type_to_screen(event); play_sound();};

function type_to_screen(event) {
    let key_code = event.which || event.keyCode;
    let calc_screen = document.getElementById("calculator_screen");
    let result_screen = document.getElementById("result_screen");

    // Print out all the numbers from 0 - 9
    for (key of number_list) {
        if (key_code == key.code) {
            print_screen(calc_screen, key.txt);
        }
    }

    // Print out all the operators
    for (key of operator_list) {
        if (key_code == key.code) {
            // Handle the operator (replace operator if the last character on screen is also a operator)
            let current_str = calc_screen.innerHTML;
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
                calc_screen.innerHTML = current_str + key.txt;
            } else {
                print_screen(calc_screen, key.txt);
            }
        }
    }

    // For "AC" Button (delete everything from the screen)
    if (key_code == 27) {
        calc_screen.innerHTML = '';
        result_screen.innerHTML = 0;
    }

    // For DEL Button (also for Backspace key)
    if (key_code == 8 || key_code == 46) {
        let current_strg = calc_screen.innerHTML;
        calc_screen.innerHTML = current_strg.substr(0, current_strg.length - 1);

        let screen_str = calc_screen.innerHTML;
        if (screen_str.length == 0) {
            calc_screen.innerHTML = '0';
        }
    }

    // For dot/comma key
    if  (key_code == 190 || key_code == 110 || key_code == 188) {
        let current_strg = calculator_screen.innerHTML;
        print_dot(calculator_screen, ".");
    }

    // For Enter (equal) key
    if  (key_code == 13) {
        calculate(calc_screen, result_screen);
    }
}

/**
 * Functions to print on the calculator screen
 */
function print_screen(calc_screen, code) {
    if (calc_screen.innerHTML == "") {   
        calc_screen.innerHTML = code;
    } else {
        calc_screen.innerHTML += code;
    }
}
function print_operator(calc_screen, code) {
    if (calc_screen.innerHTML == "") {
        calc_screen.innerHTML = "0" + code;
    } else {
        calc_screen.innerHTML += code;
    }
}

/**
 * Handle floating point numbers "."
 */
function print_dot(calc_screen, code) { 
    let screen_str = calc_screen.innerHTML;
    // String displayed on screen
    let is_dot = screen_str.endsWith(".");
    // Screen does not end with point
    if (is_dot == false) {
        let endsWithOperator = false;
        for (let i = 0; i < operator_list.length; i++) {
            endsWithOperator = screen_str.endsWith(operator_list[i].txt);
            if (endsWithOperator) {
                i = operator_list.length;
            }
        }

        // If no string is displayed on the screen
        if (screen_str == "" || endsWithOperator) {
            calc_screen.innerHTML += 0 + code;
        } else {
          // Double points
            let last_dot_pos = screen_str.lastIndexOf(".");     
            let test_str = screen_str.substr(last_dot_pos + 1, screen_str.length - 1);
            let test_dot =  false;
            for (let i = 0; i < operator_list.length; i++) {
                // Checks if element of operator list appears in string
                test_dot= test_str.includes(operator_list[i].txt);
                if(test_dot) {
                    calc_screen.innerHTML += code;
                    i = operator_list.length;
                }               
            }
            // If there is no operator or dot
            // screen_str only takes on values from the calc_screen
            if(!screen_str.includes(code) && test_dot == false)  
            {
                calc_screen.innerHTML += code;
            }    
        }
    }
}

/** 
 * Function to do calculation
*/
function calculate(calculator_screen, result_screen) {
    // Check if there is already a "(" of plus/minus button (Vorzeichen)
    let current_str = calculator_screen.innerHTML;
    if (current_str != "") {
        let bracket_open = current_str.lastIndexOf("(");
        let last_str = current_str.substr(bracket_open + 1, current_str.length);
        if (bracket_open >= 0) {
            let is_bracket_close = last_str.includes(")");
            if (!is_bracket_close) {
                calculator_screen.innerHTML += ")";
            }
        }

        // Handle exponents and brackets
        let screen_txt = calculator_screen.innerHTML;
        let index_src = 0;
        do {
            index_src = screen_txt.search("sqr");
            if (index_src != -1) {
                let first_slice_str = screen_txt.slice(0, index_src);
                let second_slice_str = screen_txt.slice(index_src, screen_txt.length);
                
                let first_bracket_pos = second_slice_str.indexOf(")");
                let first_part = second_slice_str.slice(0, first_bracket_pos);
                let second_part = second_slice_str.slice(first_bracket_pos, second_slice_str.length);
                second_slice_str = first_part + ", 2" + second_part;

                screen_txt = first_slice_str + second_slice_str;
                screen_txt = screen_txt.replace("sqr", "Math.pow");
            }
        } while (index_src != -1);

        // Calculate it when screen is written correctly
        result_screen.innerHTML = eval(screen_txt);
        calculator_screen.innerHTML = '';
    }
}