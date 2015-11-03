define([
	'jquery',
	'underscore',
	'easeljs',
	'UbiLabsManager',
	'Task',
	'SoundManager',
	'TaskContainer',
	'GeneralUtils',
	'tween',
	'canvas.js'
	], function($, _, createjs, UbiLabsManager, Task, SoundManager) {

	lib = lib||{};
	images = images||{};
	createjs = createjs||{};

	_.extend(canvasTask.prototype, Task);
	return new canvasTask();

function canvasTask () {

	this.useCanvas = true;
	this.useTicker = true;
	this.library = lib.canvas;
	this.cWidth = 870;
	this.cHeight = 470;
	this.changeToHeight = this.cHeight+5; // 0 - no change

	this.metadataName = "Reittiohjeet";
	this.metadataDescription = "Katso animaatio.";
	this.initialText = '';
	this.type = 'other'; // "true-false", "choice", "fill-in", "long-fill-in", "matching", "performance", "sequencing", "likert", "numeric", "other"
	this.tasks = [

	];

	this.score = 0;
	this.maxScore = 0;
	this.pointsPerCorrect = 1;
	this.pointsPerWrong = 0;
	this.progressMeasure = 0;
	this.passedLevel = 0.5;
	this.answers = [];
	this.answersNum = 0; // num of retrieved
	this.sharedAnswers = [];
	this.sharedAnswersNum = 0; // num of retrieved
	this.settings = {};
	this.suspendData = {};
	this.sharedSuspendData = {};
	this.undone = true;
	this.useSettings = false;

	this.lineHeight = 20;

	this.font = '14px "Arial", "Helvetica", sans-serif';

	var tNum = -1;
	var task;
	var tasks = this.tasks;
	var sManager;
	var sManifest = [];
	var sPlayer;
	var delayId;
	var er;
	var view = this;
	var locked = true;

	var txLines = [
		'Mene suoraan. Eli jatka eteenpäin.',
		'Vasemmalla on kirkko. Mene vaan kirkon ohi.',
		'Sitten oikeella on posti. Mene vaan sen postinkin ohi.',
		'Sitten postin jälkeen käänny vasemmalle.',
		'Sitten  kun tulee Puistokadun risteys, niin käänny siitä oikeelle.',
		'Käänny ensimmäisestä (1.) risteyksestä oikealle.',
		'Sitten käänny toisesta (2.) risteyksestä vasemmalle.',
		'Käänny kolmannesta (3.) risteyksestä vasemmalle.',
		'Hyvä! Sitten sä olet perillä!'
	]

	var steps = [
		{sound:"apua_jukka_mene_suoraan"},
		{sound:"apua_jukka_vasemmalla_on"},
		{sound:"apua_jukka_sitten_oikealla"},
		{sound:"apua_jukka_sitten_postin"},
		{sound:"apua_jukka_sitten_kun" },

		{sound:"apua_jukka_kaanny_ensin"},
		{sound:"apua_jukka_sitten_kaanny"},
		{sound:"apua_jukka_kaanny_kolman"},
		{sound:"apua_jukka_hyva_sitten"}
	];

	for (var i = 0; i < steps.length; i++) {
		steps[i].sound = 'sounds/'+steps[i].sound;
		sManifest.push(steps[i].sound);
	};

	this.initEdit = function ()  {};

	this.initView = function () {

		log('exportRoot', view.exportRoot);

		var currentAnim = 0;
		var currentSound = 0;

		var anim = view.exportRoot.anim;
		var anim1 = view.exportRoot.anim1;
		var map = view.exportRoot.map;
		var map2 = view.exportRoot.map2;
		var btnReStart = view.exportRoot.btnReStart;
		var btnStart = view.exportRoot.btnStart;

		anim.loop = false;
		anim.gotoAndStop(0);

		anim1.loop = false;
		anim1.gotoAndStop(0);
		anim1.visible = false;

		map2.visible = false;

		btnStart.cursor = 'pointer';
		btnStart.mouseChildren = false;
		btnStart.on('click', start);
		btnStart.visible = false;
		btnStart.gotoAndStop(0);
		btnStart.on('rollover', function(){
			this.gotoAndStop(1);
		}, btnStart);
		btnStart.on('rollout', function(){
			this.gotoAndStop(0);
		}, btnStart);

		btnReStart.cursor = 'pointer';
		btnReStart.mouseChildren = false;
		btnReStart.on('click', reStart);
		btnReStart.visible = false;
		btnReStart.gotoAndStop(0);
		btnReStart.on('rollover', function(){
			this.gotoAndStop(1);
		}, btnReStart);
		btnReStart.on('rollout', function(){
			this.gotoAndStop(0);
		}, btnReStart);

		for (var i = 0; i < txLines.length; i++) {
			var fd = view.exportRoot.anim.txTable['tx'+i];
			fd.text = txLines[i];
			fd.font = this.font;
		};

		sManager = new SoundManager(sManifest, soundsReady, view);

		function soundsReady () {
			btnStart.visible = true;
		}

		function start ()
		{
			btnStart.visible = true;
			currentSound = 0;
			currentAnim = 0;
			playAnim();
		}

		function reStart ()
		{
			btnReStart.visible = false;
			anim1.visible = false;
			map2.alpha = 0;
			map.alpha = 1;
			map.visible = true;
			currentSound = 0;
			currentAnim = 0;
			playAnim();
		}
		function playAnim ()
		{
			if ( currentAnim == 0 ) {
				anim.gotoAndStop(1);
				sManager.playSound( steps[0].sound ).on('complete', sComplete);

				createjs.Ticker.addEventListener("tick", tick);
			}
		}

		function sComplete (e)
		{
			var id;
			var instance;

			if ( currentSound == 0 ) {
				anim.gotoAndPlay("a0");
				currentSound = 1;
				instance = sManager.playSound( steps[currentSound].sound);
			} else if ( currentSound == 1 ) {
				anim.gotoAndStop("a1");
				setTimeout(function () { anim.gotoAndPlay("a1") }, 2000 );
				currentSound = 2;
				instance = sManager.playSound( steps[currentSound].sound);
			} else if ( currentSound == 2 ) {
				anim.gotoAndStop("a2");
				setTimeout(function () { anim.gotoAndPlay("a2") }, 1000 );
				currentSound = 3;
				instance = sManager.playSound( steps[currentSound].sound);
			} else if ( currentSound == 3 ) {
				anim.gotoAndStop("a3");
				setTimeout( function () { anim.gotoAndPlay("a3") }, 2000 );
				currentSound = 4;
				instance = sManager.playSound( steps[currentSound].sound);
			} else if ( currentSound == 4 ) {
				id = currentSound;
				anim.gotoAndStop("a"+id);
				createjs.Tween.get(map).to({alpha:0, visible:false}, 500);
				createjs.Tween.get(map2).set({visible:true, alpha:0}).to({alpha:1}, 500);
				setTimeout( function () { anim.gotoAndPlay("a"+id) }, 1500 );
				currentSound = id+1;
				instance = sManager.playSound( steps[currentSound].sound);
			} else if ( currentSound == 5 ) {
				id = currentSound;
				anim.gotoAndStop("a"+id);
				setTimeout( function () { anim.gotoAndPlay("a"+id) }, 1500 );
				currentSound = id+1;
				instance = sManager.playSound( steps[currentSound].sound);
			} else if ( currentSound == 6 ) {
				id = currentSound;
				anim.gotoAndStop("a"+id);
				setTimeout( function () { anim.gotoAndPlay("a"+id) }, 1500 );
				currentSound = id+1;
				instance = sManager.playSound( steps[currentSound].sound);
			} else if ( currentSound == 7 ) {
				id = currentSound;
				currentSound = id+1;
				instance = sManager.playSound( steps[currentSound].sound);
			}
			currentAnim = currentSound;

			if (instance) instance.on('complete', sComplete);
		}
		function aComplete ()
		{
			createjs.Ticker.removeEventListener("tick", tick);

			anim1.gotoAndPlay(1);
			anim1.visible = true;
			btnReStart.visible = true;

			view.finishSimpleTask(); //////////////////////////
		}

		function tick () {

			if ((anim.currentLabel == 'a' + currentAnim && currentAnim < 7) || (anim.currentLabel == 'a7')) {
				anim.stop();
				if (anim.currentLabel == 'a7') aComplete();
			}
		}

		this.stage.update();

	}


	this.initialize();
}

});
