namespace Zauberbild {
    export class Triangle extends MovingObjects {
        //seitenlängen des Triangles
        size: number = 50;
        spinValue: string;

        constructor(_type: string, _xPos: number, _yPos: number, _scale: number, _color: string, _spinValue: string) {
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
            this.spinValue = _spinValue;

        }

        update(): void {
            this.setColor();
            this.draw();
            this.move();
            this.pulse();
            this.spin();
        }

        //setColor-methode
        setColor(): void {
            //hier soll color change initiiert werden
            //evt kann das schon mit draw() abgedeckt werden
        }

        //draw-methode
        draw(): void {
            crc.beginPath();
            crc.moveTo(this.xPos, 470);
            crc.lineTo(this.xPos + 50, 470);
            crc.lineTo(this.xPos + 25, 430);
            crc.closePath();
            crc.fillStyle = this.color;
            crc.rotate(50 * Math.PI / 180);
            crc.fill();
            //hier kommt die draw methode rein
            //hier benutzen
            // this.xPos
            // this.yPos
            // this.color
            // this.size

        }

        move(): void {
            this.xPos += this.xSpeed;
            if (this.xPos < canvas.width) {
                this.xPos = 0;
            }
            this.yPos -= this.ySpeed;
            if (this.yPos < 0) {
                this.yPos = canvas.height;
            }
        }

        //pulse-methode
        pulse(): void {
            //hier kommt die pulse methode rein (die radius änderung mit hilfe von this.size)
            //this.size = this.size*this.scale
        }

        //spin-methoder
        spin(): void {
            //hier kommt die spin methode rein (also drehen zB. durch zugriff auf css "style.rotate")
            //if (this.spinValue == "left"){rotate left}
            //else if (this.spinValue == "right"){roate right}
            //else {stop rotation}
        }
    }
}