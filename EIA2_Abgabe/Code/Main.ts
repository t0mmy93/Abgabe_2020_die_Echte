namespace Zauberbild {

    /*
        window.addEventListener("dragstart", dragStart);
        window.addEventListener("dragover", dragOver);
        window.addEventListener("drop", drop);
    */
    window.addEventListener("load", init);

    export let crc: CanvasRenderingContext2D;
    export let canvas: HTMLCanvasElement;
    let imgData: ImageData;
    let fps: number;

    export let interface: HTMLCanvasElement;
    export let canvasWidth: string;
    export let canvasHeight: number;
    //Arrays
    export let quads: Quad[] = [];
    export let circles: Circle[] = [];
    export let triangles: Triangle[] = [];
    export let movingObjects: MovingObjects[] = [];
    export let objects: Objects[] = [];
    export let interfaceObjects: Objects[] = [];

    export let quadButtonHover1: boolean = false;

    let sliderXSpeed: HTMLInputElement = <HTMLInputElement>document.getElementById("xSpeed");
    let sliderYSpeed: HTMLInputElement = <HTMLInputElement>document.getElementById("ySpeed");
    let scale: HTMLInputElement = <HTMLInputElement>document.getElementById("scale");
    let corlor: HTMLInputElement = <HTMLInputElement>document.getElementById("color");
    let spin: HTMLInputElement = <HTMLInputElement>document.getElementById("spin");


    // let interface: HTMLDivElement = <HTMLDivElement>document.getElementById("infertace");

    function init(_event: Event): void {
        /*
                fps = 25;
                quads = [];
                triangles = [];
                cirlces = [];
                movingObjects = [];
                objects = [];
        */
        let startPage: HTMLDivElement = <HTMLDivElement>document.getElementById("startPage");
        startPage.style.display = "block";

        let gamePage: HTMLDivElement = <HTMLDivElement>document.getElementById("gamePage");
        gamePage.style.display = "none";

        let finalPage: HTMLDivElement = <HTMLDivElement>document.getElementById("finalPage");
        finalPage.style.display = "none";

        let startButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("startButt");
        document.addEventListener("input", handleChange);



        function handleChange(_event: Event): void {
            // Variablen
            let target: HTMLInputElement = <HTMLInputElement>_event.target;
            let slider: HTMLCollectionOf<HTMLInputElement> = startPage.getElementsByTagName("input");
            let sliderWidth: HTMLInputElement = slider[0];
            //  let sliderHeight: HTMLInputElement = slider[1];
            canvasWidth = sliderWidth.value;
            canvasHeight = 500; //parseInt(canvasWidth) * 0.7777;

            console.log("Breite: " + canvasWidth);
            console.log("Höhe: " + canvasHeight);

            startButton.addEventListener("click", startGame);

        }

    }
    // Seite 2
    function startGame(): void {

        let startPage: HTMLDivElement = <HTMLDivElement>document.getElementById("startPage");
        startPage.style.display = "none";

        let gamePage: HTMLDivElement = <HTMLDivElement>document.getElementById("gamePage");
        gamePage.style.display = "block";

        let finalPage: HTMLDivElement = <HTMLDivElement>document.getElementById("finalPage");
        finalPage.style.display = "none";

        let finalButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("finalButt");
        finalButton.addEventListener("click", endGame);
        // function create canvas
        //create canvas get CanvasRenderingContext2D 
        canvas = document.createElement("canvas");
        canvas.height = canvasHeight;
        canvas.width = parseInt(canvasWidth);
        gamePage.insertBefore(canvas, finalButton);
        console.log("create Canvas");
        crc = <CanvasRenderingContext2D>canvas.getContext("2d");
        crc.fillStyle = "green";
        crc.fillRect(0, 0, canvas.width, canvas.height);
        console.log(crc);
        console.log("create Canvas");
        console.log(canvas.height);
        console.log(canvas.width);
        // Menüleiste
        crc.fillStyle = "blue";
        crc.fillRect(0, 400, canvas.width, 100);




        //interfaceObjects
        // kreis
        let circle: Circle = new Circle("quadTest", 200, 450, 1, "yellow");
        circle.draw();
        console.log("circlex " + circle.xPos + "circley " + circle.yPos + circle.color);
        // viereck
        let quad: Quad = new Quad("quadTest", 50, 410, 1, "yellow", "none");
        quad.draw();
        console.log("Quadx " + quad.xPos + "Quady " + quad.size);
        // Dreieck
        let triangle: Triangle = new Triangle("TriangleTest", 300, 100, 1, "red", "none");
        triangle.draw();
        console.log("Trianglex " + triangle.xPos + "Triangley " + triangle.yPos);
        // img data speichern
        interfaceObjects.push(circle, quad, triangle);
        console.log("Inteface object daten:  " + interfaceObjects[1].size);


        console.log(quad.xPos + "  X  " + quad.yPos);





        imgData = crc.getImageData(0, 0, canvas.width, canvas.height);
        console.log(imgData);





        update();

    }
    // Seite 3
    function endGame(): void {

        let startPage: HTMLDivElement = <HTMLDivElement>document.getElementById("startPage");
        startPage.style.display = "none";

        let gamePage: HTMLDivElement = <HTMLDivElement>document.getElementById("gamePage");
        gamePage.style.display = "none";

        let finalPage: HTMLDivElement = <HTMLDivElement>document.getElementById("finalPage");
        finalPage.style.display = "block";
    }

    /*
        function createNewCanvas(): void {
            //to do
        }
    */
    console.log();

    function update(): void {
        console.log("Update start");
        //window.setTimeout(update, 1000 / fps);
        window.addEventListener("mousedown", objectSelect);
        window.addEventListener("onclick", objectSelect);
        crc.clearRect(0, 0, crc.canvas.width, crc.canvas.height);
        crc.putImageData(imgData, 0, 0);


        // x y Koordinaten von mous click
        function objectSelect(_event: MouseEvent): void {


            let xMouse: number = _event.clientX;
            let yMouse: number = _event.clientY;
            console.log("x: " + xMouse + " y: " + yMouse);
            console.log("eventphase: " + _event.eventPhase);


            if (xMouse > 50 && xMouse < 133 && yMouse > 530 && yMouse < 606) {
                console.log("HIT GEHT");
                sliderXSpeed.setAttribute("value", "1");
                console.log(sliderXSpeed.getAttribute("class") + " slider value");

                let newXSpeed: number = parseInt(sliderXSpeed.value);
                console.log("SLIDER X SPEED" + newXSpeed);
            }

        }




        for (let i: number = 0; i > movingObjects.length; i++) {
            movingObjects[i].draw();
            movingObjects[i].move();

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

}