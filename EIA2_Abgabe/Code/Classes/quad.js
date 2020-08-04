var Zauberbild;
(function (Zauberbild) {
    class Quad extends Zauberbild.MovingObjects {
        constructor(_type, _xPos, _yPos, _scale, _color, _size) {
            super();
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
            this.size = _size;
        }
        update() {
            /*   this.setColor();
               this.draw();
               this.move();
               this.pulse();
               //  this.spin();  */
        }
        //setColor-methode
        setColor() {
            //hier soll color change initiiert werden
            //evt kann das schon mit draw() abgedeckt werden
        }
        //draw-methode
        draw() {
            Zauberbild.crc.fillStyle = this.color;
            Zauberbild.crc.fillRect(this.xPos, this.yPos, this.size, this.size);
            //  crc.translate(this.xPos, this.yPos);
        }
        //move-methode
        move() {
            this.xPos += this.xSpeed / 2;
            if (this.xPos > Zauberbild.canvas.width) {
                this.xPos = 0;
            }
            this.yPos += this.ySpeed / 2;
            if (this.yPos > 410) {
                this.yPos = 0;
            }
        }
        //pulse-methode
        pulse() {
            //hier kommt die pulse methode rein (die radius änderung mit hilfe von this.size)
            //this.size = this.size*this.scale
        }
        //spin-methoder
        spin(_selected) {
            //selected = HTMLCanvasElement
            //hier kommt die spin methode rein (also drehen zB. durch zugriff auf css "style.rotate")
            //if (this.spinValue == "left"){rotate left}
            //else if (this.spinValue == "right"){roate right}
            //else {stop rotation}
        }
    }
    Zauberbild.Quad = Quad;
})(Zauberbild || (Zauberbild = {}));
//# sourceMappingURL=quad.js.map