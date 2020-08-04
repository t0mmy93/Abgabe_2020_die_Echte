namespace Zauberbild {

    /*
        window.addEventListener("dragstart", dragStart);
        window.addEventListener("dragover", dragOver);
        window.addEventListener("drop", drop);
    */
    window.addEventListener("load", init);


    export let crc: CanvasRenderingContext2D;
    export let canvas: HTMLCanvasElement;
    // canvas.addEventListener("mousemove", draggedGeometryNew);
    let imgData: ImageData;
    let fps: number;

    let mouseClick: boolean = false;

    export let interface: HTMLCanvasElement;
    export let canvasWidth: string;
    export let canvasHeight: number;
    //Arrays
    export let quads: Quad[] = [];
    export let circles: Circle[] = [];
    export let triangles: Triangle[] = [];
    export let movingObjects: MovingObjects[] = [];
    export let objects: Objects[] = [];
    export let interfaceObjects: MovingObjects[] = [];

    export let quadButtonHover1: boolean = false;

    let startPage: HTMLDivElement;
    let gamePage: HTMLDivElement;
    let finalPage: HTMLDivElement;
    let startButton: HTMLButtonElement;
    let canvasContainer: HTMLDivElement;
    let finalButton: HTMLButtonElement;


    let sliderXSpeed: HTMLInputElement;
    let sliderYSpeed: HTMLInputElement;
    let scale: HTMLInputElement;
    let color: HTMLInputElement;
    let spin: HTMLInputElement;


    let index: number;





    function init(_event: Event): void {

        sliderXSpeed = <HTMLInputElement>document.getElementById("xSpeed");
        sliderYSpeed = <HTMLInputElement>document.getElementById("ySpeed");
        scale = <HTMLInputElement>document.getElementById("scale");
        color = <HTMLInputElement>document.getElementById("color");
        spin = <HTMLInputElement>document.getElementById("spin");


        startPage = <HTMLDivElement>document.getElementById("startPage");
        startPage.style.display = "block";

        gamePage = <HTMLDivElement>document.getElementById("gamePage");
        gamePage.style.display = "none";

        finalPage = <HTMLDivElement>document.getElementById("finalPage");
        finalPage.style.display = "none";

        startButton = <HTMLButtonElement>document.getElementById("startButt");
        document.addEventListener("input", handleChange);



        function handleChange(_event: Event): void {
            // Variablen
            let target: HTMLInputElement = <HTMLInputElement>_event.target;
            let slider: HTMLCollectionOf<HTMLInputElement> = startPage.getElementsByTagName("input");
            let sliderWidth: HTMLInputElement = slider[0];

            canvasWidth = sliderWidth.value;
            canvasHeight = 500;

            console.log("Breite: " + canvasWidth);
            console.log("Höhe: " + canvasHeight);

            startButton.addEventListener("click", startGame);

        }

    }



    //___________________FUNKTION CHECK IF CLICK ON INTERFACE AND ON GEOMETRY_____________
    // checkt ob Mausklick über dem objekt Quad im interface statt gefunden hat 
    function mouseDownCheck(_event: MouseEvent): void {
        //  for (let i: number = 0; i < interfaceObjects.length; i++) {
        if (_event.offsetX > 50 && _event.offsetX < 133 && _event.offsetY > 420 && _event.offsetY < 495) {
            console.log("QHADHIT");
            canvas.addEventListener("mousemove", quadHit);
            console.log("X: " + _event.offsetX + "Y: " + _event.offsetY);
        }
        if (_event.offsetX > 160 && _event.offsetX < 243 && _event.offsetY > 420 && _event.offsetY < 495) {
            console.log("CIRCLEHIT");
        }
        if (_event.offsetX > 270 && _event.offsetX < 353 && _event.offsetY > 420 && _event.offsetY < 495) {
            console.log("TRIANGLEHIT");
        }
    }

    function quadHit(_event: MouseEvent): void {
        console.log("QUADHIT FUCNKTION CHECK ");
        canvas.addEventListener("mouseup", quadDrop);
    }
    // quad plazieren
    function quadDrop(_event: MouseEvent): void {
        canvas.removeEventListener("mousemove", quadHit);

        let newQuad: Quad = new Quad("quad", _event.clientX, _event.clientY, 1, "yellow", 75, false);
        movingObjects.push(newQuad);
        console.log(" MOVINOBJ LÄNGE: " + movingObjects.length);

        canvas.removeEventListener("mouseup", quadDrop);
        for (let i: number = 0; i < movingObjects.length; i++) {
            movingObjects[i].type = "quad" + movingObjects.length;

            movingObjects[i].xSpeed = 0;
            movingObjects[i].ySpeed = 0;
        }
        console.log(" ARAAY LÄNGE: " + movingObjects.length);
        console.log("TYPE HOCH ZÄHLEN: " + movingObjects[0].type);
    }


    // sobald die Maus über dem Target liegt kann man auf objekte klicken
    function selectArea(_event: MouseEvent): void {
        let xCursor: number = _event.clientX;
        let yCursor: number = _event.clientY;
        if (yCursor < 410 && xCursor >= parseInt(canvasWidth)) {
            console.log("HOVER GEHT");
            canvas.addEventListener("mousedown", selectObject);
        }
    }

    // Obejct auswählen
    function selectObject(_event: MouseEvent): void {
        for (let i: number = 0; i < movingObjects.length; i++) {
            if (_event.offsetX > movingObjects[i].xPos && _event.offsetX < movingObjects[i].xPos + movingObjects[i].size && _event.offsetY > movingObjects[i].yPos && _event.offsetY < movingObjects[i].yPos + movingObjects[i].size) {
                index = i;
                console.log("OBEJKT JAAAA ES GEHT: " + movingObjects[i].type);
                sliderXSpeed.addEventListener("change", handleXSpeed);
                sliderYSpeed.addEventListener("change", handleYSpeed);
                scale.addEventListener("change", handleSize);
                color.addEventListener("input", handleColor);
                canvas.addEventListener("mouseup", function (): void {
                    movingObjects[i].glow = true;
                    console.log("EVENTLISTENER GLOW");
                });
                console.log("INDEX:" + index);
            }
        }
    }

    //___TEST INPUT auslesen und anpassen

    // auf x Geschwindigkeit reagieren
    function handleXSpeed(): void {

        // console.log("HANDLE XSPEED");
        // console.log("HANDLE XSPEED" + index);
        let xSpeedOld: number = movingObjects[index].xSpeed;
        console.log("xPSEEROLD:  " + xSpeedOld);
        let xSpeedNew: string = sliderXSpeed.value;
        let xSpeedNewInt: number = parseInt(xSpeedNew);
        // console.log("XSPEEDNEWINT NEW: " + xSpeedNewInt);
        movingObjects[index].xSpeed = xSpeedNewInt;
        console.log("FINALE XSPEED: " + movingObjects[index].xSpeed);
        movingObjects[index].draw();

    }
    // auf y Geschindigkeit reagieren
    function handleYSpeed(): void {

        //console.log("HANDLE YSPEED" + index);
        let ySpeedOld: number = movingObjects[index].ySpeed;
        console.log("yPSEEROLD:  " + ySpeedOld);
        let ySpeedNew: string = sliderYSpeed.value;
        let ySpeedNewInt: number = parseInt(ySpeedNew);
        //  console.log("YSPEEDNEWINT NEW: " + ySpeedNewInt);
        movingObjects[index].ySpeed = ySpeedNewInt;
        console.log("FINALE YSPEED: " + movingObjects[index].ySpeed);

    }
    // auf größen Änderung reagieren
    function handleSize(): void {

        //   console.log("HANDLE SCALE" + index);
        let sizeOld: number = movingObjects[index].size;
        console.log("SCALEOLD:  " + sizeOld);
        let sizeNew: string = scale.value;
        let sizeNewInt: number = parseInt(sizeNew);
        console.log("SCALENEW: " + sizeNewInt);
        movingObjects[index].size = sizeNewInt;
        console.log("FINALE SCALE: " + movingObjects[index].size);
    }
    // Auf Farbänderung reagieren
    function handleColor(): void {

        //console.log("HANDLE COLOR" + index);
        let colorOld: string = movingObjects[index].color;
        console.log("COLOROLD:  " + colorOld);
        let colorNew: string = color.value;
        //  console.log("COLOR NEW: " + colorNew);
        movingObjects[index].color = colorNew;
        console.log("FINALE COLOR: " + movingObjects[index].color);
        movingObjects[index].draw();
    }



    //_____TEST ENDE





    function drawInterface(): void {
        //interfaceObjects
        // kreis
        let i: number = interfaceObjects.length;
        let circle: Circle = new Circle("circle" + i, 200, 450, 1, "yellow");
        circle.draw();
        console.log("circlex " + circle.xPos + "circley " + circle.yPos + circle.color);
        // viereck
        let quad: Quad = new Quad("quad" + i, 50, 410, 1, "yellow", 75, false);
        quad.draw();
        console.log("Quadx " + quad.xPos + "Quady " + quad.size);
        // Dreieck
        let triangle: Triangle = new Triangle("triangle" + i, 300, 100, 1, "red", "none");
        triangle.draw();
        console.log("Trianglex " + triangle.xPos + "Triangley " + triangle.yPos);

        interfaceObjects.push(circle, quad, triangle);
        console.log("Inteface object daten:  " + interfaceObjects[1].size);
        console.log("QUAD TYPE: " + quad.type);
    }

    function startGame(): void {

        startPage.style.display = "none";
        gamePage.style.display = "block";
        finalPage.style.display = "none";

        finalButton = <HTMLButtonElement>document.getElementById("finalButt");
        finalButton.addEventListener("click", endGame);
        // function create canvas
        //create canvas get CanvasRenderingContext2D 
        canvasContainer = <HTMLDivElement>document.getElementById("canvasContainer");
        canvas = document.createElement("canvas");
        canvas.height = canvasHeight;
        canvas.width = parseInt(canvasWidth);
        canvasContainer.appendChild(canvas);
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

        document.getElementById("quad");
        drawInterface();

        // eventlistener 
        canvas.addEventListener("mousedown", mouseDownCheck);
        canvas.addEventListener("mouseover", selectArea);

        // aktuelles Canvas speichern
        imgData = crc.getImageData(0, 0, canvas.width, canvas.height);
        console.log(imgData);
        setInterval(update, 20);


    }
    // Seite 3
    function endGame(): void {

        startPage.style.display = "none";
        gamePage.style.display = "none";
        finalPage.style.display = "block";
    }



    function update(): void {

        crc.clearRect(0, 0, parseInt(canvasWidth), canvasHeight);
        crc.putImageData(imgData, 0, 0);

        for (let i: number = 0; i < movingObjects.length; i++) {
            movingObjects[i].draw();
            movingObjects[i].move();
        }
    }
}
