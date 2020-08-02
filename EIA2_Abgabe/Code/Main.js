var Zauberbild;
(function (Zauberbild) {
    /*
        window.addEventListener("dragstart", dragStart);
        window.addEventListener("dragover", dragOver);
        window.addEventListener("drop", drop);
    */
    window.addEventListener("load", init);
    let imgData;
    let fps;
    //Arrays
    Zauberbild.quads = [];
    Zauberbild.circles = [];
    Zauberbild.triangles = [];
    Zauberbild.movingObjects = [];
    Zauberbild.objects = [];
    Zauberbild.interfaceObjects = [];
    Zauberbild.quadButtonHover1 = false;
    let sliderXSpeed = document.getElementById("xSpeed");
    let sliderYSpeed = document.getElementById("ySpeed");
    let scale = document.getElementById("scale");
    let corlor = document.getElementById("color");
    let spin = document.getElementById("spin");
    // let interface: HTMLDivElement = <HTMLDivElement>document.getElementById("infertace");
    function init(_event) {
        /*
                fps = 25;
                quads = [];
                triangles = [];
                cirlces = [];
                movingObjects = [];
                objects = [];
        */
        let startPage = document.getElementById("startPage");
        startPage.style.display = "block";
        let gamePage = document.getElementById("gamePage");
        gamePage.style.display = "none";
        let finalPage = document.getElementById("finalPage");
        finalPage.style.display = "none";
        let startButton = document.getElementById("startButt");
        document.addEventListener("input", handleChange);
        function handleChange(_event) {
            // Variablen
            let target = _event.target;
            let slider = startPage.getElementsByTagName("input");
            let sliderWidth = slider[0];
            //  let sliderHeight: HTMLInputElement = slider[1];
            Zauberbild.canvasWidth = sliderWidth.value;
            Zauberbild.canvasHeight = 500; //parseInt(canvasWidth) * 0.7777;
            console.log("Breite: " + Zauberbild.canvasWidth);
            console.log("Höhe: " + Zauberbild.canvasHeight);
            startButton.addEventListener("click", startGame);
        }
    }
    // Seite 2
    function startGame() {
        let startPage = document.getElementById("startPage");
        startPage.style.display = "none";
        let gamePage = document.getElementById("gamePage");
        gamePage.style.display = "block";
        let finalPage = document.getElementById("finalPage");
        finalPage.style.display = "none";
        let finalButton = document.getElementById("finalButt");
        finalButton.addEventListener("click", endGame);
        // function create canvas
        //create canvas get CanvasRenderingContext2D 
        Zauberbild.canvas = document.createElement("canvas");
        Zauberbild.canvas.height = Zauberbild.canvasHeight;
        Zauberbild.canvas.width = parseInt(Zauberbild.canvasWidth);
        gamePage.insertBefore(Zauberbild.canvas, finalButton);
        console.log("create Canvas");
        Zauberbild.crc = Zauberbild.canvas.getContext("2d");
        Zauberbild.crc.fillStyle = "green";
        Zauberbild.crc.fillRect(0, 0, Zauberbild.canvas.width, Zauberbild.canvas.height);
        console.log(Zauberbild.crc);
        console.log("create Canvas");
        console.log(Zauberbild.canvas.height);
        console.log(Zauberbild.canvas.width);
        // Menüleiste
        Zauberbild.crc.fillStyle = "blue";
        Zauberbild.crc.fillRect(0, 400, Zauberbild.canvas.width, 100);
        //interfaceObjects
        // kreis
        let circle = new Zauberbild.Circle("quadTest", 200, 450, 1, "yellow");
        circle.draw();
        console.log("circlex " + circle.xPos + "circley " + circle.yPos + circle.color);
        // viereck
        let quad = new Zauberbild.Quad("quadTest", 50, 410, 1, "yellow", "none");
        quad.draw();
        console.log("Quadx " + quad.xPos + "Quady " + quad.size);
        // Dreieck
        let triangle = new Zauberbild.Triangle("TriangleTest", 300, 100, 1, "red", "none");
        triangle.draw();
        console.log("Trianglex " + triangle.xPos + "Triangley " + triangle.yPos);
        // img data speichern
        Zauberbild.interfaceObjects.push(circle, quad, triangle);
        console.log("Inteface object daten:  " + Zauberbild.interfaceObjects[1].size);
        console.log(quad.xPos + "  X  " + quad.yPos);
        imgData = Zauberbild.crc.getImageData(0, 0, Zauberbild.canvas.width, Zauberbild.canvas.height);
        console.log(imgData);
        update();
    }
    // Seite 3
    function endGame() {
        let startPage = document.getElementById("startPage");
        startPage.style.display = "none";
        let gamePage = document.getElementById("gamePage");
        gamePage.style.display = "none";
        let finalPage = document.getElementById("finalPage");
        finalPage.style.display = "block";
    }
    /*
        function createNewCanvas(): void {
            //to do
        }
    */
    console.log();
    function update() {
        console.log("Update start");
        //window.setTimeout(update, 1000 / fps);
        window.addEventListener("mousedown", objectSelect);
        window.addEventListener("onclick", objectSelect);
        Zauberbild.crc.clearRect(0, 0, Zauberbild.crc.canvas.width, Zauberbild.crc.canvas.height);
        Zauberbild.crc.putImageData(imgData, 0, 0);
        // x y Koordinaten von mous click
        function objectSelect(_event) {
            let xMouse = _event.clientX;
            let yMouse = _event.clientY;
            console.log("x: " + xMouse + " y: " + yMouse);
            console.log("eventphase: " + _event.eventPhase);
            if (xMouse > 50 && xMouse < 133 && yMouse > 530 && yMouse < 606) {
                console.log("HIT GEHT");
                sliderXSpeed.setAttribute("value", "1");
                console.log(sliderXSpeed.getAttribute("class") + " slider value");
                let newXSpeed = parseInt(sliderXSpeed.value);
                console.log("SLIDER X SPEED" + newXSpeed);
            }
        }
        for (let i = 0; i > Zauberbild.movingObjects.length; i++) {
            Zauberbild.movingObjects[i].draw();
            Zauberbild.movingObjects[i].move();
        }
    }
    // function drag and drop 
    // if element is selected {
    // { activated inputs
    // display array data in input elements 
    // }
    // eventlistemer change 
    // if change get array data 
    // {change array data 
    // push new arraydata 
    // }
    // delete eventlistener 
    // store img data
})(Zauberbild || (Zauberbild = {}));
//# sourceMappingURL=Main.js.map