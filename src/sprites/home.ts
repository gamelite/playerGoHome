export default class Home extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'home');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setBounce(0, 0);
        // this.setScale(0.5);
        this.setVelocity(0, 0)
    }
    update() {
    }
}