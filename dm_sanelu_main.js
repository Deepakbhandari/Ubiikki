define([
	'jquery',
	'underscore',
	'easeljs',
	'UbiLabsManager',
	'Task',
	'SoundManager',
	'TaskContainer',
	'GeneralUtils',
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
	this.cHeight = 475;
	this.changeToHeight = this.cHeight+5; // 0 - no change

	this.metadataName = "Sanelutehtävä";
	this.metadataDescription = "";
	this.initialText = '';
	this.type = 'matching'; // "true-false", "choice", "fill-in", "long-fill-in", "matching", "performance", "sequencing", "likert", "numeric", "other”
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


	this.initEdit = function ()  {};

	this.initView = function () {

		var o, i, j, b;

		er = view.exportRoot;

		var commTx = er.commTx;
		var cWord = er.cWord;
		var _glueFd = er._glueFd;
		var _sPlayer = er._sPlayer;

		cWord.loop=false;
		cWord.gotoAndStop(0);

		function dm_sanelu()
		{

			uManager = _uManager;
			gotoPageAuto = _gotoPageAuto;
			readyToInit = _readyToInit;

			numberOfPages = 6; // asetettava
			currentPageIndex = 0;
			numberOfAnswers = 0; // asetettava
			maxScore = 6*1;
		}

		function addedToStage ()
		{
			alert("pohja")

			btnCheck.addEventListener(MouseEvent.CLICK, check);
			tempTx0.text = "";
			tempTx1.text = "";
			commTx.text = "Kirjoita lämpötila kenttään ja mittaa.";
			commTx1.text = "";
			readyToInit (); // tämän on oltava tässä
		}

		function init ()
		{
			alert("init")

		}
			function check ()
		{
			var str = tempTx0.text;
			var arr;
			if ( str.lastIndexOf(".") >= 0 || str.lastIndexOf(".") === 0 ) {
				arr = str.split(".");
			} else {
				arr = str.split(",");
			}
			if ( arr[1] == undefined ) arr[1] = 0;
			var num = Number(arr[0] + "."+arr[1]);
			arr[0] = int(arr[0]);
			arr[1] = Math.round(Number("0." + arr[1]) * 10);
			tempTx1.text = arr[0] + ","+arr[1];
			if ( num <= 35.9 ) {
				commTx1.text = "Alilämpöä.";
			} else if ( num >= 36 && num <= 37.4 ) {
				commTx1.text = "Normaali lämpö.";
			} else if ( num >= 37.5 && num < 42 ) {
				commTx1.text = "Kuumetta.";
			} else if ( num >= 42 && num <= 44 ) {
				commTx1.text = "Ihmisen sietoalueen yläraja, todella korkea kuume!";
			} else {
				commTx1.text = "Mittasitko varmasti ihmisen lämpöä?";
			}
			uManager.finished("passed");
		}




			this.setAnswer(tNum, aswr, result, finished);

			//this.stage.update();
		}

	this.initialize();
}
});
