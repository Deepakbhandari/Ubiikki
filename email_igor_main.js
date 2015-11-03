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
	this.cHeight = 455;
	this.changeToHeight = this.cHeight+5; // 0 - no change

	this.metadataName = "Sähköpostin lähetys";
	this.metadataDescription = "";
	this.initialText = '';
	this.type = 'fill-in'; // "true-false", "choice", "fill-in", "long-fill-in", "matching", "performance", "sequencing", "likert", "numeric", "other"
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
	this.numberOfPages = 1; // asetettava
	this.currentPageIndex = 0;
	this.numberOfAnswers = 4; // asetettava
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

	var questions  = ["Aihe",
										"Alkutervehdys",
										"Viestin teksti 1",
										"Viestin teksti 2",
										"Lopputervehdys"

		];


	this.initEdit = function ()  {};

	this.initView = function () {

		var er = exportRoot.view;
		var btnSend = er.btnSend;
		var btnOwn = er.btnOwn;
		var btnShow = er.btnShow;
		var anim = er.anim;
		var comm = er.comm;

		var fd = er.fd;
		var h = er.h;


		  btnSend.addEventListener(MouseEvent.CLICK, send);
			btnShow.addEventListener(MouseEvent.CLICK, show);
			btnOwn.addEventListener(MouseEvent.CLICK, own);
			anim.visible = false;
			for ( var i = 0; i < questions.length; i++ ) {
				//this["fd" + i].text = "";
				this["fd" + i].tabIndex = i;
			}
			for ( i = 0; i < 4; i++ ) {
				this["h" + i].cursor = "pointer";
				this["h" + i].mouseChildren = false;
				this["h" + i].addEventListener(MouseEvent.CLICK, hClick);
			}
			btnSend.visible = true;
			btnShow.visible = false;
			btnOwn.visible = false;
			answer.visible = false;
			readyToInit (); // tämän on oltava tässä
		}

		function init ()
		{

			for ( var i = 0; i < answers.length; i++ ) {
				try {
					this["fd" + i].text = answers[i].learnerResponse;

				} catch (e) {

				}
			}

	}
}
	function send ()
	{
		for ( var i = 0; i < questions.length; i++ ) {
			uManager.storeAnswer (i, this["fd" + i].text, "neutral", "fill-in", questions[i] );

		}
		uManager.finished("passed");
		anim.visible = true;
		anim.alpha = 0;
		anim.scaleY = 0.5;
		createjs.Tween.get(anim).to({ alpha:1, scaleY:1, onComplete: function() { createjs.Tween.get(anim).to({ alpha:0, delay:1 },500 ) } }, 500 );
		btnSend.visible = false;
		btnShow.visible = true;
		btnOwn.visible = false;


	}
	function hClick ()
	{
		var mc = e.target;
		alert(mc.currentFrame)
		if (mc.currentFrame == 1 ) {
			mc.gotoAndStop(1);
			this.setChildIndex(mc, this.numChildren - 1);
		}
		else mc.gotoAndStop(0);
	}
	function show ()
	{
		for ( var i = 0; i < questions.length; i++ ) {
			this["fd" + i].visible = false;
			if ( i<4 ) this["h" + i].visible = false;
		}
		answer.visible = true;
		btnSend.visible = false;
		btnShow.visible = false;
		btnOwn.visible = true;

	}
	function own ()
	{
		for ( var i = 0; i < questions.length; i++ ) {
			this["fd" + i].visible = true;
			if ( i<4 ) this["h" + i].visible = true;
		}
		answer.visible = false;
		btnSend.visible = false;
		btnShow.visible = true;
		btnOwn.visible = false;

	}


	this.initialize();


});
