/* 
================================
JAVASCRIPT GRID GRAPHICS MODULE
================================
    
version 2.0 (2022-7-07)
    what's new (2.0):
        -disables the need for a global object
        -centralizes all functions into the class allowing the use for multiple canvases
        -previous versions will no longer work
    what's new (0.1):
        -replaced createCanvas() with init() function
        -canvas is now created using a class
*/

const DEFAULT_ROWS = 10;
const DEFAULT_COLUMNS = 20;
const DEFAULT_SCALE = 25;

const BACKGROUND_COLOR = "white";
const DEFAULT_COLOR = "black"
const DEFAULT_OUTLINE = "green"
const DEFAULT_BORDER = "black"
const BORDER_SIZE = "2px";
const TEXT = (DEFAULT_SCALE - 2) + "px serif"
const DEFAULT_TEXT_COLOR = 'black'

const DEFAULT_SHOW = true;

class Canvas {
    constructor(rows = DEFAULT_ROWS, 
                columns = DEFAULT_COLUMNS, 
                scale = DEFAULT_SCALE, 
                background_color = BACKGROUND_COLOR, 
                show_borders = DEFAULT_SHOW, 
                border_size = BORDER_SIZE, 
                border_color = DEFAULT_BORDER) {

        this.rows = rows;
        this.columns = columns;
        this.scale = scale;
        this.background_color = background_color;
        this.show_borders = show_borders;
        this.border_size = border_size;
        this.border_color = border_color;
    }

    createCanvas() {
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas)
        this.context = this.canvas.getContext('2d');
        
        this.canvas.width = this.columns * this.scale;
        this.canvas.height = this.rows * this.scale;
        this.canvas.style.backgroundColor = this.background_color;
    
        if(this.show_borders) {
            this.canvas.style.border = this.border_size + " solid " + this.border_color;
        }
    
        this.spaces = [];
        this.images = [];
        this.outlines = [];
        this.shapes = [];
        this.letters = [];
    }

    // paints a grid-square at a given x,y coordinate. color is optional
    paint(x, y, color = DEFAULT_COLOR) {
        this.context.fillStyle = color;
        this.context.fillRect(x*this.scale,y*this.scale,this.scale,this.scale);
        let exists = false;
        let i = 0;
        while (i < this.spaces[length] && exists === false) {
            if (this.spaces[i]['x'] === x, this.spaces[i]['y'] === y, this.spaces[i]['color'] === color) {
                exists = true;
            }
            i += 1;
        }
        if(!exists) {this.spaces.push({'x': x, 'y': y, 'color': color});}
    }

    // returns the grid-coordinates in an array based on click
    whereClick(e) {
        let coords = this.canvas.getBoundingClientRect();
        let x = Math.floor((e.clientX - coords.x)/ this.scale);
        let y = Math.floor((e.clientY - coords.y)/ this.scale);
        return [x, y];
    }

    outline(x, y, color = DEFAULT_OUTLINE) {
        this.context.strokeStyle = color;
        this.context.strokeRect(x*this.scale+1,y*this.scale+1,this.scale-2,this.scale-2);
        let exists = false;
        let i = 0;
        while (i < this.outlines[length] && exists === false) {
            if (this.outlines[i]['x'] === x, this.outlines[i]['y'] === y, this.outlines[i]['color'] === color) {
                exists = true;
            }
            i += 1;
        }
        if(!exists) {this.outlines.push({'x': x, 'y': y, 'color': color});}
    }

    // draws an image at x, y coordinates
    paintImage(img, x, y) {
        let image = new Image();
        image.src = img;
        image.onload = function(){
            this.context.drawImage(image, x*this.scale, y*this.scale, this.scale, this.scale);
        }

        let exists = false;
        let i = 0;
        while (i < this.images[length] && exists === false) {
            if (this.images[i]['x'] === x, this.images[i]['y'] === y, this.images[i]['img'] === img) {
                exists = true;
            }
            i += 1;
        }
        if(!exists) {this.images.push({'x': x, 'y': y, 'img': img});}
    }

    drawCircle(x, y, color, fill=false) {
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x*this.scale+(this.scale/2), y*this.scale+(this.scale/2), this.scale/2, 0, 2*Math.PI);
        this.context.stroke();
        if (fill) {
            this.context.fill();
        }
        this.context.closePath();
        let exists = false;
        let i = 0;
        while (i < this.shapes[length] && exists === false) {
            if (this.shapes[i]['x'] === x, 
                this.shapes[i]['y'] === y, 
                this.shapes[i]['color'] === color,
                this.shapes[i]['fill'] === fill) {
                exists = true;
            }
            i += 1;
        }
        if(!exists) {this.shapes.push({'x': x, 'y': y, 'color': color, 'fill': fill});}
    }

    show() {
        this.clear();
        for (let i = 0; i < this.spaces.length; i++) {
            this.context.fillStyle = this.spaces[i]['color'];
            let x = this.spaces[i]['x'] * this.scale
            let y = this.spaces[i]['y'] * this.scale
            this.context.fillRect(x, y ,this.scale,this.scale);
        }
        for (let i = 0; i < this.outlines.length; i++) {
            this.context.strokeStyle = this.outline[i]['color'];
            let x = this.outlines[i]['x'] * this.scale
            let y = this.outlines[i]['y'] * this.scale
            this.context.strokeRect(x+1,y+1,this.scale-2,this.scale-2);
        }
        for (let i = 0; i < this.shapes.length; i++) {
            this.context.strokeStyle = this.shapes[i]['color'];
            this.context.fillStyle = this.shapes[i]['color'];
            let x = this.shapes[i]['x'] *this.scale+(this.scale/2)
            let y = this.shapes[i]['y'] * this.scale + (this.scale/2)
            this.context.beginPath();
            this.context.arc(x, y, this.scale/2, 0, 2*Math.PI);
            this.context.stroke();
            if (this.shapes[i]['fill' === true]) {
                this.context.fill();
            }
            this.context.closePath();
        }
        for (let i = 0; i < this.letters.length; i++) {
            let x = (this.letters[i]['x']+i) * this.scale
            let y = (this.letters[i]['y'] + 1) * this.scale
            this.context.font = this.text;
            this.context.fillStyle = this.letters[i]['color'];
            this.context.fillText(this.letters[i]['letter'], x, y);
        }
    }

    paintText(x, y, text, color = DEFAULT_TEXT_COLOR) {
        this.context.font = this.text;
        this.context.fillStyle = color;
        let z = 0;
        while (z < text.length) {
            this.context.fillText(text[z], (x+z)*this.scale, (y+1)*this.scale);
            
            let exists = false;
            let i = 0;
            while (i < this.letters[length] && exists === false) {
                if (this.letters[i]['x'] === x, this.letters[i]['y'] === y, 
                this.letters[i]['letter'] === text[z], this.letters[i]['color'] === color) {
                    exists = true;
                }
                i += 1;
            }
            if(!exists) {this.letters.push({'x': x, 'y': y, 'letter': text[z], 'color': color});}
            z += 1;
        }
    }

    // removes grid-square at a given x,y coordinate
    unpaint(x,y) {
        this.context.clearRect(x*this.scale,y*this.scale,this.scale,this.scale);

        for (let i = 0; i < this.spaces.length; i++) {
            if (this.spaces[i]['x'] === x && this.spaces[i]['y'] === y) {
                this.spaces[i] = this.spaces[(this.spaces.length) - 1];
                this.spaces.pop();
            }
        }
        for (let i = 0; i < this.outlines.length; i++) {
            if (this.outlines[i]['x'] === x && this.outlines[i]['y'] === y) {
                this.outlines[i] = this.outlines[(this.outlines.length) - 1];
                this.outlines.pop();
            }
        }
        for (let i = 0; i < this.images.length; i++) {
            if (this.images[i]['x'] === x && this.images[i]['y'] === y) {
                this.images[i] = this.images[(this.images.length) - 1];
                this.images.pop();
            }
        }
        for (let i = 0; i < this.shapes.length; i++) {
            if (this.shapes[i]['x'] === x && this.shapes[i]['y'] === y) {
                this.shapes[i] = this.shapes[(this.shapes.length) - 1];
                this.shapes.pop();
            }
        }

        for (let i = 0; i < this.letters.length; i++) {
            if (this.letters[i]['x'] === x && this.letters[i]['y'] === y) {
                this.letters[i] = this.letters[(this.shapes.length) - 1];
                this.shapes.pop();
            }
        }
    }

    setScale(scale) {
        this.scale = scale;
        this.canvas.width = this.columns * this.scale;
        this.canvas.height = this.rows * this.scale;
        this.text = (this.scale - 2) + "px monospace"
        show();
    }
    
    move(x,y, dx,dy) {
        for (let i = 0; i < this.spaces.length; i++) {
            if (this.spaces[i]['x'] === x && this.spaces[i]['y'] === y) {
                let color = this.spaces[i]['color']
                unpaint(x, y);
                paint(x + dx, y + dy, color);
            }
        }
    }

    moveAll(dx, dy) {
        this.clear();
        for (let i = 0; i < this.spaces.length; i++) {
            this.context.fillStyle = this.spaces[i]['color'];
            if (dx !== undefined) {this.spaces[i]['x'] += dx;}
            let x = this.spaces[i]['x'] * this.scale
            if (dy !== undefined) {this.spaces[i]['y'] += dy;}
            let y = this.spaces[i]['y'] * this.scale
            this.context.fillRect(x, y ,this.scale,this.scale);
        }
    }

        //records a grid-square to be painted later
    paint2(x, y, color = DEFAULT_COLOR) {
        let exists = false;
        let i = 0;
        while (i < this.spaces[length] && exists === false) {
            if (this.spaces[i]['x'] === x, this.spaces[i]['y'] === y, this.spaces[i]['color'] === color) {
                exists = true;
            }
            i += 1;
        }
        if(!exists) {this.spaces.push({'x': x, 'y': y, 'color': color});}
    }



    outline2(x, y, color = DEFAULT_COLOR) {
        let exists = false;
        let i = 0;
        while (i < this.outlines[length] && exists === false) {
            if (this.outlines[i]['x'] === x, this.outlines[i]['y'] === y, this.outlines[i]['color'] === color) {
                exists = true;
            }
            i += 1;
        }
        if(!exists) {this.outlines.push({'x': x, 'y': y, 'color': color});}
    }

    //removes a grid-square from the universal paint but does not instantly take off screen
    unpaint2(x,y) {
        for (let i = 0; i < this.spaces.length; i++) {
            if (this.spaces[i]['x'] === x && this.spaces[i]['y'] === y) {
                this.spaces[i] = this.spaces[(this.spaces.length) - 1];
                this.spaces.pop();
            }
        }
        for (let i = 0; i < this.outlines.length; i++) {
            if (this.outlines[i]['x'] === x && this.outlines[i]['y'] === y) {
                this.outlines[i] = this.outlines[(this.outlines.length) - 1];
                this.outlines.pop();
            }
        }
        for (let i = 0; i < this.images.length; i++) {
            if (this.images[i]['x'] === x && this.images[i]['y'] === y) {
                this.images[i] = this.images[(this.images.length) - 1];
                this.images.pop();
            }
        }

        for (let i = 0; i < this.letters.length; i++) {
            if (this.letters[i]['x'] === x && this.letters[i]['y'] === y) {
                this.letters[i] = this.letters[(this.shapes.length) - 1];
                this.shapes.pop();
            }
        }
    }

    // clears canvas
    clear() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
        this.spaces = [];
        this.images = [];
        this.outlines = [];
        this.shapes = [];
        this.letters = [];
    }

    // changes background color
    setBackgroundColor(color) {
        this.canvas.style.backgroundColor = color;
    }


    // parameters must be passed as an array if more than one
    animate(func, delay, parameters) {
        if (parameters === undefined) {
            func();
        } else{
            func(...parameters);
        }
        setTimeout(animate, delay, func, delay, parameters);
    }

    // runs a command in <delay> milliseconds
    setTimer(func, delay) {
        setTimeout(func, delay); 
    
    }

    setID(idName) {
        this.canvas.setAttribute('id',idName);
    }

    setClass(className) {
        this.canvas.setAttribute('class', className);
    }
}

class Div {
    constructor(contains, id) { // contains should be a class
        this.contains = document.querySelectorAll(contains);
        this.id = id;
    }
    createDiv() {
        this.div = document.createElement('div');
        document.body.append(this.div);
        for (let n = 0; n < this.contains.length; n++) {
            this.div.append(this.contains[n]);
        }
        if (this.id !== undefined) {
            this.div.setAttribute('id',this.id);
        }
    }
    setID(idName) {
        this.div.setAttribute('id',idName);
    }

    setClass(className) {
        this.div.setAttribute('class', className);
    }

}

export {Canvas, Div}