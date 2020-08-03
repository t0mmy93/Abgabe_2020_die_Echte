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

    let inputElementId: string = "";

    let sliderXSpeed: HTMLInputElement;
    let sliderYSpeed: HTMLInputElement;
    let scale: HTMLInputElement;
    let color: HTMLInputElement;
    let spin: HTMLInputElement;


    let globalReturnVar: string;
    let move: boolean = false;

    // let interface: HTMLDivElement = <HTMLDivElement>document.getElementById("infertace");

    function init(_event: Event): void {

        sliderXSpeed = <HTMLInputElement>document.getElementById("xSpeed");
        sliderYSpeed = <HTMLInputElement>document.getElementById("ySpeed");
        scale = <HTMLInputElement>document.getElementById("scale");
        color = <HTMLInputElement>document.getElementById("color");
        spin = <HTMLInputElement>document.getElementById("spin");


        /*
                fps = 25;
                quads = [];
                triangles = [];
                cirlces = [];
                movingObjects = [];
                objects = [];
        */
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
            //  let sliderHeight: HTMLInputElement = slider[1];
            canvasWidth = sliderWidth.value;
            canvasHeight = 500; //parseInt(canvasWidth) * 0.7777;

            console.log("Breite: " + canvasWidth);
            console.log("Höhe: " + canvasHeight);

            startButton.addEventListener("click", startGame);

        }

    }
    // Seite 2
    // erstellte objekte Interface
    let quad: Quad;
    let circle: Circle;
    let triangle: Triangle;
    let type: string;


    /* function placeGeaometry(): void {
 
         if (type == "quad") {
             quad = new Quad("quad", 50, 410, 1, "yellow", "none");
         }
 
     }*/

    function drawInterface(): void {

        //interfaceObjects
        // kreis
        let i: number = interfaceObjects.length;
        let circle: Circle = new Circle("circle" + i, 200, 450, 1, "yellow");
        circle.draw();
        console.log("circlex " + circle.xPos + "circley " + circle.yPos + circle.color);
        // viereck
        let quad: Quad = new Quad("quad" + i, 50, 410, 1, "yellow", "none");
        quad.draw();
        console.log("Quadx " + quad.xPos + "Quady " + quad.size);
        // Dreieck
        let triangle: Triangle = new Triangle("triangle" + i, 300, 100, 1, "red", "none");
        triangle.draw();
        console.log("Trianglex " + triangle.xPos + "Triangley " + triangle.yPos);
        // img data speichern
        interfaceObjects.push(circle, quad, triangle);
        console.log("Inteface object daten:  " + interfaceObjects[1].size);
        console.log("QUAD TYPE: " + quad.type);

        //  console.log("TEST QUAD:   " + quad);

    }

    function deleteEventListener(_event: MouseEvent): void {

        canvas.removeEventListener("mousemove", rePosition);
        console.log("eventlistener removed");
        movingObjects[0].xPos = _event.offsetX;
        movingObjects[0].yPos = _event.offsetY;
      //  console.log("X MO: " + movingObjects[0].xPos + " Y MO: " + movingObjects[0].yPos + "  NEW X" + _event.offsetX + " NEW Y: " + _event.offsetY);

        movingObjects[0].draw();
    }

    function rePosition(_event: MouseEvent): void {
        
        // crc.translate(movingObjects[0].xPos, movingObjects[0].yPos);
        //console.log("ÄÄÄÄÄÄÄÄÄÄ X: " + movingObjects[0].xPos + " Y POS: " + movingObjects[0].yPos);
       // movingObjects[0].draw();
        canvas.addEventListener("mouseup", deleteEventListener);


    }

    function selectedObject(_event: MouseEvent): void {

        // let returnString: string = "";
        let xMouse: number = _event.clientX;
        let yMouse: number = _event.clientY;
        //console.log("MOUSE EVENT GEHT");
        if (xMouse > 50 && xMouse < 133 && yMouse > 420 && yMouse < 495) {
            globalReturnVar = "quad0";

            console.log("HIT QUAD");
            movingObjects.push(interfaceObjects[1]);
            canvas.addEventListener("mousemove", rePosition);

            console.log("MOVING OBJECTS" + movingObjects[0].type);
            console.log("MOVING OBJECTS LÄNGE" + movingObjects.length);
            //let globalReturnVar: string;

        }
        else {
            globalReturnVar = "";
            console.log("NO HIT");
        }




    }

    function draggedGeometryNew(): void {

        let type: string = globalReturnVar;



        for (let i: number = 0; i < movingObjects.length; i++) {

            if (globalReturnVar == "quad0" || globalReturnVar == "triangle0" || globalReturnVar == "circle0") {



                //hi
            }

        }

        // return value lat von oben = returnType();

        // außerhalb eine fuction erstellen namens returnType(): string 

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

        canvas.addEventListener("mouseup", function (): void {
            move = false;
            console.log("TEST FASLE");
        });





        document.getElementById("quad");
        drawInterface();

        canvas.addEventListener("mousedown", selectedObject);




        imgData = crc.getImageData(0, 0, canvas.width, canvas.height);
        console.log(imgData);
        window.requestAnimationFrame(update);
        //  update();

    }
    // Seite 3
    function endGame(): void {

        startPage.style.display = "none";
        gamePage.style.display = "none";
        finalPage.style.display = "block";
    }

    /*
        function createNewCanvas(): void {
            //to do
        }
    */





    function update(): void {
        crc.clearRect(0, 0, parseInt(canvasWidth), canvasHeight);
        crc.putImageData(imgData, 0, 0);
        //clear rect
        //get img data
        //  console.log("Update start");

        //for (let i:number =0;i<movingObjects.length;i++){
        // movingObjcts[i].update()
        // }
        for (let i: number = 0; i < movingObjects.length; i++) {
            movingObjects[i].draw();
            movingObjects[i].move();

        }

        /*   if (globalReturnVar == "quad0" && ) {
   
   
           }*/

        //if(golbalVar == ""){
        // was soll passieren? 
        // symbol mit dem zugehörigen typ in movingobjects 
        //}


    }

    /*
      //________________________________________
      function objectSelect(_event: MouseEvent): void {
          //console.log("EVENT CHECK:  " + _event);
  
          let xMouse: number = _event.clientX;
          let yMouse: number = _event.clientY;
          function handleXSpeed(): void {
  
              console.log("HANDLE XSPEED");
              let sliderOldValue: string = sliderXSpeed.getAttribute("value");
              let sliderNewValue: number = parseInt(sliderXSpeed.value);
              let sliderNewValueString: string = sliderNewValue.toString();
  
              sliderXSpeed.setAttribute("value", sliderNewValueString);
  
              console.log("get oldvalue: " + sliderOldValue);
              console.log("get newvalue: " + sliderNewValue);
              console.log("value string: " + sliderNewValueString);
  
              let newXSpeed: number = parseInt(sliderXSpeed.value);
              console.log("SLIDER X SPEED " + newXSpeed);
              // sliderXSpeed.addEventListener("change", handleXSpeed(inputElemente.id);
              // pusht den slider wert in die value 
              // muss noch in array gepusht werden 
  
  
          }
  
          function handleYSpeed(): void {
  
              console.log("HANDLE YSPEED");
              let sliderOldValue: string = sliderYSpeed.getAttribute("value");
              let sliderNewValue: number = parseInt(sliderYSpeed.value);
              let sliderNewValueString: string = sliderNewValue.toString();
  
              sliderYSpeed.setAttribute("value", sliderNewValueString);
  
              console.log("get oldvalue: " + sliderOldValue);
              console.log("get newvalue: " + sliderNewValue);
              console.log("value string: " + sliderNewValueString);
  
              let newYSpeed: number = parseInt(sliderYSpeed.value);
              console.log("SLIDER X SPEED " + newYSpeed);
              // sliderXSpeed.addEventListener("change", handleXSpeed(inputElemente.id);
              // pusht den slider wert in die value 
              // muss noch in array gepusht werden 
  
  
          }
  
          function handleScale(): void {
  
              console.log("HANDLE SCALE");
              let scaleOldValue: string = scale.getAttribute("value");
              let scaleNewValue: number = parseInt(scale.value);
              let scaleNewValueString: string = scaleNewValue.toString();
  
              sliderYSpeed.setAttribute("value", scaleNewValueString);
  
              console.log("get oldvalue: " + scaleOldValue);
              console.log("get newvalue: " + scaleNewValue);
              console.log("value string: " + scaleNewValueString);
  
              let newScale: number = parseInt(scale.value);
              console.log("SLIDER X SPEED " + newScale);
              // sliderXSpeed.addEventListener("change", handleXSpeed(inputElemente.id);
              // pusht den slider wert in die value 
              // muss noch in array gepusht werden 
  
  
          }
  
          function handleColor(): void {
  
              console.log("HANDLE COLOR");
              let colorOldValue: string = color.getAttribute("value");
              console.log(color.getAttribute("value"));
              let colorNewValue: string = color.value;
              let colorNewValueString: string = color.toString();
  
              sliderYSpeed.setAttribute("value", colorNewValueString);
  
              console.log("get oldvalue: " + colorOldValue);
              console.log("get newvalue: " + colorNewValue);
              console.log("value string: " + colorNewValueString);
  
              let newColor: string = color.value;
              console.log("SLIDER X SPEED " + newColor);
              // sliderXSpeed.addEventListener("change", handleXSpeed(inputElemente.id);
              // pusht den slider wert in die value 
              // muss noch in array gepusht werden 
  
  
          }
  
  
          function handleSpin(): void {
  
              console.log("HANDLE SPIN");
              let spinOldValue: string = spin.getAttribute("value");
              console.log(spin.getAttribute("value"));
              let spinNewValue: string = spin.value;
              let spinNewValueString: string = spin.toString();
  
              sliderYSpeed.setAttribute("value", spinNewValueString);
  
              console.log("get oldvalue: " + spinOldValue);
              console.log("get newvalue: " + spinNewValue);
              console.log("value string: " + spinNewValueString);
  
              let newSpin: string = spin.value;
              console.log("SPin: " + newSpin);
              // sliderXSpeed.addEventListener("change", handleXSpeed(inputElemente.id);
              // pusht den slider wert in die value 
              // muss noch in array gepu)sht werden 
              /*  sliderXSpeed.addEventListener("change", handleXSpeed);
                sliderYSpeed.addEventListener("change", handleYSpeed);
                scale.addEventListener("change", handleScale);
                color.addEventListener("input", handleColor);
                spin.addEventListener("input", handleSpin);
    
                 if (xMouse > 50 && xMouse < 133 && yMouse > 420 && yMouse < 495)
             }   */

    //________________________________________




}
