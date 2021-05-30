import * as Sprites from '../sprites'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
};

export default class GameScene extends Phaser.Scene {
    private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
    keyW: Phaser.Input.Keyboard.Key;
    keyS: Phaser.Input.Keyboard.Key;
    keyA: Phaser.Input.Keyboard.Key;
    keySpace: Phaser.Input.Keyboard.Key;
    keyD: Phaser.Input.Keyboard.Key;
    player: Sprites.Player;
    bg: Phaser.GameObjects.TileSprite;
    scoreText: Phaser.GameObjects.Text;
    platforms: Phaser.Physics.Arcade.StaticGroup;
    ground: Phaser.GameObjects.TileSprite;
    enemys: Phaser.Physics.Arcade.Group;
    m: number;
    music_jump: Phaser.Sound.BaseSound;
    backgroundMusic: Phaser.Sound.BaseSound;
    home: Sprites.Home;
    group: Phaser.Physics.Arcade.StaticGroup;
    key: Sprites.Key;
    win: Phaser.GameObjects.Image;

    constructor() {
        super(sceneConfig);
    }

    public preload() {
        this.load.image('grassland', 'assets/images/grassland.png')
        this.load.image('bg1', 'assets/images/1.png')
        this.load.image('bg2', 'assets/images/2.png')
        this.load.image('bg3', 'assets/images/3.png')
        this.load.image('bg4', 'assets/images/4.png')
        this.load.image('bg0', 'assets/images/0.png')
        this.load.image('h', 'assets/images/h.png')
        this.load.image('home', 'assets/images/home.png')
        this.load.image('key', 'assets/images/key.png')
        this.load.image('win', 'assets/images/win.png')
        this.load.spritesheet('player', 'assets/sprites/trump.png', { frameWidth: 100, frameHeight: 100 });
    }

    public create() {
        let { width, height } = this.sys.game.canvas;

        this.group = this.physics.add.staticGroup()
        this.add.image(150, 150, 'bg1')
        this.add.image(650, 150, 'bg2')
        this.add.image(150, 450, 'bg3')
        this.add.image(650, 450, 'bg4')

        this.add.image(250, 150, 'bg0')
        this.add.image(350, 150, 'bg0')
        this.add.image(450, 150, 'bg0')
        this.add.image(550, 150, 'bg0')

        this.add.image(150, 250, 'bg0')
        this.add.image(650, 250, 'bg0')
        this.add.image(150, 350, 'bg0')
        this.add.image(650, 350, 'bg0')

        this.add.image(250, 450, 'bg0')
        this.add.image(350, 450, 'bg0')
        this.add.image(450, 450, 'bg0')
        this.add.image(550, 450, 'bg0')

        this.win = this.add.image(800 / 2, 600 / 2, 'win')
        this.win.setDepth(100)
        this.win.setVisible(false)

        this.cameras.main.setBackgroundColor('rgba(255, 255, 255, 0.5)');;
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.anims.create({
            key: 's',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5, first: 0 }),
            frameRate: 20,
            repeat: -1
        })

        this.anims.create({
            key: 'd',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 11, first: 0 }),
            frameRate: 20,
            repeat: -1
        })

        this.anims.create({
            key: 'w',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 17, first: 0 }),
            frameRate: 20,
            repeat: -1
        })

        this.anims.create({
            key: 'a',
            frames: this.anims.generateFrameNumbers('player', { start: 18, end: 23, first: 0 }),
            frameRate: 20,
            repeat: -1
        })

        this.add.image(300, 450, 'h')

        this.player = new Sprites.Player(this)
        this.player.setPosition(150, 150)
        this.player.setDepth(1)
        this.home = new Sprites.Home(this, 300, 450)
        this.home.setDepth(0)
        this.key = new Sprites.Key(this, 550, 150)


        this.physics.add.collider(this.player, this.group);
        this.physics.add.overlap(this.player, this.home, function (player, home) {
            // this.scene.start("GameOver");
            console.log('hit')
            if (player.getData('is_get_key')) {
                console.log('next scene!')
                this.win.setVisible(true)
                this.scene.pause();
                // this.scene.stop();
            }
        }, null, this);

        this.physics.add.overlap(this.player, this.key, function (player, key) {
            // this.scene.start("GameOver");
            console.log('get key')
            player.setData('is_get_key', true)
            key.destroy()
        }, null, this);

        this.group.create(50, 50, 'grassland')
        this.group.create(150, 50, 'grassland')
        this.group.create(250, 50, 'grassland')
        this.group.create(350, 50, 'grassland')
        this.group.create(450, 50, 'grassland')
        this.group.create(550, 50, 'grassland')
        this.group.create(650, 50, 'grassland')
        this.group.create(750, 50, 'grassland')

        this.group.create(50, 150, 'grassland')
        this.group.create(750, 150, 'grassland')

        this.group.create(50, 250, 'grassland')

        this.group.create(250, 250, 'grassland')
        this.group.create(350, 250, 'grassland')
        this.group.create(450, 250, 'grassland')
        this.group.create(550, 250, 'grassland')
        this.group.create(750, 250, 'grassland')

        this.group.create(50, 350, 'grassland')
        this.group.create(250, 350, 'grassland')
        this.group.create(350, 350, 'grassland')
        this.group.create(450, 350, 'grassland')
        this.group.create(550, 350, 'grassland')
        this.group.create(750, 350, 'grassland')

        this.group.create(50, 450, 'grassland')
        this.group.create(750, 450, 'grassland')

        this.group.create(50, 550, 'grassland')
        this.group.create(150, 550, 'grassland')
        this.group.create(250, 550, 'grassland')
        this.group.create(350, 550, 'grassland')
        this.group.create(450, 550, 'grassland')
        this.group.create(550, 550, 'grassland')
        this.group.create(650, 550, 'grassland')
        this.group.create(750, 550, 'grassland')
    }
    public update() {
        if (this.keyW.isDown) {
            if (this.player.getData('status') != "w") {
                this.player.setData('status', 'w')
                this.player.play('w')
                this.player.up()
            }
        }
        if (this.keyS.isDown) {
            if (this.player.getData('status') != "s") {
                this.player.setData('status', 's')
                this.player.play('s')
                this.player.down()
            }
        }
        if (this.keyA.isDown) {
            if (this.player.getData('status') != "a") {
                this.player.setData('status', 'a')
                this.player.play('a')
                this.player.left()
            }
        }
        if (this.keyD.isDown) {
            if (this.player.getData('status') != "d") {
                this.player.setData('status', 'd')
                this.player.play('d')
                this.player.right()
            }
        }
        if (this.keyA.isUp && this.player.getData('status') == "a") {
            this.player.setData('status', 'stop')
            this.player.setVelocity(0, 0)
            this.player.anims.stop();
        }
        if (this.keyD.isUp && this.player.getData('status') == "d") {
            this.player.setData('status', 'stop')
            this.player.setVelocity(0, 0)
            this.player.anims.stop();
        }
        if (this.keyW.isUp && this.player.getData('status') == "w") {
            this.player.setData('status', 'stop')
            this.player.setVelocity(0, 0)
            this.player.anims.stop();
        }
        if (this.keyS.isUp && this.player.getData('status') == "s") {
            this.player.setData('status', 'stop')
            this.player.setVelocity(0, 0)
            this.player.anims.stop();
        }
    }
}