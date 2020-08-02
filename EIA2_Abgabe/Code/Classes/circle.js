var Zauberbild;
(function (Zauberbild) {
    class Circle extends Zauberbild.MovingObjects {
        constructor(_type, _xPos, _yPos, _scale, _color) {
            super();
            this.start = 0;
            this.stop = 2 * Math.PI;
            //Achtung!
            //hier spielt die drag sache mit rein
            //auf vllt mit mausPosition arbeiten
            this.xPos = _xPos;
            //Achtung!
            //hier spielt die drag sache mit rein
            //auf vllt mit mausPosition arbeiten
            this.yPos = _yPos;
            //muss noch festgesetzt werden
            this.xSpeed = 1;
            //muss noch festgesetzt werden
            this.ySpeed = 1;
            // hier ist die default size = der radius des kreises
            this.size = 40;
            this.type = _type;
            // parameter scale soll durch value von input element verändert werden können
            this.scale = _scale;
            // parameter color soll durch value von input element verändert werden können
            this.color = _color;
        }
        update() {
            this.setColor();
            this.draw();
            this.move();
            this.pulse();
        }
        //setColor-methode
        setColor() {
            //hier soll color change initiiert werden
        }
        //draw-methode
        draw() {
            Zauberbild.crc.beginPath();
            Zauberbild.crc.arc(this.xPos, this.yPos, this.size, this.start, this.stop);
            Zauberbild.crc.stroke();
            Zauberbild.crc.fillStyle = this.color;
            Zauberbild.crc.fill();
        }
        //move-methode
        move() {
            this.xPos -= this.xSpeed;
            if (this.xPos < 0) {
                this.xPos = Zauberbild.canvas.width;
            }
            this.yPos -= this.ySpeed;
            if (this.yPos < 0) {
                this.yPos = Zauberbild.canvas.height;
            }
            //hier kommt die move methode rein
            // hier benutzen
            // this.xPos
            // this.xSpeed
            // this.yPos
            // this.ySpeed
        }
        //pulse-methode
        pulse() {
            //hier kommt die pulse methode rein (die radius änderung mit hilfe von this.size)
            //this.size = this.size*this.scale
        }
    }
    Zauberbild.Circle = Circle;
})(Zauberbild || (Zauberbild = {}));
//# sourceMappingURL=circle.js.map