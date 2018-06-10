var config = {
    type: Phaser.AUTO,
    width: 480,
    height: 250,
    zoom: 4,
    pixelArt: true,
    physics:{
        default:'arcade',
        arcade :{ y:0}
    },
    scene: [Example1]
};

var game = new Phaser.Game(config);
var camera;
var player;
var playerVelocity = 70;
var debugGraphics;
var text;
var wallLayer;
var wallBarrier;
var backgroundBarrier;
var physics;
var showDebug = false;
var startingPosX = 50;
var startingPosY = 50;