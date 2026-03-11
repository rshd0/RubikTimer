const settings = JSON.parse(localStorage.getItem("settings"))

export function scrambleController(){
    let scramble;
    if (settings.cube_order === "3x3"){
        scramble = generate3x3Scramble();
    }
    else if(settings.cube_order === "2x2"){
        scramble = generate2x2Scramble();
    }
    return scramble;
}

function generate3x3Scramble(){
    let list_scramble = [];
    let faces = ["R", "L", "U", "D", "F", "B"];
    let modifiers = ["", "'", "2"]
    let scrambleLength = 25;

    let x_asix = ["R", "L"]
    let y_asix = ["U", "D"]
    let z_asix = ["F", "B"]

    while (list_scramble.length < scrambleLength){
        let face = faces[Math.floor(Math.random() * faces.length)];
        let modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
        let move = face + modifier;
        let last_move = list_scramble[list_scramble.length-1];
        let second_last_move = list_scramble[list_scramble.length-2];

        if (last_move){
            let last_face = last_move[0];
            let last_modifier = last_move.slice(1);

            if (last_face === face){
                if (last_modifier === modifier ||
                    (last_modifier === "'" && modifier === "")||
                    (last_modifier === "" && modifier === "'") ||
                    (last_modifier === "" && modifier === "2") ||
                    (last_modifier === "2" && modifier === "") ||
                    (last_modifier === "'" && modifier === "2") ||
                    (last_modifier === "2" && modifier === "'") ||
                    (last_modifier === "2" && modifier === "2")
                ){
                    
                    continue;
                }}
            if (second_last_move){
                let second_last_face = second_last_move[0];
                let second_last_modifier = second_last_move.slice(1);

                if (face === second_last_face){
                    if (second_last_modifier === modifier ||
                       (second_last_modifier === "'" && modifier === "")||
                       (second_last_modifier === "" && modifier === "'") ||
                       (second_last_modifier === "" && modifier === "2") ||
                       (second_last_modifier === "2" && modifier === "") ||
                       (second_last_modifier === "'" && modifier === "2") ||
                       (second_last_modifier === "2" && modifier === "'") ||
                       (second_last_modifier === "2" && modifier === "2")
                        ){
                            if ((x_asix.includes(last_face) && x_asix.includes(second_last_face)) || 
                                (y_asix.includes(last_face) && y_asix.includes(second_last_face)) ||
                                (z_asix.includes(last_face) && z_asix.includes(second_last_face))
                                 ){
                                    continue;
                            }
                    }
                }
                
            }
        }
        list_scramble.push(move)
    }
    return list_scramble.join(" ")
}


function generate2x2Scramble(){
    let list_scramble = [];
    let faces = ["R", "L", "U", "D", "F", "B"];
    let modifiers = ["", "'", "2"]
    let scrambleLength = 9;
    
    let x_asix = ["R", "L"];
    let y_asix = ["U", "D"];
    let z_asix = ["F", "B"];

    while (list_scramble.length < scrambleLength){
        let face = faces[Math.floor(Math.random() * faces.length)];
        let modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
        let move = face + modifier;
        let last_move = list_scramble[list_scramble.length-1];

        if (last_move){
            let last_face = last_move[0];
            let last_modifier = last_move.slice(1)
            if (face === last_face){
                continue;
            }
            if (x_asix.includes(face) && x_asix.includes(last_face) ||
                y_asix.includes(face) && y_asix.includes(last_face) ||
                z_asix.includes(face) && z_asix.includes(last_face)){
                    continue;
            }
        }
        list_scramble.push(move);
    }
    return list_scramble.join(" ");
}