const types = {
    Cyan:   {color: 'cyan',
                    shape: [0, 1, 0, 0,
                            0, 1, 0, 0,
                            0, 1, 0, 0,
                            0, 1, 0, 0]},

    Yellow:  {color: 'Yellow',
                    shape: [1, 1, 0,
                            1, 1, 0,
                            0, 0, 0]},
                            
    Purple:  {color: 'Purple',
                    shape: [0, 1, 0,
                            1, 1, 1,
                            0, 0, 0]},
                            
    Green:    {color: 'Green',
                    shape: [0, 0, 0,
                            0, 1, 1,
                            1, 1, 0]},

    Red:     {color: 'Red',
                    shape: [0, 0, 0,
                            1, 1, 0,
                            0, 1, 1]},
                            
    Blue:     {color: 'Blue',
                    shape: [0, 0, 0,
                            1, 0, 0,
                            1, 1, 1]}, 
                            
    Orange:  {color: 'Orange',
                    shape: [0, 0, 0,
                            0, 0, 1,
                            1, 1, 1]}
};

const ROWS = 20;
const COLUMNS = 10;
const SCALE = 22;

const SWAP = 5;

const BACKGROUND_COLOR = 'WHITE'
const BLOCK_OUTLINE = 'black'
const GRID_OUTLINE = 'gray'

const BLOCKS_PER_SEC = 5;

const FRAME_DELAY = 800;
const MIN_DELAY = 100;


const POINTS = {
        0: 0,
        1: 100,
        2: 300,
        3: 500,
        4: 1000
}

const INSTRUCTIONS = 
        "TETRIS JAVASCRIPT PROJECT by Danae Troupe"
        + "/n"
