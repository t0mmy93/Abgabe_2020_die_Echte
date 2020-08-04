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
    let sliderXSpeed;
    let sliderYSpeed;
    let scale;
    let color;
    let spin;
    let index;
    function init(_event) {
        sliderXSpeed = document.getElementById("xSpeed");
        sliderYSpeed = document.getElementById("ySpeed");
        scale = document.getElementById("scale");
        color = document.getElementById("color");
        spin = document.getElementById("spin");
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
            Zauberbild.canvasWidth = sliderWidth.value;
            Zauberbild.canvasHeight = 500;
            console.log("Breite: " + Zauberbild.canvasWidth);
            console.log("Höhe: " + Zauberbild.canvasHeight);
            startButton.addEventListener("click", startGame);
        }
    }
    //___________________FUNKTION CHECK IF CLICK ON INTERFACE AND ON GEOMETRY_____________
    // checkt ob Mausklick über dem objekt Quad im interface statt gefunden hat 
    function mouseDownCheck(_event) {
        //  for (let i: number = 0; i < interfaceObjects.length; i++) {
        if (_event.offsetX > 50 && _event.offsetX < 133 && _event.offsetY > 420 && _event.offsetY < 495) {
            console.log("QHADHIT");
            Zauberbild.canvas.addEventListener("mousemove", quadHit);
            console.log("X: " + _event.offsetX + "Y: " + _event.offsetY);
        }
        if (_event.offsetX > 160 && _event.offsetX < 243 && _event.offsetY > 420 && _event.offsetY < 495) {
            console.log("CIRCLEHIT");
        }
        if (_event.offsetX > 270 && _event.offsetX < 353 && _event.offsetY > 420 && _event.offsetY < 495) {
            console.log("TRIANGLEHIT");
        }
    }
    function quadHit(_event) {
        console.log("QUADHIT FUCNKTION CHECK ");
        Zauberbild.canvas.addEventListener("mouseup", quadDrop);
    }
    // quad plazieren
    function quadDrop(_event) {
        Zauberbild.canvas.removeEventListener("mousemove", quadHit);
        let newQuad = new Zauberbild.Quad("quad", _event.clientX, _event.clientY, 1, "yellow", 75, false);
        Zauberbild.movingObjects.push(newQuad);
        console.log(" MOVINOBJ LÄNGE: " + Zauberbild.movingObjects.length);
        Zauberbild.canvas.removeEventListener("mouseup", quadDrop);
        for (let i = 0; i < Zauberbild.movingObjects.length; i++) {
            Zauberbild.movingObjects[i].type = "quad" + Zauberbild.movingObjects.length;
            Zauberbild.movingObjects[i].xSpeed = 0;
            Zauberbild.movingObjects[i].ySpeed = 0;
        }
        console.log(" ARAAY LÄNGE: " + Zauberbild.movingObjects.length);
        console.log("TYPE HOCH ZÄHLEN: " + Zauberbild.movingObjects[0].type);
    }
    // sobald die Maus über dem Target liegt kann man auf objekte klicken
    function selectArea(_event) {
        let xCursor = _event.clientX;
        let yCursor = _event.clientY;
        if (yCursor < 410 && xCursor >= parseInt(Zauberbild.canvasWidth)) {
            console.log("HOVER GEHT");
            Zauberbild.canvas.addEventListener("mousedown", selectObject);
        }
    }
    // Obejct auswählen
    function selectObject(_event) {
        for (let i = 0; i < Zauberbild.movingObjects.length; i++) {
            if (_event.offsetX > Zauberbild.movingObjects[i].xPos && _event.offsetX < Zauberbild.movingObjects[i].xPos + Zauberbild.movingObjects[i].size && _event.offsetY > Zauberbild.movingObjects[i].yPos && _event.offsetY < Zauberbild.movingObjects[i].yPos + Zauberbild.movingObjects[i].size) {
                index = i;
                console.log("OBEJKT JAAAA ES GEHT: " + Zauberbild.movingObjects[i].type);
                sliderXSpeed.addEventListener("change", handleXSpeed);
                sliderYSpeed.addEventListener("change", handleYSpeed);
                scale.addEventListener("change", handleSize);
                color.addEventListener("input", handleColor);
                Zauberbild.canvas.addEventListener("mouseup", function () {
                    Zauberbild.movingObjects[i].glow = true;
                    console.log("EVENTLISTENER GLOW");
                });
                console.log("INDEX:" + index);
            }
        }
    }
    //___TEST INPUT auslesen und anpassen
    // auf x Geschwindigkeit reagieren
    function handleXSpeed() {
        // console.log("HANDLE XSPEED");
        // console.log("HANDLE XSPEED" + index);
        let xSpeedOld = Zauberbild.movingObjects[index].xSpeed;
        console.log("xPSEEROLD:  " + xSpeedOld);
        let xSpeedNew = sliderXSpeed.value;
        let xSpeedNewInt = parseInt(xSpeedNew);
        // console.log("XSPEEDNEWINT NEW: " + xSpeedNewInt);
        Zauberbild.movingObjects[index].xSpeed = xSpeedNewInt;
        console.log("FINALE XSPEED: " + Zauberbild.movingObjects[index].xSpeed);
        Zauberbild.movingObjects[index].draw();
    }
    // auf y Geschindigkeit reagieren
    function handleYSpeed() {
        //console.log("HANDLE YSPEED" + index);
        let ySpeedOld = Zauberbild.movingObjects[index].ySpeed;
        console.log("yPSEEROLD:  " + ySpeedOld);
        let ySpeedNew = sliderYSpeed.value;
        let ySpeedNewInt = parseInt(ySpeedNew);
        //  console.log("YSPEEDNEWINT NEW: " + ySpeedNewInt);
        Zauberbild.movingObjects[index].ySpeed = ySpeedNewInt;
        console.log("FINALE YSPEED: " + Zauberbild.movingObjects[index].ySpeed);
    }
    // auf größen Änderung reagieren
    function handleSize() {
        //   console.log("HANDLE SCALE" + index);
        let sizeOld = Zauberbild.movingObjects[index].size;
        console.log("SCALEOLD:  " + sizeOld);
        let sizeNew = scale.value;
        let sizeNewInt = parseInt(sizeNew);
        console.log("SCALENEW: " + sizeNewInt);
        Zauberbild.movingObjects[index].size = sizeNewInt;
        console.log("FINALE SCALE: " + Zauberbild.movingObjects[index].size);
    }
    // Auf Farbänderung reagieren
    function handleColor() {
        //console.log("HANDLE COLOR" + index);
        let colorOld = Zauberbild.movingObjects[index].color;
        console.log("COLOROLD:  " + colorOld);
        let colorNew = color.value;
        //  console.log("COLOR NEW: " + colorNew);
        Zauberbild.movingObjects[index].color = colorNew;
        console.log("FINALE COLOR: " + Zauberbild.movingObjects[index].color);
        Zauberbild.movingObjects[index].draw();
    }
    //_____TEST ENDE
    function drawInterface() {
        //interfaceObjects
        // kreis
        let i = Zauberbild.interfaceObjects.length;
        let circle = new Zauberbild.Circle("circle" + i, 200, 450, 1, "yellow");
        circle.draw();
        console.log("circlex " + circle.xPos + "circley " + circle.yPos + circle.color);
        // viereck
        let quad = new Zauberbild.Quad("quad" + i, 50, 410, 1, "yellow", 75, false);
        quad.draw();
        console.log("Quadx " + quad.xPos + "Quady " + quad.size);
        // Dreieck
        let triangle = new Zauberbild.Triangle("triangle" + i, 300, 100, 1, "red", "none");
        triangle.draw();
        console.log("Trianglex " + triangle.xPos + "Triangley " + triangle.yPos);
        Zauberbild.interfaceObjects.push(circle, quad, triangle);
        console.log("Inteface object daten:  " + Zauberbild.interfaceObjects[1].size);
        console.log("QUAD TYPE: " + quad.type);
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
        document.getElementById("quad");
        drawInterface();
        // eventlistener 
        Zauberbild.canvas.addEventListener("mousedown", mouseDownCheck);
        Zauberbild.canvas.addEventListener("mouseover", selectArea);
        // aktuelles Canvas speichern
        imgData = Zauberbild.crc.getImageData(0, 0, Zauberbild.canvas.width, Zauberbild.canvas.height);
        console.log(imgData);
        setInterval(update, 20);
    }
    // Seite 3
    function endGame() {
        startPage.style.display = "none";
        gamePage.style.display = "none";
        finalPage.style.display = "block";
    }
    function update() {
        Zauberbild.crc.clearRect(0, 0, parseInt(Zauberbild.canvasWidth), Zauberbild.canvasHeight);
        Zauberbild.crc.putImageData(imgData, 0, 0);
        for (let i = 0; i < Zauberbild.movingObjects.length; i++) {
            Zauberbild.movingObjects[i].draw();
            Zauberbild.movingObjects[i].move();
        }
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