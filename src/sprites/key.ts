export default class Key extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'key');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.5);
        this.setVelocity(0, 0)
    }
    update() {
    }
}