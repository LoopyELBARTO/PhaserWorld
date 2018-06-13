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

        var backgroundTiles = map.addTilesetImage('DungeonTileset', 'tiles');
        var groundTiles = map.addTilesetImage('DungeonTileset', 'tiles');
        var boxTiles = map.addTilesetImage('DungeonTileset', 'tiles');
        var wallTiles = map.addTilesetImage('DungeonTileset', 'tiles');
        var wallBarrierTile = map.addTilesetImage('DungeonTileset', 'tiles');

        backgroundBarrier = map.createStaticLayer('Background', backgroundTiles,0,0);        
        var groundLayer = map.createStaticLayer('Ground', groundTiles, 0, 0);
        var boxLayer = map.createStaticLayer('Box', boxTiles, 0,0);
        var wallLayer = map.createStaticLayer('Walls', wallTiles, 0,0);

        wallBarrier = map.createStaticLayer('WallBarrier', wallBarrierTile,0,0);

        physics = this.physics;

        //set size of camera
        camera = this.cameras.main;
        camera.setSize(480,320);

        
        
        //set physics to map size
        this.physics.world.setBounds(0,0, map.widthInPixels, map.heightInPixels);

        player = this.physics.add.sprite(startingPosX,startingPosY, 'player_idle');
        //wallBarrier.setCollisionBetween(1,3); 
        wallBarrier.setCollision([1,2,3,9,24,25,27,49,51,55,75,76,101]);
        physics.add.collider(player, wallBarrier);
        physics.add.collider(player, backgroundBarrier);

        player.setCollideWorldBounds(true);

        //set bounds of camera equal to the map size
        //this.cameras.main.setBounds(0,0, 480 * 2, 320);
        camera.setBounds(0,0, map.widthInPixels, map.heightInPixels);
        camera.startFollow(player, true);
        //wallLayer.setCollision([32,33,34,35], true);



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

        player.setVelocity(0);

        if (this.key_D.isDown){
            player.setVelocityX(playerVelocity);
            player.anims.play('walk_horizontal', true);
            player.flipX= false;
            return
        }
        else if (this.key_A.isDown){
            player.setVelocityX(-playerVelocity);
            player.anims.play('walk_horizontal', true);
            player.flipX= true;
            return
        }
        else if (this.key_W.isDown){
            player.setVelocityY(-playerVelocity);
            player.anims.play('forward', true);
            return
        }
        else if (this.key_S.isDown){
            player.setVelocityY(playerVelocity);
            player.anims.play('backward', true);
            return
        }
        else{
            player.setVelocity(0);
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
        wallBarrier.renderDebug(debugGraphics, {
            tileColor: null, // Non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
        });
        backgroundBarrier.renderDebug(debugGraphics, {
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