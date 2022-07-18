/* 
================================
JAVASCRIPT OUTPUT MODULE
================================
    
version 0.2 (2022-7-07)
    what's new:
        - module now utilizes classes to keep track of which box is which
*/

const DEFAULT_HEIGHT = "350px";
const DEFAULT_WIDTH = "250px";
const DEFAULT_INPUT_HEIGHT = "20px";

const DEFAULT_BACKGROUND_COLOR = "white";
const DEFAULT_BORDER = "black"
const DEFAULT_BORDER_SIZE = "2px";
const DEFAULT_PADDING = "15px";

const DEFAULT_TEXT_COLOR = "black"
const DEFAULT_TEXT_SIZE = "15px";
const DEFAULT_FONT = "Helvetica"

const DEFAULT_BUTTON_COLOR = "light gray";

const SAMPLE_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."


class OutputBox {
    constructor(height=DEFAULT_HEIGHT, 
                width=DEFAULT_WIDTH, 
                displayText=SAMPLE_TEXT,
                backgroundColor = DEFAULT_BACKGROUND_COLOR,
                borderColor = DEFAULT_BORDER,
                borderSize = DEFAULT_BORDER_SIZE,
                padding = DEFAULT_PADDING,
                
                textColor = DEFAULT_TEXT_COLOR,
                textSize = DEFAULT_TEXT_SIZE,
                textFont = DEFAULT_FONT) {

        this.height = height;
        this.width = width;
        this.displayText = displayText;
        this.backgroundColor=backgroundColor;
        this.border = borderSize + " solid " + borderColor
        this.padding = padding;
        this.textColor = textColor
        this.textSize = textSize
        this.textFont=textFont;
    }

    createOutput () {
        this.outputDisplay = document.createElement('p');
        document.body.appendChild(this.outputDisplay);
    
        this.outputDisplay.innerHTML = this.displayText;
        this.outputDisplay.style.width = this.width;
        this.outputDisplay.style.height = this.height;
        this.outputDisplay.style.backgroundColor = this.backgroundColor;
        this.outputDisplay.style.padding = this.padding;
        this.outputDisplay.style.fontFamily = this.textFont;
        this.outputDisplay.style.fontSize = this.textSize;
        this.outputDisplay.style.color = this.textColor;
        this.outputDisplay.style.border = this.border;
    }

    setText (toWhat) {
        this.displayText = toWhat;
        this.update();
    }

    update() {
        this.outputDisplay.innerHTML = this.displayText;
        this.outputDisplay.style.width = this.width;
        this.outputDisplay.style.height = this.height;
        this.outputDisplay.style.backgroundColor = this.backgroundColor;
        this.outputDisplay.style.padding = this.padding;
        this.outputDisplay.style.fontFamily = this.textFont;
        this.outputDisplay.style.fontSize = this.textSize;
        this.outputDisplay.style.color = this.textColor;
        this.outputDisplay.style.border = this.border;
    }

    setClass(className) {
        this.outputDisplay.setAttribute('class', className);
    }
    
}    

class InputBox {
    constructor(height = DEFAULT_INPUT_HEIGHT, 
                width = DEFAULT_WIDTH,
                backgroundColor = DEFAULT_BACKGROUND_COLOR,
                borderColor = DEFAULT_BORDER,
                borderSize = DEFAULT_BORDER_SIZE,
                padding = DEFAULT_PADDING,
                
                textColor = DEFAULT_TEXT_COLOR,
                textSize = DEFAULT_TEXT_SIZE,
                textFont = DEFAULT_FONT,
                
                buttonColor = DEFAULT_BUTTON_COLOR) {
        
        this.height = height;
        this.width = width;
        this.backgroundColor=backgroundColor;
        this.border = borderSize + " solid " + borderColor
        this.padding = padding;
        this.textColor = textColor;
        this.textSize = textSize
        this.textFont=textFont;
        this.buttonColor = buttonColor;
    }

    createInput() {
        this.div = document.createElement('div');
        document.body.appendChild(this.div)
    
        this.div.style.width = this.width;
        this.div.style.height = this.height;
        this.div.style.backgroundColor = this.backgroundColor;
        this.div.style.padding = this.padding;
        this.div.style.border = this.border;
        this.div.style.fontFamily = this.textFont;
        this.div.style.fontSize = this.textSize;
        this.div.style.color = this.textColor;
    
        this.textInput = document.createElement('input');
        this.textInput.type = "text";
        this.textInput.value = "type text here"
        this.submit = document.createElement('input');
        this.submit.type = "button"
        this.submit.value = "submit"
        this.submit.onclick = null;
    
        this.div.appendChild(this.textInput)
        this.div.appendChild(this.submit)
    }

    whenSubmit (func) {
        this.submit.onclick = func;
    }

    readText(){
        return this.textInput.value;
    }

    clearInput() {
        this.textInput.value = "";
    }
    
    changeInput(text) {
        this.textInput.value = text;
    }
    
    changeButtonText(text) {
        this.submit.value = "button"
    }

    update() {
        this.div.style.width = this.width;
        this.div.style.height = this.height;
        this.div.style.backgroundColor = this.backgroundColor;
        this.div.style.padding = this.padding;
        this.div.style.border = this.border;
        this.div.style.fontFamily = this.textFont;
        this.div.style.fontSize = this.textSize;
        this.div.style.color = this.textColor;
    
        this.textInput.type = "text";
        this.textInput.value = "type text here"
        this.submit = document.createElement('input');
        this.submit.type = "button"
        this.submit.value = "submit"
        this.submit.onclick = null;
    }

    disable () {
        this.submit.disabled = true;
        this.textInput.disabled = true;
    }

    enable () {
        this.submit.disabled = false;
        this.textInput.disabled = false;
    }

    setClass(className) {
        this.div.setAttribute('class', className);
    }
}

export {InputBox, OutputBox}