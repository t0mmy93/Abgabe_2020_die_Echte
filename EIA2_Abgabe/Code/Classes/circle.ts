namespace Zauberbild {
    export class Circle extends MovingObjects {
        start: number = 0;
        stop: number = 2 * Math.PI;

        constructor(_type: string, _xPos: number, _yPos: number, _scale: number, _color: string) {
            super();
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

        update(): void {
            this.setColor();
            this.draw();
            this.move();
            this.pulse();
        }

        //setColor-methode
        setColor(): void {
            //hier soll color change initiiert werden
        }

        //draw-methode
        draw(): void {
            crc.beginPath();
            crc.arc(this.xPos, this.yPos, this.size, this.start, this.stop);
            crc.stroke();
            crc.fillStyle = this.color;
            crc.fill();
        }

        //move-methode
        move(): void {
            this.xPos -= this.xSpeed;
            if (this.xPos < 0) {
                this.xPos = canvas.width;
            }
            this.yPos -= this.ySpeed;
            if (this.yPos < 0) {
                this.yPos = canvas.height;
            }

            //hier kommt die move methode rein
            // hier benutzen
            // this.xPos
            // this.xSpeed
            // this.yPos
            // this.ySpeed



        }

        //pulse-methode
        pulse(): void {
            //hier kommt die pulse methode rein (die radius änderung mit hilfe von this.size)
            //this.size = this.size*this.scale
        }
    }
}