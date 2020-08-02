namespace Zauberbild {
    export class Objects {
        xPos: number;
        yPos: number;
        //size ist entweder der radius oder die seitenlängen des objektes
        size: number;
        //scale wird als parameter übergeben (ist default 1, kann dqnn mit dem value des sliders multipliziert werden)
        scale: number;
        //type wird als parameter übergeben, damit man einfach imer auf diese info zugreifen kann zwecks sortieren
        //einfach schlau im vorraus =))
        type: string;
        //color wird als parameter übergeben (ist default zB weiss, kann dann mit dem value des input elements überschrieben werden)
        color: string;


        constructor() {
            //epmty
        }

        update(): void {
            //epmty
        }

        draw(): void {
            //epmty
        }


    }
}