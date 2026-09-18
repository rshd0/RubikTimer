import { randomScrambleForEvent } from "cubing/scramble";

const cubeEvents = {
    "2x2": "222",
    "3x3": "333",
    "4x4": "444",
    "5x5": "555",
    "6x6": "666",
    "7x7": "777",
    "pyraminx": "pyram",
    "megaminx": "minx",
    "clock": "clock",
    "square1": "sq1",
    "skewb": "skewb"
};

export async function scrambleController(cube_size){
    let scramble;
    const event = cubeEvents[cube_size]
    scramble = await randomScrambleForEvent(event)
    return scramble.toString();
}