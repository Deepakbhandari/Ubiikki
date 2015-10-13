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
	this.cWidth = 570;
	this.cHeight = 470;
	this.changeToHeight = this.cHeight+5; // 0 - no change

	this.metadataName = "Tietokone-aloitussivun animaatio";
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


		var link0 = "/view/6892?page=151238";
		var link1 = "/view/6892?page=151265";
		var link2 = "/view/6892?page=151450";


	this.initEdit = function ()  {};

	this.initView = function () {

		log('exportRoot', view.exportRoot);
		var btnAgain = view.exportRoot.btnAgain;
		var b0 = view.exportRoot.b0;
		var b1 = view.exportRoot.b1;
		var b2 = view.exportRoot.b2;
		var b3 = view.exportRoot.b3;

		for ( var i = 0; i < 3; i++ ) {
				var mc = "b" + i;
				mc.id = i;
				mc.hitArea = true;
				mc.mouseChildren = false;
				mc.addEventListener("mousedown", bClick());
				mc.addEventListener("mouseover", bOver());
				mc.addEventListener("mouseout", bOut());
			}

			btnAgain.visible = false;
			btnAgain.addEventListener(MouseEvent.CLICK, reStart);
			readyToInit (); // tämän on oltava tässä
		}
	 function bClick (e)
		{
			var id = event.target.id;
			window.location.href(this["link"+id]);
		}
		}
		function bOver (e)
		{
			var mc = event.target;
			mc.gotoAndStop(2);
		}
		function bOut (e)
		{
			var mc = event.target;
			mc.gotoAndStop(1);
		}
		function syncAnim ()
		{
			try{
				this["b" + ce.data.b].gotoAndStop(ce.data.fr);
			} catch (e) {

			}
		}
		function reStart (e)
		{
			btnAgain.visible = false;
			init();
		}
		function init ()
		{
			var startTime = 2;

			setTimeOut(function() { sPlayer.playSound( "tervetuloaopiskelemaan.mp3" ); }, startTime );

			setTimeOut(function() { b0.gotoAndStop(2); b1.gotoAndStop(2); b2.gotoAndStop(2); },startTime + 5.5);
			setTimeOut(function() { b0.gotoAndStop(1); b1.gotoAndStop(1); b2.gotoAndStop(1); },startTime + 8.0);

			setTimeOut(function() { b1.gotoAndStop(2); },startTime + 8.8);
			setTimeOut(function() { b1.gotoAndStop(1); },startTime + 10.5);

			setTimeOut(function() { b2.gotoAndStop(2); },startTime + 12.3);
			setTimeOut(function() { b2.gotoAndStop(1); },startTime + 14.3);

			setTimeOut(function() { b0.gotoAndStop(2); },startTime + 15.8);
			setTimeOut(function() { b0.gotoAndStop(1); },startTime + 17.5);

			setTimeOut(function() { b3.gotoAndStop(2); },startTime + 18.8);
			setTimeOut(function() { b3.gotoAndStop(1); },startTime + 20.8);

			startTime = 24;

			setTimeOut(function() { sPlayer.playSound( flashPath + soundFolder + "vilu_mai_jos_haluat_opiskella.mp3" ); },startTime);
			setTimeOut(function() { anim.gotoAndPlay("a0"); },startTime);

			startTime = 32;

			setTimeOut(function() { sPlayer.playSound( flashPath + soundFolder + "vilu_mai_jos_haluat_opiskella_hiiren.mp3" ); },startTime);
			setTimeOut(function() { anim.gotoAndPlay("a1"); },startTime);

			startTime = 40;

			setTimeOut(function() { sPlayer.playSound( flashPath + soundFolder + "vilu_mai_jos_haluat_harjoitella_nappai.mp3" ); },startTime);
			setTimeOut(function() { anim.gotoAndPlay("a2"); },startTime);

			setTimeOut(function() { anim.gotoAndPlay("a3");  },startTime + 7);
			setTimeOut(function() { btnAgain.visible = true; uManager.storeScore(0, 1); },startTime  + 8);


		function tick () {

			if ((anim.currentLabel == 'a' + currentAnim && currentAnim < 3) || (anim.currentLabel == 'a3')) {
				anim.stop();
				if (anim.currentLabel == 'a3') aComplete();
			}
		}

		this.stage.update();

	}


	this.initialize();


});
