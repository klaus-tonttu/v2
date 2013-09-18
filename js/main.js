var SCREEN_WIDTH  = 480;
var SCREEN_HEIGHT = 640;
var SCREEN_CENTER_X = SCREEN_WIDTH/2;
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;
var ENEMY_WIDTH  = 120;
var ENEMY_HEIGHT = 120;
var PLAYER_WIDTH  = 20;
var PLAYER_HEIGHT = 16;

var PEACE_WIDTH  = 360;
var PEACE_HEIGHT = 480;
var PEACE_Y = 480;
var HISTORYPEACE_Y = 355;
var MYHP_X = 15;
var MYHP_Y = 302;
var DRAWX = 60;
var DRAWY = 70;
var DRAWCLEARBTN_Y = 600;
var SMART = 0;
var iOS = 0;
var ANDROID = 0;

var game;
var titleScene;
var mainScene;
var battleScene;
var sound_battleBgm;
var sound_switch;

var SRC_BATTLEBGM = 'sounds/apl_1battle.mp3';
var SRC_SWITCH = 'sounds/se_maoudamashii_se_switch02.mp3';

enchant.ENV.ENABLE_SOUND_ON_MOBILE_SAFARI = true;
enchant();

window.onload = function () {
	game = new Core(SCREEN_WIDTH,SCREEN_HEIGHT);
	game.preload(
		'images/common/title.jpg'
		,SRC_BATTLEBGM
		,SRC_SWITCH
	);
	game.fps = 15;

	if (navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0) {
		SMART = 1;
		iOS = 1;
	} else if (navigator.userAgent.indexOf('Android') > 0) {
		SMART = 1;
		ANDROID = 1;
	}

	game.onload = function() { //init
		titleScene = createTitleScene();
		mainScene = createMainScene();
		battleScene = createBattleScene();

		game.pushScene(titleScene);
	}

	game.start();
}

function main() {


}

/* ----------------------------------------------- */

function createTitleScene() {
	scene = new Scene();
	scene.backgroundColor = "#ff0";

	var bg = new Sprite(480,640);
	bg.image = game.assets['images/common/title.jpg'];
	scene.addChild(bg);

	scene.ontouchend = function(){
		playSound('play', sound_battleBgm, SRC_BATTLEBGM, 0) // サウンド再生
		game.replaceScene(mainScene);
	}
	return scene;
}

function createMainScene() {
	scene = new Scene();
	scene.backgroundColor = "#f00";

	var myLabel = new Label();
	myLabel.text = "表示したいテキスト";
	myLabel.font = "32px 'Meiryo', 'メイリオ', 'ヒラギノ角ゴ　Pro W3', sans-serif";
	myLabel.x = (SCREEN_WIDTH - myLabel._boundWidth) / 2;
	myLabel.y = 320;
	myLabel.addEventListener('touchstart', function() {
		if(!ANDROID) playSound('play', sound_switch, SRC_SWITCH, 0) // サウンド再生
		game.replaceScene(battleScene);
	});
	scene.addChild(myLabel);

	return scene;
}

function createBattleScene() {
	scene = new Scene();
	scene.backgroundColor = "#800";

	var myLabel = new Label();
	myLabel.text = "表示したいテキスト";
	myLabel.font = "32px 'Meiryo', 'メイリオ', 'ヒラギノ角ゴ　Pro W3', sans-serif";
	myLabel.x = (SCREEN_WIDTH - myLabel._boundWidth) / 2;
	myLabel.y = 320;
	myLabel.addEventListener('touchstart', function() {
		if(!ANDROID) playSound('play', sound_switch, SRC_SWITCH, 0) // サウンド再生
		game.replaceScene(mainScene);
	});
	scene.addChild(myLabel);

	return scene;
}

/* ----------------------------------------------- */

function playSound(action, obj, src, loop) {
	if(!obj) {
		if(!ANDROID) {
			obj = game.assets[src].clone();
		} else {
			obj = new Audio(src);
		}
	}
	if(action == 'play') {
		obj.play();
		if(loop) {
			if(!ANDROID) {
				obj.src.loop = true;
			} else {
				obj.loop = 'true';
			}
		}
	}
}

//		game.removeScene(aaaScene); // 今のシーン
//		game.pushScene(bbbScene); // 次のシーン
/*
	onenterframe:function(){
	},
	ontouchend:function(){
	},
*/


