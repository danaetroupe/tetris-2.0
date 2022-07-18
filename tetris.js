/* eslint-disable no-undef */
import * as grid from "./grid_module.js";
import * as box from "./box_module.js"

let g = {};
window.HTMLBodyElement.onload = init();

function init() {
    g.swap = new grid.Canvas(SWAP, SWAP, SCALE, BACKGROUND_COLOR)
    g.swap.createCanvas();
    
    g.canvas = new grid.Canvas(ROWS, COLUMNS, SCALE, BACKGROUND_COLOR)
    g.canvas.createCanvas();
    g.scoreDisplay = new grid.Canvas(1, 6, SCALE, BACKGROUND_COLOR);
    g.scoreDisplay.createCanvas();
    
    g.highScoreDisplay = new grid.Canvas(6, 12, SCALE *.75)
    g.highScoreDisplay.createCanvas();

    g.typeName = new box.InputBox(SCALE);
    g.typeName.createInput();
    g.typeName.disable();

    layout();
    
    g.gameOn = true;
    g.level = 1;
    g.obstacles = [];
    g.hold = undefined;
    g.alreadyHeld = false;
    g.score = 0;
    g.speed = FRAME_DELAY;
    g.rowsCleared = 0;
    window.onkeydown = keyHandler;
    play();
    animate();
    //drawBackground();

    g.highScores = [];
    for (let i = 0; i < 5; i++) {
        g.highScores.push({name: "DT", score: 0});
    }
    sortHighScores();
}

function sortHighScores () {
    g.highScores.sort(function(x, y){
        return y.score - x.score;
    });
    g.highScoreDisplay.clear();
    for(let i = 0; i < 5; i ++) {
        if (g.highScores[i]['name'].length > 2) {g.highScores[i]['name'] = g.highScores[i]['name'].slice(0,2)}
        g.highScoreDisplay.paintText(1, i, g.highScores[i]['name'] + " " + g.highScores[i]['score'])
    }
}



function keyHandler(e) {
    if (g.gameOn) {
        if (e.key === 'ArrowUp') {
            unpaintShape();
            g.obj.rotateLeft();
            paintShape();
        } else if (e.key === 'ArrowLeft') {
            let test = leftTest();
            if (test === false) {
                unpaintShape();
                g.obj.moveLeft();
                paintShape();
            }
        } else if (e.key === 'ArrowRight') {
            let test = rightTest();
            if (test === false) {
                unpaintShape();
                g.obj.moveRight();
                paintShape();
            }
        } else if (e.key === 'ArrowDown') {
            let test = verticalTest(); 
            if (test === false) {
                unpaintShape();
                g.obj.moveDown();
                //drawBackground(); 
                paintShape();
            }
        } else if (e.key === 'c') {
            if (g.alreadyHeld === false) {
                g.alreadyHeld = true;
                let a = g.hold;
                g.hold = g.obj;
                g.hold['x'] = Math.floor(SWAP/2);
                g.hold['y'] = Math.floor(SWAP/2);
                g.canvas.clear();
                for (let i = 0; i < g.obstacles.length; i++) {
                    g.canvas.paint(g.obstacles[i]['x'], g.obstacles[i]['y'], g.obstacles[i]['color'])
                    g.canvas.outline(g.obstacles[i]['x'],g.obstacles[i]['y'],'black');
                }
                if (a === undefined) {
                    play();
                } else {
                    a['x'] = COLUMNS/2;
                    a['y'] = -1;
                    a.collide = [];
                    g.obj = a;
                }
                
                g.swap.clear();
                let i = 0;
                let x = g.hold.x - 1;
                let y = g.hold.y - 1;
                while(i < g.hold.shape.length) {
                    if (g.hold.shape[i] === 1) {
                        g.swap.paint(x, y, g.hold.color);
                        g.swap.outline(x,y,BLOCK_OUTLINE)
                    }
                    if (g.hold.color !== 'cyan') {
                        if (x < g.hold.x + 1) {x += 1} else {x = g.hold.x - 1; y += 1;}
                        i += 1;
                    } else {
                        if (x < g.hold.x + 2) {x += 1} else {x = g.hold.x - 1; y += 1;}
                        i += 1;
                    }
                }
            }
        } else if (e.key === 'Shift') {
            let test = verticalTest();
            if (!test) {
                while (!test) {
                    unpaintShape();
                    g.obj.moveDown();
                    paintShape();
                    test = verticalTest();
                }
            } 
        }
    }
}

function drawBackground() {
    let row = 0;
    let column = 0;
    while (row < ROWS) {
        if (column > COLUMNS) {column = 0; row += 1;}
        g.canvas.outline(column, row, GRID_OUTLINE)
        column += 1;
    }
}

function play() {
        let keys = Object.keys(types);
        let random = keys[Math.floor(Math.random() * keys.length)];
        g.obj = new Tetrimino(COLUMNS/2,-1,types[random]);
        g.obj.collide = [];
        testRow();
        g.alreadyHeld = false;
    }

function animate() {
        verticalTest();
        if (g.gameOn) {
            unpaintShape();
            g.obj.moveDown();
            //drawBackground(); 
            paintShape();
            setTimeout(animate, g.speed)
        }
}


function unpaintShape() {
    let i = 0;
    let x = g.obj.x - 1;
    let y = g.obj.y - 1;
    while(i < g.obj.shape.length) {
        if (g.obj.shape[i] === 1) {
            g.canvas.unpaint(x, y, g.obj.color);
            g.obj.collide.length = 0;
        }
        if (g.obj.color !== 'cyan') {
            if (x < g.obj.x + 1) {x += 1} else {x = g.obj.x - 1; y += 1;}
            i += 1;
        } else {
            if (x < g.obj.x + 2) {x += 1} else {x = g.obj.x - 1; y += 1;}
            i += 1;
        }
    }
}

function paintShape() {
    let i = 0;
    let x = g.obj.x - 1;
    let y = g.obj.y - 1;
    while(i < g.obj.shape.length) {
        if (g.obj.shape[i] === 1) {
            g.canvas.paint(x, y, g.obj.color);
            g.obj.collide.push({x: x, y: y, x2: x+1, y2: y+1, color:g.obj.color});
            g.canvas.outline(x,y,BLOCK_OUTLINE)
        }
        if (g.obj.color !== 'cyan') {
            if (x < g.obj.x + 1) {x += 1} else {x = g.obj.x - 1; y += 1;}
            i += 1;
        } else {
            if (x < g.obj.x + 2) {x += 1} else {x = g.obj.x - 1; y += 1;}
            i += 1;
        }
    }
}

function verticalTest(){
    let test = false;
    let i = 0;
    while(i < g.obj.collide.length && test === false) {
        let z = 0;
        while(z < g.obstacles.length && test === false) {
            if(g.obstacles[z]['x'] === g.obj.collide[i]['x'] && g.obstacles[z]['y'] === g.obj.collide[i]['y2']) {
                test = true;
                for (let i = 0; i < g.obj.collide.length; i++) {
                    g.obstacles.push(g.obj.collide[i]);
                }
                if (test && g.obj['y'] <= 0) {gameOver();}
                play();
            }
            z += 1;
        }
        if (test === false) {
            if(g.obj.collide[i]['y2'] >= ROWS) {
                test = true;
                for (let i = 0; i < g.obj.collide.length; i++) {
                    g.obstacles.push(g.obj.collide[i]);

                }
                if (test && g.obj['y'] <= 0) {gameOver();}
                play();}
            i += 1;
            }
    }
    return test;
}

function leftTest(){
    let test = false;
    let i = 0;
    while(i < g.obj.collide.length && test === false) {
        if(g.obj.collide[i]['x'] <= 0) {
            test = true;
        } 
        let z = 0;
        while(z < g.obstacles.length && test === false) {
            if(g.obstacles[z]['x2'] === g.obj.collide[i]['x'] && g.obstacles[z]['y'] === g.obj.collide[i]['y']) {
                test = true; 
            }
            z += 1;
        }
        i += 1;
    }
    return test;
}

function rightTest(){
    let test = false;
    let i = 0;
    while(i < g.obj.collide.length && test === false) {
        if(g.obj.collide[i]['x2'] >= COLUMNS) {
            test = true;
        } 
        let z = 0;
        while(z < g.obstacles.length && test === false) {
            if(g.obstacles[z]['x'] === g.obj.collide[i]['x2'] && g.obstacles[z]['y'] === g.obj.collide[i]['y']) {
                test = true; 
            }
            z += 1;
        }
        i += 1;
    }
    return test;
}

function testRow() {
    let row = 0;
    let rowsClearedLocal = 0;
    while (row < ROWS) {
        let full = 0;
        let i = 0;
        while (i < g.obstacles.length) {
            if (g.obstacles[i]['y'] === row) {
                full += 1;
            }
            if(g.obstacles[i]['y'] < 0) {g.gameOn = false;}
            i += 1;
        }
        if (full === COLUMNS) {
            clearRow(row);
            rowsClearedLocal += 1;
            }
        row += 1;
    }
        g.score += POINTS[rowsClearedLocal]
        g.scoreDisplay.clear();
        g.scoreDisplay.paintText(1,-0.3,g.score+"")
}

function clearRow(row) {
    g.canvas.clear();
    let i = 0;
    while (i < g.obstacles.length) {
        if (g.obstacles[i]['y'] === row) {
            g.obstacles[i] = g.obstacles[g.obstacles.length-1];
            g.obstacles.pop();
        } else {
            if (g.obstacles[i]['y'] < row) {
                g.obstacles[i]['y'] += 1;
                g.obstacles[i]['y2'] += 1;
            }
            g.canvas.paint(g.obstacles[i]['x'],g.obstacles[i]['y'],g.obstacles[i]['color']);
            g.canvas.outline(g.obstacles[i]['x'],g.obstacles[i]['y'],'black');
            i += 1;
        }
    }
    g.rowsCleared += 1;
    if (g.rowsCleared % 5 === 0 && g.speed > MIN_DELAY) {
        g.level += 1;
        g.speed -= 50;
    }
}

function gameOver() {
    g.gameOn = false;
    for (let i = 0; i < COLUMNS; i++) {
        g.canvas.paint(i, ROWS/2, "green")
        g.canvas.paint(i, ROWS/2 + 1, "green")
    } g.canvas.paintText(1, ROWS/2, "GAME OVER")
    g.typeName.enable();
    g.typeName.changeInput("TYPE INITALS HERE");
    g.typeName.whenSubmit(submitHandler);
    
}

function restartGame() {
    g.level = 1;
    g.obstacles = [];
    g.hold = undefined;
    g.alreadyHeld = false;
    g.score = 0;
    g.speed = FRAME_DELAY;
    g.rowsCleared = 0;
    g.canvas.clear();
    g.swap.clear();
    g.typeName.disable();
    
    g.gameOn = true;
    play();
    animate();
    
}

function submitHandler() {
    let name = g.typeName.readText();
    g.highScores.push({name: name, score: g.score})
    sortHighScores();
    g.typeName.changeInput("TYPE INITALS HERE");
    restartGame();
}

function layout () {
    g.highScoreDisplay.setClass("right");
    g.scoreDisplay.setClass("right");
    g.typeName.setClass("right");
    g.rightSide = new grid.Div(".right", "rightSide");
    g.rightSide.createDiv();

    g.swap.setClass("container");
    g.canvas.setClass("container");
    g.rightSide.setClass("container");
    g.holdContainer = new grid.Div(".container", "holdContainer");
    g.holdContainer.createDiv();
}