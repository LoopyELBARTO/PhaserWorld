class Example1 extends Phaser.Scene{


    constructor(){
        super({key: "Example1"});
    }
    
    preload(){
        this.load.image('tiles', 'assets/maps/tileset/DungeonTileset.png');
        this.load.tilemapTiledJSON('prototypeMap', 'assets/maps/prototype/prototype.json');
        this.load.spritesheet('player_idle', 'assets/player/idle.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('player_forward', 'assets/player/forward.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('player_backward', 'assets/player/backward.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('player_horizontal', 'assets/player/horizontal.png', {frameWidth: 16, frameHeight: 16});

    }

    create(){

        var map = this.make.tilemap({key: 'prototypeMap'});

        var groundTiles = map.addTilesetImage('DungeonTileset', 'tiles');
        var wallTiles = map.addTilesetImage('DungeonTileset', 'tiles');

        var groundLayer = map.createStaticLayer('Ground', groundTiles, 0, 0);
        wallLayer = map.createDynamicLayer('Walls', wallTiles,0,0);

        //set size of camera
        camera = this.cameras.main;
        camera.setSize(480,200);

        //set bounds of camera equal to the map size
        //this.cameras.main.setBounds(0,0, 480 * 2, 320);
        camera.setBounds(0,0, map.widthInPixels, map.heightInPixels);
        //wallLayer.setCollisionBetween(16,18);
        
        //set physics to map size
        this.physics.world.setBounds(0,0, map.widthInPixels, map.heightInPixels);

        player = this.physics.add.sprite(startingPosX,startingPosY, 'player_idle', 1);
        player.setCollideWorldBounds(true);

        camera.startFollow(player, true);
        //this.physics.add.collider(player, wallLayer);
        wallLayer.setCollision([4], true);
        this.physics.world.collide(player, wallLayer);



        //DEBUG
        debugGraphics = this.add.graphics();

        this.input.keyboard.on('keydown_C', function (event)
        {
            showDebug = !showDebug;
            drawDebug();
        });

        text = this.add.text(16, 80, '', {
            fontSize: '10px',
            fill: '#ffffff'
        });
        text.setScrollFactor(0);
        updateText();

        ///DEBUG


        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player_idle', { start: 0, end: 4}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'forward',
            frames: this.anims.generateFrameNumbers('player_forward', {start: 0, end: 4}),
            frameRate:10,
            repeat: -1
        });

        this.anims.create({
            key: 'backward',
            frames: this.anims.generateFrameNumbers('player_backward', {start: 0, end: 4}),
            frameRate:10,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_horizontal',
            frames: this.anims.generateFrameNumbers('player_horizontal', {start: 0, end: 4}),
            frameRate:10,
            repeat: -1
        });

        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        

    }

    update(time, delta){

        
        if (this.key_D.isDown){
            player.x += 2;
            //player.setVelocityX(100);
            player.anims.play('walk_horizontal', true);
            player.flipX= false;
        }
        else if (this.key_A.isDown){
            player.x += -2;
            //player.setVelocityX(-100);
            player.anims.play('walk_horizontal', true);
            player.flipX= true;
        }
        else if (this.key_W.isDown){
            player.y += -2;
            //player.setVelocityY(-100);
            player.anims.play('forward', true);
        }
        else if (this.key_S.isDown){
            player.y += 2;
            //player.setVelocityY(100);
            player.anims.play('backward', true);
        }
        else{
            //player.setVelocity(0);
            player.anims.stop();
            //player.anims.play('idle', true);
        }
    }

}
function drawDebug ()
{
    debugGraphics.clear();

    if (showDebug)
    {
        // Pass in null for any of the style options to disable drawing that component
        wallLayer.renderDebug(debugGraphics, {
            tileColor: null, // Non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
        });
    }

    updateText();
}

function updateText ()
{
    text.setText(
        'Arrow keys to move. Space to jump' +
        '\nPress "C" to toggle debug visuals: ' + (showDebug ? 'on' : 'off')
    );
}