namespace Zauberbild {
    export class MovingObjects extends Objects {
        // speed auf xAchse
        xSpeed: number;
        // speed auf yAchse 
        ySpeed: number;
        glow: boolean = false;


        constructor() {
            super();
        }

        update(): void {
            this.draw();
            this.move();
        }

        draw(): void {
            //epmty
        }

        move(): void {
            //empty
        }


    }
}