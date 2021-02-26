// Use Keyboard to calculate
document.onkeydown = function() {type_to_screen(event); play_sound();};
function type_to_screen(event) {
    let key_code = event.which || event.keyCode;
    let calc_screen = document.getElementById("calculator_screen");
    let result_screen = document.getElementById("result_screen");

    // Print out all the numbers from 0 - 9
    for (key of number_list) {
        if (key_code == key.code) {
            print_it(calc_screen, key.txt);
        }
    }

    // Print out all the operators
    for (key of operator_list) {
        if (key_code == key.code) {
            // Handle the operator (replace operator if the last character on screen is also a operator)
            let current_str = calc_screen.innerHTML;
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
                calc_screen.innerHTML = current_str + key.txt;
            } else {
                print_it(calc_screen, key.txt);
            }
        }
    }

    // For "AC" Button (delete everything from the screen)
    if (key_code == 27) {
        calc_screen.innerHTML = '';
        result_screen.innerHTML = 0;
    }

    // for DEL Button (also for Backspace key)
    if (key_code == 8 || key_code == 46) {
        let current_strg = calc_screen.innerHTML;
        calc_screen.innerHTML = current_strg.substr(0, current_strg.length - 1);

        let screen_str = calc_screen.innerHTML;
        if (screen_str.length == 0) {
            calc_screen.innerHTML = '0';
        }
    }

    // for dot/comma key
    if  (key_code == 190 || key_code == 110 || key_code == 188) {
        let current_strg = calculator_screen.innerHTML;
        print_dot(calculator_screen, ".");
    }

    // for Enter (equal) key
    if  (key_code == 13) {
        berechnen(calc_screen, result_screen);
    }
}

function print_it(calc_screen, code) {
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

// fuer komma
function print_dot(calc_screen, code) { 
    let screen_str = calc_screen.innerHTML;
    let check_it = screen_str.endsWith(".");  // screen 
    if (check_it == false) {                    // screen does not end with point

        let testEndsWithOp = false;                   // 
        for (let i = 0; i < operator_list.length; i++) {
            testEndsWithOp = screen_str.endsWith(operator_list[i].txt);

            if (testEndsWithOp) {
                i = operator_list.length;
            }
        }

        if (screen_str == "" || testEndsWithOp) {                     // then if it is empty
            calc_screen.innerHTML += 0 + code;
        } else {  
          // double point
            let last_dot_pos = screen_str.lastIndexOf(".");     
            let test_str = screen_str.substr(last_dot_pos + 1, screen_str.length - 1);
            let testdot =  false;

            for (let i = 0; i < operator_list.length; i++) {
                testdot= test_str.includes(operator_list[i].txt);   /// checks if element of operator list exist
                if(testdot) {
                    calc_screen.innerHTML += code;
                    i = operator_list.length;
                }
               
                
            }
            if(!screen_str.includes(code)&&testdot == false) // no operator and dot  // screen_str ninmmt nur werte aus calc_screen  
            {
                calc_screen.innerHTML += code;
            }
            
                    
        }

    }
    
}

// Calculate it
function berechnen(calculator_screen, result_screen) {
    // Check if there is already a "(" of plus/minus button (Vorzeichen)
    let current_str = calculator_screen.innerHTML;
    if (current_str != "") {
        let bracket_open = current_str.lastIndexOf("(");
        let last_str = current_str.substr(bracket_open + 1, current_str.length);
        if (bracket_open >= 0) {
            let check_bracket_close = last_str.includes(")");
            if (!check_bracket_close) {
                calculator_screen.innerHTML += ")";
            }
        }

        // console.log("Truoc khi berechnen: " + calculator_screen.innerHTML);

        let screen_txt = calculator_screen.innerHTML;
        let index_src = 0;
        do {
            index_src = screen_txt.search("sqr");
            if (index_src != -1) {
                let first_slice_str = screen_txt.slice(0, index_src);
                let second_slice_str = screen_txt.slice(index_src, screen_txt.length);
                
                let erste_klammer_pos = second_slice_str.indexOf(")");
                let first_part = second_slice_str.slice(0, erste_klammer_pos);
                let second_part = second_slice_str.slice(erste_klammer_pos, second_slice_str.length);
                second_slice_str = first_part + ", 2" + second_part;

                screen_txt = first_slice_str + second_slice_str;

                screen_txt = screen_txt.replace("sqr", "Math.pow");
            }
        } while (index_src != -1);

        console.log("After Replacing: " + screen_txt);

        // Calculate it when screen is written correctly
        result_screen.innerHTML = eval(screen_txt);
        // console.log("Scau khi berechnen: " + calculator_screen.innerHTML);
        calculator_screen.innerHTML = '';
        // console.log("Sau khi leeren: " + calculator_screen.innerHTML);
    }
}