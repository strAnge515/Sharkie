class BackgroundObject extends MoveableObject {

    width = 850;
    height = 480;
    parallaxFactor;

   

    constructor(imagePath, x, parallaxFactor) {
        super();
        this.loadImage(imagePath);
        this.x = x;
       
        this.parallaxFactor = parallaxFactor;
        this.y = 480 - this.height;
    }


}