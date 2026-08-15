class MoveableObject extends DrawableObject {

speed = 0.15;


moveRight() {
    this.x += this.speed;
}

moveLeft() {
    this.x -= this.speed;
}




}