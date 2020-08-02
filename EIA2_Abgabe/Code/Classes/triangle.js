var Zauberbild;
(function (Zauberbild) {
    class Triangle extends Zauberbild.MovingObjects {
        constructor(_type, _xPos, _yPos, _scale, _color, _spinValue) {
            super();
            //seitenlängen des Triangles
            this.size = 50;
            //Achtung!
            //hier spielt die drag sache mit rein
            //auf vllt mit mausPosition arbeiten
            this.xPos = _xPos;
            //Achtung!
            //hier spielt die drag sache mit rein
            //auf vllt mit mausPosition arbeiten
            this.yPos = _yPos;
            // default muss noch festgesetzt werden
            this.xSpeed = 1;
            // default muss noch festgesetzt werden
            this.ySpeed = 1;
            this.type = _type;
            // parameter scale soll durch value von input element verändert werden können
            this.scale = _scale;
            // parameter color soll durch value von input element verändert werden können
            this.color = _color;
            // parameter spinValue soll durch value von input element verändert werden können
            this.spinValue = _spinValue;
        }
        update() {
            this.setColor();
            this.draw();
            this.move();
            this.pulse();
            this.spin();
        }
        //setColor-methode
        setColor() {
            //hier soll color change initiiert werden
            //evt kann das schon mit draw() abgedeckt werden
        }
        //draw-methode
        draw() {
            Zauberbild.crc.beginPath();
            Zauberbild.crc.moveTo(this.xPos, 470);
            Zauberbild.crc.lineTo(this.xPos + 50, 470);
            Zauberbild.crc.lineTo(this.xPos + 25, 430);
            Zauberbild.crc.closePath();
            Zauberbild.crc.fillStyle = this.color;
            Zauberbild.crc.rotate(50 * Math.PI / 180);
            Zauberbild.crc.fill();
            //hier kommt die draw methode rein
            //hier benutzen
            // this.xPos
            // this.yPos
            // this.color
            // this.size
        }
        move() {
            this.xPos += this.xSpeed;
            if (this.xPos < Zauberbild.canvas.width) {
                this.xPos = 0;
            }
            this.yPos -= this.ySpeed;
            if (this.yPos < 0) {
                this.yPos = Zauberbild.canvas.height;
            }
        }
        //pulse-methode
        pulse() {
            //hier kommt die pulse methode rein (die radius änderung mit hilfe von this.size)
            //this.size = this.size*this.scale
        }
        //spin-methoder
        spin() {
            //hier kommt die spin methode rein (also drehen zB. durch zugriff auf css "style.rotate")
            //if (this.spinValue == "left"){rotate left}
            //else if (this.spinValue == "right"){roate right}
            //else {stop rotation}
        }
    }
    Zauberbild.Triangle = Triangle;
})(Zauberbild || (Zauberbild = {}));
//# sourceMappingURL=triangle.js.map