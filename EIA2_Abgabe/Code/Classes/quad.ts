namespace Zauberbild {
    export class Quad extends MovingObjects {
        //variable für seitenlängen des quad
        // size: number = 75;
        spinValue: string;


        constructor(_type: string, _xPos: number, _yPos: number, _scale: number, _color: string, _size: number, _glow: boolean) {
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
            // parameter glow
            this.glow = _glow;

        }

        update(): void {
            /*   this.setColor();
               this.draw();
               this.move();
               this.pulse();
               //  this.spin();  */
        }

        //setColor-methode
        setColor(): void {
            //hier soll color change initiiert werden
            //evt kann das schon mit draw() abgedeckt werden
        }

        //draw-methode
        draw(): void {

            if (this.glow == true) {

                crc.shadowBlur = 10;
                crc.shadowColor = "white";
            }

            crc.fillStyle = this.color;
            crc.fillRect(this.xPos, this.yPos, this.size, this.size);
            //  crc.translate(this.xPos, this.yPos);

        }

        //move-methode
        move(): void {
            this.xPos += this.xSpeed / 2;
            if (this.xPos > canvas.width) {
                this.xPos = 0;
            }
            this.yPos += this.ySpeed / 2;
            if (this.yPos > 410) {
                this.yPos = 0;
            }

        }



        //pulse-methode
        pulse(): void {
            //hier kommt die pulse methode rein (die radius änderung mit hilfe von this.size)
            //this.size = this.size*this.scale
        }

        //spin-methoder
        spin(_selected: MovingObjects): void {
            //selected = HTMLCanvasElement
            //hier kommt die spin methode rein (also drehen zB. durch zugriff auf css "style.rotate")
            //if (this.spinValue == "left"){rotate left}
            //else if (this.spinValue == "right"){roate right}
            //else {stop rotation}
        }


    }
}