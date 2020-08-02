var Zauberbild;
(function (Zauberbild) {
    class MovingObjects extends Zauberbild.Objects {
        constructor() {
            super();
        }
        update() {
            this.draw();
            this.move();
        }
        draw() {
            //epmty
        }
        move() {
            //empty
        }
    }
    Zauberbild.MovingObjects = MovingObjects;
})(Zauberbild || (Zauberbild = {}));
//# sourceMappingURL=movingObjects.js.map