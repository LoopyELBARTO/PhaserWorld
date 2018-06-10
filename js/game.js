var config = {
    type: Phaser.AUTO,
    width: 480,
    height: 250,
    zoom: 3,
    pixelArt: true,
    physics:{
        default:'arcade',
    },
    scene: [Example1]
};

var game = new Phaser.Game(config);
var camera;
var player;
var debugGraphics;
var text;
var wallLayer;
var wallcollider;
var showDebug = false;
var startingPosX = 50;
var startingPosY = 50;