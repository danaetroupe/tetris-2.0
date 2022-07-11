class Tetrimino {
    constructor(x, y, piece) {
        this.x = x;
        this.y = y;
        this.shape = piece.shape;
        this.color = piece.color;
    }
    
    rotateLeft() {
        let a = [];
        if (this.color !== 'cyan' && this.color !== 'yellow') {
            a[0] = this.shape[6]
            a[1] = this.shape[3]
            a[2] = this.shape[0]
            a[3] = this.shape[7]
            a[4] = this.shape[4]
            a[5] = this.shape[1]
            a[6] = this.shape[8]
            a[7] = this.shape[5]
            a[8] = this.shape[2]
        } else if (this.color === 'cyan') {
            a[0] = this.shape[12]
            a[1] = this.shape[8]
            a[2] = this.shape[4]
            a[3] = this.shape[0]
            a[4] = this.shape[13]
            a[5] = this.shape[9]
            a[6] = this.shape[5]
            a[7] = this.shape[1]
            a[8] = this.shape[14]
            a[9] = this.shape[10]
            a[10] = this.shape[6]
            a[11] = this.shape[2]
            a[12] = this.shape[15]
            a[13] = this.shape[11]
            a[14] = this.shape[7]
            a[15] = this.shape[3]
        } else {a = this.shape;}

        this.shape = a;
    }

    rotateRight() {
        let a = [];

        a[0] = this.shape[3]
        a[1] = this.shape[0]
        a[2] = this.shape[1]
        a[3] = this.shape[6]
        a[4] = this.shape[4]
        a[5] = this.shape[2]
        a[6] = this.shape[7]
        a[7] = this.shape[8]
        a[8] = this.shape[5]

        this.shape = a;
    }

    moveLeft() {
        this.x -= 1;
    }

    moveRight() {
        this.x += 1;
    }

    moveDown() {
        this.y += 1;
    }
}



