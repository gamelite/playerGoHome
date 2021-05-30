export default class Player extends Phaser.Physics.Arcade.Sprite {
    speed: number;
    constructor(scene) {
        super(scene, 100, 100, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.9);
        // this.setBounce(0.1, 0.1);
        this.setCollideWorldBounds(true);
        // this.setGravityY(300)
        this.speed = 200
    }
    up() {
        this.setVelocity(0, -1 * this.speed)
    }
    down() {
        this.setVelocity(0, 1 * this.speed)
    }
    left() {
        this.setVelocity(-1 * this.speed, 0)
    }
    right() {
        this.setVelocity(1 * this.speed, 0)
    }
    update() {
    }
}