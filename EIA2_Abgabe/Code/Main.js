var Zauberbild;
(function (Zauberbild) {
    /*
        window.addEventListener("dragstart", dragStart);
        window.addEventListener("dragover", dragOver);
        window.addEventListener("drop", drop);
    */
    window.addEventListener("load", init);
    // canvas.addEventListener("mousemove", draggedGeometryNew);
    let imgData;
    let fps;
    let mouseClick = false;
    //Arrays
    Zauberbild.quads = [];
    Zauberbild.circles = [];
    Zauberbild.triangles = [];
    Zauberbild.movingObjects = [];
    Zauberbild.objects = [];
    Zauberbild.interfaceObjects = [];
    Zauberbild.quadButtonHover1 = false;
    let startPage;
    let gamePage;
    let finalPage;
    let startButton;
    let canvasContainer;
    let finalButton;
    let inputElementId = "";
    let sliderXSpeed;
    let sliderYSpeed;
    let scale;
    let color;
    let spin;
    let globalReturnVar;
    let move = false;
    // let interface: HTMLDivElement = <HTMLDivElement>document.getElementById("infertace");
    function init(_event) {
        sliderXSpeed = document.getElementById("xSpeed");
        sliderYSpeed = document.getElementById("ySpeed");
        scale = document.getElementById("scale");
        color = document.getElementById("color");
        spin = document.getElementById("spin");
        /*
                fps = 25;
                quads = [];
                triangles = [];
                cirlces = [];
                movingObjects = [];
                objects = [];
        */
        startPage = document.getElementById("startPage");
        startPage.style.display = "block";
        gamePage = document.getElementById("gamePage");
        gamePage.style.display = "none";
        finalPage = document.getElementById("finalPage");
        finalPage.style.display = "none";
        startButton = document.getElementById("startButt");
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
    // erstellte objekte Interface
    let quad;
    let circle;
    let triangle;
    let type;
    /* function placeGeaometry(): void {
 
         if (type == "quad") {
             quad = new Quad("quad", 50, 410, 1, "yellow", "none");
         }
 
     }*/
    function drawInterface() {
        //interfaceObjects
        // kreis
        let i = Zauberbild.interfaceObjects.length;
        let circle = new Zauberbild.Circle("circle" + i, 200, 450, 1, "yellow");
        circle.draw();
        console.log("circlex " + circle.xPos + "circley " + circle.yPos + circle.color);
        // viereck
        let quad = new Zauberbild.Quad("quad" + i, 50, 410, 1, "yellow", "none");
        quad.draw();
        console.log("Quadx " + quad.xPos + "Quady " + quad.size);
        // Dreieck
        let triangle = new Zauberbild.Triangle("triangle" + i, 300, 100, 1, "red", "none");
        triangle.draw();
        console.log("Trianglex " + triangle.xPos + "Triangley " + triangle.yPos);
        // img data speichern
        Zauberbild.interfaceObjects.push(circle, quad, triangle);
        console.log("Inteface object daten:  " + Zauberbild.interfaceObjects[1].size);
        console.log("QUAD TYPE: " + quad.type);
        //  console.log("TEST QUAD:   " + quad);
    }
    function deleteEventListener(_event) {
        Zauberbild.canvas.removeEventListener("mousemove", rePosition);
        console.log("eventlistener removed");
        Zauberbild.movingObjects[0].xPos = _event.offsetX;
        Zauberbild.movingObjects[0].yPos = _event.offsetY;
        //  console.log("X MO: " + movingObjects[0].xPos + " Y MO: " + movingObjects[0].yPos + "  NEW X" + _event.offsetX + " NEW Y: " + _event.offsetY);
        Zauberbild.movingObjects[0].draw();
    }
    function rePosition(_event) {
        // crc.translate(movingObjects[0].xPos, movingObjects[0].yPos);
        //console.log("ÄÄÄÄÄÄÄÄÄÄ X: " + movingObjects[0].xPos + " Y POS: " + movingObjects[0].yPos);
        // movingObjects[0].draw();
        Zauberbild.canvas.addEventListener("mouseup", deleteEventListener);
    }
    function selectedObject(_event) {
        // let returnString: string = "";
        let xMouse = _event.clientX;
        let yMouse = _event.clientY;
        //console.log("MOUSE EVENT GEHT");
        if (xMouse > 50 && xMouse < 133 && yMouse > 420 && yMouse < 495) {
            globalReturnVar = "quad0";
            console.log("HIT QUAD");
            Zauberbild.movingObjects.push(Zauberbild.interfaceObjects[1]);
            Zauberbild.canvas.addEventListener("mousemove", rePosition);
            console.log("MOVING OBJECTS" + Zauberbild.movingObjects[0].type);
            console.log("MOVING OBJECTS LÄNGE" + Zauberbild.movingObjects.length);
            //let globalReturnVar: string;
        }
        else {
            globalReturnVar = "";
            console.log("NO HIT");
        }
    }
    function draggedGeometryNew() {
        let type = globalReturnVar;
        for (let i = 0; i < Zauberbild.movingObjects.length; i++) {
            if (globalReturnVar == "quad0" || globalReturnVar == "triangle0" || globalReturnVar == "circle0") {
                //hi
            }
        }
        // return value lat von oben = returnType();
        // außerhalb eine fuction erstellen namens returnType(): string 
    }
    function startGame() {
        startPage.style.display = "none";
        gamePage.style.display = "block";
        finalPage.style.display = "none";
        finalButton = document.getElementById("finalButt");
        finalButton.addEventListener("click", endGame);
        // function create canvas
        //create canvas get CanvasRenderingContext2D 
        canvasContainer = document.getElementById("canvasContainer");
        Zauberbild.canvas = document.createElement("canvas");
        Zauberbild.canvas.height = Zauberbild.canvasHeight;
        Zauberbild.canvas.width = parseInt(Zauberbild.canvasWidth);
        canvasContainer.appendChild(Zauberbild.canvas);
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
        Zauberbild.canvas.addEventListener("mouseup", function () {
            move = false;
            console.log("TEST FASLE");
        });
        document.getElementById("quad");
        drawInterface();
        Zauberbild.canvas.addEventListener("mousedown", selectedObject);
        imgData = Zauberbild.crc.getImageData(0, 0, Zauberbild.canvas.width, Zauberbild.canvas.height);
        console.log(imgData);
        window.requestAnimationFrame(update);
        //  update();
    }
    // Seite 3
    function endGame() {
        startPage.style.display = "none";
        gamePage.style.display = "none";
        finalPage.style.display = "block";
    }
    /*
        function createNewCanvas(): void {
            //to do
        }
    */
    function update() {
        Zauberbild.crc.clearRect(0, 0, parseInt(Zauberbild.canvasWidth), Zauberbild.canvasHeight);
        Zauberbild.crc.putImageData(imgData, 0, 0);
        //clear rect
        //get img data
        //  console.log("Update start");
        //for (let i:number =0;i<movingObjects.length;i++){
        // movingObjcts[i].update()
        // }
        for (let i = 0; i < Zauberbild.movingObjects.length; i++) {
            Zauberbild.movingObjects[i].draw();
            Zauberbild.movingObjects[i].move();
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
})(Zauberbild || (Zauberbild = {}));
//# sourceMappingURL=Main.js.map